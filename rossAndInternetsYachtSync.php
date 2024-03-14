<?php

/*
 Plugin Name: Ross And Internets Yacht Sync
 Plugin URI: https://jamesrossadvertising.com
 Version: 1.8.0
 Author: <a href="https://buildtheintnets.com">Build The Internets</a>
 Description: 
 Text Domain: 
 License: GPLv3
 GNU GPLv3 License Origin: http://www.gnu.org/licenses/gpl-3.0.html
*/

// Define GLOBALS
define( 'RAI_YS_PLUGIN_DIR', dirname(__FILE__) );

define( 'RAI_YS_PLUGIN_TEMPLATES_DIR', dirname(__FILE__).'/partials' );

define( 'RAI_YS_PLUGIN_ASSETS', plugin_dir_url(__FILE__) . '');

// class auto loader

spl_autoload_register( 'raiYachtSync_autoloader' );

function raiYachtSync_autoloader( $class_name ) {
    if ( false !== strpos( $class_name, 'raiYachtSync_' ) ) {
        $classes_dir = realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR . 'src' . DIRECTORY_SEPARATOR;
        $class_file = str_replace( '_', DIRECTORY_SEPARATOR, $class_name ) . '.php';
        require_once $classes_dir . $class_file;
    }
}

add_action('plugins_loaded', 'init_rossAndInternetsYachtSync');

function init_rossAndInternetsYachtSync() {
    // Only load and run the init function if we know PHP version can parse it
    include_once('rossAndInternetsYachtSync_init.php');
    
    rossAndInternetsYachtSync_init(__FILE__);
}


//////////////////////////////////
// Run Updater
/////////////////////////////////
require __DIR__.'/src/plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$myUpdateChecker = PucFactory::buildUpdateChecker(
    'https://github.com/RossAndInternets/yacht-sync-wp-plugin',
    __FILE__,
    'yacht-sync-wp-plugin'
);

//Optional: If you're using a private repository, create an OAuth consumer
//and set the authentication credentials like this:
//Note: For now you need to check "This is a private consumer" when
//creating the consumer to work around #134:
// https://github.com/YahnisElsts/plugin-update-checker/issues/134

$myUpdateChecker->setAuthentication('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');

//Optional: Set the branch that contains the stable release.
$myUpdateChecker->setBranch('wp-admin-release');