<template>
  <div class="layout wh">
    <header class="top">
      测试
    </header>
    <main class="bottom">
      <aside class="left">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
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

export default defineComponent({
  name: "Layout",
})
</script>

<style lang="scss" scope>
$h: 60rem;
.top {
  height: $h;
}
.bottom {
  height: calc(100% - #{$h});
  @extend .flex;
  .left {
    @include wh(200rem);
    background: #ff00ff;
  }
  .right {
    @include wh(calc(100% - 200rem));
  }
}
.view > div {
  @extend .wh;
}
</style>