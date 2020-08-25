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
              <template slot-scope="scope">
                <div class="td-nowrap" :title="scope.row.organizationCode">
                  {{ scope.row.organizationCode }}
                </div>
              </template>
            </el-table-column>

            <el-table-column
  					      
              label="机构名称"
              min-width="160"
            >
              <template slot-scope="scope">
                <div class="td-nowrap" :title="scope.row.insName">
                  {{ scope.row.insName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
  					      
              label="机构类型"
              width="100"
            >
              <template slot-scope="scope">
                <div class="td-nowrap" :title="scope.row.typeId">
                  {{ scope.row.typeId }}
                  <!-- {{ scope.row.typeId | insTypeFormat }} -->
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="contact"
              label="联系人"
              width="150"
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
              width="120"
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
              <template slot-scope="scope">
                <el-switch
                  :value="scope.row.isValid"
                  @change="updateState($event,scope.row)"
                >
                </el-switch> 
                <i class="el-icon-edit-outline icon-operate-st1" style="" title="编辑" @click="editOrg(scope.row)"></i>
                <i class="el-icon-question icon-operate-st1" style="" title="查看部门" @click="gotoUserdep(scope.row)"></i>
              </template>
	  					    	 	
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
        //return '550px'
        return this.provObj.tableHeight
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
	    	
        const res = await getTableData(par);
        debugger
	    	/*if (res.body){
	    		this.tableDataLoading = false
    			this.tableData = res.body.data
    			this.paginationPar = res.body.pager
	    	}*/
        this.tableDataLoading = false
        this.tableData = res.data.array
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
        // 实际开发逻辑
	    	/*const par = { 'insId': row.insId, 'isValid': v }
	    	
        const res = await updateState(par);
    		this.getTableData()
    		this.$message({
		        message: res.head.errorMsg,
		        type: 'success'
	        })*/

        // 假逻辑 lss 2020-08-25
        row.isValid = v
        this.$message({
            message: '状态更新成功',
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
        // 实际开发逻辑
  		  /*const par = { 'insId': item.insId }
  		  
        const res = await queryIns(par);
      	this.orgForm = res.body

	    	this.orgDialogTitle = '组织机构修改'
	    	this.orgDialogVisible = true*/

        // 假逻辑 lss 2020-08-25
        this.orgForm = item

        this.orgDialogTitle = '组织机构修改'
        this.orgDialogVisible = true
	    },
	    
	    //	提交机构表单
      async submitOrgForm() {
      	
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
	
  /* 页面公用样式后面要移到page.css中 */
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .lss-form {

    /* label,.form-label{
      width: 120px;
    } */
    .el-select {
      width: 100%;
    }
  }

  .app-wrapper {
    .app-main {
      .el-scrollbar {
        background-color: inherit !important;
        border          : none !important;

        .el-scrollbar__view {
          height: 100%;

          .page-layout {
            // padding-top:10px;
            width         : 100%;
            border        : none;
            height        : 100%;

            .table-box {
              .el-table {
                border-left: none;
              }
            }

          }
        }
      }
    }
  }


  .box-flex {
    width         : 100%;
    height        : 100%;
    display       : flex;
    flex-direction: row;
    flex          : auto;
    overflow      : auto;
  }

  .border-gray {
    border: 1px solid #e8e8e8;
  }

  .icon-st1 {
    font-size    : 18px;
    /* width     : 30px;
    height       : 30px; */
    border       : 1px solid #c2c2c2;
    border-radius: 4px;
    cursor       : pointer;
    margin-right : 8px;
    padding      : 4px;

    &:hover {
      color : #0066b3;
      border: 1px solid #0066b3;
    }
  }

  .icon-operate-st1 {
    font-size     : 26px;
    vertical-align: middle;
    margin        : 0 5px;
    cursor        : pointer;

    &:hover {
      color: #53acf3;
    }
  }

  .lss-tree-box {
    padding: 10px 0;

    .el-tree {
      max-height: 500px;
      overflow  : auto;
    }

  }

  .page-left {
    box-sizing    : border-box;
    width         : 200px;
    flex          : 0 0 200px;
    flex-direction: column;
    margin-right  : 6px;
    background    : #fff;

    .page-left-title {
      line-height  : 48px;
      padding      : 0 10px;
      border-bottom: 1px solid #d9d9d9;
    }
  }

  .page-right {
    box-sizing    : border-box;
    display       : flex;
    flex-direction: column;
    flex          : auto;
    overflow      : hidden;
    background    : #fff;

    .table-filter {
      padding: 10px;

      .el-input {
        width: 210px;
      }

      .table-filter-btn {
        /*float: right;*/
      }
    }

    .pagination-box {
      text-align: right;
      padding   : 15px;
    }

    .td-nowrap {
      white-space: nowrap;
    }

  }
</style>
