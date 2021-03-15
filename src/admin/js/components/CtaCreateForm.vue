<template>
	<div class="fe-panel">
		<div class="bg-neutral-50 max-w-7xl mx-auto px-12 py-8 mt-8">
			<h2 class="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
				<span class="block">Ready to Get Paid?</span>
				<span class="block text-support1-600">Of course you are, create your first form at apazed.com.</span>
			</h2>
			<div class="mt-8 flex">
				<div class="inline-flex rounded-md shadow">
					<a
						:href="site.url+'/forms/create'"
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-support1-600 hover:bg-support1-700">
						Create
					</a>
				</div>
				<div class="ml-3 inline-flex">
					<a href="https://apazed.com"
					   target="_blank"
					   class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-support1-700 bg-support1-100 hover:bg-support1-200">
						Learn more
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'cta-create-form',
	props: ['site'],
}
</script>