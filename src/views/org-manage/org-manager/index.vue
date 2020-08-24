<template>
  <div style="" class="page-layout">
		
    <div class="box-flex">
      <!-- 左侧 -->
  			
      <!-- 右侧 -->
      <div class="page-right border-gray">
        <div class="table-filter">
          <el-input v-model="filterPar.searchCondition" placeholder="组织机构代码/机构名称" clearable prefix-icon="el-icon-search"></el-input >
  					
          <el-button type="primary" @click="getTableData">查询</el-button>
          <el-button @click="clearFilter">重置</el-button>
          <div class="table-filter-btn fr">
            <el-button type="primary" icon="el-icon-plus" @click="addOrg">新增机构</el-button>
          </div>
        </div>

        <div class="table-box">
          <el-table
            v-loading="tableDataLoading"
            :data="tableData"
            border
            style="width: 100%;"
            :height="tableHeight"
            size="mini"
          >
  					    
            <el-table-column
  					      
              label="组织机构代码"
              min-width="120"
            >
              <!-- <template slot-scope="scope">
                <div class="td-nowrap" :title="scope.row.organizationCode">
                  {{ scope.row.organizationCode }}
                </div>
              </template> -->
            </el-table-column>

            <el-table-column
  					      
              label="机构名称"
              min-width="160"
            >
              <!-- <template slot-scope="scope">
                <div class="td-nowrap" :title="scope.row.insName">
                  {{ scope.row.insName }}
                </div>
              </template> -->
            </el-table-column>
            <el-table-column
  					      
              label="机构类型"
              width="100"
            >
              <!-- <template slot-scope="scope">
                <div class="td-nowrap" :title="scope.row.typeId">
                  {{ scope.row.typeId | insTypeFormat }}
                </div>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="contact"
              label="联系人"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系人电话"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="insManager"
              label="机构管理员"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="insManagerPhone"
              label="管理员电话"
              width="120"
            >
            </el-table-column>

            <el-table-column
              fixed="right"
  					      
              label="操作"
              width="160"
            >
              <!-- <template slot-scope="scope">
                <el-switch
                  :value="scope.row.isValid=='Y'"
                  @change="updateState($event,scope.row)"
                >
                </el-switch> 
                <i class="el-icon-edit-outline icon-operate-st1" style="" title="编辑" @click="editOrg(scope.row)"></i>
                <i class="el-icon-question icon-operate-st1" style="" title="查看部门" @click="gotoUserdep(scope.row)"></i>
              </template> -->
	  					    	 	
            </el-table-column>
          </el-table>
  					
        </div>
        <div class="pagination-box">
          <el-pagination
            background
            :page-sizes="[10, 20, 50, 100]"
            :page-size="paginationPar.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationPar.recordCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  		
    <!-- 机构弹窗 -->
    <org-dialog v-if="orgDialogVisible" :is-show="orgDialogVisible" :org-dialog-title="orgDialogTitle" :org-form-data="orgForm" :dic-arr="dicArr" @closeDialog="orgDialogVisible = false" @submitForm="submitOrgForm" />
		
  </div>
</template>

<script>
//import { postAwait } from '@ttkv'

/*import getDicArr from '@/utils/getDicArr'*/
import { getTableData, updateState, queryIns, submitOrgForm } from "./api";
import orgDialog from './modal/orgDialog'

