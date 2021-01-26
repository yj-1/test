<template>
  <div class="home">
    首页
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getProfiles } from "@/api/login"
console.log(getProfiles())
export default defineComponent({
  name: "Home",
});
</script>
