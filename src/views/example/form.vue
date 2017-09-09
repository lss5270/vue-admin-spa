<template>
<div v-cloak>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
            <el-col :span="11" >
                <el-input v-model="ruleForm.name"></el-input>
            </el-col>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
            <el-col :span="11" >
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域"  >
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
             </el-col>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-col :span="5" >
          <el-form-item prop="date1" >
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1" align="center">&nbsp;-&nbsp;</el-col>
        <el-col :span="5" >
          <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="checkbox1" name="type">美食/餐厅线上活动</el-checkbox>
          <el-checkbox label="checkbox2" name="type">地推活动</el-checkbox>
          <el-checkbox label="checkbox3" name="type">线下主题活动</el-checkbox>
          <el-checkbox label="checkbox4" name="type">单纯品牌曝光</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="radio1">线上品牌商赞助</el-radio>
          <el-radio label="radio2">线下场地免费</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
            <el-col :span="11" >
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-col>    
        
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { Message } from 'element-ui';
    import {global} from 'src/global/global';
    import {api} from 'src/global/api';

    export default {
        data() {
          return {
            ruleForm: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            rules: {
              name: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              region: [
                { required: true, message: '请选择活动区域', trigger: 'change' }
              ],
              date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
              ],
              date2: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
              ],
              type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              ],
              resource: [
                { required: true, message: '请选择活动资源', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请填写活动形式', trigger: 'blur' }
              ]
            }
          };
        },
        mounted() {
            var vm = this;

            vm.getFormData();



        },
        methods: {
            //根据id查询表单数据
            getFormData:function(){
                var vm = this;
                var data = this.$route.query;
                console.log('获取到url参数：',data);
                //根据url中的参数，进行ajax获取表单数据
                global.get( api.getForm,{params:{'id':data.id}}, function(res){
                      console.log('-------根据id获取表单信息：',JSON.stringify(res) )
                      if(res.body.resultCode == 0){
                           var res = res.body.data;
                                console.log('=====',res);

                                vm.ruleForm = res
                                
                      }else{
                            //alert(res.body.resultMsg)
                            Message({
                                showClose: true,
                                message: res.body.resultMsg,
                                type: 'error'
                            });
                      }

                      
                },function(res){
                    //失败回调
                },false)
            },
          submitForm(formName) {
            let oldDate = this.ruleForm.date1;
            //Thu Aug 03 2017 00:00:00 GMT+0800 (中国标准时间)这种时间格式如何转成我们需要的格式 2017-8-3 ?
            //new Date()获取当前时间。括号可放时间对象参数
            //1.可以通过new Date().getFullYear()  获取到年
            //2.可以通过new Date().getMonth()     获取到月(0~11) 1~12
            //3.可以通过new Date().getDate()      获取到日
            //4.可以通过new Date().getDay()       获取到星期
            //6.可以通过new Date().getTime()      获取到毫秒数
            
            let year = new Date(oldDate).getFullYear(),
                month = new Date(oldDate).getMonth()+1,
                day = new Date(oldDate).getDate();

            let dateFormat = year+'-'+month+'-'+day;
            console.log('当前选择时间:', dateFormat )

            
            this.$refs[formName].validate((valid) => {
              if (valid) {
                    alert('已提交，提交参数请看控制台');
                    console.log('提交入参：',this.ruleForm);

                    // global.post('http://localhost:3000/api/addStudents',this.ruleForm,function(res){
                    //     alert('插入数据成功，接口返回的数据为：',res)
                    // })
                    //正式编程以下代码请放到接口成功回调函数中
                    Message({
                        showClose: true,
                        message: '提交成功，正在跳转页面……',
                        type: 'success'
                    })
                    setTimeout(()=>{
                        //this.$router.push('/');
                        this.$router.go(-1)
                    },2000)
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
            // 等同于
            // this.ruleForm = {
            //   name: '',
            //   region: '',
            //   date1: '',
            //   date2: '',
            //   delivery: false,
            //   type: [],
            //   resource: '',
            //   desc: ''
            // }
          }
        }
      }
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.component-item{
  margin-top: 100px;
}
.code-part{
  margin-top: 20px;
}
</style>
