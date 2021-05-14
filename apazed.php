<?php

/**
 * The plugin bootstrap file
 *
 * @link              https://apazed.com
 * @since             1.0.0
 * @package           Apazed
 *
 * @wordpress-plugin
 * Plugin Name:       Apazed.com
 * Plugin URI:        https://apazed.com/wordpress
 * Description:       Easily create payment widgets and payment links for your site. No added fees. No development. No stress.
 * Version:           1.0.0
 * Author:            Apazed
 * Author URI:        https://apazed.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       apazed
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (! defined('WPINC')) {
    die;
}

/**
 * SI directory
 */
define('APAZED_PATH', WP_PLUGIN_DIR . '/' . basename(dirname(__FILE__)));

/**
 * Plugin File
 */
define('APAZED_PLUGIN_PATH', plugin_dir_path(__FILE__));

/**
 * SI URL
 */
define('APAZED_URL', plugins_url('', __FILE__));

/**
 * Current plugin version.
 */
define('APAZED_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-apazed-activator.php
 */
function activate_apazed()
{
    require_once APAZED_PLUGIN_PATH . 'includes/class-apazed-activator.php';
    Apazed_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-apazed-deactivator.php
 */
function deactivate_apazed()
{
    require_once APAZED_PLUGIN_PATH . 'includes/class-apazed-deactivator.php';
    Apazed_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_apazed');
register_deactivation_hook(__FILE__, 'deactivate_apazed');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require APAZED_PLUGIN_PATH . 'includes/class-apazed.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_apazed()
{
    $plugin = new Apazed();
    $plugin->run();
}
run_apazed();
