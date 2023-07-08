<template>
    <div class="sm:w-1/2 w-9/12 mx-auto my-20 min-h-screen">
        <div class="mt-20 mb-10">
            <h2 class="sm:text-5xl text-4xl mb-8 text-indigo-500 font-mono font-bold">
                {{ article?.title }}
            </h2>
            <div>
                <img :src="article?.imagem_url" alt="imagem do artigo">
            </div>
            <div class="mt-5 mb-7 text-gray-200 font-thin" v-html="article?.description"></div>

            <div class="flex sm:items-end flex-col gap-1 font-mono">
                <p class="text-blue-400">{{ article?.author?.name }}</p>
                <span class="text-gray-200 text-sm"> {{ article?.author?.schooling }}</span>
                <span class="text-gray-200 text-sm">
                    {{ article?.author?.description }}</span>
            </div>
        </div>

        <RouterLink to="/">
            <button class="bg-red-600 rounded-full w-32 h-8 text-gray-200 font-mono font-bold uppercase">
                &lt Voltar
            </button>
        </RouterLink>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useApi from "../../services/UseApi";

const article = ref({});
const route = useRoute();

const { getByIdJoin } = useApi()

async function getArticle() {
    try {
        article.value = await getByIdJoin('posts', route.params.id, 'author');
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    getArticle();
});
</script>
  