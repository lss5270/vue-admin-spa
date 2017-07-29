<template>
  <div class="app-container">
        <code>
            <h3>系统说明：</h3>
            <ul>
                <li>
                    1.为了方便开源给大家二次开发，所有数据：包括用户登录、获取用户信息、获取表格表单数据、菜单权限、角色用户、豆瓣电影等数据，都已经进行了本地json模拟，但是搜索和分页等功能本地json是无法模拟的，实际开发时把json地址切换成实际开发接口地址，搜索和分页功能即可正常使用</li>
                <li>
                    2.全部动态操作的按钮点击元素（例如增删改查、分页切换等），都已经在控制台打印出相关参数，实际开发时把这些参数按需提交给后端接口即可
                </li>
                <li>
                    3.最新电影和电影搜索，使用了在线接口，支持搜索和分页，但是其他页面的数据是本地json不支持搜索和分页。
                </li>

                <li>
                    4.如果此开源项目对你有所帮助的话，请到<a href="https://github.com/lss5270/vue-admin-spa">源码地址</a>给个star，更多功能即将开发……
                </li>
            </ul>
        </code>

  </div>
</template>

<script>
//  import { mapGetters } from 'vuex';
// import {global} from 'src/global/global';
// import {api} from 'src/global/api';

export default {
  data() {
    return {
        
    }
  },
  computed: {
        // ...mapGetters({
        //     personalInfo_init:'userInfo'
        // })
    },
  mounted() {
    
   },
  methods: {
    

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    
</style>
