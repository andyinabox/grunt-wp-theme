<?php
/**
 * The template for displaying the header.
 *
 * @package {%= title %}
 * @since 0.1.0
 */
 ?><!DOCTYPE html>
 <html <?php language_attributes(); ?> class="no-js">

 <head>
   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
   <meta charset="<?php bloginfo('charset'); ?>">
   <title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' : '; } ?><?php bloginfo('name'); ?></title>
     <meta name="viewport" content="width=device-width, initial-scale=1">

     <script charset="utf-8">
     // global AAP namespace for configuration, etc.
     (function (root, undefined) {
       root.{%= prefix_caps %} = {
         version: "<?php echo {%= prefix_caps %}_VERSION; ?>",
         theme_root: "<?php echo get_template_directory_uri(); ?>"
       }
     })(window);
     </script>

     <?php wp_head(); ?>
   </head>

   <body <?php body_class(); ?>>
