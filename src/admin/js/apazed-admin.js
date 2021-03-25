import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

Vue.use(VueAxios, axios)

/**
 * Convert the first character to upper case.
 *
 * Source: https://github.com/vuejs/vue/blob/1.0/src/filters/index.js#L37
 */
Vue.filter('capitalize', value => {
    if (! value && value !== 0) {
        return '';
    }

    return value.toString().charAt(0).toUpperCase()
        + value.slice(1);
});


/**
 * Format the given money value.
 */
Vue.filter('usCurrency', function (value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return formatter.format(value);
});

/**
 * Format json
 */
Vue.filter('pretty', value => {
    return JSON.stringify(JSON.parse(value), null, 2);
});

/**
 * Format the given date into a relative time.
 */
Vue.filter('relative', value => {
    return moment.utc(value).local().locale('en-short').fromNow();
});


/**
 * Format the given date.
 */
Vue.filter('udate', value => {
    return moment.unix(value).local().format('MMMM Do, YYYY')
});

/**
 * Format the given date as a timestamp.
 */
Vue.filter('udatetime', value => {
    return moment.unix(value).local().format('MMMM Do, YYYY h:mm A');
});

/**
 * Format the given date into a relative time.
 */
Vue.filter('urelative', value => {
    return moment.unix(value).local().locale('en-short').fromNow();
});

new Vue({
    el: '#apazedAdmin',
    components: {App},
    props: ['apazed'],
    render: h => h( App, {
        props: {
            apazed: apazedInitData,
            articles: apazedArticles
        }
    })
})
