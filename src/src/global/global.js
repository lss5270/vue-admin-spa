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
            Cookies.set('themeValue', themeValue);

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
            var isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

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
            var isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

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
         * 格式化数字，限制数字位数，转出格式为：99+
         * 一般用于点赞量、评论量等
         * @param numObj 必填，需要转格式的数字
         * @param numlong 限制数字位数（numlong=2,如果numObj>99则返回99+），不填时不截取
         */
        formatNumAdd: function(numObj, numlong){
            if(null == numObj){
                return '';
            }
            if(!numlong || numObj == 0){
                return numObj;
            }
            //算出最大范围
            var maxNum = 1;
            for(var j = 0; j< numlong; j++){
                maxNum *= 10;
            }
            //未超出范围
            if(numObj < maxNum){
                return numObj;
            }
            //超出范围
            var newNum = '';
            for(var i = 0; i< numlong; i++){
                newNum += '9';
            }
            newNum += '+';
            return newNum;
        },

        /**
         * 格式化数字，将数字改为带单位的格式，（如以千为单位，超过千的用单位显示，如1800-》1.8千，）
         * @param numObj 必填，需要转格式的数字
         * @param chiIndex 必填，单位的index，对应方法里面danwei数字的index，默认为不带单位
         * @param poinglong 非必填，保存的小数位数，默认为1。(如果是类似1.800这样的数字，即使保存3位小数也是返回1.8)
         */
        formatNumChin:function(numObj, chiIndex, pointlong){
            if(!numObj){
                return '';
            }
            //不设置单位
            if(null == chiIndex || chiIndex == ''){
                return numObj;
            }
            //默认保存1位小数
            if(null == pointlong){
                pointlong = 1;
            }

            //单位和对应的数字，如果需要更多单位，补在danwei和maxNumArr数组后面
            var danwei = ["","百","千","万","亿"];
            var maxNumArr = [1,100,1000,10000,100000000];//单位对应的数字，与danwei数组一一对应

            if(numObj < maxNumArr[chiIndex]){
                return numObj;
            }

            numObj = parseFloat(numObj);
            var numDataStr = parseFloat(numObj/maxNumArr[chiIndex])+'';//浮点型字符串
            //截取小数位数
            var pointIndex = numDataStr.indexOf(".");
            if(pointlong == 0){
                numDataStr = numDataStr.substring(0,pointIndex);
            }else if(pointIndex != -1){
                numDataStr = numDataStr.substring(0,pointIndex+pointlong+1);
            }

            numDataStr = numDataStr+danwei[chiIndex];//添加中文单位
            return numDataStr;
        },
        /**
         * 获取用户信息
         * @param callback 获取成功或失败后的回调
         * @param _uuid_
         */
        getUserInfo: function (callback, _uuid_) {
            var t = this,
                userInfo = {
                    userid: "",
                    username: "",
                    interest: ""
                    /*userid:"2907eb214a9e4b7cbacc4d4a672953b0",
                     username:"翁",
                     interest:"爱好"*/
                };

            var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
            //navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) && isChrome  lss
            //本地调使用 win 平台下为PC端。
            if (!/^win/i.test(window.navigator.platform)) {
                //t.popupMobile.msg('移动端')
                App.mCall.getUserInfo(function (res) {
                    if (res) {
                        if ( res && typeof res == 'object' ) {

                            for( var key in res ){
                                userInfo[key] = res[key] ;
                            }
                            //userInfo.userid = res["userid"];
                            //userInfo.username = res["username"];
                            userInfo.interest = JSON.stringify(res.interest);

                            storage.remove({
                                key: "userid"
                            });
                            storage.remove({
                                key: "interest"
                            });
                            storage.set({
                                key: "userid",
                                value: res["userid"],
                                expires: 30 * 24 * 3600 * 1000
                            });
                            storage.set({
                                key: "interest",
                                value: JSON.stringify(res.interest),
                                expires: 30 * 24 * 3600 * 1000
                            });
                            callback && callback(userInfo);
                        }
                    } else {
                        // 获取不了跳APP登录页
                        t.login();
                    }
                });
            } else { //t.popupMobile.msg('PC端')


                /*设置默认用户参数，方便测试，上线前需删除*********************************************************/
                // c187b83870254e1fad0d1f5ab66d1661 jianhuang
                // 9121221676fa4b28986d0bd03ba5a807 wei
                // 415bbff7ab244430b1342a618e5ce2e9  xunxi
                // 18378bcb1a6240d8a7d476d65e2eb1c9  fang
                // 1c0ecb6c563f42a5996e0ad052d068e8
                // c38a17e5544648d2a9d0d75ef0e54f95
                // bc412748df254b5d8679c82271b16c29 蓝色理想

                res = {
                    "username": "18588848204",
                    "usertype": "1",
                    "userid": "c187b83870254e1fad0d1f5ab66d1661",
                    "interest": [
                        {
                            "dicval": 1,
                            "dicdataval": 10,
                            "uiid": "2aa1dc37c9db46f4a6e1878eb246e488",
                            "interestName": "国外游",
                            "parentDicdataval": "2", //大分类
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 11,
                            "uiid": "3cfde068b9af48aa8183ad4852d3a1fa",
                            "interestName": "自由行",
                            "parentDicdataval": "2",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 5,
                            "uiid": "4dbb939dea534fa79d74cee7a5a3e909",
                            "interestName": "球类",
                            "parentDicdataval": "0",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 12,
                            "uiid": "4e33e08595404df1a74717c91b83d220",
                            "interestName": "阅读",
                            "parentDicdataval": "3",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 14,
                            "uiid": "55bcc2ea2f85481b97cab4975d597bed",
                            "interestName": "沙龙",
                            "parentDicdataval": "3",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 13,
                            "uiid": "5a2446fcc03f4d9a87c79106d98cb88b",
                            "interestName": "演出",
                            "parentDicdataval": "3",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 9,
                            "uiid": "6691abd9163542ecba82dd0d5331d7c7",
                            "interestName": "国内游",
                            "parentDicdataval": "2",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 4,
                            "uiid": "718cc1c5d7914c0ba58c33e30e26b44b",
                            "interestName": "户外",
                            "parentDicdataval": "0",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 6,
                            "uiid": "be68dc91443a40ecae6355ab91ffe227",
                            "interestName": "健身",
                            "parentDicdataval": "0",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 8,
                            "uiid": "d0a6cd2631dd47c1a6ed775d5b44a300",
                            "interestName": "调理",
                            "parentDicdataval": "1",
                            "remark": null
                        },
                        {
                            "dicval": 1,
                            "dicdataval": 7,
                            "uiid": "d1694aa3033745aaad91c5c0b605e2a4",
                            "interestName": "养生",
                            "parentDicdataval": "1",
                            "remark": null
                        }
                    ]
                }
                if (res) {
                    if (typeof res == 'object') {
                        userInfo.userid = res["userid"];
                        userInfo.username = res["username"];
                        userInfo.interest = JSON.stringify(res.interest);
                        storage.remove({
                            key: "userid"
                        });
                        storage.remove({
                            key: "interest"
                        });
                        storage.set({
                            key: "userid",
                            value: res["userid"],
                            expires: 30 * 24 * 3600 * 1000
                        });
                        storage.set({
                            key: "interest",
                            value: JSON.stringify(res.interest),
                            expires: 30 * 24 * 3600 * 1000
                        });
                    }
                } else {
                    t.login();
                }
                callback && callback(userInfo);
                /*设置默认用户参数，方便测试，上线前需删除*********************************************************/

                //return userInfo;
                // return debugInfo;
            }
        },
        /**
         * 调客户端登录页面
         */
        login: function () {
            console.log("返回登录页")
            App.mCall.login(function (res) {
                // console.log(res);
            });
        },
        /**
         * 获取城市信息
         *
         */
        getCity: function () {
            var city = App.mCall.getCity(function (res) {
                alert(JSON.stringify(res));
                console.log(res);
            });
            city = "广州";
            return city;
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
