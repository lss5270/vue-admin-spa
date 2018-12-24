import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

import { Loading } from 'element-ui';

import config from '../../config';

import themeArray from './themeArray';

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
            removeCss()
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
            function removeCss(href) {
                const links = document.getElementsByTagName("link");
                const head = document.getElementsByTagName('head')[0];
                let arr = []
                if(links && links.length > 0) {
                    for (let i = 0, len =  links.length; i < len ; i++) {
                        if (links[i]) {
                            arr.push(links[i]);
                        }
                    }
                    for (let i = 0, len = arr.length; i< len ;i++ ) {
                        head.removeChild(arr[i])
                    }
                }
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
        get:function( url,options = {},sucCb,errorCb,isLoading = true,isLogin ){
            
            if(!url){
                console.log('接口url不能为空！');
                return false ;
            }
            //lss 2017-6-28 补默认laoding状态
            // var isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

            //遮罩层
            if(isLoading){
                var loadingInstance = Loading.service({text:"拼命加载中"});
            }
            Vue.http.get(url, options).then((response) => {
                // 响应成功回调
                //console.log('成功回调')
                
                
                setTimeout(function(){
                    sucCb(response);
                    if(isLoading){
                        loadingInstance.close();
                    }
                    
                },1000)
                   
                
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
        post:function( url,body,options,sucCb,errorCb,isLoading = true,isLogin ){
            if(!url){
                console.log('接口url不能为空！');
                return false ;
            }
            //lss 2017-6-28 补默认laoding状态
            // var isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

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
