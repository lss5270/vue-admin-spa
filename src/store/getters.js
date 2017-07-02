// import permission_default from 'src/global/permission_default'

const getters = {
  uid: state => state.user.uid,     //用户id
  token: state => state.user.token, //用户令牌
  userInfo: state => state.user.userInfo, //用户所有信息

  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews, //快速导航tab
  
  // avatar: state => state.user.avatar,

  // name: state => state.user.name,
  // email: state => state.user.email,
  // introduction: state => state.user.introduction,
  // auth_type: state => state.user.auth_type,
  // status: state => state.user.status,
  // roles: state => state.user.roles,
  // setting: state => state.user.setting,

  permission_routers: state => {
    // 对应permission.js中的state
        // let data = permission_default;

        // return data; //测试数据 2017-6-27
        //目前只根据permission控制菜单显示隐藏，未完成手敲路由的重定向任务，后期有空再补上。2017-6-27
        //return state.permission.routers;
        // console.log(state.permission.routers)

        //if(state.permission.routers && state.permission.routers !== null ){
            // console.log('vuex中有权限数据：',state.permission.routers  )
            return  state.permission.routers;
        //}
        // else{
        //     var str = localStorage.getItem('user_permission');
        //     console.log('vuex中无权限数据,本地数据:', str  )
            //console.log(typeof( JSON.parse(localStorage.getItem('user_permission'))  ))
            //localStorage.setItem( key, value);写入

        //     return  JSON.parse(str);
        // }
   }, 
  addRouters: state => state.permission.addRouters
};
export default getters
