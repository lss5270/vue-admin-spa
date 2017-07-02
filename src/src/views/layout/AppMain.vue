<template>
    <section class="app-main" style="min-height: 100%">
        <!-- 面包屑 -->
        <levelbar></levelbar>

        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>

<script>
    import Levelbar from './Levelbar';
    import g from 'src/global/global';
    
    export default {
      name: 'AppMain',
      components: {
        Levelbar,
        
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
