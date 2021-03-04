<template>
	<div>
		<div class="col-start-1 col-span-12">
			<div class="inline-block text-xl font-bold text-support1-500 text-gradient-bg">
				<h3 class="inline">Stripe Account</h3>
			</div>
			<p class="mb-4 pb-4 border-neutral-200 text-sm text-neutral-300">Account id <b>{{
					connection.account.id
				}}</b>.</p>
		</div>

		<div class="inline-flex space-x-4">
			<div class="flex-1 pr-8 mr-8 border-r-2 border-neutral-100 dark:border-supportDark-darker">
				<div class="text-neutral-600 dark:text-neutral-400 font-bold block mb-1">Payments</div>
				<div
					v-if="connection.account.charges_enabled"
					class="px-2 inline-flex text-xs leading-5 rounded-sm bg-green-50 text-green-600">
					<svg
						class="mr-2 h-4 w-4 place-self-center"
						xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
					</svg>
					Enabled
				</div>
				<div
					v-else
					class="px-2 inline-flex text-xs leading-5 rounded-sm bg-support3-50 text-support3-600">
					<svg
						class="mr-2 h-4 w-4 place-self-center"
						xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						      d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"/>
					</svg>
					Disabled
				</div>
			</div>

			<div class="flex-1 pr-8 mr-8 border-r-2 border-neutral-100 dark:border-supportDark-darker">
				<div class="text-neutral-600 dark:text-neutral-400 font-bold block mb-1">Payouts</div>
				<div
					v-if="connection.account.payouts_enabled"
					class="px-2 inline-flex text-xs leading-5 rounded-sm bg-green-50 text-green-600">
					<svg
						class="mr-2 h-4 w-4 place-self-center"
						xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
					</svg>
					Enabled
				</div>
				<div
					v-else
					class="px-2 inline-flex text-xs leading-5 rounded-sm bg-support3-50 text-support3-600">
					<svg
						class="mr-2 h-4 w-4 place-self-center"
						xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						      d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"/>
					</svg>
					Disabled
				</div>
			</div>

			<div class="flex-1 pr-8 mr-8 border-r-2 border-neutral-100 dark:border-supportDark-darker">
				<div class="text-neutral-600 dark:text-neutral-400 font-bold block mb-1">Balance</div>
				<span v-if="connection.balance.pending[0].currency == 'usd'">{{
						connection.balance.available[0].amount | usCurrency
					}}<span
						class="ml-1 uppercase text-xs font-weight-light text-neutral-400 dark:text-neutral-600">{{
							connection.balance.available[0].currency
						}}</span></span>
				<span v-else>{{ connection.balance.available[0].amount }}{{
						connection.balance.available[0].currency
					}}<span
						class="ml-1 uppercase font-weight-light text-neutral-400 dark:text-neutral-600">{{
							connection.balance.available[0].currency
						}}</span></span>
			</div>

			<div class="flex-1">
				<div class="text-neutral-600 dark:text-neutral-400 font-bold block mb-1">Pending</div>
				<span v-if="connection.balance.pending[0].currency == 'usd'">{{
						connection.balance.pending[0].amount | usCurrency
					}}<span
						class="ml-1 uppercase text-xs font-weight-light text-neutral-400 dark:text-neutral-600">{{
							connection.balance.pending[0].currency
						}}</span></span>
				<span v-else>{{ connection.balance.pending[0].amount }}{{ connection.balance.pending[0].currency }}<span
					class="ml-1 uppercase font-weight-light text-neutral-400 dark:text-neutral-600">{{
						connection.balance.pending[0].currency
					}}</span></span>
			</div>

		</div>
	</div>
</template>
<script>
export default {
	name: 'account-info',
	props: ['site', 'connection'],
}
</script>