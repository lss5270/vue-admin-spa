
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化
import 'styles/index.scss'; // 全局自定义的css样式

import * as filters from './filters'; // 全局vue filter
import Multiselect from 'vue-multiselect';// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css';// 多选框组件css
// import Sticky from 'components/Sticky'; // 粘性header组件
import vueWaves from './directive/waves';// 水波纹指令
import errLog from 'store/errLog';// error log组件

import {global} from 'src/global/global';
import Cookies from 'js-cookie';


// register globally
Vue.component('multiselect', Multiselect);
// Vue.component('Sticky', Sticky);
Vue.use(ElementUI);
Vue.use(vueWaves);

Vue.config.productionTip = false;

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

//加载用户主题
if( Cookies.get('themeValue') ){
    global.changeTheme(Cookies.get('themeValue'));
}

//lss 2017-7-1。遍历vuex的权限列表，假如去到的路径未在true列表中，则直接重定向到401。

// register global progress.
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd','/401','404'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress

    //获取先获取用户信息，从用户信息中拿权限，判断是否手敲
    //console.log(from,'路由---->',to )

    if (store.getters.token) { // 判断是否有token。接口会有延迟
            if (to.path === '/login') {
              next({ path: '/' });
            } else if(to.path == '/401'){
                next(); 
            }
            else if(to.path == '/404'){
                next(); 
            }
            else {
                //避免F5刷新时，vex数据全无，所以需要重新获取一次数据
                if(!store.getters.userInfo ){ //判断是否有用户信息 把token换成userInfo
                    console.log('未获取到用户信息',store.getters.userInfo) 
                    
                       store.dispatch('GetInfo').then(res => { // 拉取user_info
                        // console.log('已获取到用户信息',store.getters.userInfo)          
                           next(); 
                            
                       }).catch(err => {
                           console.log(err);
                       });
                }else{
                    if(store.getters.permission_routers[to.path] == undefined){
                       
                        next({ path: '/404' }); //
                        NProgress.done();
                        
                    }else if(store.getters.permission_routers[to.path] == false){
                       
                        next({ path: '/401' }); //
                        NProgress.done();
                        
                    }

                    else{
                        next();//
                    }
                    //next();//
                
                    
                }
                

              
            }
    } else {  
        
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入

            next()
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
        
    }
    NProgress.done();
    
});


router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

// window.onunhandledrejection = e => {
//     console.log('unhandled', e.reason, e.promise);
//     e.preventDefault()
// };

// 生产环境错误日志
if (process.env === 'production') {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}

// window.onerror = function (msg, url, lineNo, columnNo, error) {
//     console.log('window')
// };
//
// console.error = (function (origin) {
//     return function (errorlog) {
//         // handler();//基于业务的日志记录及数据报错
//         console.log('console'+errorlog)
//         origin.call(console, errorlog);
//     }
// })(console.error);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


