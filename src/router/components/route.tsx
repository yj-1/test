import { defineComponent } from "vue";

const CRoute = defineComponent({
  name: "Route",
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  render() {
    return (
      <>
        {this.routes.map((route: any, i) => {
          if(route?.children?.length) {
           return <el-submenu
              index="1"
              v-slots={{
                title: () => (
                  <>
                    <i class="el-icon-location"></i>
                    <span>{route?.meta?.title}</span>
                  </>
                ),
              }}
            >
              <CRoute routes={route.children} />
            </el-submenu>;
          } else {
            return (
              <el-menu-item index={route.path} v-slots={{title: () => route.meta.title}}>
                <i class="el-icon-menu"></i>
              </el-menu-item>
            )
          }
        })}
      </>
    );
  },
});

export default CRoute
