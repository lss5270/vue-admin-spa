<template>
    <div>
        <!-- 注意：路由表不能配置在后端，不然前端无法配置跳转到某些路由，例如提交成功后返回至某个固定路由 lss 2017-6-27 -->
        <!-- 菜单权限json（调试专用）：{{ routes['/index/tableList'] }}==={{ routes | json }} -->
        <template v-if="routes">
            <!-- 一级菜单 示例-->
            <router-link  to="/index/tableList"  v-if="routes['/index/tableList']" >
                <el-menu-item index="/index/tableList">
                    <i class="fa fa-file-excel-o" aria-hidden="true"></i> 示例表格
            
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
                        
                            <router-link  class="menu-indent" to="/example/table1" >
                                <el-menu-item index="/example/table1">
                                    第三级菜单1
                                </el-menu-item>
                            </router-link>
                             <router-link  class="menu-indent" to="/example/table2" >
                                <el-menu-item index="/example/table2">
                                    第三级菜单2
                                </el-menu-item>
                            </router-link>


                       
                    </el-submenu>

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

