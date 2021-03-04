<template>
	<div>
		<div class="ring ring-neutral-100 overflow-hidden rounded mb-8">
			<ul class="divide-y divide-neutral-200">
				<li v-for="paymentsForm in splicedForms"
				    :key="paymentsForm.key" class="m-0">
					<a :href="paymentsForm.url" class="block hover:bg-neutral-50" target="_blank">
						<div class="flex items-center px-4 py-4 sm:px-6">
							<div class="min-w-0 flex-1 flex items-center">
								<div class="flex-shrink-0">
									<img
										v-if="paymentsForm.product.image_url"
										class="h-12 w-12 rounded-full border-support1-400"
										:src="paymentsForm.product.image_url"
										:alt="paymentsForm.product.name">
									<svg v-else class="h-12 w-12 rounded-full text-neutral-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									     xmlns="http://www.w3.org/2000/svg">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
								</div>
								<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
									<div>
										<p class="text-lg font-bold text-support1-600 truncate pl-1">{{
												paymentsForm.name
											}}</p>
										<p class="mt-1 flex items-center text-sm text-gray-500">
											<template v-if="paymentsForm.product === null">
												<span
													class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-support4-600 text-white dark:text-neutral-200">
							                        <svg
								                        class="h-4 w-4 mr-1 place-self-center"
								                        fill="currentColor" viewBox="0 0 20 20">
							                            <path fill-rule="evenodd"
							                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							                                  clip-rule="evenodd"/>
							                        </svg>
							                        No Product
							                    </span>
											</template>
											<template v-else>
												<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none"
												     stroke="currentColor" viewBox="0 0 24 24"
												     xmlns="http://www.w3.org/2000/svg">
													<path stroke-linecap="round" stroke-linejoin="round"
													      stroke-width="2"
													      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
												</svg>
												<span class="truncate">{{ paymentsForm.product.name }}</span>
											</template>
										</p>
									</div>
									<div class="hidden md:block">
										<div>
											<p class="text-sm font-light text-gray-700">
												Updated
												<time>{{ paymentsForm.updated_at | relative }}</time>
											</p>
											<p class="mt-2 flex items-center text-sm text-gray-500">
												<template v-if="paymentsForm.assigned_prices.length > 0">
													<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
													     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
													     fill="currentColor" aria-hidden="true">
														<path fill-rule="evenodd"
														      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
														      clip-rule="evenodd"/>
													</svg>
													{{ paymentsForm.assigned_prices.length }} Active Price
													<template
														v-if="paymentsForm.assigned_prices.length > 1">s
													</template>
												</template>
												<template v-else>
													<svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-support4-600"
													     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
													     fill="currentColor" aria-hidden="true">
														<path fill-rule="evenodd"
														      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
														      clip-rule="evenodd"></path>
													</svg>
													No Prices Assigned
												</template>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div>
								<!-- Heroicon name: solid/chevron-right -->
								<svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
								     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd"
									      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									      clip-rule="evenodd"/>
								</svg>
							</div>
						</div>
					</a>
				</li>

			</ul>
		</div>

        <div class="grid gap-4 grid-cols-12 items-center">
            <div class="col-span-6">
                <a
                    class="inline-flex px-2 py-1 btn"
                    :href="site.url+'/forms/create'"
                    target="_blank">
                    Add New
                </a>
            </div>
            <div
	            v-if="!latest"
                class="col-span-6 py-3 text-xs font-medium text-right">
                <span v-if="splicedForms.length === forms.length">Showing <b>All</b> Payment
                    Forms
                </span>
                <span v-else>
                    <span>Showing <b>{{ limit }}</b> of <b>{{ forms.length }}</b> Payment Forms</span>
                    <button
                        class="ml-2 btn-secondary btn-small"
                        @click="limit = null">
                        All
                    </button>
                </span>
            </div>
        </div>
	</div>
</template>

<script>

export default {
	name: 'form-list',
	props: ['site','forms', 'latest'],
	data() {
		return {
			limit: 5
		}
	},
	computed: {
		splicedForms() {
			return this.limit ? this.forms.slice(0, this.limit) : this.forms
		}
	},
}
</script>

<style scoped>

</style>