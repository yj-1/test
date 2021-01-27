<template>
  <div class="layout wh">
    <header class="top">
      测试
    </header>
    <main class="bottom">
      <aside class="left">
        <AsideLeft/>
      </aside>
      <section class="right">
        <div class="view wh">
          <router-view />
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import AsideLeft from "./Aside.vue"
export default defineComponent({
  name: "Layout",
  components: {
    AsideLeft
  }
})
</script>

<style lang="scss" scoped>
$h: 60rem;
.top {
  height: $h;
}
.bottom {
  height: calc(100% - #{$h});
  @extend .flex;
  .left {
    @include wh(400rem);
    background: rgb(84, 92, 100);
  }
  .right {
    @include wh(calc(100% - 200rem));
  }
}
.view > div {
  @extend .wh;
}
</style>