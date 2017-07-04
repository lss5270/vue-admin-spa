<template>
  <div class="errPage-container">
    <el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">401!</h1>
       
        <h2>你没有权限去该页面</h2>
        <h6>你可以联系你领导，或者你可以去:</h6>
        <ul class="list-unstyled">
          
          <li class="link-type">
            <router-link to="/">回首页</router-link>
          </li>
          <li class="link-type"><a href="https://github.com/lss5270/vue-admin-spa">源码主页</a></li>
         
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif"  alt="401 image">
      </el-col>
    </el-row>

    
  </div>
</template>

<script>
    import errGif from 'assets/img/401.png';
    export default {
      data() {
        return {
          errGif: errGif + '?' + +new Date(),
         
         
        }
      },
      methods: {
        back() {
          if (this.$route.query.noGoBack) {
            this.$router.push({ path: '/' });
          } else {
            this.$router.go(-1);
          }
        }
      }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 800px;
    margin: 100px auto;
    .pan-back-btn {
      /*background: #008489;
      color: #fff;*/
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
