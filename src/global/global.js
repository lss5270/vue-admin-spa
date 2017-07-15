import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

import { Loading } from 'element-ui';

import Cookies from 'js-cookie';
const config = require('../../config');
const {themeArray} = require('./themeArray');

//封装一些全局元素。如全站通用功能函数和http请求等

export  const global = {
        // 测试环境
        // baseUrl:"http://120.76.119.16:8888/jojosns/",
        // baseImgUrl:"http://120.76.119.16:8888/jojosns/",
        // 开发环境
        baseUrl: "http://27.61.80.50:8080/jojosns/",
        baseImgUrl: "http://27.61.80.50:8080/jojosns/", //图片服务器，若没有单独服务，可忽略此项

        staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath,//静态资源路径
        /**
         * 切换主题函数
         */
        changeTheme:function(themeValue){
            var that = this;
            // console.log('切换主题颜色值：',themeValue,that.staticPath,JSON.stringify(themeArray) );
            //需要移到单独的文件存放
            var cssArray = themeArray;

            for (let i = 0 ,len = cssArray.length; i < len; i++) {
                var itemPath = that.staticPath+'/theme/'+themeValue+'/'+cssArray[i].toLowerCase()+'.css';
                
                loadCss(itemPath)
            };
            
            localStorage.setItem("themeValue",themeValue)

            function loadCss(path){
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                    link.href = path;
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    head.appendChild(link);
              
            }
        },
        /**
         * 全局ID计数器，保证返回的是一个全局的id标识（数字）
         */
        globalId: function () {
            return window._idCounter_ ? window._idCounter_ += 1 : window._idCounter_ = 1;
        },
        
        /**
         * 统一接口处理：get请求方法封装。this.$http.get(url, [options])
         * @param url { String } -必选 接口url
         * @param options { Object } -必选 含官方的所有options对象。传参为{params:{key:11}}
         * @param sucCb { Function } -必选 成功回调
         * @param errorCb { Function } -可选 失败回调
         * @param isLoading { Boolean } -可选 是否显示加载状态
         * @param isLogin { Boolean } -可选 是否登陆信息（移动端使用得较多，设置头部信息）
         */
        get:function( url,options,sucCb,errorCb,isLoading,isLogin ){
            
            if(!url){
                console.log('请传接口url');
                return false ;
            }
            //lss 2017-6-28 补默认laoding状态
            let isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

            //遮罩层
            if(isLoading){
                var loadingInstance = Loading.service();
            }
            Vue.http.get(url, options).then((response) => {
                // 响应成功回调
                //console.log('成功回调')
                sucCb(response);
                if(isLoading){
                   loadingInstance.close();
                }
            }, (response) => {
                // 响应错误回调
                //console.log('失败回调')
                errorCb(response);
                if(isLoading){
                   loadingInstance.close();
                }
            })
        },

        /**
         * 统一接口处理：post请求方法封装。this.$http.get(url, [options])
         * @param url { String } -必选 接口url
         * @param body { Object } -必选 含官方的所有body对象，可为null。传参时不需要参数名，例如body为{key:11}
         * @param options { Object } -必选 含官方的所有options对象，可为null。传参为{params:{key:11}}
         * @param sucCb { Function } -必选 成功回调
         * @param errorCb { Function } -可选 失败回调
         * @param isLoading { Boolean } -可选 是否显示加载状态
         * @param isLogin { Boolean } -可选 是否登陆信息（移动端使用得较多，设置头部信息）
         */
        post:function( url,body,options,sucCb,errorCb,isLoading,isLogin ){
            if(!url){
                console.log('请传接口url');
                return false ;
            }
            //lss 2017-6-28 补默认laoding状态
            let isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

            //遮罩层
            if(isLoading){
                var loadingInstance = Loading.service();
            }
            Vue.http.post(url,body,options).then((response) => {
                // 响应成功回调
                //console.log('成功回调')
                sucCb(response);
                if(isLoading){
                   loadingInstance.close();
                }
                 
            }, (response) => {
                // 响应错误回调
                //console.log('失败回调')
                errorCb(response);
                if(isLoading){
                   loadingInstance.close();
                }
            })
        },

       
        
        /**
         * author lss
         * 日期格式化,传入为毫秒数,转出时间格式为 ：2016-6-6 12:00:00
         * @objD 必填，格式为毫秒数
         */
        formatDate: function (objD) {
            if (!objD) {
                return '';
            }

            objD = new Date(objD);
            var str;
            var yy = objD.getYear();
            if (yy < 1900) yy = yy + 1900;
            var MM = objD.getMonth() + 1;
            if (MM < 10) MM = '0' + MM;
            var dd = objD.getDate();
            if (dd < 10) dd = '0' + dd;
            var hh = objD.getHours();
            if (hh < 10) hh = '0' + hh;
            var mm = objD.getMinutes();
            if (mm < 10) mm = '0' + mm;
            var ss = objD.getSeconds();
            if (ss < 10) ss = '0' + ss;
            str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
            return (str);
        },
        /**
         * author lss
         * 日期格式化,传入为毫秒数,转出时间格式为 ：2016-6-6
         * @objD 必填，格式为毫秒数
         */
        formatDate2: function (objD) {
            if (!objD) {
                return '';
            }
            objD = new Date(objD);
            var str;
            var yy = objD.getYear();
            if (yy < 1900) yy = yy + 1900;
            var MM = objD.getMonth() + 1;
            //if(MM<10) MM = '0' + MM;
            var dd = objD.getDate();
            //if(dd<10) dd = '0' + dd;
            //去掉0 我的圈子 加入圈子，布局放不下。。
            str = yy + "-" + MM + "-" + dd;
            return (str);
        },
		
        
        /**
         * 移动端弹窗，样式文件已写在配置依赖里
         * 使用方法 请参照 http://27.61.80.66:3000//src/html/test/popupTest.html
         * @param
         * @param
         */
        popupMobile: {
            // 默认弹窗参数
            defaultOpt: {
                title: '弹框标题',
                content: '告知当前状态，信息和解决方法'
                , btn: ['确定']
                , yes: function (index) {

                }

            }
            // 关闭所有弹窗
            , close: function () {
                layer.closeAll();
            }
            // 普通信息弹窗
            , msg: function (content,time) {
                var t = this;
                t.close();
                layer.open({
                    content: content
                    , skin: 'msg' // footer（即底部对话框风格）、msg（普通提示）
                    , time: 2 || time//2秒后自动关闭
                });
            }
            // 加载中弹窗
            , loading: function (txt) {
                var t = this;
                t.close();
                layer.open({
                    type: 2
                    , content: '加载中' || txt
                });
            }
            // 普通弹窗 含单标题和双标题 自定义弹框
            , dialog: function (opt) {
                var t = this;
                t.close();
                var newOpt = $.extend(t.defaultOpt, opt);

                console.log(newOpt)

                layer.open(newOpt);
            }
            // 自定义内容 弹窗
            , dialog2: function (opt) {
                var t = this;
                t.close();
                layer.open(opt);
            }
        },
        /**
         * 获取url参数
         */
        getUrlFn: function () {
            var querystr = window.location.href.split("?"),
                // var querystr = "http://xxxx.com/recharge.html?mid=&version=7701&from=music".split("?"),
                GETs = "",
                GET = "";
            if (querystr[1]) {
                GETs = querystr[1].split("&");
                GET = [];
                for (i = 0; i < GETs.length; i++) {
                    tmp_arr = GETs[i].split("=");
                    var key = tmp_arr[0];
                    GET[key] = tmp_arr[1];
                }
            }
            return GET;
            // return querystr[1];
        },
        /**
         * 获取url data参数。aa.html?data={}
         */
        getUrlData: function () {
            var purl = window.location.href;
            purl = purl.substr(purl.indexOf("?") + 1);
            var urlData = JSON.parse(decodeURI(purl.substr(purl.indexOf("=") + 1)));

            return urlData;
        },
        
    };
    

// export default global
