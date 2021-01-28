<template>
  <Layout v-if="$store.state.RouterView" key="0" />
  <router-view key="1" v-else />
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