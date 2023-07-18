<script setup>
  const date = new Date().getFullYear()
</script>

<template>
  <footer class="bg-slate-700 text-lg flex justify-center items-center h-20 w-full">
    <p class="text-indigo-500 font-bold font-mono text-center">Todos os direitos reservados &copy; Copyright {{ date }}  </p>
  </footer>
</template>
