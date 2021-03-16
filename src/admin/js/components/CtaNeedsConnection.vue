<template>
	<div>
		<div class="bg-neutral-50 max-w-7xl mx-auto px-12 py-8 mt-8">
			<h2 class="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
				<span class="block text-support4-600">Site Needs a Gateway Connection</span>
				<span class="block">Let's fix and get your site connected to a Stripe account!</span>
			</h2>
			<div class="mt-8 flex">
				<div class="inline-flex rounded-md shadow">
					<a
						:href="site.url+'/connection/setup'"
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-support4-600 hover:bg-support4-700 hover:text-neutral-50">
						Connect
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'cta-needs-connect',
	props: ['site'],
}
</script>