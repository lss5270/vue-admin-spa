//权限vuex 2017-6-28
// import permission_default from 'src/global/permission_default'


// 注意：routers和addRouters已从数组改成对象
const permission = {
  state: {
    // routers: constantRouterMap,
    // addRouters: []
    // routers: {},
    routers:null
    
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers;
      //state.addRouters = routers;
      //concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
      //state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      console.log('路由入参：',data)
      return new Promise(resolve => {
        // const { roles } = data
        let accessedRouters
        // if (roles.indexOf('admin') >= 0) {
          //accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        //commit('SET_ROUTERS', accessedRouters);

        commit('SET_ROUTERS', data); //permission_default需要改为入参data

        resolve();
      })
    }
  }
};

export default permission;
