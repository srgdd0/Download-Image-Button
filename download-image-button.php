<?php
/*
Plugin Name: Download Image Button
Plugin URI: https://github.com/srgdd0/Download-Image-Button
Description: This plugin enhances the WordPress media library modal by adding a "Download Image" button. This allows users to easily download any image directly from the media library interface.
Version: 1.1
Author: Serhii Didenko (webrpc)
Author URI: https://web.rpc.in.ua/
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: download-image-button
*/

// Enqueue the JavaScript file
function dib_enqueue_script() {
    wp_enqueue_script('download-image-button', plugins_url('/download-image-button.js', __FILE__), array('jquery'), '3.4', true);
}

add_action('admin_enqueue_scripts', 'dib_enqueue_script');
