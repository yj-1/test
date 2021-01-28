import { defineComponent } from "vue";

// const Routes = (routes, path="") => {
//   return {
//     render() {
//       return (
//         <>
//           {routes.map((route: any, i) => {
//             if (route?.children?.length) {
//               return (
//                 <el-submenu
//                   index="1"
//                   v-slots={{
//                     title: () => (
//                       <>
//                         <i class="el-icon-location"></i>
//                         <span>{route?.meta?.title}</span>
//                       </>
//                     ),
//                   }}
//                 >
//                   <Routes routes={route.children} path={route.path} />
//                 </el-submenu>
//               );
//             } else {
//               return (
//                 <el-menu-item
//                   index={path + route.path}
//                   v-slots={{ title: () => route.meta.title }}
//                 >
//                   <i class="el-icon-menu"></i>
//                 </el-menu-item>
//               );
//             }
//           })}
//         </>
//       );
//     }
//   }
// }
const CRoute = defineComponent({
  name: "Route",
  props: {
    routes: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      default: ""
    }
  },
  render() {
    return (
      <>
        {this.routes.map((route: any, i) => {
          if(route?.children?.length) {
           return <el-submenu
              index={route.path}
              v-slots={{
                title: () => (
                  <>
                    <i class="el-icon-location"></i>
                    <span>{route?.meta?.title}</span>
                  </>
                ),
              }}
            >
              <CRoute routes={route.children} path={route.path+"/"} />
            </el-submenu>;
          } else {
            return (
              <el-menu-item
                index={this.path + route.path}
                class="flex align-center"
                v-slots={{ title: () => <span>{route.meta.title}</span> }}
              >
                <i class={route?.meta?.icon || "el-icon-menu"}></i>
              </el-menu-item>
            );
          }
        })}
      </>
    );
  },
});

export default CRoute
