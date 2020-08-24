<template>
  <el-dialog width="60%" :title="orgDialogTitle" :visible.sync="orgDialogVisible" destroy-on-close @close="closeDialog">
    <el-form ref="orgForm" :model="orgForm" :rules="userRules" class="lss-form" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构编码" prop="insId">
            <el-input v-model="orgForm.insId" autocomplete="off" disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="机构类型" prop="typeId">
            <!-- <el-input v-model="orgForm.typeId" autocomplete="off"></el-input> -->
            <el-select v-model="orgForm.typeId" placeholder="请选择" filterable>
              <el-option
                v-for="item in dicArr.DICT_INS_TYPE_BACK"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务类型" prop="busTypeId">
            <el-select v-model="orgForm.busTypeId" placeholder="请选择" filterable>
              <el-option
                v-for="item in dicArr.DICT_BUSINESS_TYPE_BACK"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织机构代码" prop="industryType">
            <el-input v-model="orgForm.industryType" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="机构名称" prop="insName">
            <el-input v-model="orgForm.insName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="行业分类" prop="organizationCode">
            <el-select v-model="orgForm.organizationCode" placeholder="请选择" filterable>
              <el-option
                v-for="item in dicArr.DICT_INDUSTRY_TYPE_BACK"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>
            
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业法人" prop="legal">
            <el-input v-model="orgForm.legal" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业联系人" prop="contact">
            <el-input v-model="orgForm.contact" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="企业联系人电话" prop="phone">
            <el-input v-model="orgForm.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="机构管理员" prop="insManager">
            <el-input v-model="orgForm.insManager" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="管理员联系电话" prop="insManagerPhone">
            <el-input v-model="orgForm.insManagerPhone" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业地址" prop="address">
            <el-input v-model="orgForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="企业网址" prop="addrWeb">
            <el-input v-model="orgForm.addrWeb" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="orgForm.remark" type="textarea" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
            
      </el-row>
          
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="orgDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="validateOrgForm('orgForm')">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
export default {
  name: '',
  props: {
    isShow: Boolean,
    orgDialogTitle: String,
    orgFormData: Object,
    dicArr: Object,
  },
  data() {
  	return {
  		orgDialogVisible: this.isShow,
      
      orgForm: this.orgFormData,
      orgFormInt: {},
      userRules: {
        typeId: [
          { required: true, message: '请选择机构类型', trigger: 'blur' },
        ],
        busTypeId: [
          { required: true, message: '请选择业务类型', trigger: 'blur' },
        ],
        organizationCode: [
          { required: true, message: '请输入组织机构代码', trigger: 'blur' },
        ],
        insName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
        ],
        industryType: [
          { required: true, message: '请选择行业分类', trigger: 'blur' },
        ],
        legal: [
          { required: true, message: '请输入企业法人', trigger: 'blur' },
        ],
        contact: [
          { required: true, message: '请输入企业联系人', trigger: 'blur' },
        ],
        /* phone:[
          { required: true, message: '请输入企业联系人电话', trigger: 'blur' },
        ],*/
      },
      
  	}
  },
  mounted() {
    
  },
  methods: {
    //  关闭弹窗
    closeDialog(){
      this.$emit('closeDialog');
    },
    //  验证机构表单
    validateOrgForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.submitForm()
        } else {
            console.log('error submit!!');
            return false;
        }
      })
    },
    submitForm(){
      this.$emit('submitForm', this.orgForm);
    },
  }
}
</script>

