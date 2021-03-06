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
class Apazed_Block
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
    }

    public function register_block()
    {
        register_block_type(
            'apazed/embed', array(
                // Enqueue on both frontend & backend.
                'style' => $this->plugin_name,
                // Enqueue in the editor only.
                'editor_script' => $this->plugin_name . '-block',
                // Enqueue in the editor only.
                'editor_style' => $this->plugin_name . '-block',
            )
        );


        register_block_type(
            'cgb/block-my-block', array(
                // Enqueue on both frontend & backend.
                'style' => $this->plugin_name,
                // Enqueue in the editor only.
                'editor_script' => $this->plugin_name . '-block',
                // Enqueue in the editor only.
                'editor_style' => $this->plugin_name . '-block',
            )
        );
    }
}