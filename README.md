# 后台管理系统 vue-admin-spa #
**使用到的技术：vue + vue-resouce + vue-router + vuex(大型spa必备) + element-ui + webpack + npm 

## 前言
** 本项目基于vue脚手架和三个项目（取长补短）改建而成，以下几点重写过:
- 登陆注册（含MD5加密）
- 权限控制，菜单根据用户接口回来的权限数据进行显隐，手敲地址栏，会跳到404（地址栏错误）或401（地址栏正确但无权限）
- 切换主题，完全支持用户手动切换主题和记住主题
- 全部数据进行本地json模拟,二次开发者，只需要把json路径替换成实际接口路径即可，即使是新手也能轻松搞定撸后台管理系统


## 说明
- 开源目的：供更多人学习和参考，少走弯路。
- 需求定制：这个项目作为底层框架开源，暂时不接定制需求开发，如有需要，可联系本人<81438234@qq.com>，若提的需求比较常见，可考虑加入主干或分支。
- 贡献加入：欢迎更多开发者加入这个底层开发，一起贡献和维护，详情联系群主。
- 及时交流：为了方便大家实时通讯,本项目建了一个qq群--645582193


**注意：该项目目前使用element-ui@1.3.3+版本,所以最低兼容 Vue 2.3.0**


## 功能(全部数据进行本地json模拟)
- 登录/注册/注销
- 密码修改（未完成）
- 个人主页（未完成）
- 权限验证
- 修改权限（未完成）
- 侧边栏
- 面包屑
- 富文本编辑器
- 列表增删改查(后台管理系统基本功能)
- 401，401重定向页面
- 导出excel
- views-tab
- 更多功能即将开放……


## 开发
```bash
   
    # 安装依赖
    npm install
    #or 直接解压node_modules（比较适合新手）

    # 本地开发 开启服务
    npm run dev
    #or 直接双击start.bat（比较适合新手）
```
浏览器访问 http://localhost:2017

## 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生产环境
    npm run build:prod
    #or 直接双击build.bat（比较适合新手）
```
## 模拟运行正式环境
```bash
    # nginx环境下运行
    1.准备nginx环境，自行到nginx官网（https://nginx.org/）下载，并解压
    2.双击build.bat后根目录生成一个dist包，把dist整个文件夹拷贝到nginx解压后的html下
    3.启动nginx服务：双击nginx.exe
    4.访问入口：http://localhost/dist/index.html
    ………
    
    8.关闭nginx服务：直接删进程
    
    # tomcat环境下运行
    参照nginx步骤即可
```

## 关于图标
```本项目使用了两套图标系统，具体使用方法参照以下官方链接
    1.http://element.eleme.io/#/zh-CN/component/icon
    2.http://fontawesome.io/icons/
```
## 关于UI系统
```由于bootstrap不支持mvvm已弃用，本项目使用了全新的elementUI系统，具体使用方法参照以下官方链接
    1.http://element.eleme.io/#/zh-CN/component/installation
    
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件。不直接显示
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view视图层
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   ├── jquery
│   ├── Tinymce                // 富文本
│   ├── dataJson               // 模拟接口json
│   └── theme                  // 不打包的主题文件
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```


## 状态管理
后台只有user和app配置相关状态使用vuex存在全局，其它数据都由每个业务页面自己管理。




