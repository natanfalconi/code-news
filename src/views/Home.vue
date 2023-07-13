<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useApi from "../services/UseApi";

export default defineComponent({
    setup() {
        const { listJoin } = useApi()
        const router = useRouter()

        const listArticle = ref([])

        const getListArticle = async () => {
            try {
                listArticle.value = await listJoin('posts', 'author');
            } catch (error) {
                console.error(error);
            }
        }

        const handleClick = async (article) => {
            router.push({
                path: `/news/${article.title.replace(/\s+/g, '-').toLowerCase()}`, query: { id: article.id }
            })
        }

        onMounted(() => {
            getListArticle()
            window.scrollTo({ top: 0, behavior: "smooth" });
        })

        return {
            listArticle,
            handleClick
        }
    },

})
</script>

<template>
    <div class="sm:w-4/5 mx-auto flex flex-col-reverse sm:flex-row sm:flex gap-4">
        <div class="sm:w-2/3 w-10/12 mx-auto sm:my-10 min-h-screen">
            <article class="mb-10" v-for="(article, index) in listArticle" :key="index">
                <div
                    class="shadow-sm py-8 px-4 border border-slate-700 hover:bg-slate-700 rounded-md transition duration-150 ease-out hover:ease-in">

                    <h2 class="text-4xl cursor-pointer font-semibold mb-5 font-mono text-indigo-500 hover:text-blue-400 transition duration-150"
                        @click="handleClick(article)">{{ article.title }}</h2>
                    <p class="mb-5 text-gray-100 font-thin" v-html="article.description.substr(0, 200) + ' ...'"></p>

                    <div class="flex sm:justify-end gap-3 mb-4 justify-start">
                        <a href="https://linkedin.com.br/in/natan-falconi"
                            class="transition duration-150 border-b-4 border-transparent hover:border-blue-500"
                            target="_blank">
                            <p class="text-blue-400 font-mono py-2 rounded-md sm:text-md text-sm">{{ article?.author?.name }} | {{ new
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
        </div>

        <div class="sm:w-1/3 w-10/12 sm:my-10 mx-auto my-10">
            <div class="shadow-sm bg-slate-700 rounded-md py-8 px-4">
                <h2 class="text-3xl sm:text-4xl font-semibold mb-5 font-mono text-indigo-500">
                    Ultimos Posts
                </h2>

                <ul v-for="(article, index) in listArticle" :key="index">
                    <li class="cursor-pointer text-lg text-gray-200 "
                        @click="handleClick(article)">
                        <p class="inline-block transition duration-150 border-b-4 border-transparent hover:border-blue-500">{{ index + 1 }} - {{ article.title }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
