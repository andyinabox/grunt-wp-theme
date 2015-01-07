<?php
/**
 * {%= title %} functions and definitions
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development and
 * http://codex.wordpress.org/Child_Themes), you can override certain functions
 * (those wrapped in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before the parent
 * theme's file, so the child theme functions would be used.
 *
 * @package {%= title %}
 * @since 0.1.0
 */

 // grab the theme's package.json file
 $pkg = get_json(get_template_directory() . '/package.json');

 // Useful global constants
define( '{%= prefix_caps %}_VERSION', $pkg['version'] );

 /**
  * Set up theme defaults and register supported WordPress features.
  *
  * @uses load_theme_textdomain() For translation/localization support.
  *
  * @since 0.1.0
  */
 function {%= prefix %}_setup() {
	/**
	 * Makes {%= title %} available for translation.
	 *
	 * Translations can be added to the /lang directory.
	 * If you're building a theme based on {%= title %}, use a find and replace
	 * to change '{%= prefix %}' to the name of your theme in all template files.
	 */
	load_theme_textdomain( '{%= prefix %}', get_template_directory() . '/languages' );
 }
 add_action( 'after_setup_theme', '{%= prefix %}_setup' );

 /**
  * Enqueue scripts and styles for front-end.
  *
  * @since 0.1.0
  */
 function {%= prefix %}_scripts_styles() {

  // is script debug mode enabled?
  $debug = ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG );

	$postfix = $debug ? '' : '.min';

  // if in debug mode, include livereload script
  if ($debug) { wp_enqueue_script( 'livereload', "//localhost:35729/livereload.js", array()); }

  // include requirejs
  // @todo: maybe use almond.js so this isn't necessary in prod?
  wp_enqueue_script( 'requirejs', get_template_directory_uri() . "/assets/vendor/requirejs/require.js", array());

	wp_enqueue_script( '{%= prefix %}', get_template_directory_uri() . "/assets/js/{%= js_safe_name %}{$postfix}.js", array(), {%= prefix_caps %}_VERSION, true );

	wp_enqueue_style( '{%= prefix %}', get_template_directory_uri() . "/assets/css/{%= js_safe_name %}{$postfix}.css", array(), {%= prefix_caps %}_VERSION );
 }
 add_action( 'wp_enqueue_scripts', '{%= prefix %}_scripts_styles' );

 /**
  * Add humans.txt to the <head> element.
  */
 function {%= prefix %}_header_meta() {
	$humans = '<link type="text/plain" rel="author" href="' . get_template_directory_uri() . '/humans.txt" />';

	echo apply_filters( '{%= prefix %}_humans', $humans );
 }
 add_action( 'wp_head', '{%= prefix %}_header_meta' );

 /**
 * Get a json file or throw error if not found
 * (this should probably be in a helpers.php file or something?)
 */
 function get_json($filepath) {
   if(file_exists($filepath)) {
     $str = file_get_contents($filepath);
     return json_decode($str, true);
   } else {
     die("JSON file not found: " . $filepath);
     return;
   }
 }
