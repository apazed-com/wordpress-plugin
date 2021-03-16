<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://apazed.com
 * @since      1.0.0
 *
 * @package    Apazed
 * @subpackage Apazed/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Apazed
 * @subpackage Apazed/public
 * @author     Apazed <wordpress@apazed.com>
 */
class Apazed_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/apazed-public.css', array(), $this->version, 'all' );
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
	    $handle = 'apazed-sdk|defer';
		if (APAZED_DEV) {
		    wp_enqueue_script( $handle, 'http://apazed.test/sdk/v1/js', array(), $this->version, false );
        }
		else {
		    wp_enqueue_script( $handle, 'https://apazed.com/sdk/v1/js', array(), $this->version, false );
        }
	}

}
