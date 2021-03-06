const mix = require('laravel-mix');
require('laravel-mix-tailwind');
require("@tinypixelco/laravel-mix-wp-blocks")
require("@wordpress/i18n")

mix
    .js('./src/admin/js/apazed-admin.js', './admin/js/apazed-admin.js')
    .sass('./src/admin/css/apazed-admin.scss', './admin/css/apazed-admin.css')
    .vue()
    .tailwind()
    //.version()
    //.sourceMaps()

/**
 * Gutenburg Block
 */
mix
    .sass('./src/block/editor.scss', './admin/css/apazed-block.css')
    .sass('./src/block/style.scss', './public/css/apazed-public.css')
    //.version()
    //.sourceMaps()

mix
    .block('./src/block/block.jsx', './admin/js/apazed-block.js')
    //.version()
    //.sourceMaps()