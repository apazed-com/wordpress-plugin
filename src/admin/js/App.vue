<template>
	<div>
		<app-layout :currentPage="currentPage">

			<template #navigation>
				<navigation :currentPage="currentPage" v-on:changePage="changePage"/>
			</template>

			<template #header>
				<div class="flex items-baseline space-x-4 flex-nowrap text-white">
					<h1 class="text-3xl font-bold text-white">{{ currentPageName }}</h1>
					<span v-if="connect.token" class="flex opacity-75 hover:opacity-100">
						<svg
							class="h-4 w-4 place-self-center"
							style="transform: scale(-1,1)"
							fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
						</svg>
						<span class="ml-2">Updated {{ apazed.last_updated | relative }}</span>
					</span>
				</div>
			</template>

			<template #messages>
				<messages :messages="messages"/>
			</template>

			<template #main>
				<!-- Start Page -->
				<start v-if="'start' === currentPage" :connect="connect"/>

				<!-- All Other Pages but check for a connection first. -->
				<template v-if="!connect.token">
					<cta-connect :connect="connect">
						<template #heading>Not so Fast!</template>
						<template #subheading>You'll need to connect to Apazed first.</template>
					</cta-connect>
				</template>
				<template v-else>

					<!-- Dashboard -->
					<dashboard v-if="'dashboard' === currentPage" :site="site" :forms="forms" :connection="connection" :articles="articles"  v-on:changePage="changePage"/>

					<!-- Payments Forms -->
					<forms v-if="'forms' === currentPage" :site="site" :forms="forms"/>

					<!-- Site Settings -->
					<not-ready v-if="'site' === currentPage && connection" :urlPrimary="site.url">
						<template #details>That doesn't mean you can't manage your site. You can head over to apazed.com
							and view and edit all of your site settings.
						</template>
					</not-ready>
					<cta-needs-connection v-else-if="'site' === currentPage" :site="site" class="fe-panel"/>

					<!-- Profile -->
					<not-ready v-if="'profile' === currentPage" :urlPrimary="'https://apazed.com/user/profile'">
						<template #details></template>
					</not-ready>

					<!-- Articles -->
					<articles v-if="'articles' === currentPage" :articles="articles"/>


				</template>
			</template>

		</app-layout>
	</div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import Navigation from "./components/Navigation";
import Messages from "./components/Messages";
import Dashboard from "./Pages/Dashboard";
import Forms from "./Pages/Forms";
import Start from "./Pages/Start";
import CtaConnect from "./components/CtaConnect";
import NotReady from "./Pages/NotReady";
import Articles from "./Pages/Articles";
import CtaNeedsConnection from "./components/CtaNeedsConnection";

export default {
	components: {Articles, NotReady, CtaConnect, Start, Dashboard, Messages, Navigation, AppLayout, Forms, CtaNeedsConnection},
	props: ['apazed','articles'],
	data() {
		return {
			currentPage: (this.apazed.connect.token) ? 'dashboard' : 'start'
		}
	},
	methods: {
		changePage(page) {
			this.currentPage = page
		}
	},
	computed: {
		messages() {
			return (this.apazed.messages) ? this.apazed.messages : null
		},
		site() {
			return (this.apazed.site) ? this.apazed.site : null
		},
		connect() {
			return (this.apazed.connect) ? this.apazed.connect : null
		},
		connection() {
			return (this.apazed.connection.length) ? this.apazed.connection[0].account : null
		},
		forms() {
			return (this.apazed.forms) ? this.apazed.forms : null
		},
		currentPageName() {
			if ('start' === this.currentPage) return 'Getting Started';
			if ('dashboard' === this.currentPage) return 'Dashboard';
			if ('site' === this.currentPage) return 'Site';
			if ('forms' === this.currentPage) return 'Payments Forms';
			if ('profile' === this.currentPage) return 'Apazed Profile';
			if ('articles' === this.currentPage) return 'Lastest Articles';
			return 'TODO'
		}
	}

}
</script>
