<template>
  <div class="layout wh">
    <header class="top between">
      <div>
        后台管理系统
      </div>
      <div class="user flex align-center">
        <img
          class="user-img"
          src="http://img-u-2.51miz.com/Element/00/88/59/85/54826b42_E885985_92df0d4d.png!/quality/90/unsharp/true/compress/true/format/png/fh/180"
          alt="头像"
        />
        <div class="column user-text">
          <span>欢迎</span>
          <span>{{$store.state.user.name}}</span>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right pointer"></i>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <main class="bottom">
      <aside class="left">
        <AsideLeft />
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
import { defineComponent } from "vue";
import AsideLeft from "./Aside.vue";
export default defineComponent({
  name: "Layout",
  components: {
    AsideLeft,
  },
  setup(){
    const handles = {
      info() {
        console.log("个人信息")
      },
      exit() {
        console.log("退出")
      }
    }
    const handleCommand = (key) => {
      if(key&&handles[key]) {
        handles[key]()
      }
    }
    return { 
      handleCommand
     }
  }
});
</script>

<style lang="scss" scoped>
$h: 60rem;
$n-h: 60px;
.top {
  height: 60rem;
  min-height: $n-h;
  padding: 0 40px;
  color: #ffffff;
  background: $header-bg;
}
.bottom {
  // @include max-h(calc(100% - $h), calc(100% - 60px));
  // width: 200px;
  // height: calc(100% - #{$h});
  min-height: calc(100% - #{$n-h});
  @extend .flex;
  .left {
    // width: 200px;
    // @include wh(400rem);
    // @include max-w(200px);
    width: 200px;
    // overflow: hidden;
    background: rgb(84, 92, 100);
  }
  .right {
    // flex-grow: 1;
    width: calc(100% - 200px);
    // @include wh(calc(100% - 200rem));
  }
}
.view > div {
  @extend .wh;
}
.user {
  .user-img {
    $wh: 40px;
    @include wh($wh, $wh);
    border-radius: 50%;
  }
  .user-text {
    padding-left: 6px;
    font-size: 14px;
    text-align: left;
  }
}
.pointer {
  cursor: pointer;
}
</style>
