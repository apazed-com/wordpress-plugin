<template>
	<div>
		<div class="max-w-lg mx-auto grid gap-8 gap-y-16 lg:grid-cols-3 lg:max-w-none">

			<div v-for="article in splicedArticles" class="flex flex-col rounded-sm shadow-md overflow-hidden">

				<a :href="article.urls.catUrl"
				   class="py-0.5 px-2 text-xs leading-5 font-bold bg-gradient-to-br from-support1-600 to-support2-500 text-neutral-50 dark:text-neutral-200 uppercase">
					{{ article.category }}
				</a>

				<div class="flex-shrink-0">

					<img class="h-48 w-full object-cover"
					     :src="featuredImage(article.featuredImage)"
					     alt="">
				</div>

				<div class="flex-1 bg-white dark:bg-supportDark-lightest p-6 flex flex-col justify-between">
					<div class="flex-1">
						<p class="text-sm font-medium text-neutral-400 dark:text-neutral-600 flex items-center">
                                        <span
	                                        class="block text-xs uppercase text-support3-500 uppercase"
	                                        v-html="article.tags.join(', ')"/>
						</p>
						<a :href="article.urls.url" class="block mt-2">
							<p class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
								{{ article.title }}
							</p>
							<p class="my-3 text-base text-neutral-500 dark:text-neutral-400">
								{{ article.excerpt }}
							</p>
						</a>
					</div>

					<div
						class="mt-3 pt-4 flex items-center border-t border-neutral-100 dark:border-neutral-900">
						<div class="flex-shrink-0">
							<template v-if="article.author === 'Dan Cameron'">
								<img class="h-10 w-10 rounded-full"
								     src="https://en.gravatar.com/userimage/115447/2fea75a883c89996eea8ff118461e5cf.webp?size=128"
								     alt="Dan Cameron">
							</template>
							<template v-else>
								<logo class="w-10 h-10 bg-support1-500 rounded-full"/>
							</template>
						</div>
						<div class="ml-3">
							<p class="text-sm font-semibold text-neutral-900 dark:text-neutral-300">
								<template v-if="article.author === 'Dan Cameron'">
									<a href="https://twitter.com/dancameron"
									   class="hover:underline">{{ article.author }}</a>
								</template>
								<template v-else>
									<a href="https://twitter.com/apazedapp"
									   class="hover:underline">Zelda Joy</a>
								</template>
							</p>
							<div class="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
								<time class="flex items-center">
                                                <span class="w-3 mr-1">
                                                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 512 512"><path
	                                                    d="M452 40h-24V0h-40v40H124V0H84v40H60C26.916 40 0 66.916 0 100v352c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60V100c0-33.084-26.916-60-60-60zm20 412c0 11.028-8.972 20-20 20H60c-11.028 0-20-8.972-20-20V188h432v264zm0-304H40v-48c0-11.028 8.972-20 20-20h24v40h40V80h264v40h40V80h24c11.028 0 20 8.972 20 20v48z"></path><path
	                                                    d="M76 230h40v40H76zM156 230h40v40h-40zM236 230h40v40h-40zM316 230h40v40h-40zM396 230h40v40h-40zM76 310h40v40H76zM156 310h40v40h-40zM236 310h40v40h-40zM316 310h40v40h-40zM76 390h40v40H76zM156 390h40v40h-40zM236 390h40v40h-40zM316 390h40v40h-40zM396 310h40v40h-40z"></path></svg>
                                                </span>
									{{ article.dates.created | udate }}
								</time>
								<time v-if="article.dates.lastUpdated > article.dates.created"
								      class="flex items-center ml-2">
                                                <span class="w-3 mr-1">
                                                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 16 16"><path
	                                                    fill-rule="evenodd"
	                                                    d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"></path></svg>
                                                </span>
									<a :href="article.urls.githubHistory"
									   class="hover:underline">
										{{ article.dates.lastUpdated | urelative }}
									</a>
								</time>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

</template>
<script>
import Logo from "./Logo";

export default {
	name: 'articles-list',
	components: {Logo},
	props: ['articles', 'limit'],
	computed: {
		splicedArticles() {
			return this.limit ? this.articles.slice(0, this.limit) : this.articles
		}
	},
	methods: {
		featuredImage(path) {
			return 'https://apazed.com/' + path;
		}
	}
}
</script>
