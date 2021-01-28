<template>
  <el-row class="tac" style="height: 100%">
    <el-col style="height: 100%,display: flex; flex-direction: column;">
      <div class="top">
        <h5>自定义颜色</h5>
      </div>
      <el-menu
        :uniqueOpened="true"
        default-active="2"
        class="el-menu-vertical-demo content textLeft"
        style="flex-grow: 1;border-right: 0;"
        :router="true"
        :defaultActive="fullPath"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <Route :routes="routes" />
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import Route from "./route";
export default defineComponent({
  name: "Aside",
  components: {
    Route
  },
  setup() {
    const {
      options: { routes },
    } = useRouter();
    const { fullPath, matched } = useRoute()
    console.log(fullPath, matched)
    interface TsFilter {
      (routes: RouteRecordRaw[], path?:string): RouteRecordRaw[] | undefined;
    }
    const filterRouter: TsFilter = (routes) => {
      const arr: Array<any> = [];
      routes.map((route) => {
        // if (route?.children?.length && route?.meta?.hideMenu) {
        //   const newArr = filterRouter(route.children)
        //   if(Array.isArray(newArr)) {
        //     arr.push(...newArr);
        //   }
        // } else 
        if(route?.children?.length) {
          route.children = filterRouter(route.children)
          console.log(route, "路由")
          arr.push(route);
        } else if (!route?.meta?.hideMenu) {
          arr.push(route);
        }
      });
      if (arr.length) {
        return arr;
      }
    }; // 过滤数组
    console.log(routes)
    return {
      fullPath,
      routes: filterRouter(routes),
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
});
</script>

<style lang="scss" scoped>
.top {
  height: 100rem;
}
.content {
  width: 100%;
  height: calc(100% - 100rem);
}
.textLeft {
  text-align: left;
}
</style>
