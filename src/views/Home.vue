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
    <div class="sm:w-4/5 mx-auto flex gap-4">
        <div class="sm:w-2/3 w-10/12 my-10 min-h-screen">
            <article class="my-10" v-for="(article, index) in listArticle" :key="index">
                <div
                    class="hover:shadow-sm py-8 px-4 hover:bg-slate-700 rounded-md transition duration-150 ease-out hover:ease-in">

                    <h2 class="text-4xl cursor-pointer font-semibold mb-5 font-mono text-indigo-500 hover:text-blue-400 transition duration-150"
                        @click="handleClick(article)">{{ article.title }}</h2>
                    <p class="mb-5 text-gray-100 font-thin" v-html="article.description.substr(0, 200) + ' ...'"></p>

                    <div class="flex sm:justify-end gap-3 mb-4 justify-start">
                        <a href="https://linkedin.com.br/in/natan-falconi"
                            class="transition duration-150 border-b-4 border-transparent hover:border-blue-500"
                            target="_blank">
                            <p class="text-blue-400 font-mono p-2 rounded-md">{{ article?.author?.name }} | {{ new
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

        <div class="sm:w-1/3 min-h-screen my-10">
            <div class="my-10 shadow-sm bg-slate-700 rounded-md py-8 px-4">
                <h2
                    class="text-4xl font-semibold mb-5 font-mono text-indigo-500 hover:text-blue-400 transition duration-150">
                    Ultimos Posts
                </h2>

                <ul v-for="(article, index) in listArticle" :key="index">
                    <li
                        class="cursor-pointer text-lg text-gray-200 transition duration-150 border-b-4 border-transparent hover:border-blue-500" @click="handleClick(article)">
                        {{ index + 1 }} - {{ article.title }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
