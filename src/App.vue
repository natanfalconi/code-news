<template>
  <div>
    <router-view />
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer
  }
}
</script>