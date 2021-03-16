<template>
	<div class="fe-panel">

		<div class="bg-neutral-50 max-w-7xl mx-auto px-12 py-8 mt-8">
			<h2 class="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
				<span class="block">Sorry.</span>
				<span class="block text-support1-600">We're actively developing this for a future release.</span>
			</h2>
			<p class="block mt-1">
				<slot name="details"></slot>
			</p>
			<div class="flex mt-8">
				<div class="inline-flex rounded-md shadow">
					<a
						:href="urlPrimary"
						type="submit"
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-support1-600 hover:bg-support1-700">
						Manage at Apazed
					</a>
				</div>
				<div class="ml-3 inline-flex">
					<a
						href="https://docs.apazed.com"
						target="_blank"
						class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-support1-700 bg-support1-100 hover:bg-support1-200">
						Documentation
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "not-ready",
	props: ['urlPrimary']
}
</script>

<style scoped>

</style>