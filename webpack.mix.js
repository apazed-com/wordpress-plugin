const mix = require('laravel-mix');
require('laravel-mix-tailwind');

mix
    .js('./src/admin/js/apazed-admin.js', './admin/js/apazed-admin.js')
    .sass('./src/admin/css/apazed-admin.scss', './admin/css/apazed-admin.css')
    .vue()
    .tailwind()
    //.version()
    //.sourceMaps()