let vm0
export default {
  	name: '',
    components: { 
      orgDialog,
    },
    filters: {
    	//	filters过滤器this指向并不是vue 中的this，而是undefined
    	insTypeFormat(val) {
    		let typeName = '' // '-'
    		
    		for (const item of vm0.dicArr['DICT_INS_TYPE_BACK']){
    			if (item.itemCode == val){
    				typeName = item.itemName
    			}
    		}
    		return typeName
    	}
    },
    data() {
    	return {
    		filterPar: {
        	searchCondition: '',
        },
        // tableHeight: this.provObj.tableHeight,
        tableData: [],
        tableDataLoading: false,
        paginationPar: {
        	'pageIndex': 1,
        	'pageSize': 20,
        	'recordCount': null,

        },
        
        /* 机构*/
        orgDialogVisible: false,
        orgDialogTitle: '',
        orgForm: {},
        
        /* 字典集合*/
        dicArr: {
        	'DICT_INS_TYPE_BACK': [],
        	'DICT_BUSINESS_TYPE_BACK': [],
        	'DICT_INDUSTRY_TYPE_BACK': [],
        }
    	};
    },
    inject: ['provObj'],
    computed: {
      tableHeight() {
        return '550px'
        //return this.provObj.tableHeight
      }
    },
    
    mounted() {
    	this.getTableData()

    	// this.getDicArr(this.dicArr)
    	// 获取字典
    	/*const dicArr0 = getDicArr(this.dicArr).then((res) => {
    		console.log('字典:', res)
    		this.dicArr = res
    	})*/

      
    },
    beforeCreate: function () {
	    vm0 = this
    },
    methods: {
	    /* //	获取字典集合
	    getDicArr(dicArr) {
	    	let vm = this
	    	for(let key in dicArr){
	    		this.getItemsByDicCode(key)
	    	}
	    },
	    //	根据code获取字典
	    async getItemsByDicCode(dicCode) {
	    	let vm = this
	    	let par = {"dicCode": dicCode, "interceptConfigAll": true}
	    	const res = await postAwait(`${process.env.VUE_APP_JCHL_API}/gateway/system/back/sysDicItemService/sysDicItemByCodes`, par)
	    	if(res.body){
	    		this.formatDicItem( dicCode, res.body['dic_'+dicCode])
	    	}
	    },
	    //	解析格式化 单个字典，并组装
	    formatDicItem(dicCode,dicValue) {
	    	console.log(dicCode,'-----',JSON.parse(dicValue) )
	    	let vm = this
	    	this.dicArr[dicCode] = JSON.parse(dicValue)
	    	//console.log(this.dicArr)
	    },*/
		  // 	分页
	    handleSizeChange(val) {
	    	console.log(`每页 ${val} 条`)
	    	
	    	this.paginationPar.pageSize = val
	    	this.getTableData()
	    },
	    handleCurrentChange(val) {
	        console.log(`当前页: ${val}`)
	        
	    	this.paginationPar.pageIndex = val
	    	this.getTableData()
	    },
	    // 获取表格数据
	    async getTableData() {
	    	this.tableDataLoading = true
	    	const paginationPar = this.paginationPar
	    	const filterPar = this.filterPar
	    	const par = { ...paginationPar, ...filterPar, }// "pageIndex":1,"start":0,"pageSize":20,
	    	// const res = await postAwait(`${process.env.VUE_APP_JCHL_API}/gateway/org/back/institutionService/query`, par)
        const res = await getTableData(par);
	    	if (res.body){
	    		this.tableDataLoading = false
    			this.tableData = res.body.data
    			this.paginationPar = res.body.pager
	    	}
	    },
	    clearFilter() {
        this.filterPar = {
        	searchCondition: '',
        	isContainChild: 'N',
        }

        this.getTableData()
	    },
	    //	启用禁用 状态更新
	    async updateState(v, row) {
	    	const par = { 'insId': row.insId, 'isValid': v ? 'N' : 'Y' }
	    	// const res = await postAwait(`${process.env.VUE_APP_JCHL_API}/gateway/org/back/institutionService/logicDelIns`, par)
        const res = await updateState(par);
    		this.getTableData()
    		this.$message({
		        message: res.head.errorMsg,
		        type: 'success'
	        })
	    },
	    // 新增机构
	    addOrg() {
	    	this.orgForm = {}
  			this.orgDialogTitle = '机构新增'
  	    this.orgDialogVisible = true

  	    // this.$refs['orgForm'].resetFields()
  		},
	    // 编辑机构
	    async editOrg(item) {
        // this.$refs['orgForm'].resetFields()
  		  const par = { 'insId': item.insId }
  		  // const res = await postAwait(`${process.env.VUE_APP_JCHL_API}/gateway/org/back/institutionService/queryIns`, par)
        const res = await queryIns(par);
      	this.orgForm = res.body

	    	this.orgDialogTitle = '组织机构修改'
	    	this.orgDialogVisible = true
	    },
	    
	    //	提交机构表单
      async submitOrgForm() {
      	// const res = await postAwait(`${process.env.VUE_APP_JCHL_API}/gateway/org/back/institutionService/addIns`, this.orgForm)
        const res = await submitOrgForm(this.orgForm);
  		  this.$message({
	        message: res.head.errorMsg,
	        type: 'success'
        })
        this.orgDialogVisible = false

        // 更新表格
        this.getTableData()
      },
      
      //  跳转到用户部门管理
      gotoUserdep(item) {
      	this.$router.push({ path: '/org-manage/user-dep-manager', query: { depId: item.insId }})
      }
    }
}
</script>

<style lang="scss" >
	.table-filter{
    .el-input{
      width: 200px;
    }
  }
</style>
