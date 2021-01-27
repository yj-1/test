<template>
  <Layout v-if="$store.state.RouterView" />
  <router-view v-else />
</template>

<script>
import { defineComponent } from "vue"
import Layout from "@/router/components/layout"

export default defineComponent({
  name: "App",
  components: {
    Layout
  }
})
</script>

<style>

</style>