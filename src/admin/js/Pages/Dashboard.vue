<template>
	<div>

		<div class="fe-panel mt-8">
			<account-info :site="site" :connection="connection"/>
		</div>

		<div class="fe-panel">
			<div class="col-start-1 col-span-12">
				<div class="inline-block text-xl font-bold text-support1-500 text-gradient-bg">
					<h3 class="inline">Payments Forms</h3>
				</div>
				<p class="mb-4 pb-4 border-neutral-200 text-sm text-neutral-300">
					In the future we will be adding the feature to create and edit all of your payment forms here, for now you'll be directed to apazed.com.
				</p>
			</div>
			<form-list :site="site" :forms="forms" :latest="true"/>
		</div>

		<div class="fe-panel">
			<div class="col-start-1 col-span-12">
				<div class="inline-block text-xl font-bold text-support1-500 text-gradient-bg">
					<h3 class="inline">Latest Articles</h3>
				</div>
				<p class="mb-4 pb-4 border-neutral-200 text-sm text-neutral-300">
					Here's some of our latest articles. Hope you enjoy reading them, and if not please let us know.
				</p>
			</div>

			<articles-list :articles="articles" :limit="3"/>

			<a
				@click="$emit('changePage', 'articles')"
				class="btn mt-8">
				More
			</a>

		</div>



	</div>
</template>

<script>


import FormList from "../components/FormsList";
import AccountInfo from "../components/AccountInfo";
import ArticlesList from "../components/ArticlesList";

export default {
	name: "dashboard",
	components: {ArticlesList, AccountInfo, FormList},
	props: ['site', 'forms', 'connection', 'articles'],
}
</script>

