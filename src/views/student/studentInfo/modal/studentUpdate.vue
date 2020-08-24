<template>
<div v-cloak>
    <h2 style="color:red">
        注意：此页面使用了本地api接口，若想正常运行，请下载另外一个node项目（https://github.com/lss5270/vue-admin-spa-api），并且在本地启动该node项目。
    </h2>
    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="学生姓名" prop="studentName">
            <el-col :span="11" >
                <el-input v-model="ruleForm.studentName"></el-input>
            </el-col>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="man">男</el-radio>
          <el-radio label="woman">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="民族" prop="minzu">
            <el-col :span="11" >
                <el-select v-model="ruleForm.minzu" placeholder="民族"  >
                  <el-option label="汉族 " value="10010"></el-option>
                  <el-option label="壮族 " value="10011"></el-option>
                  <el-option label="奶佬族 " value="10013"></el-option>
                </el-select>
             </el-col>
      </el-form-item>
      <el-form-item label="籍贯" prop="jiguan">
            <el-col :span="11" >
                <el-select v-model="ruleForm.jiguan" placeholder="籍贯"  >
                  <el-option label="广西 " value="20010"></el-option>
                  <el-option label="广东 " value="20011"></el-option>
                  <el-option label="湖南 " value="20013"></el-option>
                </el-select>
             </el-col>
      </el-form-item>
      <el-form-item label="政治面貌" prop="mianmao">
            <el-col :span="11" >
                <el-select v-model="ruleForm.mianmao" placeholder="政治面貌"  >
                  <el-option label="党员 " value="30010"></el-option>
                  <el-option label="团员 " value="30011"></el-option>
                  <el-option label="群众 " value="30013"></el-option>
                </el-select>
             </el-col>
      </el-form-item>
      <el-form-item label="二级学院" prop="xueyuan">
            <el-col :span="11" >
                <el-select v-model="ruleForm.xueyuan" placeholder="二级学院"  >
                  <el-option label="文学院 " value="40010"></el-option>
                  <el-option label="外国语学院 " value="40011"></el-option>
                  <el-option label="法学院 " value="40013"></el-option>
                </el-select>
             </el-col>
      </el-form-item>

      <el-form-item label="入校时间" required>
        <el-col :span="5" >
          <el-form-item prop="ruxiaodate" >
            <el-date-picker type="date" placeholder="选择入校时间" v-model="ruleForm.ruxiaodate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        
      </el-form-item>
      <el-form-item label="出生时间" required>
        <el-col :span="5" >
          <el-form-item prop="birthDate" >
            <el-date-picker type="date" placeholder="选择出生时间" v-model="ruleForm.birthDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        
      </el-form-item>
      <el-form-item label="家庭住址" prop="address">
            <el-col :span="11" >
                <el-input v-model="ruleForm.address"></el-input>
            </el-col>
      </el-form-item>

      <el-form-item label="是否全日制" prop="quanrizhi">
        <el-switch on-text="" off-text="" v-model="ruleForm.quanrizhi"></el-switch>
      </el-form-item>

      <el-form-item label="兴趣爱好" prop="ins">
        <el-checkbox-group v-model="ruleForm.ins">
          <el-checkbox label="checkbox1" name="ins">吃饭</el-checkbox>
          <el-checkbox label="checkbox2" name="ins">睡觉</el-checkbox>
          <el-checkbox label="checkbox3" name="ins">打豆豆</el-checkbox>
          <el-checkbox label="checkbox4" name="ins">看电影</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      <el-form-item label="学生备注" prop="beizhu">
            <el-col :span="11" >
                <el-input type="textarea" v-model="ruleForm.beizhu"></el-input>
            </el-col>    
        
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
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
              studentName: '',        //学生姓名
              sex:'man',              //性别
              minzu: '',
              jiguan: '',
              mianmao: '',
              xueyuan: '',
              ruxiaodate: '',
              birthDate: '',
              address: '',
              quanrizhi: true,      //全日制
              ins: [],
              beizhu: '',
              
            },
            rules: {
              studentName: [
                { required: true, message: '请输入学生名称', trigger: 'blur' },
                { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
              ],
              
            }
          };
        },
        mounted() {
            var vm = this;

            //修改时再调用
            vm.getFormData();

        },
        methods: {
            //根据id查询表单数据
            getFormData:function(){
                var vm = this;
                var data = this.$route.query;
                console.log('获取到url参数：',data);
                //根据url中的参数，进行ajax获取表单数据
                global.get( api.queryStudentsItem,{params:{'id':data.id}}, function(res){
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
                },true)
            },
            submitForm(formName) {
              let that = this;
              
              this.$refs[formName].validate((valid) => {
                if (valid) {
                      
                      console.log('提交入参：',this.ruleForm);

                      global.post('http://localhost:3000/api/modifyStudents',this.ruleForm,null,function(res){
                          //alert('插入数据成功，接口返回的数据为：',res)
                          
                          //正式编程以下代码请放到接口成功回调函数中
                          Message({
                              showClose: true,
                              message: '提交成功，正在跳转页面……',
                              type: 'success'
                          })
                          setTimeout(()=>{
                              //this.$router.push('/');
                              that.$router.push('/studentsManage/studentList')
                          },2000)
                      },function(res){
                          alert('插入数据失败，接口返回的数据为：',res)
                          
                      })
                      
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
