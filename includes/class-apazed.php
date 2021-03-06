<?php

if (!defined( 'APAZED_DEV' )) {
    define( 'APAZED_DEV', false );
}

/**
 * The core plugin class.
 *
 * @since      1.0.0
 * @package    Apazed
 * @subpackage Apazed/includes
 * @author     Apazed <wordpress@apazed.com>
 */
class Apazed
{

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      Apazed_Loader $loader Maintains and registers all hooks for the plugin.
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string $plugin_name The string used to uniquely identify this plugin.
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string $version The current version of the plugin.
     */
    protected $version;

    /**
     * Authorization Token for API Requests to Apazed.com
     *
     * @since    1.0.0
     * @access    private
     * @var    string $apazed_token Apazed Auth Token
     */
    private $option_prefix = 'apazed_option_';

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct()
    {
        if (defined( 'APAZED_VERSION' )) {
            $this->version = APAZED_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'apazed';

        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
        $this->define_shared_hooks();
    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - Apazed_Loader. Orchestrates the hooks of the plugin.
     * - Apazed_i18n. Defines internationalization functionality.
     * - Apazed_Admin. Defines all hooks for the admin area.
     * - Apazed_Public. Defines all hooks for the public side of the site.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function load_dependencies()
    {

        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-apazed-loader.php';

        /**
         * The class responsible for defining internationalization functionality
         * of the plugin.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-apazed-i18n.php';

        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-apazed-admin.php';

        /**
         * The class responsible for the Gutenburg block.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-apazed-block.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-apazed-public.php';


        /**
         * Some useful functions and template tags.
         */
        require_once plugin_dir_path( dirname( __FILE__ ) ) . 'template-tags/utility.php';

        $this->loader = new Apazed_Loader();
    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the Apazed_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function set_locale()
    {
        $plugin_i18n = new Apazed_i18n();

        $this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
    }

    /**
     * Register all of the hooks related to the admin and public area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_shared_hooks()
    {
        $this->loader->add_filter( 'script_loader_tag', $this, 'filter_script_loader_tag', 10, 3 );
    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_admin_hooks()
    {
        $plugin_admin = new Apazed_Admin( $this->get_plugin_name(), $this->get_version() );
        $plugin_block = new Apazed_Block( $this->get_plugin_name(), $this->get_version() );

        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
        $this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

        $this->loader->add_action( 'admin_menu', $plugin_admin, 'add_menu' );

        $this->loader->add_action( 'admin_init', $plugin_admin, 'admin_init' );

        $this->loader->add_action( 'rest_api_init', $plugin_admin, 'register_api_get_forms' );

        $this->loader->add_action( 'init', $plugin_block, 'register_block' );
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @return    string    The name of the plugin.
     * @since     1.0.0
     */
    public function get_plugin_name()
    {
        return $this->plugin_name;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @return    string    The version number of the plugin.
     * @since     1.0.0
     */
    public function get_version()
    {
        return $this->version;
    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_public_hooks()
    {
        $plugin_public = new Apazed_Public( $this->get_plugin_name(), $this->get_version() );

        $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
        $this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );


    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run()
    {
        $this->loader->run();
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @return    Apazed_Loader    Orchestrates the hooks of the plugin.
     * @since     1.0.0
     */
    public function get_loader()
    {
        return $this->loader;
    }

    /**
     * Filter script tags for async or defer attributes.
     *
     * Append '--async' or/and '--defer' to your script handle to add the appropriate tags to the script tag.
     * This is inspired by: TwentyTwenty_Script_Loader && https://github.com/mindkomm/theme-lib-script-loader-tags/blob/master/lib/filters.php.
     *
     * @since 1.0.0
     */
    public function filter_script_loader_tag($tag, $handle, $src)
    {
        $attrs = [
            '|async' => 'async',
            '|defer' => 'defer',
            '|module' => 'type="module"',
            '|nomodule' => 'nomodule'
        ];

        foreach ($attrs as $search => $attr) {
            if (strpos( $handle, $search ) > -1) {

				// Prevent adding attribute when already added in #12009.
				if ( ! preg_match( ":\s$attr(=|>|\s):", $tag ) ) {
                    $tag = str_replace( $search, '', $tag );
					$tag = preg_replace( ':(?=></script>):', " $attr", $tag, 1 );
				}
            }
        }

        return $tag;
    }

}
