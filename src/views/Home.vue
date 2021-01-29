<template>
  <div class="home">
    首页
    <div v-custom="$store.state.user.identity"> 权限{{a}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getProfiles } from "@/api/login"
import { permission } from "@/utils/directives/index"
import fn from "@/utils/directives/rule"
console.log(getProfiles())
export default defineComponent({
  name: "Home",
  setup() {
    const a = ref(0)
    setTimeout(() => console.log("执行了"),a.value++, 1000)
    return {
      a
    }
  },
  directives: {
    permission: {
      mounted(dom, dir, VNode, d) {
        console.log("%O", dom);
        dom.parentNode.removeChild(dom);
        console.log(dir);
        console.log(VNode);
        console.log(d);
      },
    },
    custom: permission(fn)
  },
});
</script>
