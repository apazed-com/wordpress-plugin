// import css
import './editor.scss';
import './style.scss';

// externals
import {__} from '@wordpress/i18n'; // Import __() from wp.i18n
import {registerBlockType} from '@wordpress/blocks'; // Import registerBlockType() from wp.blocks
import {CheckboxControl, PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {InspectorControls} from '@wordpress/block-editor';

import {createElement} from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';


/* Custom route in the rest API; it returns all posts, to be filtered up here. */
const APIROUTES = {forms: '/apazed/v1/all-forms'};

const DYNAMICSTORE = {forms: []};


/*  My 'register block' config array, eliminated for brevity. */
const CONF = {
    formSelect: {
        key: 'apazed-payments-select',
        label: __('Select Payments Form', 'apazed'),
        help: __('If a form is missing, you can sync with apazed.com from the Apazed dashboard (under settings)', 'apazed'),
        startHelp: __('Oh no! Looks like we you need to connect your site with apazed.com.', 'apazed'),
        noFormsHelp: __('Uh oh! Something went wrong and no forms where found. Make sure to connect with apazed.com, and review your forms.', 'apazed'),
    },
    cartCb: {
        key: 'apazed-payments-cart-check',
        label: __('Enable Cart', 'apazed'),
        help: __('Without a cart the the customer will be directed directly to the payment page without the ability to purchase any other products or prices.', 'apazed'),
    },
    qtyCb: {
        key: 'apazed-payments-qty-check',
        label: __('Quanity Updates', 'apazed'),
        help: __('Allow the customer to purchase more than a single priced item.', 'apazed'),
    }
};

form_selectors();

registerBlockType('apazed/embed', {
    icon: <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 179.8 179.8">
        <switch>
            <g>
                <path class="stHEADSHOT0"
                      d="M40.9 27.8c-.5.6-1 1.1-1.4 1.7.4-.6.9-1.1 1.4-1.7zM16.5 130.6c1 2.5 2.2 5 3.8 7.4.8 1.2 1.6 2.4 2.4 3.5-.8-1.1-1.6-2.3-2.4-3.5-1.6-2.4-2.9-4.9-3.8-7.4zM48.9 20.4c-1.8 1.4-3.6 2.8-5.2 4.4 1.6-1.5 3.4-3 5.2-4.4zM153.2 108.1c-.4-.5-.7-.9-1.1-1.2.3.3.7.7 1.1 1.2.8.9 1.5 2.2 2.1 3.6-.3-.7-.7-1.4-1-2-.4-.6-.7-1.2-1.1-1.6zM11.8 172.8c0 .1-.1.1-.1.2 0-.1 0-.2.1-.2zM12.5 171.8c-.1.1-.2.2-.3.4.2-.2.2-.3.3-.4zM55.7 16.1c-1.4.7-2.7 1.5-4 2.3 1.3-.8 2.7-1.6 4-2.3zM17 164.4c.8-1.3 1.6-2.6 2.5-3.8.5-.6.9-1.1 1.5-1.7l.2-.2-.2.2c-2.1 2.1-3.6 4.7-5.2 7.5-.4.6-.7 1.2-1.1 1.8.4-.6.7-1.2 1.1-1.8.4-.6.8-1.3 1.2-2zM33.7 152.3s-.4-.3-1-.7l.1-.2c-.2-.1-.4-.1-.6-.2-.2-.1-.3-.3-.5-.4.2.1.3.3.5.4.2.1.4.1.6.2l-.1.2c.6.4.9.7 1 .7l3.7 8.5-3.7-8.5zM27.1 54.8c-.1.4-.2.7-.3 1.1.2-.4.2-.8.3-1.1zM28.6 49.8c-.2.7-.5 1.5-.7 2.2.2-.7.5-1.5.7-2.2zM151.1 106.1c.1 0 .1.1.2.1 0 0-.1-.1-.2-.1zM26.3 58.1c-.1.6-.3 1.2-.4 1.8.2-.6.3-1.2.4-1.8zM29.9 46.3c-.3.7-.5 1.4-.8 2.1.2-.7.5-1.5.8-2.1zM25.6 61.4c-.2.9-.3 1.8-.5 2.7.2-.9.4-1.8.5-2.7zM33.8 37.8l-.3.6.3-.6zM31.3 42.8c-.3.7-.6 1.4-.9 2 .3-.6.6-1.3.9-2zM38.6 30.6a23.07 23.07 0 010 0zM36.3 33.8a8.636 8.636 0 010 0zM32.4 40.6c-.2.3-.3.7-.5 1 .2-.4.3-.7.5-1zM152.1 106.9l-.4-.4.4.4zM133 160.7c.6-.2 1.3-.4 1.9-.6-.6.2-1.3.4-1.9.6zM66.9 11.4c.7-.2 1.3-.4 2-.6-.7.2-1.3.4-2 .6zM137.5 159.2c.3-.1.6-.2.9-.4-.3.2-.6.3-.9.4zM136.4 159.7c.1 0 .2-.1.3-.1-.1 0-.2 0-.3.1zM150.1 105.7h.3-.3zM56 15.9c2.4-1.3 4.9-2.4 7.5-3.4-2.6 1.1-5.1 2.2-7.5 3.4zM29.9 149.3c-.5-.4-1-.9-1.5-1.4.5.5 1 .9 1.5 1.4zM156.8 117.5c0-.3-.1-.6-.1-.9 0 .3.1.6.1.9zM138.9 158.7c.4-.2.8-.3 1.1-.5-.3.1-.7.3-1.1.5zM142.1 157.1c.3-.2.6-.3.9-.5-.3.2-.6.3-.9.5zM143.6 156.3c.3-.2.6-.3.8-.5-.3.1-.6.3-.8.5zM145.7 154.9c-.2.2-.4.3-.7.5.2-.2.5-.4.7-.5zM148 153c-.5.4-.9.8-1.5 1.2.6-.4 1-.8 1.5-1.2zM140.8 157.8c.3-.1.5-.3.8-.4-.3.1-.6.3-.8.4z"/>
                <path class="stHEADSHOT1"
                      d="M41.4 179.8h1.7c.3-.2.4-.3.4-.3-.7 0-1.4.1-2.1.3zM11.7 164c-.7 1.2-1.4 2.3-2.1 3.5-2.6 4-5.8 7.6-9.6 10.6v1.7h5.4c1-.9 2-1.9 2.9-2.9l.1-.1c.4-.4.7-.8 1.1-1.2l.1-.1c.4-.4.7-.8 1-1.3 0 0 0-.1.1-.1.4-.4.7-.9 1-1.3.2-.2.3-.4.5-.7.1-.1.2-.2.3-.4.4-.5.8-1.1 1.1-1.6.4-.6.8-1.2 1.1-1.8.4-.6.7-1.2 1.1-1.8 1.6-2.8 3.1-5.4 5.2-7.5l.2-.2.2-.2.1-.1c.4-.4.8-.7 1.3-1 .1-.1.2-.1.2-.2.3-.2.5-.4.8-.5.5-.3 1.1-.6 1.6-.8.1-.1.3-.1.4-.1.3-.1.6-.2.9-.2.1 0 .2 0 .3-.1 1-.2 1.9-.2 2.9 0 .6.5 1 .7 1 .7l6.5 4.5-3.7-8.5s-.4-.3-1-.7l.1-.2c-.2-.1-.4-.1-.6-.2-.2-.1-.3-.3-.5-.4-.2-.1-.4-.3-.6-.5-.4-.3-.8-.6-1.2-1-.5-.4-1-.9-1.5-1.4-.4-.4-.8-.7-1.1-1.1l-.8-.8c-.3-.3-.6-.6-.8-.9-.4-.4-.8-.9-1.2-1.4-.6-.7-1.1-1.3-1.7-2.1-.8-1.1-1.6-2.3-2.4-3.5-1.5-2.4-2.8-4.9-3.8-7.4-.6-1.5-1.1-3-1.4-4.6-.7-2.9-1.1-5.9-1-8.9.1-4 .8-8.1 2.2-12.2.6-1.7 1.2-3.3 2-5 .1-.1.1-.3.2-.5.1-.1.1-.3.2-.5.1-.3.3-.6.4-1.1.2-.4.3-.9.5-1.5.3-.9.6-2.1 1-3.5.2-.9.4-1.8.7-2.8.2-1 .5-2.2.7-3.5.3-1.5.6-3.2.9-5.1-1.2-1.3-2.2-2.9-2.8-4.7.9 1 2 2 3.1 2.8.2-1.2.3-2.4.5-3.8.1-.9.2-1.9.4-2.9-.4-.9-.7-1.8-.8-2.7.3.5.7.9 1 1.4.1-.6.1-1.1.2-1.7.2-1.4.3-2.9.5-4.2.1-.5.1-.9.2-1.3v-.1c.1-.9.3-1.8.5-2.7l.3-1.5c.1-.6.2-1.2.4-1.8.1-.2.1-.5.1-.7.1-.5.3-1 .4-1.5.1-.4.2-.7.3-1.1l.3-1.2c.1-.5.3-1 .4-1.5.2-.7.4-1.5.7-2.2.2-.5.3-1 .5-1.4.3-.7.5-1.4.8-2.1.2-.5.4-.9.6-1.4.3-.7.6-1.4.9-2 .2-.4.4-.9.6-1.3.2-.3.3-.7.5-1 .2-.3.3-.7.5-1l.6-1.2.3-.6c.3-.5.5-.9.8-1.4.2-.4.4-.7.6-1.1.3-.5.7-1.1 1-1.6.1-.1.1-.2.2-.3l.6-.9c.5-.7 1-1.3 1.4-1.9.2-.3.4-.5.6-.8l.3-.3c.5-.6.9-1.1 1.4-1.7.2-.2.3-.4.5-.6.7-.8 1.4-1.5 2.1-2.2l.2-.2c1.6-1.6 3.4-3 5.2-4.4.9-.7 1.9-1.4 2.9-2 1.3-.8 2.6-1.6 4-2.3.1-.1.2-.1.3-.2 2.4-1.3 4.9-2.4 7.5-3.4 1.1-.4 2.2-.8 3.4-1.2.7-.2 1.3-.4 2-.6 3.9-1.1 8.1-1.9 12.5-2.5 3.9-.5 8-.8 12.2-.8 4.3-.1 8.8.1 13.5.5 3.6.3 7 .8 10.1 1.5 1.1.2 2.1.5 3.1.7 3 .8 5.9 1.7 8.6 2.8.9.4 1.8.7 2.6 1.1 3.4 1.6 6.5 3.3 9.3 5.3.7.5 1.4 1 2 1.5 2.8 2.2 5.4 4.5 7.6 6.9 1.9 2.1 3.7 4.2 5.2 6.4.4.6.8 1.2 1.2 1.7.7 1 1.3 2 1.9 3 .3.5.6 1 .8 1.4 0 .1.1.1.1.2.2.4.5.9.7 1.3.1.1.1.2.2.3l.6 1.2c.1.1.1.3.2.4l.3.6c.1.2.1.3.2.5s.2.4.2.5l.3.6c.1.1.1.2.1.3l.3.6c.1.3.3.6.4.9.1.2.2.5.3.7.1.3.2.5.3.8l.3.9c.1.2.1.3.2.5v.1c.2.5.3.9.5 1.4 1.7 5.1 2.9 10.5 3.6 15.8.2 1.5.3 3.1.4 4.6.2 2.3.2 4.6.2 6.8-.2 15.1-4.5 29.2-12.2 38.1 0-.3-.1-.6-.1-.9-.1-.7-.3-1.4-.5-2v-.2c-.2-.7-.4-1.3-.6-1.9-.1-.3-.2-.5-.3-.8-.6-1.5-1.3-2.7-2.1-3.6-.4-.5-.7-.9-1.1-1.2l-.4-.4c-.1-.1-.2-.2-.4-.3-.1 0-.1-.1-.2-.1-.3-.2-.5-.3-.7-.3h-.3c-.1 0-.1 0-.2.1-.2.1-.2.4-.1.7.1.3.2.7.3 1.2v.1c.1.2.2.5.3.7.1.2.2.4.2.7 0 .1 0 .1.1.2.4 1 .7 2.2 1.1 3.5.2.7.3 1.4.5 2.1s.3 1.5.5 2.3c.2 1.3.4 2.5.6 3.6l-.2.2.3 1.3v.1c0 .1 0 .3.1.5 0 .2.1.4.1.7 0 .3.1.6.1 1s.1.8.1 1.3v1.5c0 .8 0 1.6-.1 2.5-.1.9-.2 1.8-.3 2.8-.1.7-.2 1.3-.4 2-.3 1.2-.6 2.5-1.1 3.8-.2.6-.4 1.2-.7 1.8-.3.6-.5 1.2-.9 1.8-.3.5-.5 1-.9 1.5-.3.4-.5.8-.8 1.2l-.6.9c-.4.5-.8 1.1-1.3 1.6-.3.3-.6.7-.9 1h-.2v.1c-2.5 2.4-9.1 8.9-12.7 12.2.6-.2 1.3-.4 1.9-.6.5-.2 1-.3 1.5-.5.1 0 .2-.1.3-.1.3-.1.5-.2.8-.3.3-.1.6-.2.9-.4.2-.1.3-.1.5-.2.4-.2.8-.3 1.1-.5.3-.1.5-.2.7-.4.3-.1.5-.3.8-.4l.6-.3c.3-.2.6-.3.9-.5.2-.1.4-.2.5-.3.3-.2.6-.3.8-.5.2-.1.4-.3.6-.4.2-.2.5-.3.7-.5l.9-.6 1.5-1.2h.9c.6.1 1.2.2 1.9.5 1.6.6 3.3 1.8 5.2 3.7l1.2 1.2c.4.4.8.8 1.1 1.3.7.9 1.5 1.8 2.2 2.7.4.4.7.9 1.1 1.3.5.7 1.1 1.4 1.7 2 .6.7 1.2 1.3 1.8 2 .5.5 1.1 1.1 1.7 1.5l.2.2c.6.5 1.1.9 1.7 1.3.1.1.2.1.3.2l1.8 1.2c.1.1.2.1.3.2.6.4 1.3.7 1.9 1.1.1 0 .1.1.2.1.7.3 1.4.7 2.1.9.7.3 1.4.5 2.2.8.1 0 .1 0 .2.1.7.2 1.4.4 2 .6V171c-4.2-1.2-8.1-3.4-11.2-6.5-1.5-1.5-2.8-3.2-4.2-4.9-1.5-1.9-3.1-3.9-4.9-5.7-2-1.9-4.5-4-7.4-5 7.4-9.8 6.9-21.9 6.4-25.9 15.1-14.7 19.9-46.1 11-72.3-5.5-16.3-20.9-44.1-61.9-47.4-52.4-4.3-82.8 18.6-88 66.2C17.1 92 14 97.6 14 97.6c-12.2 25.8 1.9 44.8 10.8 53.5-2.8.9-5.4 2.5-7.3 4.5-2.4 2.5-4.2 5.5-5.8 8.4z"/>
                <path class="stHEADSHOT2"
                      d="M27.6 81.6c1.2.3 2.5.5 3.8.4 0-.1.1-.3.1-.4l.3-1.2c-2.5-1-4.6-2.7-6.2-4.9-.2 1.7-.4 3.3-.6 5 .8.5 1.7.8 2.6 1.1zM153.4 120.9c-.2-1.1-.3-2.4-.6-3.6-.1-.8-.3-1.6-.5-2.3.2.7.3 1.5.5 2.3.3 1.2.5 2.4.6 3.6zM51.8 18.4c-1 .6-1.9 1.3-2.9 2-1.8 1.4-3.6 2.8-5.2 4.4 2.5-2.3 5.1-4.5 8.1-6.4zM165.1 167.7c-.6-.6-1.2-1.3-1.8-2 .6.7 1.2 1.4 1.8 2zM153.8 130c-.1.9-.2 1.8-.3 2.8.1-.9.2-1.9.3-2.8zM148.1 145.8c-.4.5-.8 1.1-1.3 1.6.5-.5.9-1 1.3-1.6z"/>
                <path class="stHEADSHOT3"
                      d="M32.1 151.1c.2.1.4.1.6.2-4-7.8-10.5-14.7-13.8-23-2.9-7.3-3.1-15.7-.6-23.1 1.2-3.6 3-6.9 4.2-10.5 1.2-3.8 1.8-7.8 2.2-11.7-.6-.5-1.2-1-1.8-1.6-.3 1.9-.6 3.6-.9 5.1-.2 1.3-.5 2.4-.7 3.5-.2 1-.4 2-.7 2.8-.4 1.4-.7 2.6-1 3.5-.2.6-.3 1.1-.5 1.5-.2.4-.3.8-.4 1.1-.1.2-.2.4-.2.5-.1.2-.2.4-.2.5-.8 1.7-1.5 3.3-2 5-1.4 4.1-2.2 8.2-2.2 12.2 0 3 .3 6 1 8.9.4 1.5.8 3.1 1.4 4.6 1 2.5 2.2 5 3.8 7.4.8 1.2 1.6 2.4 2.4 3.5.6.7 1.1 1.4 1.7 2.1.4.5.8.9 1.2 1.4.3.3.6.6.8.9.3.3.5.6.8.8l1.1 1.1c.5.5 1.1 1 1.5 1.4.4.4.8.7 1.2 1 .2.2.4.3.6.5s.4.3.5.4zM32.6 50.5c2.1-5.9 4.2-11.9 7.3-17.4 3.1-5.5 7.2-10.4 11.9-14.6-2.9 1.9-5.6 4-8.1 6.4l-.2.2c-.7.7-1.4 1.4-2.1 2.2-.2.2-.3.4-.5.6-.5.6-1 1.1-1.4 1.7l-.3.3c-.2.3-.4.5-.6.8-.5.6-1 1.3-1.4 1.9l-.6.9c-.1.1-.1.2-.2.3-.4.5-.7 1-1 1.6-.2.3-.4.7-.6 1.1-.3.5-.5.9-.8 1.4l-.3.6-.6 1.2c-.2.3-.3.7-.5 1-.2.3-.3.7-.5 1-.2.4-.4.8-.6 1.3-.3.7-.6 1.4-.9 2-.2.5-.4.9-.6 1.4-.3.7-.5 1.4-.8 2.1-.2.5-.3 1-.5 1.4-.2.7-.5 1.5-.7 2.2-.2.5-.3 1-.4 1.5l-.3 1.2c-.1.4-.2.7-.3 1.1-.1.5-.3 1-.4 1.5-.1.2-.1.5-.1.7-.1.6-.3 1.2-.4 1.8l-.3 1.5c-.2.9-.3 1.8-.5 2.7v.1c-.1.5-.2.9-.2 1.3-.2 1.4-.4 2.8-.5 4.2-.1.6-.1 1.1-.2 1.7.5.7 1.1 1.3 1.7 1.9 1.2-7.7 3.9-15.3 6.5-22.8zM25.6 75.5c-.6-.8-1.1-1.7-1.5-2.7-.1 1-.2 1.9-.4 2.9-.2 1.3-.3 2.6-.5 3.8.6.4 1.2.8 1.8 1.1.2-1.7.3-3.4.6-5.1z"/>
                <path class="stHEADSHOT2"
                      d="M145 155.3c.2-.2.4-.3.6-.5-.1.2-.4.4-.6.5-.2.1-.4.3-.7.4-.3.2-.6.3-.8.5-.2.1-.4.2-.5.3-.3.2-.6.3-.9.5l-.6.3c-.3.1-.5.3-.8.4-.2.1-.5.2-.7.4-.4.2-.7.3-1.1.5-.2.1-.3.1-.5.2-.3.1-.6.2-.9.4-.3.1-.5.2-.8.3-.1 0-.2.1-.3.1-.5.2-1 .3-1.5.5-.6.2-1.3.4-1.9.6-.7.6-1.2 1.1-1.7 1.5-1.1 1.7-3 2.7-4 4.6-.2-3.8 12.5-15.8 15.1-18.6 10.1-10.5 11.1-28.2 6.9-42.1.2.1.4.3.6.5-.1-.4 0-.6.1-.7 0 0 .1-.1.2-.1h.2c.2 0 .5.2.7.3.1 0 .1.1.2.1.1.1.2.2.4.3.1.1.3.2.4.4.3.3.7.7 1.1 1.2.4.5.7 1 1.1 1.6.4.6.7 1.3 1 2 .1.2.2.5.3.8.2.6.4 1.3.6 1.9v.2c.2.7.3 1.3.5 2 0 .3.1.6.1.9 7.7-8.9 12-23 12.2-38.1 0-2.3 0-4.5-.2-6.8-.1-1.5-.3-3.1-.4-4.6-.7-5.4-1.9-10.7-3.6-15.8-.2-.5-.3-.9-.5-1.4v-.1c-.1-.2-.1-.3-.2-.5l-.3-.9c-.1-.2-.2-.5-.3-.8-.1-.2-.2-.5-.3-.7-.1-.3-.2-.6-.4-.9l-.3-.6c-.1-.1-.1-.2-.1-.3l-.3-.6c-.1-.2-.2-.3-.2-.5-.1-.2-.1-.3-.2-.5l-.3-.6c-.1-.1-.1-.3-.2-.4l-.6-1.2c-.1-.1-.1-.2-.2-.3-.2-.4-.5-.9-.7-1.3 0-.1-.1-.1-.1-.2-.3-.5-.5-1-.8-1.4-.6-1-1.2-2-1.9-3-.4-.6-.8-1.2-1.2-1.7-1.5-2.1-3.3-4.3-5.2-6.4-.1.4-.2.8-.4 1.2-.1.2-.1.4-.2.6-.1.2-.1.4-.2.5-.1.2-.2.5-.3.7 0 .1-.1.2-.1.3-.1.3-.3.6-.4.8-1.1 1.9-2.5 3.5-4.3 4.7-8.6 5.8-22.1.8-30.1-11.1-3.8-5.6-5.7-11.8-5.7-17.3 19.8 2 33 10.1 41.8 19.6-2.2-2.4-4.8-4.7-7.6-6.9-.7-.5-1.3-1-2-1.5-2.8-1.9-5.9-3.7-9.3-5.3-.8-.4-1.7-.8-2.6-1.1-2.7-1.1-5.5-2-8.6-2.8-1-.3-2.1-.5-3.1-.7-3.2-.7-6.5-1.2-10.1-1.5-4.7-.4-9.2-.5-13.5-.5-4.3.1-8.3.3-12.2.8-4.4.6-8.6 1.4-12.5 2.5-.7.2-1.4.4-2 .6-1.1.4-2.3.7-3.4 1.2-2.6 1-5.1 2.1-7.5 3.4-.1.1-.2.1-.3.2-1.4.7-2.7 1.5-4 2.3-4.7 4.2-8.7 9.1-11.9 14.6-3.1 5.5-5.2 11.5-7.3 17.4-2.7 7.4-5.4 15-6.8 22.8 1.2 1.1 2.5 2 4 2.7 1 .4 2 .7 3.1.9.5-1.1 1.1-2.1 1.9-3.2 1.8-2.5 4.3-4.5 6.8-5.5 1.3-.5 2.6-.8 3.8-1 1.2-.1 2.4-.1 3.4.1 2 .3 3.5 1.1 4.4 1.8.9.7 1.2 1.2 1.1 1.4-.2.2-.8.1-1.7-.1-.5-.1-1.2-.2-1.9-.3.1.2.3.3.4.5 1.6 1.9 3.3 5.1 4.1 8.8.8 3.7.6 7.2.1 9.7-.6 2.4-1.5 3.8-1.9 3.6-.1 0-.2-.1-.3-.3-.2 2.3-.9 5-3.1 5.7-1.6.5-3.8.2-6-.3-1.3-.3-2.6-.8-3.8-1.2.4.7.5 1.3.2 1.6-.1.1-.2.1-.3.1 1.6.4 3.2.9 4.6 1.6 2.4 1.2 4.2 4.1 3.2 6.6-.6 1.5-2 2.6-3.5 3.3-5.4 2.5-11.7 1.6-17.3-.1-1.7-.5-3.4-1-4.7-2.1-1.3-1.1-2.2-2.9-1.7-4.6.6-2.1 3-3.1 5-3.8 3.5-1.2 7.9-1.7 12-1.3-1.1-.4-2.5-.9-3.9-1.4-1.6-.5-3.1-.9-4.3-1.2-1.2-.3-2-.6-2.1-1.2-.1-.5.6-1.2 2-1.6.6-.2 1.3-.3 2-.3-.3-1-.6-2.4-.7-4.1v-2.6c-2.2-.4-4.3-1.4-6.1-2.8-.4 4-1 7.9-2.2 11.7-1.2 3.6-3 6.9-4.2 10.5-2.5 7.5-2.3 15.8.6 23.1 3.3 8.3 9.8 15.2 13.8 23-.2-.1-.4-.1-.6-.2.2.1.4.1.6.2l-.1.2c.6.5 1 .7 1 .7l3.7 8.5-6.5-4.5s-.4-.3-1-.7c-.9-.2-1.9-.2-2.9 0-.1 0-.2 0-.3.1-.3.1-.6.1-.9.2-.1 0-.3.1-.4.1-.6.2-1.1.5-1.6.8-.3.2-.6.3-.8.5-.1.1-.2.1-.2.2-.5.3-.9.7-1.3 1l-.1.1-.2.2-.2.2c-.5.5-1 1.1-1.5 1.7-.9 1.2-1.7 2.4-2.5 3.8-.4.7-.8 1.3-1.2 2-.4.6-.7 1.2-1.1 1.8-.4.6-.7 1.2-1.1 1.8-.4.6-.7 1.1-1.1 1.6-.1.1-.2.2-.2.3-.2.2-.3.4-.5.7 0 .1-.1.1-.1.2-1.4 2.3-2.9 4.6-4.5 6.8h34.3c.7-.1 1.4-.3 2.1-.3 0 0-.1.1-.4.3h136.7v-2.1c-5.2-.9-10.1-2.7-14.5-5.7-7.2-4.7-12.5-13-20.3-16.3zm-.1-111c5.7-1.5 12 3.6 14.2 11.5 2.1 7.9-.7 15.5-6.4 17.1-5.7 1.5-12-3.6-14.2-11.5s.7-15.5 6.4-17.1zm-39-13.4c4 .8 7.7 3.1 10.3 6.3 1.8 2.3 3.1 5.3 2.3 8.2-.1.2-.1.5-.3.7-.6.6-1.7.1-2.4-.4-5.7-4.1-13.8-4.7-20-1.4-.9.5-2 1-2.9.6-1-.5-1.3-1.8-1.3-3-.2-9.2 5.2-12.8 14.3-11zm7.5 42.3c-.5.3-1.5-.6-3.1-1.8-1.6-1.2-3.7-2.8-6.4-4-2.6-1.2-5.2-1.8-7.2-2.2-2-.4-3.4-.8-3.4-1.4 0-.5 1.3-1.1 3.5-1.3 2.2-.3 5.5-.1 8.7 1.4 3.2 1.5 5.6 3.8 6.8 5.7 1.4 1.9 1.6 3.3 1.1 3.6zM47 62.6c-1.6.4-3.4 1.1-5.3 2.4-3.8 2.6-6 6.1-7 5.7-.5-.2-.5-1.4.2-3.2.7-1.7 2.2-4 4.7-5.7 1.2-.8 2.6-1.4 3.8-1.7 1.3-.3 2.5-.3 3.4-.2 1.9.2 2.9.8 2.9 1.3s-1.1 1-2.7 1.4zm-8-17c-.7.5-1.7 1.1-2.3.4-.2-.2-.2-.4-.3-.7-.8-2.8.5-5.9 2.2-8.2 2.5-3.2 6.1-5.5 10-6.3 8.9-1.8 14.2 1.8 14.1 10.9 0 1.1-.2 2.5-1.3 3-.9.4-2-.1-2.9-.6-6-3.2-13.9-2.6-19.5 1.5zm73.4 64.2c-.3-.1-.5-.2-.8-.2v.3c-.3.5-1 .6-2.1.8-.6.1-1.3.1-2 .2.4 11.7-4.5 23.2-13.1 30.5-6.3 5.4-14.6 8.3-22.7 8.3-4.1 0-8.2-.7-12-2.3-3.3-1.3-5.6-3-6.9-5.2-1.2-1.9-1.7-4.1-2.1-6.1-.1-.4-.1-.7-.2-1.1-1.4-6.3-5.3-13.9-9.6-18.7-1.6.5-2.9.5-3.4-.3-.6-.9.7-2.8 3.1-3.7 2.4-1 4.6-.4 4.8.6.1.5-.2 1.1-.8 1.6.4.4.7.9 1.1 1.4 1.4.5 3 1.1 4.9 1.7 2.9.9 6.3 1.8 10.2 2.2 3.9.4 8.3.3 12.8-.3s8.8-1.8 12.6-3 7.2-2.5 10.1-3.6c2-.8 3.8-1.5 5.2-2-1.5-.2-2.6-.6-2.7-1.2-.2-1 2.7-2.4 6.5-2.5.8 0 1.5.1 2.2.2-1-1.1-1.6-2.7-1.2-4.1.3-.9.8-1.5 1.5-2.1-.7.1-1.1.1-1.3-.2-.2-.3 0-.9.7-1.7-.4.1-.9.1-1.3.2h-.1-.1c-4.1.6-8.3.6-12.3 0-.7-.1-1.5-.3-2.1-.7-.5-.4-.8-1-1.1-1.6-.3-.6-.5-1.2-.7-1.8-.1.2-.1.3-.3.3-.5.2-1.5-1.1-2.2-3.7-.4-1.3-.5-2.8-.6-4.6 0-1.7.3-3.7.8-5.6.6-1.9 1.4-3.7 2.3-5.2.9-1.5 2-2.7 2.9-3.5-3 .3-4.8.9-5 .4-.1-.2.4-.8 1.4-1.4 1.1-.7 2.7-1.4 5-1.8 2.2-.4 5-.5 7.9.1 3 .6 6.1 1.9 8.9 4.1 1 .8 1.9 1.7 2.7 2.6 2.2.4 4.6.1 6.7-.8 2.8-1.2 5.1-3.4 6.8-5.9-1 5.3-5.4 9.7-10.7 10.9l.3.6c1.9.5 4 .4 5.9-.1 2.9-.8 5.5-2.6 7.6-4.9-1.8 5-6.7 8.7-12 9.2.3 1.4.5 2.7.5 3.9.1 2.1-.2 3.8-.6 5 1.2 0 2.2.1 3.1.3 1.7.4 2.7 1 2.6 1.5-.1.6-1.2.9-2.9 1.3 3.4.1 6.7.7 9.5 2.1 2.4 1.2 4.2 4.1 3.2 6.6-.6 1.5-2 2.6-3.5 3.3-5.4 2.3-11.7 1.4-17.4-.3z"/>
                <path class="stHEADSHOT3"
                      d="M177.5 175.2c-.7-.2-1.5-.5-2.2-.8l-2.1-.9c-.1 0-.1-.1-.2-.1-.7-.3-1.3-.7-1.9-1.1-.1-.1-.2-.1-.3-.2l-1.8-1.2c-.1-.1-.2-.1-.3-.2-.6-.4-1.2-.9-1.7-1.3l-.2-.2c-.6-.5-1.1-1-1.7-1.5-.6-.6-1.2-1.3-1.8-2-.6-.7-1.1-1.3-1.7-2-.4-.5-.7-.9-1.1-1.3-.7-.9-1.5-1.8-2.2-2.7-.4-.4-.7-.9-1.1-1.3l-1.2-1.2c-1.9-1.9-3.6-3.1-5.2-3.7-.6-.3-1.3-.4-1.9-.5h-.9l-1.5 1.2-.9.6c-.2.2-.4.3-.6.5 7.8 3.3 13.1 11.6 20.2 16.6 4.4 3.1 9.3 4.8 14.5 5.7v-1.8c-.7-.2-1.4-.4-2-.6-.1.1-.1 0-.2 0z"/>
                <path class="stHEADSHOT2"
                      d="M133.3 106.6c.9-2.5-.8-5.4-3.2-6.6-2.8-1.4-6.1-2.1-9.5-2.1-1.5.3-3.5.6-5.6 1.2-3.1.7-5.8 1.7-7.4 1.9-.7.5-1.3 1.2-1.5 2.1-.4 1.5.2 3 1.2 4.1 1.1.2 2 .4 2.8.8 1 .5 1.5 1.1 1.6 1.6.3.1.5.2.8.2 5.7 1.6 12 2.6 17.3.1 1.5-.7 2.9-1.7 3.5-3.3z"/>
                <path class="stHEADSHOT4"
                      d="M133.3 106.6c.9-2.5-.8-5.4-3.2-6.6-2.8-1.4-6.1-2.1-9.5-2.1-1.5.3-3.5.6-5.6 1.2-3.1.7-5.8 1.7-7.4 1.9-.7.5-1.3 1.2-1.5 2.1-.4 1.5.2 3 1.2 4.1 1.1.2 2 .4 2.8.8 1 .5 1.5 1.1 1.6 1.6.3.1.5.2.8.2 5.7 1.6 12 2.6 17.3.1 1.5-.7 2.9-1.7 3.5-3.3z"/>
                <path class="stHEADSHOT2"
                      d="M37.7 98c-4.1-.5-8.4.1-12 1.3-2.1.7-4.4 1.7-5 3.8-.5 1.7.4 3.5 1.7 4.6 1.3 1.1 3 1.7 4.7 2.1 5.7 1.6 12 2.6 17.3.1 1.5-.7 3-1.7 3.5-3.3.9-2.5-.8-5.4-3.2-6.6-1.4-.7-3-1.2-4.6-1.6-.4.2-1.3 0-2.4-.4z"/>
                <path class="stHEADSHOT4"
                      d="M37.7 98c-4.1-.5-8.4.1-12 1.3-2.1.7-4.4 1.7-5 3.8-.5 1.7.4 3.5 1.7 4.6 1.3 1.1 3 1.7 4.7 2.1 5.7 1.6 12 2.6 17.3.1 1.5-.7 3-1.7 3.5-3.3.9-2.5-.8-5.4-3.2-6.6-1.4-.7-3-1.2-4.6-1.6-.4.2-1.3 0-2.4-.4z"/>
                <path class="stHEADSHOT5"
                      d="M108.6 8.1c0 5.6 1.9 11.7 5.7 17.3 8 11.9 21.5 16.9 30.1 11.1 1.8-1.2 3.2-2.8 4.3-4.7.2-.3.3-.5.4-.8 0-.1.1-.2.1-.3.1-.2.2-.5.3-.7.1-.2.1-.4.2-.5.1-.2.1-.4.2-.6.1-.4.3-.8.4-1.2-8.6-9.4-21.9-17.6-41.7-19.6z"/>
                <path class="stHEADSHOT6"
                      d="M38.5 89.3c.4.1.8.1 1.3.1.9 0 1.8-.2 2.5-.4 1-.4 1.8-.9 2.2-1.6.1-.3.2-.5.2-.8 0-.4-.2-.8-.5-1.2-.5-.6-1.3-1.1-2.4-1.4-.6-.2-1.3-.3-2.1-.3-.6 0-1.1.1-1.6.2-.8.2-1.5.4-2.1.8-.2.1-.3.2-.4.3-.5.5-.8 1-.8 1.6 0 .8.5 1.5 1.4 2 .2 1.7.6 3.3 1.2 4.9.1.3.3.7.4 1 .7.5 1.3 1 1.7 1.5.3.3.4.6.6.8 1.2.4 2.5.9 3.8 1.2-2.6-1.8-4.6-4.9-5.4-8.7zM97.8 89.5c.4.1.8.1 1.3.1.9 0 1.8-.2 2.5-.4 1-.4 1.8-.9 2.2-1.6.1-.3.2-.5.2-.8 0-.4-.2-.8-.5-1.2-.5-.6-1.3-1.1-2.4-1.4-.6-.2-1.3-.3-2.1-.3-.6 0-1.1.1-1.6.2v-.2c-2.3-.4-4.6-.5-6.8-.5-.4 1.4-.6 2.8-.8 4.1-.2 1.5-.3 2.8-.3 4 0 1.8 0 3.1-.3 3.7.2.6.4 1.2.7 1.8.3.6.6 1.2 1.1 1.6.6.5 1.4.6 2.1.7 4.1.6 8.2.6 12.3 0l.1-.1c-3.7-1.1-6.6-4.9-7.7-9.7zM105.5 99.3c.1 0 .1 0 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0z"/>
                <path class="stHEADSHOT7"
                      d="M38.2 83.8c.6-6.9 5-12.2 10.3-12.4-.2-.4-.3-.8-.5-1.1-.6 0-1.3.1-1.9.3-.9.2-1.9.6-2.8 1-1.9 1-3.7 2.5-5.1 4.5-.5.6-.9 1.3-1.3 2-.4 2.2-.7 4.4-.8 6.5.5-.4 1.2-.6 2.1-.8zM36.2 88.5c-.9-.5-1.4-1.2-1.4-2 0-.6.3-1.1.8-1.6-.5.1-1 .3-1.5.4-.3 1.1-.5 2.2-.6 3.1-.2 1.7-.3 3.1-.4 4.1.6.1 1.2.2 1.9.4 1.1.4 2.1.9 2.9 1.4-.1-.3-.3-.6-.4-1-.7-1.5-1.1-3.1-1.3-4.8z"/>
                <path
                    d="M36.1 84.6c.1-2.2.4-4.4.8-6.5-.5.8-.9 1.7-1.2 2.5 0 .1-.1.3-.1.4-.1.2-.1.4-.2.6-.1.2-.1.3-.2.5-.1.1-.1.3-.2.4-.3 1-.6 1.9-.8 2.8.5-.1 1-.3 1.5-.4.1-.1.2-.2.4-.3z"
                    fill="#ceafb4"/>
                <path class="stHEADSHOT7"
                      d="M102.1 74.1c-.4-.1-.8-.3-1.2-.4-1.9-.5-3.6-.7-5.2-.8-.3.5-.7 1.1-1.1 1.9-.6 1-1.3 2.2-1.9 3.5-.6 1.4-1.2 2.9-1.7 4.5-.1.2-.1.4-.2.6 2.3-.1 4.6.1 6.8.5.3-4.1 2-7.6 4.5-9.8zM116.2 94.7c0 .1-.1.1-.1.2h.2c-.1 0-.1-.1-.1-.2zM105.5 99.3c0 .1 0 .1 0 0 .1 0 .1 0 0 0 .1 0 .1 0 0 0z"/>
                <ellipse transform="rotate(-15.188 148.727 58.575)" class="stHEADSHOT5" cx="148.8" cy="58.6" rx="10.7"
                         ry="14.8"/>
                <path class="stHEADSHOT9"
                      d="M82.2 135c-.3.3-.7.5-1 .8.3-.2.7-.5 1-.8zM97.5 132.2c-1.1 1.6-2.3 3-3.6 4.4 1.3-1.4 2.5-2.9 3.6-4.4z"/>
                <path class="stHEADSHOT9"
                      d="M81.7 138.2c0-.3-.1-.7-.3-.9-.6-.7-1.6 0-2.3.6L76 141c1.2-2.9 2.3-5.9 3.5-8.8.3-.7.5-1.4.7-2.1-4.3.7-8.4 2.8-11.3 6.1.8-.5 1.9.2 2.1 1.1.2.9-.3 1.8-.9 2.6-.7.9-1.8 1.8-3 1.6-1.2-.2-2-1.8-1.2-2.6-1.7 1.5-3.1 3.3-4.1 5.2 2 .7 4.1 1.2 6.3 1.5 3.4-.8 6.9-1.6 10-3.2 1.8-.8 3.6-2.2 3.6-4.2zM69.7 145.7c-.3 0-.7-.1-1-.1.3.1.6.1 1 .1zM70 145.8c1.5.1 2.9.1 4.4-.1-1.5.1-2.9.1-4.4.1zM60.1 143.4c.3.1.7.3 1 .4-.3-.1-.6-.3-1-.4zM91 129.7c-.4.1-.7.3-1.1.4-.4.2-.8.3-1.2.5.4-.2.8-.4 1.2-.5.4-.1.7-.2 1.1-.4z"/>
                <path class="stHEADSHOT10"
                      d="M81.8 128.8c-.1 0-.3 0-.4-.1.3 0 .5.1.8.1h-.4zM66 138.9c-.9.8 0 2.5 1.2 2.6 1.2.2 2.3-.7 3-1.6.6-.7 1.1-1.7.9-2.6-.2-.9-1.3-1.6-2.1-1.1 2.9-3.3 7-5.4 11.3-6.1.1-.5.1-1 0-1.5-1.8-.1-3.7.2-5.5.8-1.4.5-2.8 1.1-4.1 2-1 .6-1.9 1.4-2.8 2.2-2.7 2.4-4.8 5.3-6.8 8.3-.2.2-.3.5-.5.8-.2.3-.3.5-.4.8.3.1.7.3 1 .4.2.1.5.2.7.3 1-2.1 2.4-3.9 4.1-5.3z"/>
                <path
                    d="M95.6 129.1h-1.2c-1.2.1-2.3.3-3.4.7-.4.1-.7.3-1.1.4-.4.2-.8.3-1.2.5-.8.4-1.5.8-2.3 1.3-1.1.7-2.2 1.5-3.2 2.3-.3.3-.7.5-1 .8s-.7.5-1 .8c.1-.3.1-.6.2-.9.2-.9.6-1.7 1-2.5l.9-1.5c.2-.3.3-.5.5-.8.2-.3.3-.5.5-.8l-.9-.3c-.1 0-.2 0-.3-.1-.2-.1-.5-.1-.7-.2-.1 0-.2 0-.2-.1-.3-.1-.5-.1-.8-.1h-.2c-.3 0-.7 0-1-.1.1.5.1 1 0 1.5-.1.7-.4 1.4-.7 2.1-1.2 2.9-2.3 5.9-3.5 8.8l3.1-3.1c.6-.6 1.7-1.2 2.3-.6.2.2.3.6.3.9 0 1.9-1.8 3.3-3.6 4.2-3.1 1.5-6.6 2.4-10 3.2h.5c.3 0 .7.1 1 .1h.3c1.5.1 2.9.1 4.4-.1.5 0 .9-.1 1.4-.2h.3c.5-.1.9-.1 1.3-.2h.2c.8-.2 1.6-.4 2.5-.6.2 0 .3-.1.5-.1.3-.1.7-.2 1-.3.3-.1.5-.2.8-.3l.9-.3c.3-.1.6-.3 1-.4.2-.1.5-.2.7-.3.5-.2 1.1-.5 1.6-.8.2-.1.3-.2.5-.3.4-.2.8-.4 1.1-.7.2-.1.4-.2.6-.4.4-.2.7-.5 1.1-.7.2-.1.3-.2.5-.3l1.5-1.2c.7-.6 1.4-1.3 2.1-1.9 1.3-1.4 2.5-2.8 3.6-4.4l1.5-2.4c-1.1-.4-2.2-.6-3.4-.6.1 0 .1 0 0 0z"
                    fill="#9b041a"/>
                <path class="stHEADSHOT12"
                      d="M110 108c-.7-.4-1.7-.6-2.8-.8-.7-.1-1.4-.2-2.2-.2-3.8 0-6.7 1.4-6.5 2.5.1.6 1.2 1 2.7 1.2-1.4.5-3.2 1.2-5.2 2-2.9 1.1-6.3 2.4-10.1 3.6s-8.1 2.3-12.6 3c-4.5.6-8.9.7-12.8.3-3.9-.4-7.4-1.3-10.2-2.2-1.9-.6-3.5-1.2-4.9-1.7-.4-.5-.7-.9-1.1-1.4.6-.5.9-1 .8-1.6-.2-1-2.4-1.6-4.8-.6s-3.7 2.8-3.1 3.7c.5.7 1.9.7 3.4.3 4.4 4.8 8.3 12.4 9.6 18.7.1.4.1.7.2 1.1.4 2.1.8 4.2 2.1 6.1 1.4 2.2 3.6 3.9 6.9 5.2 3.8 1.5 7.9 2.3 12 2.3 8.1 0 16.4-2.9 22.7-8.3 8.6-7.3 13.5-18.8 13.1-30.5.8 0 1.5-.1 2-.2 1.1-.1 1.9-.3 2.1-.8.1-.1.1-.2 0-.3.3-.3-.3-.9-1.3-1.4zm-12.5 24.2c-1.1 1.6-2.3 3-3.6 4.4-.7.7-1.3 1.3-2.1 1.9l-1.5 1.2c-.2.1-.3.2-.5.3-.4.3-.7.5-1.1.7-.2.1-.4.2-.6.4-.4.2-.8.5-1.1.7-.2.1-.3.2-.5.3-.5.3-1 .5-1.6.8-.2.1-.5.2-.7.3-.3.1-.6.3-1 .4l-.9.3c-.3.1-.5.2-.8.3-.3.1-.7.2-1 .3-.2.1-.3.1-.5.1-.8.2-1.6.4-2.5.6h-.2c-.4.1-.9.2-1.3.2h-.3c-.5.1-.9.1-1.4.2-1.5.1-2.9.1-4.4.1h-.3c-.3 0-.7-.1-1-.1h-.5c-2.1-.3-4.2-.8-6.3-1.5-.2-.1-.5-.2-.7-.3-.4-.1-.7-.3-1-.4.1-.3.3-.5.4-.8.2-.3.3-.5.5-.8 2-3 4.2-5.9 6.8-8.3.9-.8 1.8-1.5 2.8-2.2 1.3-.8 2.6-1.5 4.1-2 1.8-.6 3.6-.9 5.5-.8.3 0 .7 0 1 .1h.2c.1 0 .3 0 .4.1.1 0 .3.1.4.1.1 0 .2 0 .2.1.2.1.5.1.7.2.1 0 .2 0 .3.1l.9.3c-.2.3-.3.5-.5.8-.2.3-.3.5-.5.8l-.9 1.5c-.4.8-.8 1.6-1 2.5-.1.3-.1.6-.2.9.3-.3.7-.6 1-.8s.7-.5 1-.8c1-.8 2.1-1.6 3.2-2.3.7-.5 1.5-.9 2.3-1.3.4-.2.8-.4 1.2-.5.4-.1.7-.3 1.1-.4 1.1-.4 2.3-.6 3.4-.7h1.3c1.1.1 2.2.3 3.3.7-.5.7-1 1.5-1.5 2.3zM92.8 44.8c.9.4 2-.1 2.9-.6 6.3-3.2 14.3-2.7 20 1.4.7.5 1.8 1.1 2.4.4.2-.2.2-.4.3-.7.8-2.8-.5-5.9-2.3-8.2-2.5-3.2-6.2-5.5-10.3-6.3-9.1-1.8-14.6 1.8-14.4 10.9.1 1.2.4 2.6 1.4 3.1zM61.4 44.8c1-.5 1.3-1.8 1.3-3 .1-9.1-5.2-12.8-14.1-10.9-3.9.8-7.6 3.1-10 6.3-1.8 2.3-3 5.3-2.2 8.2.1.2.1.5.3.7.6.6 1.6.1 2.3-.4 5.6-4.1 13.5-4.7 19.6-1.4.9.3 1.9.9 2.8.5zM105.6 63.9c-3.2-1.5-6.5-1.7-8.7-1.4-2.2.3-3.5.8-3.5 1.3s1.3 1 3.4 1.4c2 .4 4.6 1 7.2 2.2 2.6 1.2 4.8 2.8 6.4 4 1.6 1.2 2.6 2.1 3.1 1.8.4-.3.2-1.7-1-3.6-1.3-2-3.7-4.3-6.9-5.7z"/>
                <path class="stHEADSHOT12"
                      d="M120.6 97.9c1.7-.4 2.8-.7 2.9-1.3.1-.5-.9-1.2-2.6-1.5-.9-.2-1.9-.3-3.1-.3.4-1.2.6-2.9.6-5 0-1.2-.2-2.5-.5-3.9 5.3-.5 10.2-4.2 12-9.2-2 2.3-4.6 4.1-7.6 4.9-1.9.5-4 .6-5.9.1l-.3-.6c5.2-1.2 9.6-5.6 10.7-10.9-1.7 2.5-4 4.7-6.8 5.9-2.1.9-4.4 1.2-6.7.8-.8-.9-1.7-1.8-2.7-2.6-2.8-2.2-6-3.5-8.9-4.1-3-.6-5.7-.5-7.9-.1s-3.9 1.1-5 1.8-1.5 1.2-1.4 1.4c.2.5 2-.1 5-.4-1 .9-2 2.1-2.9 3.5-.9 1.5-1.7 3.2-2.3 5.2-.6 1.9-.8 3.9-.8 5.6 0 1.7.2 3.3.6 4.6.7 2.5 1.7 3.9 2.2 3.7.1 0 .2-.1.3-.3.2-.6.2-1.9.3-3.7 0-1.2.1-2.5.3-4 .2-1.3.4-2.7.8-4.1.1-.2.1-.4.2-.6.5-1.6 1.1-3.2 1.7-4.5.7-1.3 1.3-2.5 1.9-3.5.4-.7.8-1.3 1.1-1.9 1.6.1 3.4.3 5.2.8.4.1.8.3 1.2.4-2.5 2.2-4.2 5.7-4.6 9.8v.2c.5-.1 1.1-.2 1.6-.2.7 0 1.4.1 2.1.3.6-4.3 3.4-7.7 6.9-7.7 1.2 0 2.3.4 3.3 1.1 1.1 1.2 2.1 2.5 2.9 3.9.5 1.3.8 2.7.8 4.2 0 5.1-3.1 9.2-7 9.2-2.9 0-5.4-2.3-6.4-5.6-.7.3-1.6.4-2.5.4-.5 0-.9 0-1.3-.1 1 4.8 4 8.6 7.7 9.8h.1c.4-.1.9-.1 1.3-.2-.7.7-.9 1.3-.7 1.7.2.3.7.3 1.3.2 1.6-.2 4.2-1.2 7.4-1.9 2-.7 4-1 5.5-1.3zm-4.4-3.2v.2h-.2c.1 0 .2-.1.2-.2zM46.8 59.9c-.9-.1-2.1-.1-3.4.2-1.3.3-2.6.9-3.8 1.7-2.5 1.7-4 4-4.7 5.7-.7 1.8-.7 3-.2 3.2 1 .5 3.3-3.1 7-5.7 1.9-1.3 3.7-2 5.3-2.4 1.6-.4 2.7-.9 2.7-1.4 0-.5-1-1.1-2.9-1.3z"/>
                <path class="stHEADSHOT12"
                      d="M30.8 85.8c-.1.9-.1 1.8 0 2.6.1 1.7.4 3.1.7 4.1-.8 0-1.4.1-2 .3-1.4.4-2.1 1-2 1.6.1.5.9.9 2.1 1.2 1.2.3 2.7.7 4.3 1.2 1.5.5 2.8 1 3.9 1.4 1.1.4 2 .6 2.5.4.1 0 .2-.1.3-.1.3-.3.2-.9-.2-1.6-.2-.3-.4-.5-.6-.8-.4-.5-1-1-1.7-1.5-.8-.6-1.8-1.1-2.9-1.4-.6-.2-1.3-.3-1.9-.4.1-1 .2-2.4.4-4.1.1-1 .3-2 .6-3.1.2-.9.5-1.8.8-2.8 0-.1.1-.3.2-.4.1-.2.1-.3.2-.5s.1-.4.2-.6c0-.1.1-.3.1-.4.4-.8.8-1.7 1.2-2.5.4-.7.8-1.4 1.3-2 1.4-2.1 3.3-3.5 5.1-4.5.9-.5 1.9-.8 2.8-1 .7-.1 1.3-.2 1.9-.3.1.3.3.7.5 1.1-5.3.2-9.7 5.5-10.3 12.4.5-.1 1.1-.2 1.6-.2.7 0 1.4.1 2.1.3.6-4.3 3.4-7.7 6.9-7.7 1 0 2 .3 2.8.8.5 1.9.9 3.8 1.2 5.8-.7-2-2.3-3.3-4-3.3-2.4 0-4.4 2.6-4.5 5.8.3.4.5.8.5 1.2 0 .3-.1.6-.2.8.6 2.3 2.3 4 4.2 4 2.2 0 4-2 4.4-4.7.1 2 .1 3.9-.1 5.9v.1c.1.2.2.3.3.3.5.1 1.4-1.2 1.9-3.6.6-2.4.8-5.9-.1-9.7-.8-3.7-2.4-6.9-4.1-8.8-.1-.2-.3-.3-.4-.5.8.1 1.4.2 1.9.3 1 .2 1.6.3 1.7.1.1-.2-.2-.8-1.1-1.4-.9-.7-2.3-1.5-4.4-1.8-1-.2-2.1-.2-3.4-.1-1.2.1-2.5.4-3.8 1-2.5 1-5 3-6.8 5.5-.7 1-1.4 2.1-1.9 3.2-1-.6-2-.9-3-1.3-1.5-.6-2.8-1.6-4-2.7-.6-.6-1.2-1.2-1.7-1.9-.4-.4-.7-.9-1-1.4.2.9.5 1.8.8 2.7.4.9.9 1.8 1.5 2.7 1.6 2.1 3.7 3.9 6.2 4.9l-.3 1.2c0 .1-.1.3-.1.4-1.3.1-2.5-.1-3.8-.4-.9-.3-1.8-.6-2.6-1-.6-.3-1.2-.7-1.8-1.1-1.1-.8-2.2-1.7-3.1-2.8.6 1.7 1.6 3.3 2.8 4.7.6.6 1.2 1.1 1.8 1.6 1.8 1.4 3.9 2.3 6.1 2.8z"/>
                <path class="stHEADSHOT13"
                      d="M103.6 85.6c.1-3.2 2-5.8 4.5-5.8s4.5 2.6 4.5 5.9c0 3.3-2 5.9-4.5 5.9-2 0-3.6-1.7-4.2-4-.4.7-1.1 1.3-2.2 1.6 1.1 3.3 3.5 5.6 6.4 5.6 3.9 0 7-4.1 7-9.2 0-1.5-.3-2.9-.8-4.2-.8-1.4-1.8-2.7-2.9-3.9-1-.7-2.1-1.1-3.3-1.1-3.5 0-6.3 3.3-6.9 7.7 1.1.3 1.9.8 2.4 1.5z"/>
                <path class="stHEADSHOT12"
                      d="M108.1 91.6c2.5 0 4.5-2.6 4.5-5.9 0-3.3-2-5.9-4.5-5.9-2.4 0-4.4 2.6-4.5 5.8.3.4.5.8.5 1.2 0 .3-.1.6-.2.8.5 2.3 2.2 4 4.2 4zM42.3 89c-.7.3-1.6.4-2.5.4-.5 0-.9 0-1.3-.1.8 3.8 2.8 7 5.5 8.7 2.2.6 4.4.9 6 .3 2.2-.7 2.9-3.4 3.1-5.7-1.2 1.2-2.7 2-4.3 2-3 0-5.4-2.3-6.5-5.6z"/>
                <path class="stHEADSHOT13"
                      d="M44.3 85.3c.1-3.2 2-5.8 4.5-5.8 1.8 0 3.3 1.4 4 3.3-.3-2-.7-3.9-1.2-5.8-.9-.5-1.8-.8-2.8-.8-3.5 0-6.3 3.3-6.9 7.7 1 .3 1.9.8 2.4 1.4zM53.1 86.6c-.4 2.7-2.2 4.7-4.4 4.7-2 0-3.6-1.7-4.2-4-.4.7-1.1 1.3-2.2 1.6 1.1 3.3 3.5 5.6 6.4 5.6 1.6 0 3.1-.7 4.3-2v-.1c.2-1.9.2-3.8.1-5.8z"/>
                <path class="stHEADSHOT3"
                      d="M149.3 106.1c4.2 13.9 3.2 31.6-6.9 42.1-2.6 2.7-15.3 14.8-15.1 18.6 1.1-1.9 2.9-2.8 4-4.6.4-.3 1-.9 1.7-1.5 3.6-3.3 10.2-9.8 12.7-12.2v-.1h.2c.3-.3.6-.6.9-1 .5-.5.9-1 1.3-1.6l.6-.9c.3-.4.6-.8.8-1.2l.9-1.5.9-1.8c.3-.6.5-1.2.7-1.8.5-1.3.8-2.6 1.1-3.8.1-.7.3-1.4.4-2 .1-1 .2-1.9.3-2.8s.1-1.7.1-2.5V126c0-.5 0-.9-.1-1.3s-.1-.7-.1-1c0-.3-.1-.5-.1-.7 0-.2-.1-.4-.1-.5v-.1l-.3-1.3.2-.2c-.2-1.1-.3-2.4-.6-3.6-.1-.8-.3-1.6-.5-2.3-.2-.7-.3-1.4-.5-2.1-.4-1.3-.7-2.5-1.1-3.5 0-.1 0-.1-.1-.2-.1-.2-.2-.5-.2-.7-.1-.3-.2-.5-.3-.7v-.1c-.2-.5-.3-.9-.3-1.2-.2-.1-.3-.3-.5-.4zM11.8 172.8c-.3.5-.7.9-1 1.3 0 0 0 .1-.1.1-.3.4-.7.8-1 1.3l-.1.1c-.4.4-.7.8-1.1 1.2l-.1.1c-.9 1-1.9 2-2.9 2.9h1.7c1.6-2.2 3.1-4.5 4.5-6.8 0-.1 0-.2.1-.2z"/>
            </g>
        </switch>
    </svg>,
    title: __('Apazed Form', 'apazed'),
    category: 'widgets',
    keywords: [
        __('payments-form — Apazed Form'),
        __('Apazed Embed'),
        __('apazed-embed'),
    ],
    attributes: {
        embedId: {
            'type': 'string',
        },
        dynamicButtonText: {
            'type': 'string',
        },
        cart: {
            'type': 'bool',
        },
        qty: {
            'type': 'bool',
        },
    },
    edit: function (props) {
        return (
            createElement('div', {},
                demoButton(props.attributes.dynamicButtonText),
                inspectorControls(props)
            )
        )
    },
    save: (props) => {
        if (!props.attributes.cart && !props.attributes.qty) {
            return (
                <apazed-embed id={props.attributes.embedId}
                              data-cart="false"
                              data-qty="false"></apazed-embed>
            );
        }
        if (props.attributes.cart && !props.attributes.qty) {
            return (
                <apazed-embed id={props.attributes.embedId}
                              data-qty="false"></apazed-embed>
            );
        }
        if (!props.attributes.cart && props.attributes.qty) {
            return (
                <apazed-embed id={props.attributes.embedId}
                              data-cart="false"></apazed-embed>
            );
        }
        return (
            <apazed-embed id={props.attributes.embedId}></apazed-embed>
        );
    },
});

function demoButton(text) {
    let buttonText = (undefined === text) ? __('Pay', 'apazed') : text;
    return createElement('div', {},
        <div class="apazed-embed-r-1">
            <div class="checkout-button-container">
                <button id="checkout-button-42" role="link" type="button" class="checkout-button"><span
                    id="checkout-button-text-42"
                    class="checkout-button-text leading-none">{buttonText}</span>
                </button>
            </div>
        </div>
    )
}

function inspectorControls(props) {
    return createElement(InspectorControls, {},
        createElement(PanelBody, {title: __('Settings'), initialOpen: true},
            createElement(PanelRow, {},
                createElement(
                    SelectControl,
                    {
                        key: CONF.formSelect.key,
                        label: CONF.formSelect.label,
                        help: (DYNAMICSTORE.forms.length > 1) ? CONF.formSelect.help : CONF.formSelect.noFormsHelp,
                        options: DYNAMICSTORE.forms,
                        value: (props.attributes.embedId) ? props.attributes.embedId : 0,
                        onChange: function (val) {
                            props.setAttributes({embedId: val})
                            props.setAttributes({dynamicButtonText: DYNAMICSTORE.forms.find(x => x.value === val).buttonText})
                        }
                    }
                )
            ),
            createElement(PanelRow, {},
                createElement(
                    CheckboxControl,
                    {
                        label: CONF.cartCb.label,
                        help: CONF.cartCb.help,
                        checked: (props.attributes.cart) ? props.attributes.cart : false,
                        value: true,
                        onChange: function (val) {
                            props.setAttributes({cart: val})
                            let selected = DYNAMICSTORE.forms.find(x => x.value === props.attributes.embedId);
                            let dynButtText = (val) ? selected.cartButtonText : selected.buttonText;
                            props.setAttributes({dynamicButtonText: dynButtText})
                        }
                    }
                )
            ),
            createElement(PanelRow, {},
                createElement(
                    CheckboxControl,
                    {
                        label: CONF.qtyCb.label,
                        help: CONF.qtyCb.help,
                        checked: (props.attributes.qty) ? props.attributes.qty : false,
                        value: true,
                        onChange: function (val) {
                            props.setAttributes({qty: val})
                        }
                    }
                )
            )
        )
    )
}

function form_selectors() {
    form_selector_opts().then(opts => {
        DYNAMICSTORE.forms = opts;
    });
}

function form_selector_opts() {
    return new Promise(
        function (resolve) {
            apiFetch({path: APIROUTES.forms}).then(function (data) {

                if (data.error) {
                    wp.data.dispatch('core/notices').createNotice(
                        'warning',
                        data.error.message,
                        {
                            type: 'snackbar',
                            isDismissible: true,
                            actions: [
                                {
                                    url: data.error.url,
                                    label: data.error.label,
                                },
                            ],
                        }
                    );
                }

                let opts = [{disabled: true, label: 'Select an Embed', value: 0}];
                if (data.forms && data.forms.length) {
                    data.forms.forEach(function (F) {
                        let buttonText = ((F.buttonTexts.checkout) === undefined) ? F.name : F.buttonTexts.checkout;
                        let cartButtonText = ((F.buttonTexts.addToCart) === undefined) ? F.name : F.buttonTexts.addToCart;
                        opts.push({
                            label: F.name,
                            value: F.key,
                            buttonText: buttonText,
                            cartButtonText: cartButtonText
                        });
                    });
                }
                resolve(opts);
            })
        }
    )
}
