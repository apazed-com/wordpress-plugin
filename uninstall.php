<?php

/**
 * Fired when the plugin is uninstalled.
 *
 * For more information, see the following discussion:
 *
 * @link       https://apazed.com
 * @since      1.0.0
 *
 * @package    Apazed
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}
