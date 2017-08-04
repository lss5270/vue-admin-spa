<template>
    <section class="app-main" style="min-height: 100%">
        <!-- 面包屑 -->
        <Levelbar></Levelbar> 
        <!--  <br/> <lv></lv> -->
        <!-- <level-bar></level-bar><br/> -->
        
        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>

<script>
    //使用组件步骤：
    //1.通过import语法导入组件
    //2.在当前vue实例注册组件（全局、局部注册），以下components就是局部组件名称Levelbar
    //3.注册完，如何使用？直接在当前模板中通过<>中放组件名的形式使用组件。
    import Levelbar from './Levelbar';
    import g from 'src/global/global';

    export default {
      name: 'AppMain',
      components: {
        Levelbar,
        // lv: Levelbar,
        // 'level-bar': Levelbar,
        // levelBar
        
      },
      mounted() {
            
            //请求测试
            // g.post('aa/cc',{key:11},null, function(){
            //   alert(1)
            // },function(){
            //   //alert(2)
            // })

            // g.post('aa/bbb',null,{params:{key:11}}, function(){
            //   alert(1)
            // },function(){
            //   //alert(2)
            // })

      },
      computed: {
        key() {
          return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
        }
      }
    }
</script>
