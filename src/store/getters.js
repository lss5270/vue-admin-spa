// import permission_default from 'src/global/permission_default'

const getters = {
  uid: state => state.user.uid,     //用户id
  token: state => state.user.token, //用户令牌
  userInfo: state => state.user.userInfo, //用户所有信息

  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews, //快速导航tab
  
  permission_routers: state => {
    // 对应permission.js中的state
        
            return  state.permission.routers;
       
   }, 
  addRouters: state => state.permission.addRouters
};
export default getters
