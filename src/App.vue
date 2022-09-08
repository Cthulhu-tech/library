<template>
  <v-app>
    <v-main>
      <RouterComponent/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import RouterComponent from './components/router/RouterComponent.vue';
export default {
  components: {
    RouterComponent
  }
}
</script>
