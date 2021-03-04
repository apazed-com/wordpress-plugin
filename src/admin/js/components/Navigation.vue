<template>

		<div class="px-2 flex items-center lg:px-0">
			<div class="flex-shrink-0">
				<a href="http://apazed.test/" class="flex items-center w-auto select-none overflow-hidden">
					<span class="h-16 w-16 mr-4">
						<logo class="absolute bottom-0 left-0 h-16 w-16" />
					</span>
					<span
						class="text-2xl font-bold leading-none text-white dark:text-neutral-200 logo nav-hover transition duration-150 ease text-white dark:text-neutral-200 hover:text-white active">Apazed</span>
				</a>
			</div>
			<div class="ml-10">
				<div class="flex space-x-4">
					<a
						@click="$emit('changePage', 'start')"
						class="text-white hover:text-white cursor-pointer  hover:bg-support1-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
						:class="{'bg-support1-700': 'start' == currentPage}">
						Getting Started
					</a>

					<a
						@click="$emit('changePage','dashboard')"
						class="text-white hover:text-white cursor-pointer  hover:bg-support1-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
						:class="{'bg-support1-700': 'dashboard' == currentPage}">
						Dashboard
					</a>

					<a
						@click="$emit('changePage', 'forms')"
						class="text-white hover:text-white cursor-pointer  hover:bg-support1-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
						:class="{'bg-support1-700': 'forms' == currentPage}">
						Payments Forms
					</a>

					<a
						@click="$emit('changePage', 'site')"
						class="text-white hover:text-white cursor-pointer  hover:bg-support1-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
						:class="{'bg-support1-700': 'site' == currentPage}">
						Site Settings
					</a>

					<a
						@click="$emit('changePage', 'articles')"
						class="text-white hover:text-white cursor-pointer  hover:bg-support1-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
						:class="{'bg-support1-700': 'articles' == currentPage}">
						Articles
					</a>
				</div>
			</div>
		</div>
</template>
<script>
import Logo from "./Logo";

export default {
	name: 'navigation',
	components: {Logo},
	props: ['currentPage'],
}
</script>