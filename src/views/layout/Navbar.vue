<template>
    <div class="">
        <el-menu class="navbar" mode="horizontal">
            
            <i class="fa fa-bars" @click="toggleSideBar" :isActive="sidebar.opened"></i>
           
            <tabs-view></tabs-view>
            
            <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
            <screenfull class='screenfull'></screenfull>
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <span class="user-name">{{userInfo.name}}</span>
                    <img class="user-avatar" :src="userInfo.avatar+'?imageView2/1/w/80/h/80'">
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link class='inlineBlock' to="/">
                        <el-dropdown-item>
                            首页
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item >
                            <span @click="">修改密码</span>
                        </el-dropdown-item>
                    <!-- <router-link class='inlineBlock' to="/admin/profile"> -->
                        <el-dropdown-item >
                            <span @click="dialogVisible = true">切换主题</span>
                        </el-dropdown-item>
                    <!-- </router-link> -->
                    <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu>

        <!-- 修改密码弹窗 -->

        <!-- 换肤弹窗 -->
        <el-dialog title="更改主题颜色" :visible.sync="dialogVisible" >
          <el-form class="small-space" label-position="left" label-width="130px" style='width: 400px; margin-left:50px;'>
         
            <el-form-item label="请选择主题颜色：" prop="resource">
               <el-radio-group v-model="themeValue">
                    <el-radio label="blue">蓝色</el-radio>
                    <el-radio label="green">绿色</el-radio>
                    <el-radio label="red">红色</el-radio>
               </el-radio-group>
             </el-form-item>

            
           
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
           
            <el-button type="primary" @click="handleChangeTheme">确 定</el-button>
          </div>
    </el-dialog>
    
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    
    import TabsView from './TabsView';
    
    import Screenfull from 'components/Screenfull';
    import ErrorLog from 'components/ErrLog';
    import errLogStore from 'store/errLog';

    import {global} from 'src/global/global';
    import Cookies from 'js-cookie';

    export default {
      components: {
        TabsView,
        
        ErrorLog,
        Screenfull
      },
      data() {
        return {
          log: errLogStore.state.errLog,
          dialogVisible:false,
          themeValue: Cookies.get('themeValue') ? Cookies.get('themeValue') : 'blue',
        }
      },
      computed: {
        ...mapGetters([
          'sidebar',
          'userInfo',
          'name',
          'avatar'
        ])
      },
       mounted() {
            var vm = this;

      },
      methods: {
        //换肤
        handleChangeTheme(){
            var vm = this;
            global.changeTheme(vm.themeValue);

            this.dialogVisible = false;
        },
        toggleSideBar() {
           //6-28
            $(this).toggleClass('is-active');

            this.$store.dispatch('ToggleSideBar')
        },
        logout() {
          this.$store.dispatch('LogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" >
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .fa-bars{
            cursor: pointer;
            line-height: 50px;
            height: 50px;
            float: left;
            padding: 0 15px;
        }
        /*.hideSidebar .fa-bars{
            display: none;
        }*/
        .fa-bars[isactive] {
            transform: rotate(90deg);
        }
        .hamburger-container {
            line-height: 50px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 150px;
        }
        .screenfull{
             position: absolute;
             right: 90px;
             top: 16px;
             color: red;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
               /* margin-top:5px;*/
                padding: 5px ;
                position: relative;
                height: 40px;
                line-height: 40px;
                .user-name{
                    float: left;
                    margin-right: 5px;
                }
                
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>



