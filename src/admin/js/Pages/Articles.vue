<template>
	<div>

		<div class="flex flex-col items-center md:items-stretch md:justify-center">

			<div class="relative pb-10">
				<h5 class="flex items-start justify-start w-full text-lg font-bold tracking-wider text-support1-500 uppercase lg:justify-center lg:items-center">
					Happy Reading
				</h5>
				<h2 class="relative flex items-start justify-start w-full text-supportDark dark:text-neutral-200 text-5xl font-bold lg:justify-center">
					Latest Articles
				</h2>
				<p class="w-full max-w-xl mx-0 mx-auto mt-4 mb-0 font-sans text-sm font-medium leading-relaxed lg:text-center text-neutral-400 dark:text-neutral-600 border-0 border-gray-200 lg:text-lg md:text-base">
					Here's some of our latest articles, we hope you enjoy reading them.
				</p>
			</div>
		</div>

		<div class="fe-panel">
			<articles-list :articles="articles"/>
		</div>

	</div>

</template>
<script>
import ArticlesList from "../components/ArticlesList";

export default {
	name: 'articles',
	components: {ArticlesList},
	props: ['articles']
}
</script>
