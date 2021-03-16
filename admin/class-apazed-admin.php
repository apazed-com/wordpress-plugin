<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://apazed.com
 * @since      1.0.0
 *
 * @package    Apazed
 * @subpackage Apazed/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Apazed
 * @subpackage Apazed/admin
 * @author     Apazed <wordpress@apazed.com>
 */
class Apazed_Admin
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $plugin_name The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Prefix for site options
     *
     * @since    1.0.0
     * @access   private
     * @var      string $option_prefix
     */
    private $option_prefix = 'apazed_v8_';

    /**
     * API Token for API requests
     *
     * @since    1.0.0
     * @access   private
     * @var      string $token
     */
    private $token;

    /**
     * The payload from apazed.com api
     *
     * @since    1.0.0
     * @access   private
     * @var      object $payload
     */
    private $payload;

    /**
     * The latest articles from apazed.com
     *
     * @since    1.0.0
     * @access   private
     * @var      object $articles
     */
    private $articles;

    /**
     * Initialize the class and set its properties.
     *
     * @param string $plugin_name The name of this plugin.
     * @param string $version The version of this plugin.
     * @since    1.0.0
     */
    public function __construct($plugin_name, $version)
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
        $this->token = get_option( $this->option_prefix . 'token', false );
        //$this->token = false;

        $this->setPayload();
        $this->setArticles();
    }

    private function setPayload()
    {
        $rawPayload = get_transient( $this->option_prefix . 'payload' );

        if ((!$this->payload && $this->token)) {
            // get payload from api
            $apiUrl = (APAZED_DEV) ? 'http://apazed.test/api/app/payload' : 'https://apazed.com/api/app/payload';
            $args = [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->token,
                    'Accept' => 'application/json',
                ],
                'method' => 'POST',
                'body' => ['site' => $_SERVER['SERVER_NAME']]
            ];
            $response = wp_remote_post( $apiUrl, $args );
            // token is bad
            if (wp_remote_retrieve_response_code( $response ) === 401) {
                $this->payload = false;
                $this->token = !(update_option( $this->option_prefix . 'token', false ));
                // rerun, to set the connect payload
                $this->setPayload();
            }
            $rawPayload = wp_remote_retrieve_body( $response );

            if (!APAZED_DEV) set_transient( $this->option_prefix . 'payload', $rawPayload, 300 );
        }

        // create consumable payload
        $this->payload = json_decode( $rawPayload );

        if (empty($this->payload)) {
            $this->payload = new \stdClass();
        }

        $this->payload->connect = new \stdClass();
        $this->payload->connect->token = $this->token;
        $this->payload->connect->returnUrl = admin_url( 'options-general.php?page=apazed-dashboard' );
        $this->payload->connect->blogName = get_bloginfo( 'name' );
        $this->payload->connect->apazedConnect = (APAZED_DEV) ? 'http://apazed.test/app/api/token' : 'https://apazed.com/app/api/token';

        if (!isset( $this->payload->forms )) {
            $this->payload->forms = new \stdClass();
        }
        if (!isset( $this->payload->site )) {
            $this->payload->site = new \stdClass();
            $this->payload->site->key = false;
        }

        // maybe add messages based on payload
        $this->maybeAddMessages();

    }

    private function getConnectUrl() {
        $apazedCom = (APAZED_DEV) ? 'http://apazed.test/app/api/token' : 'https://apazed.com/app/api/token';
        return add_query_arg( ['name' => get_bloginfo( 'name' ), 'return_url' => admin_url( 'options-general.php?page=apazed-dashboard' ) ], $apazedCom);
    }

    private function maybeAddMessages()
    {
        if (!isset($this->payload->messages) || !is_array( $this->payload->messages )) {
            $this->payload->messages = [];
        }
        if (isset($this->payload->connection) && is_array($this->payload->connection))
        $connection = $this->payload->connection[0];
        if (isset( $connection->account->account->requirements->currently_due ) && count( $connection->account->account->requirements->currently_due )) {
            $when = ($connection->account->account->requirements->current_deadline) ? ' by ' . date( 'M d, Y', $connection->account->account->requirements->current_deadline ) : '';
            $this->payload->messages[] = ['note' => sprintf( 'Looks like your account is incomplete and some information is needed, go to your <a href="%s" target="_blank" class="underline hover:cursor-pointer hover:text-primary-600">stripe account</a> to start getting paid.', $when, 'https://dashboard.stripe.com/settings/update' ), 'type' => 'warning'];
        }
        if (isset( $connection->account->account->requirements->errors ) && count( $connection->account->account->requirements->errors )) {
            foreach ($connection->account->account->requirements->errors as $key => $error) {
                if (isset( $error['reason'] )) {
                    $this->payload->messages[] = ['note' => wp_filter_post_kses($error['reason']), 'type' => 'info'];
                }
            }
        }
    }

    private function setArticles()
    {
        $rawArticles = get_transient( 'apazed-articles-v1' );

        if (!$rawArticles) {
            // get payload from api
            $apiUrl = (APAZED_DEV) ? 'http://apazed.test/api/articles' : 'https://apazed.com/api/articles';
            $response = wp_remote_get( $apiUrl );
            $rawArticles = wp_remote_retrieve_body( $response );
            set_transient( 'apazed-articles-v1', $rawArticles, 86400 ); // daily
        }

        // create consumable payload
        $this->articles = json_decode( $rawArticles );
    }

    public function add_menu()
    {
        add_submenu_page( 'options-general.php', "Payments Made Easy - Apazed", "Apazed", 'manage_options', $this->plugin_name . '-dashboard', [$this, 'dashboard'] );
    }

    public function dashboard()
    {
        $props = $this->payload;
        $articles = $this->articles;
        include(APAZED_PLUGIN_PATH . 'admin/pages/dashboard.php');
    }

    public function check_for_returned_token()
    {
        if (isset( $_GET['token'] ) && '' !== $_GET['token']) {
            update_option( $this->option_prefix . 'token', sanitize_text_field($_GET['token']) );
            wp_redirect( remove_query_arg( ['token', 'uid'] ) );
        }
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {
        if ($this->is_apazed_admin()) {
            wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/apazed-admin.css', [], $this->version, 'all' );
        }
        wp_enqueue_style( $this->plugin_name . '-block', plugin_dir_url( __FILE__ ) . 'css/apazed-block.css', [], $this->version, 'all' );
    }

    public function is_apazed_admin()
    {
        return (isset($_GET['page']) && $this->plugin_name . '-dashboard' == $_GET['page']);
    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {
        if ($this->is_apazed_admin()) {
            wp_enqueue_script( 'moment', plugins_url( 'js/moment.min.js', __FILE__ ), [], '2.29.1', false );

            $script_path = 'js/apazed-admin.js';
            $script_asset_path = trailingslashit( APAZED_PATH ) . 'admin/js/apazed-admin.asset.php';
            $script_asset = file_exists( $script_asset_path )
                ? require($script_asset_path)
                : array('dependencies' => array(), 'version' => filemtime( $script_path ));
            $script_url = plugins_url( $script_path, __FILE__ );
            wp_enqueue_script( $this->plugin_name . '|defer', $script_url, array_merge( $script_asset['dependencies'], [] ), $script_asset['version'] );
        }

        // block
        $script_path = 'js/apazed-block.js';
        $script_asset_path = trailingslashit( APAZED_PATH ) . 'admin/js/apazed-block.asset.php';
        $script_asset = file_exists( $script_asset_path )
            ? require($script_asset_path)
            : array('dependencies' => array(), 'version' => filemtime( $script_path ));
        $script_url = plugins_url( $script_path, __FILE__ );
        wp_enqueue_script( $this->plugin_name . '-block', $script_url, $script_asset['dependencies'], $script_asset['version'] );
    }

    /**
     * @TODO this should be abstracted but that would mean the payload needs to be accessible.
     */

    public function register_api_get_forms()
    {
        register_rest_route( 'apazed/v1', '/all-forms', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_payments_forms'],
        ) );
    }

    /**
     * @return array|false|string
     */
    public function get_payments_forms()
    {
        if (!$this->token) {
            return [
                'error' => [
                    'message' => __('Not connected to Apazed.com.'),
                    'label' => __('Connect','apazed'),
                    'url' => $this->getConnectUrl()
                ]
            ];
        }
        if (empty($this->payload->forms)) {
            return [
                'error' => [
                    'message' => __('No Apazed payments forms found.'),
                    'label' => __('Review & Create','apazed'),
                    'url' => admin_url( 'options-general.php?page=apazed-dashboard' )
                ]
            ];
        }
        return ['forms' => $this->payload->forms ];
    }
}
