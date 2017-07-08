// import { loginByEmail, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

import {global} from 'src/global/global';
import {api} from 'src/global/api';
import store from '../../store';
import { Message } from 'element-ui';

const user = {
  state: {
    uid: Cookies.get('userId'),
    token: Cookies.get('userToken'),
    userInfo:null,

  },

  mutations: {
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },

   
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    // LOGOUT_USER: state => {
    //   state.user = '';
    // }
  },

  actions: {
    // 邮箱登录
    LoginByEmail({ commit }, userInfo) {
      //const email = userInfo.email.trim();


      //
      return new Promise((resolve, reject) => {
        console.log('登录入参：',userInfo)
        global.get( api.login,{params:userInfo}, function(res){
            //登录接口，可只返回token 和 uid 。然后可根据uid 查询用户信息
               console.log('-------获取到登录返回信息：',JSON.stringify(res) )
               if(res.body.resultCode == 0){
                    var res = res.body.data;

                    // 按一天8小时工作制设置过期时间
                      Cookies.set('userToken', res.token,{ expires: 1/3, path: '' }); //设置token
                      Cookies.set('userId', res.uid,{ expires: 1/3, path: '' }); //设置用户id，

                      commit('SET_TOKEN', res.token);
                      //设置userInfo
                      //commit('SET_USERINFO', res); //此处也可省略，放在getUserInfo中统一处理


                      resolve();
               }else{
                    //alert(res.body.resultMsg)
                    Message({
                        showClose: true,
                        message: res.body.resultMsg,
                        type: 'error'
                    });
               }
                
        },function(res){
            reject(res);
        })

        return false;

      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            global.get( api.getUserInfo,{params:{'userId':state.uid}}, function(res){
                  console.log('-------根据id获取用户信息：',JSON.stringify(res) )
                  if(res.body.resultCode == 0){
                       var res = res.body.data;
                             
                             // Cookies.set('userToken', res.token); //Cookies.get('userId')
                             // Cookies.set('userId', res.uid); //Cookies.get('userId')

                             commit('SET_TOKEN', res.token);
                             //设置userInfo
                             commit('SET_USERINFO', res);

                             //获取到信息时同时设置用户菜单权限
                             store.dispatch('GenerateRoutes', res.permissions);

                             resolve();
                  }else{
                        //alert(res.body.resultMsg)
                        Message({
                            showClose: true,
                            message: res.body.resultMsg,
                            type: 'error'
                        });
                  }

                  
            },function(res){
                reject(res);
            })

            
        });
    },

    

    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          Cookies.set('userToken', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 登出 （头部登出）
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        //换成请求登出接口

        // logout(state.token).then(() => {  
          commit('SET_TOKEN', '');
          // commit('SET_ROLES', []);
          Cookies.remove('userToken');
          Cookies.remove('userId');
          resolve();
        // }).catch(error => {
        //   reject(error);
        // });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('userToken');
        Cookies.remove('userId');
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        // commit('SET_ROLES', [role]);
       store.dispatch('GenerateRoutes', res.permissions);
        resolve();
      })
    }
  }
};

export default user;
