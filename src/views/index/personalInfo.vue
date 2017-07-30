<template>
  <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="8">
                
                <div class="user_img" >
                    <!-- <img :src="personalInfo.avatar" alt="用户头像" >
                    <p>
                        <button type="button" class="el-button filter-item el-button--primary" @click="uploadAvatar()">
                            <i class="fa fa-cloud-upload" aria-hidden="true"></i><span>上传头像</span>
                        </button>
                    </p> -->

                    <img v-if="newImageUrl" :src="newImageUrl" alt="用户头像" >
                    <img v-else :src="personalInfo.avatar" alt="用户头像" >

                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                     <!--  <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                      <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                        <button type="button" class="el-button filter-item el-button--primary" style="margin-top:10px">
                            <i class="fa fa-cloud-upload" aria-hidden="true"></i><span>上传头像</span>
                        </button>
                    </el-upload>

                </div>
                
            </el-col>

            <el-col :span="16">
                <div class="user_info">
                    <h2>个人信息 <el-button size="small" v-if="!editable" @click="editable = true" style="float:right;" icon="edit">编辑</el-button> </h2>
                    <div class="user_info_form" v-if="editable">
                      
                        <el-form label-position="right" label-width="100px" :model="personalInfo">

                              <el-form-item label="昵称">
                                <el-input v-model="personalInfo.nickname"></el-input>
                              </el-form-item>
                              <el-form-item label="真实姓名">
                                <el-input v-model="personalInfo.trueName"></el-input>
                              </el-form-item>
                              <el-form-item label="性别">
                                    <el-radio-group v-model="personalInfo.sex">
                                          <el-radio label="man">男</el-radio>
                                          <el-radio label="woman">女</el-radio>
                                    </el-radio-group>
                              </el-form-item>
                              <el-form-item label="邮件地址" >
                                <el-input v-model="personalInfo.email" disabled=""></el-input>
                              </el-form-item>
                              <el-form-item label="个人简介">
                                <el-input type="textarea" v-model="personalInfo.introduction"></el-input>
                              </el-form-item>

                              <el-form-item>
                                 <el-button type="primary" @click="submitForm()">提交</el-button>
                                 <el-button @click="resetForm()">取消</el-button>
                               </el-form-item>

                        </el-form>

                    </div>

                    <div class="user_info_text" v-else>
                        <el-form label-position="right" label-width="100px" :model="personalInfo">

                              <el-form-item label="昵称：">
                                {{ personalInfo.nickname }}
                              </el-form-item>
                              <el-form-item label="真实姓名：">
                                {{ personalInfo.trueName }}
                               
                              </el-form-item>
                              <el-form-item label="性别：">
                                <span v-if="personalInfo.sex == 'man'">男</span>
                                <span v-else>女</span>
                                   
                              </el-form-item>
                              <el-form-item label="邮件地址：">
                                {{ personalInfo.email }}
                               
                              </el-form-item>
                              <el-form-item label="个人简介：">
                                {{ personalInfo.introduction }}
                               
                              </el-form-item>

                             
                        </el-form>
                    </div>
                </div>

            </el-col>
        </el-row>

  </div>
</template>

<script>
 import { mapGetters } from 'vuex';
import {global} from 'src/global/global';
import {api} from 'src/global/api';

export default {
  data() {
    return {
        editable:false,
        personalInfo:{},
        newImageUrl: ''
    }
  },
  computed: {
        ...mapGetters({
            // 映射 this.personalInfo_init 为 store.getters.userInfo
            personalInfo_init:'userInfo'
        })
    },
  mounted() {
    var vm = this;
        
        vm.resetForm();
   },
  methods: {
    //提交表单
    submitForm() {
        var vm = this;
        vm.editable = false;
        var par = {
            "account":  vm.personalInfo.account,
            "nickname": vm.personalInfo.nickname,
            "trueName": vm.personalInfo.trueName,
            "sex": vm.personalInfo.sex,
            "email": vm.personalInfo.email,
            "introduction": vm.personalInfo.introduction,
        };

        console.log('修改信息入参为：',par)
    },
    //重置表单
    resetForm() {
        var vm = this;
        vm.editable = false;
        vm.personalInfo = JSON.parse( JSON.stringify(vm.personalInfo_init) ) ;
    },
    //上传头像
    uploadAvatar(){
        alert('稍后补上')
    },

    handleAvatarSuccess(res, file) {
       this.newImageUrl = URL.createObjectURL(file.raw);
       alert("修改头像成功")
    },
    beforeAvatarUpload(file) {
       const isJPG = file.type === 'image/jpeg';
       const isLt2M = file.size / 1024 / 1024 < 2;

       if (!isJPG) {
         this.$message.error('上传头像图片只能是 JPG 格式!');
       }
       if (!isLt2M) {
         this.$message.error('上传头像图片大小不能超过 2MB!');
       }
       return isJPG && isLt2M;
    }

  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .user_img{
        /*width: 80%;*/
        padding: 20px;
        text-align: center;
        border: 1px solid #dee1e2;
        img{
            max-width: 200px;
            max-height: 200px;
            border-radius: 50%;
        }
    }
    .user_info{
        padding-bottom: 20px;
        border: 1px solid #dee1e2;
        h2{
            margin: 0;
            font-weight: normal;
            padding: 10px 20px;
            border-bottom: 1px solid #dee1e2;
            .i_edit{
                float: right;
                font-size: 16px;
                color: #7ab8ed;
            }
        }
    }
    .user_info_form,.user_info_text{
        padding: 20px;
    }
</style>
