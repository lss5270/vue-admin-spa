// 注意：JavaScript代码是运行在内存中的，代码运行时的所有变量，函数，也都是保存在内存中的。刷新页面，以前申请的内存被释放，重新加载脚本代码，
// 变量重新赋值，所以这些数据要想储存就必须储存在外部，例如：Local Storage, Session Storage, IndexDB等。

// so：vuex中的数据刷新页面后，会全部消失。存vuex时，同时记得存 Session Storage。或者F5时重新获取接口
// lss 2017-6-27


import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';  // ./modules/app.js
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app, 			//app:app,
    user,
    permission
  },
  getters :getters			//getters:getters
});

export default store
