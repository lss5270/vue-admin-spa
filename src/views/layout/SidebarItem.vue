<template>
    <div>
        <!-- 注意：路由表不能配置在后端，不然前端无法配置跳转到某些路由，例如提交成功后返回至某个固定路由 lss 2017-6-27 -->
        <!-- 菜单权限json（调试专用）：==={{ routes | json }} -->

        <!-- 后期改为动态路由（但是使用aync时 刷新会导致404） -->
        <template v-if="routes">
            <!-- 一级菜单 示例-->
           <!--  <router-link  to="/index/readme"  v-if="routes['/index/readme']" >
                <el-menu-item index="/index/readme">
                    <i class="el-icon-star-on" aria-hidden="true"></i> 系统说明
            
                </el-menu-item>
            </router-link> -->

            <router-link  to="/index/personalInfo"  v-if="routes['/index/personalInfo']" >
                <el-menu-item index="/index/personalInfo">
                    <i class="fa fa-home" aria-hidden="true"></i> 首页
            
                </el-menu-item>
            </router-link>

            

            <router-link  to="/movie/newMovie"  v-if="routes['/movie/newMovie']" >
                <el-menu-item index="/movie/newMovie">
                    <i class="fa fa-file-video-o" aria-hidden="true"></i> 热映电影
            
                </el-menu-item>
            </router-link>
            <router-link  to="/movie/movieSearch"  v-if="routes['/movie/movieSearch']" >
                <el-menu-item index="/movie/movieSearch">
                    <i class="fa fa-file-video-o" aria-hidden="true"></i> 电影搜索
            
                </el-menu-item>
            </router-link>

            <router-link  to="/example/tableList"  v-if="routes['/example/tableList']" >
                <el-menu-item index="/example/tableList">
                    <i class="fa fa-table" aria-hidden="true"></i> 示例表格
            
                </el-menu-item>
            </router-link>
            
            <!-- 二级菜单 示例-->
            <el-submenu index="错误页面" v-if="routes['/errorpage/401'] || routes['/errorpage/404']">
                <template slot="title">
                    <i class="fa fa-bug" aria-hidden="true"></i> 错误页面
                </template>
              
                    <router-link  class="menu-indent" to="/errorpage/401" v-if="routes['/errorpage/401']">
                        <el-menu-item index="/errorpage/401">
                            401
                        </el-menu-item>
                    </router-link>
                    <router-link  class="menu-indent" to="/errorpage/404" v-if="routes['/errorpage/404']">
                        <el-menu-item index="/errorpage/404">
                            404
                        </el-menu-item>
                    </router-link>
               
            </el-submenu>
            
            <!-- 三级菜单 示例-->
            <el-submenu index="综合实例" v-if="routes['/example/form'] || routes['/example/tinymce'] || routes['/example/mixin'] ">
                <template slot="title">
                    <i class="fa fa-envelope-open-o" aria-hidden="true"></i> 综合实例
                </template>
                    <router-link  class="menu-indent" to="/example/form" v-if="routes['/example/form'] ">
                        <el-menu-item index="/example/form">
                            form表单编辑
                        </el-menu-item>
                    </router-link>
                   
                    <router-link  class="menu-indent" to="/example/tinymce" v-if="routes['/example/tinymce']">
                        <el-menu-item index="/example/tinymce">
                            富文本编辑器
                        </el-menu-item>
                    </router-link>
                    <router-link  class="menu-indent" to="/example/mixin"   v-if="routes['/example/mixin']">
                        <el-menu-item index="/example/mixin">
                            小组件
                        </el-menu-item>
                    </router-link>
                    
                    <!-- 三级菜单 -->
                    <el-submenu index="table内编辑" >
                        <template slot="title">
                           第二级菜单
                        </template>
                        
                            <router-link  class="menu-indent" to="/example/31" >
                                <el-menu-item index="/example/31">
                                    没权限重定向401
                                </el-menu-item>
                            </router-link>
                             <router-link  class="menu-indent" to="/example/table2" >
                                <el-menu-item index="/example/table2">
                                    地址错误跳404
                                </el-menu-item>
                            </router-link>


                       
                    </el-submenu>

            </el-submenu>

            <el-submenu index="系统设置" v-if="routes['/systemSet/permissionsManage'] || routes['/systemSet/loginLog']"> 
                <template slot="title">
                    <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 系统设置
                </template>
              
                    <router-link  class="menu-indent" to="/systemSet/permissionsManage" v-if="routes['/systemSet/permissionsManage']">
                        <el-menu-item index="/systemSet/permissionsManage">
                            权限管理
                        </el-menu-item>
                    </router-link>
                    <router-link  class="menu-indent" to="/systemSet/loginLog" v-if="routes['/systemSet/loginLog']">
                        <el-menu-item index="/systemSet/loginLog">
                            登录日志
                        </el-menu-item>
                    </router-link>
               
            </el-submenu>

            <el-submenu index="学生信息管理" > 
                <template slot="title">
                    <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 学生信息管理
                </template>
                    <router-link  class="menu-indent" to="/studentsManage/studentList" >
                        <el-menu-item index="/studentsManage/studentList">
                            学生信息列表
                        </el-menu-item>
                    </router-link>
                    <router-link  class="menu-indent" to="/studentsManage/studentAdd" >
                        <el-menu-item index="/studentsManage/studentAdd">
                            学生信息添加
                        </el-menu-item>
                    </router-link>
                    <!-- <router-link  class="menu-indent" to="/studentsManage/studentUpdate" >
                        <el-menu-item index="/studentsManage/studentUpdate">
                            学生信息修改
                        </el-menu-item>
                    </router-link> -->
                    
               
            </el-submenu>
            <el-submenu index="机构管理" > 
                <template slot="title">
                    <i class="fa fa-cogs fa-fw" aria-hidden="true"></i> 机构管理
                </template>
                    <router-link  class="menu-indent" to="/orgManage/orgManager" >
                        <el-menu-item index="/orgManage/orgManager">
                            机构列表
                        </el-menu-item>
                    </router-link>
                   
               
            </el-submenu>

        </template>    
        

    </div>
</template>

<script>
    //获取vuex中的菜单权限 进行菜单show展示。登陆成功时直接 返回菜单json 并包含帐户信息
    export default {
      name: 'SidebarItem',
      props: {
        routes: {
          // type: Array
        }
      },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wscn-icon {
        margin-right: 10px;
    }
    .fa{
        margin-right: 10px;
    }
    .hideSidebar .menu-indent{
        display: block;
        text-indent: 10px;
    }
</style>

