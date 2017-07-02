//权限vuex 2017-6-28

// 注意：routers和addRouters已从数组改成对象
const permission = {
  state: {
    
    routers:null
    
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers;
      
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      console.log('路由入参：',data)
      return new Promise(resolve => {
        
        commit('SET_ROUTERS', data); 

        resolve();
      })
    }
  }
};

export default permission;
