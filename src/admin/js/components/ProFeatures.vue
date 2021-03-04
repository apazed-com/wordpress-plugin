<template>
    <div class="relative">
        <div class="fe-panel overflow-hidden">
            <div class="mx-auto max-w-7xl">
                <div class="flex flex-col items-center md:items-stretch md:justify-center">

                    <div class="relative pb-10">
                        <h5 class="flex items-start justify-start w-full text-lg font-bold tracking-wider text-support1-500 uppercase lg:justify-center lg:items-center">
                            Pro Features
                        </h5>
                        <h2 class="relative flex items-start justify-start w-full text-supportDark dark:text-neutral-200 text-5xl font-bold lg:justify-center">
                            Features Worth Getting
                        </h2>
                        <p class="w-full max-w-xl mx-0 mx-auto mt-4 mb-0 font-sans text-sm font-medium leading-relaxed lg:text-center text-neutral-400 dark:text-neutral-600 border-0 border-gray-200 lg:text-lg md:text-base">
                            Our Standard plan is free forever, but we think these Pro features are simply awesome. See our <a href="https://apazed.com/pricing">Pricing</a> for more info.
                        </p>
                    </div>
                </div>

                <div class="flex flex-col max-w-6xl px-3 mx-auto mt-12 md:px-0 lg:px-8 xl:px-0 md:flex-row">
                    <div class="hidden md:block w-full pr-5 mb-6 space-y-1 md:mb-0 md:space-y-4 md:w-4/12 xl:pr-12">
                        <h2 @click="slide('cart')"
                            class="pb-2 text-5xl font-extrabold cursor-pointer lg:text-6xl"
                            :class="{ 'text-supportDark dark:text-neutral-200' : content == 'cart', 'text-neutral-400 dark:text-neutral-600' : content != 'cart' }">
                            Carts</h2>
                        <h2 @click="slide('recurring')"
                            class="pb-2 text-5xl font-extrabold cursor-pointer lg:text-6xl"
                            :class="{ 'text-supportDark dark:text-neutral-200' : content == 'recurring', 'text-neutral-400 dark:text-neutral-600' : content != 'recurring' }"
                        >Recurring</h2>
                        <h2 @click="slide('teams')"
                            class="pb-2 text-5xl font-extrabold cursor-pointer lg:text-6xl"
                            :class="{ 'text-supportDark dark:text-neutral-200' : content == 'teams', 'text-neutral-400 dark:text-neutral-600' : content != 'teams' }"
                        >Teams</h2>
                    </div>

                    <div class="relative w-full mt-6 overflow-hidden md:mt-1 md:w-9/12">
                        <div id="slide-cart"
                             class="w-full md:bg-white dark:bg-supportDark mb-16 md:mb-0 space-y-6 top-0 left-0 w-full h-full md:absolute transition-all ease-in-out duration-1000 transform md:translate-y-0 slide">
                            <div class="flex items-center">
                                <svg class="w-12 h-12 text-support1-400 mr-3" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <h3 class="text-2xl font-bold leading-7 text-supportDark dark:text-neutral-200">Shopping Carts</h3>
                            </div>
                            <p class="text-base font-normal leading-none text-neutral-700 dark:text-neutral-300 md:text-lg">Carts enable your
                                customers
                                to purchase more of your products in a single purchase. We are really excited for the
                                future of Carts. If you promise not to tell anyone, our plans involve building an experience that will
                                take you to the moon.</p>
                            <a href="https://apazed.com/features"
                               class="flex items-center justify-start mt-8 text-lg font-medium tracking-wide text-supportDark dark:text-neutral-200 underline uppercase">Learn
                                More
                                <svg class="w-5 h-5 ml-1 transform -rotate-45" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>

                        <div id="slide-recurring"
                             class="w-full md:bg-white dark:bg-supportDark mb-16 md:mb-0 space-y-6 top-0 left-0 w-full h-full md:absolute transition-all ease-in-out duration-1000 transform md:translate-y-full slide">
                            <div class="flex items-center">
                                <svg class="w-12 h-12 text-support1-400 mr-3" viewBox="0 0 24 24" stroke-width="2"
                                     stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" stroke="none"></path>
                                    <path
                                        d="M9 4.55a8 8 0 016 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"></path>
                                </svg>
                                <h3 class="text-2xl font-bold leading-7 text-supportDark dark:text-neutral-200">Recurring Billing</h3>
                            </div>

                            <p class="text-base font-normal leading-none text-neutral-700 dark:text-neutral-300 md:text-lg">
                                Setting up recurring payments for your online course, non-profit, or goods and services is easy with Apazed.
                            </p>
                            <a href="https://apazed.com/features"
                               class="flex items-center justify-start mt-8 text-lg font-medium tracking-wide text-supportDark dark:text-neutral-200 underline uppercase">Learn
                                More
                                <svg class="w-5 h-5 ml-1 transform -rotate-45" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>

                        <div id="slide-teams"
                             class="w-full md:bg-white dark:bg-supportDark mb-16 md:mb-0 space-y-6 top-0 left-0 w-full h-full md:absolute transition-all ease-in-out duration-1000 transform md:translate-y-full slide">
                            <div class="flex items-center">
                                <svg class="w-12 h-12 text-support1-400 mr-3" viewBox="0 0 24 24"
                                     stroke="currentColor" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                                <h3 class="text-2xl font-bold leading-7 text-supportDark dark:text-neutral-200">Teams</h3>
                            </div>
                            <p class="text-base font-normal leading-none text-neutral-700 dark:text-neutral-300 md:text-lg">
                                Invite your colleagues to collaborate on your payments forms, buttons, and links. Not sure about Ted? Set him up with the "author" role and let him prove himself before making him an editor.
                            </p>
                            <a href="https://apazed.com/features/futures"
                               class="flex items-center justify-start mt-8 text-lg font-medium tracking-wide text-supportDark dark:text-neutral-200 underline uppercase">
                                Learn More
                                <svg class="w-5 h-5 ml-1 transform -rotate-45" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'pro-features',
    data() {
        return {
            content: 'cart'
        }
    },
    methods: {
        slide(content) {

            let activeSlide = document.getElementById('slide-' + this.content);
            this.content = content

            activeSlide.classList.remove('md:translate-y-0', 'z-10');
            activeSlide.classList.add('md:-translate-y-full', 'z-0');

            let nextSlide = document.getElementById('slide-' + content);
            nextSlide.classList.remove('md:translate-y-full');
            nextSlide.classList.add('md:translate-y-0', 'z-10');

            setTimeout(() => {
                activeSlide.classList.add('md:translate-y-full');
                activeSlide.classList.remove('md:-translate-y-full');
            }, 1000)
        }
    }
}
</script>
