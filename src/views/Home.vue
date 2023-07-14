<script>
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useApi from "../services/UseApi";

export default defineComponent({
    setup() {
        const { list, listPagination } = useApi()
        const route = useRoute();
        const router = useRouter()
        const currentPage = ref(Number(route.query.page) || 1);
        const itemsPerPage = 3;
        const listArticle = ref([])

        const getListArticle = async () => {
            try {
                listArticle.value = await listPagination('posts', 'author', currentPage.value, itemsPerPage);
            } catch (error) {
                console.error(error);
            }
        };

        const handlePageChange = (page) => {
            router.push({ query: { ...route.query, page: page.toString() } });
        };

        const handleClick = async (article) => {
            router.push({
                path: `/news/${article.title.replace(/\s+/g, '-').toLowerCase()}`, query: { id: article.id }
            })
        }

        watch(() => route.query.page, () => {
            currentPage.value = Number(route.query.page) || 1;
            getListArticle();
        });

        onMounted(() => {
            getListArticle()
            window.scrollTo({ top: 0, behavior: "smooth" });
        })

        return {
            listArticle,
            handleClick,
            currentPage,
            handlePageChange
        }
    },

})
</script>

<template>
    <div class="sm:w-4/5 mx-auto flex flex-col-reverse sm:flex-row sm:flex gap-4">
        <div class="sm:w-2/3 w-10/12 mx-auto sm:my-10 min-h-screen">
            <article class="mb-10 hover:shadow-lg" v-for="(article, index) in listArticle" :key="index">
                <div
                    class="shadow-sm py-8 px-4 border border-slate-700 hover:bg-slate-700 rounded-md transition duration-150 ease-out hover:ease-in">

                    <h2 class="sm:text-4xl text-3xl cursor-pointer font-semibold mb-5 font-mono text-indigo-500 hover:underline"
                        @click="handleClick(article)">{{ article.title }}</h2>
                    <p class="mb-5 text-gray-100 font-thin" v-html="article.description.substr(0, 210) + ' ...'"></p>

                    <div class="flex sm:justify-end gap-3 mb-4 justify-start">
                        <a :href="article?.author?.social_link"
                            class="transition duration-150 border-b-4 border-transparent hover:border-blue-500"
                            target="_blank">
                            <p class="text-blue-400 font-mono rounded-md sm:text-md text-sm">{{ article?.author?.name }} |
                                {{ new
                                    Date(article?.created_at).toLocaleDateString() }}</p>
                        </a>
                    </div>

                    <button
                        class="block bg-red-600 hover:opacity-90 rounded-full w-32 h-8 text-gray-100 font-mono font-bold uppercase"
                        @click="handleClick(article)">
                        Leia mais >
                    </button>
                </div>
            </article>

            <div class="flex items-center justify-center my-4 text-blue-500">
                <button class=" text-3xl font-bold py-2 px-4 rounded-l" :disabled="currentPage === 1"
                    @click="handlePageChange(currentPage - 1)">
                    &lt
                </button>
                <div class="px-4 py-2 text-xl">
                    Página {{ currentPage }}
                </div>
                <button class=" text-3xl font-bold py-2 px-4 rounded-r"
                    :disabled="currentPage * itemsPerPage >= listArticle.length" @click="handlePageChange(currentPage + 1)">
                    >
                </button>
            </div>
        </div>

        <div class="sm:w-1/3 w-10/12 sm:my-10 mx-auto my-10">
            <div class="shadow-sm bg-slate-700 rounded-md py-8 px-4">
                <h2 class="text-3xl sm:text-4xl font-semibold mb-5 font-mono text-indigo-500">
                    Últimos Posts
                </h2>

                <ul v-for="(article, index) in listArticle" :key="index">
                    <li class="cursor-pointer text-lg text-gray-200 flex gap-1" @click="handleClick(article)">
                        <p>{{ index + 1 }}.</p>
                        <p class="inline-block transition duration-150 hover:underline hover:text-blue-500">{{ article.title
                        }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
