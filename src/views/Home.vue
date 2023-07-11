<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useApi from "../services/UseApi";

export default defineComponent({
    setup() {
        const { listJoin } = useApi()
        const router = useRouter()

        const listArticle = ref([])
        const titleBlog = "<code/News >"

        const getListArticle = async () => {
            try {
                listArticle.value = await listJoin('posts', 'author');
            } catch (error) {
                console.error(error);
            }
        }

        const handleClick = async (id) => {
            router.push({
                path: `/news/${id}`
            })
        }

        onMounted(() => {
            getListArticle()
            window.scrollTo({ top: 0, behavior: "smooth" });
        })

        return {
            listArticle,
            titleBlog,
            handleClick
        }
    }

}) 
</script>

<template>
    <div class="sm:w-1/2 w-10/12 mx-auto my-20 min-h-screen">
        <h1 class="sm:text-5xl text-4xl font-semibold text-indigo-400 font-mono">{{ titleBlog }}</h1>

        <article class="my-20" v-for="(article, index) in listArticle" :key="index">
            <h2 class="text-4xl font-semibold mb-5 font-mono text-indigo-500 ">{{ article.title }}</h2>
            <p class="mb-5 text-gray-100 font-thin" v-html="article.description.substr(0, 300) + ' ...'"></p>

            <div class="flex sm:justify-end gap-3 mb-4 justify-start">
                <a href="https://linkedin.com.br/in/natan-falconi"
                    class="transition duration-150 border-b-4 border-transparent hover:border-blue-500" target="_blank">
                    <p class="text-blue-400 font-mono p-2 rounded-md">{{ article?.author?.name }} | {{ new
                        Date(article?.created_at).toLocaleDateString() }}</p>
                </a>
            </div>

            <button
                class="block bg-red-600 hover:opacity-90 rounded-full w-32 h-8 text-gray-100 font-mono font-bold uppercase"
                @click="handleClick(article.id)">
                Veja mais >
            </button>

        </article>
    </div>
</template>
