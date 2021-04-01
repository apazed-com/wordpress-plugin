<template>
	<div class="fe-panel">
		<div class="bg-neutral-50 max-w-7xl mx-auto px-12 py-8 mt-8">
			<h2 class="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
				<span class="block"><slot name="heading">Ready to dive in?</slot></span>
				<span class="block text-support1-600"><slot
					name="subheading">Connect your site with Apazed in a few seconds.</slot></span>
			</h2>
			<div class="mt-8 flex">
				<div class="inline-flex rounded-md shadow">
					<button
						:disabled="isProcessing"
						@click="getHashKey"
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-support1-600 hover:bg-support1-700 hover:text-neutral-50">
						Get started
						<span v-if="isProcessing" class="animate-spin-slow ml-2">
							<svg
								class="h-5 w-5 place-self-center"
								style="transform: scale(-1,1)"
								fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
							</svg>
						</span>
					</button>
				</div>
				<div v-if="status === ''" class="ml-6 inline-flex">
					<a href="https://apazed.com"
					   target="_blank"
					   class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-support1-700 bg-support1-100 hover:bg-support1-200 hover:text-neutral-50">
						Learn more
					</a>
				</div>
				<div class="ml-3 inline-flex">
					<span
						class="inline-flex items-center justify-center px-5 py-3 text-neutral-500 font-medium animate-pulse">
						{{ status }}
					</span>
				</div>
			</div>
			<div class="mt-6 text-xs text-neutral-400">

				<p>Clicking getting started will start an encrypted session with apazed.com, you'll be signed up
					automatically via this site's information and your user email. If necessary you'll be redirected to
					finish the setup at stripe.com or apazed.com.</p>

				<div class="block my-1">If you'd prefer to signup with a different email, you can
					<form id="connectForm" class="inline" :action="connect.apazedConnect">
						<input type="hidden" name="name" :value="connect.blogName">
						<input type="hidden" name="return_url"
						       :value="connect.returnUrl">
						<button
							type="submit"
							class="underline">
							sign up directly at apazed.com.
						</button>
					</form>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'cta-connect',
	props: ['connect'],
	data() {
		return {
			privateKey: '',
			status: '',
			isProcessing: false,
			isDev: true
		}
	},
	methods: {
		changePage(page) {
			this.currentPage = page
		},
		getHashKey: function () {
			let signupForm = document.getElementById('connectForm');

			console.log(this.connect.wpApiUrl)
			this.isProcessing = true;
			this.status = 'Creating secure connection with apazed.com'
			let apiUrl = (this.isDev) ? 'http://apazed.test/api/app/signup' : 'https://apazed.com/api/app/signup';

			// get from apazed.com
			this.axios.get(apiUrl)
				.then((response) => {
					this.status = 'Authenticating connection'
					console.log(response.data)
					// get encrypted signup info
					this.axios.get(this.connect.wpApiUrl, {
						headers: {'X-WP-Nonce': this.connect.nonce, 'X-A-UID': response.data}
					})
						.then((response) => {
							this.status = 'Sending signup info securely to apazed.com'
							// send encrypted signup info to apazed for signup
							this.axios.post(apiUrl, {
								signup: response.data
							})
								.then((response) => {
									if (response.data.error) {
										this.status = response.data.error
										setTimeout(() => {
											signupForm.submit();
										}, 2000)
										return;
									}
									this.status = 'Signup complete, and verification email sent. Saving API Connection.'
									this.axios.post(this.connect.wpApiUrl, response.data, {
											headers: {'X-WP-Nonce': this.connect.nonce}
										})
										.then(() => {
											this.status = 'Now redirecting you to Stripe.com.'
											setTimeout(() => {
												location.href = response.data.redirect
											}, 2000)
										})
										.catch(function (error) {
											console.log(error)
											signupForm.submit();
										})
								})
								.catch(function (error) {
									console.log(error)
									signupForm.submit();
								})
						})
						.catch(function (error) {
							console.log(error)
							signupForm.submit();
						})
				})
				.catch(function (error) {
					console.log(error)
					signupForm.submit();
				})
		},
	},
}
</script>