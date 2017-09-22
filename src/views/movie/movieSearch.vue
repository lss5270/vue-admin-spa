<template>
  <div class="app-container">
    <h2 style="color:red">
        注意：此页面使用了豆瓣api，请求方式为jsonp，支持分页和搜索功能。
    </h2>

    <!-- 搜索条件 -->
    <div class="filter-container">
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="明星、导演姓名" v-model="listQuery.name">
          </el-input>

            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="电影类型" v-model="listQuery.type">
            </el-input>

      <!-- <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select> -->

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <!-- <el-button class="filter-item" type="primary" @click="handleCreate"  icon="edit">添加</el-button>

      <el-button class="filter-item" type="primary" @click="handleDelAll"  icon="edit">批量删除</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button> -->
     
    </div>

    
   
    <!-- 表格 v-loading.body="listLoading"-->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="list"  element-loading-text="拼命加载中" border fit highlight-current-row  >
         <el-table-column type="selection" width="50">
         </el-table-column>

          <el-table-column align="center" label='序号' width="70" >
            <template scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>

            <el-table-column label="海报" width="" align="center">
            <template scope="scope">
                <a :href="scope.row.alt" class="" style="margin: 10px 0;display: inline-block;">
                    <img :src="scope.row.images.small" alt="" style="vertical-align: middle;">
                </a>
               
            </template>
          </el-table-column>

          <el-table-column label="名称" width="" prop="title" sortable>
            <template scope="scope">
               
              {{ scope.row.title }}
            </template>
          </el-table-column>
            
            <!-- 出错原因未知，先注释 -->
            <!-- <template v-if=" directors "> -->
                 <!--  <el-table-column label="导演" width="" prop="directors[0].alt" sortable>
                    <template scope="scope">
                      <a :href="scope.row.directors[0].alt">{{scope.row.directors[0].name}}</a>
                    </template>
                  </el-table-column> -->
            <!-- </template> -->

          <el-table-column label="主演" width="">
            <template scope="scope" >
                <template class="" v-for="item in scope.row.casts">
                    <p><a :href="item.alt">&nbsp;{{ item.name }}&nbsp;</a>、</p>
                </template>
               
            </template>
          </el-table-column>


          <el-table-column label="类型" width="">
            <template scope="scope">
              <span>{{scope.row.genres}}</span>
            </template>
          </el-table-column>

          <el-table-column label="综合评分"  align="center" width=""  prop="rating.average" sortable >
            <template scope="scope">
              {{scope.row.rating.average}}
            </template>
          </el-table-column>

          <el-table-column align="center" prop="created_at" label="收藏量" width=""   >
            <template scope="scope">
              
              <span>{{scope.row.collect_count}}</span>
            </template>
          </el-table-column>

            <el-table-column align="center"  label="上映年份" prop="year" sortable >
                <template scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span>{{scope.row.year}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center"  label="操作" >
                <template scope="scope">
                    
                   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                   <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                         
                </template>
            </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.currPage"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="表单新增" :visible.sync="dialogFormVisible">
          <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
         
           

            <el-form-item label="字段1">
              <el-input v-model="temp.chnlId"></el-input>
            </el-form-item>

            <el-form-item label="字段2">
              <el-input v-model="temp.hisChnlId"></el-input>
            </el-form-item>

            <el-form-item label="字段3">
              <el-input v-model="temp.chnlName"></el-input>
            </el-form-item>

            <el-form-item label="字段4">
              <el-input v-model="temp.state"></el-input>
            </el-form-item>

           
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
           
            <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          </div>
    </el-dialog>

  </div>
</template>

<script>
// import { getList } from 'api/article';
import {global} from 'src/global/global';
import {api} from 'src/global/api';

export default {
  data() {
    return {
        // list: null,
        // listLoading: true,

        list: null,//表格list
        total: null,
        listLoading: true,
        listQuery: {
            currPage: 1,
            pageSize: 10,

            // importance: undefined,
            name: '',
            type: null,//类型
               
        },
        temp: {
            "chnlId": "22",
            "hisChnlId": "",
            "chnlName": "",
            "state": "",
            "isavailable": "",
            "orderNum": 10
        },
        typeOptions:[
          { key: '001', display_name: '类型1' },
          { key: '002', display_name: '类型2' },
          { key: '003', display_name: '类型3' }
         
        ],
        dialogFormVisible: false,
        multipleSelection: []

    }
  },
  mounted() {
    var vm = this;

    // vm.getList();



  },
  methods: {
    //获取列表数据
    getList() {
        var vm = this;

        vm.listLoading = true;

        //请求参数
        let par = {
            "count": vm.listQuery.pageSize,
            "start": (vm.listQuery.currPage-1)*vm.listQuery.pageSize,
            "q": vm.listQuery.name,         //明星、导演姓名
            "tag": vm.listQuery.type,       //类型
        };
        // jsonp请求方式
        vm.$http.jsonp('https://api.douban.com/v2/movie/search',{params: par}).then(res => {
            console.log(res)
            // success callback
             var data = res.body;

             console.log(data)

             
            if(data.subjects){ 
                 
                 vm.list = data.subjects;
                 console.log('列表数据：',vm.list);
                 // vm.listQuery.currPage = data.start + 1; //页数开始
                 // vm.listQuery.pageSize = data.count;     //每页多少条
                 vm.total = data.total;

                 vm.listLoading = false;
                 
            }else{
                 //alert(res.body.resultMsg)
                 Message({
                     showClose: true,
                     message: res.body.resultMsg,
                     type: 'error'
                 });
                 vm.listLoading = false;
            }
        }, res => {
            // error callback
            console.log(res)

            vm.listLoading = false;
        });
        // jsonp请求方式 end
        return false;
        global.get( api.movieSearch,{params: par},function(res){
                //console.log('-------获取到数据：',JSON.stringify(res) )
                var data = res.body;

                console.log(data)

                
               if(data.subjects){ 
                    
                    vm.list = data.subjects;
                    console.log('列表数据：',vm.list);
                    vm.listQuery.currPage = data.start + 1; //页数开始
                    vm.listQuery.pageSize = data.count;     //每页多少条
                    vm.total = data.total;

                    vm.listLoading = false;
                    
               }else{
                    //alert(res.body.resultMsg)
                    Message({
                        showClose: true,
                        message: res.body.resultMsg,
                        type: 'error'
                    });
                    vm.listLoading = false;
               }
               
                
        },function(res){
            
            vm.listLoading = false;
        },true)

        

    },
    //编辑
    handleEdit(index,row){
        var vm = this;
        console.log('编辑的row：',index,'-----',row);
        //跳页面进行修改
        //this.$router.push('/example/form'); 
        this.$router.push( { path: '/example/form', query: { id: row.chnlId } } ); //带参跳转
    },
    //单个删除
    handleDelete(index,row){
        var vm = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除。
        vm.list.splice(index,1)
    },
    //批量删除
    handleDelAll(){
        var vm = this;
        console.log('批量删除选择的row：',vm.multipleSelection)
    },
    //搜索
    handleFilter() {
      this.getList();
    },
    //操作分页
    handleSizeChange(val) {
        console.log('--------一页多少条：',val)
      this.listQuery.pageSize = val;
      this.getList();
    },
    //操作分页
    handleCurrentChange(val) {
        console.log('--------当前页：',val)
      this.listQuery.currPage = val;
      this.getList();
    },
    //新增
    handleCreate() {
        
        this.dialogFormVisible = true;
    },
    //新增提交
    handleCreateSubmit(){
        var vm = this;
        console.log('新增入参：',vm.temp,vm.list)

        //这里作演示用，正式新增 请提交到接口
        vm.list.push(vm.temp)
        console.log('新增后',vm.list)
        
        this.dialogFormVisible = false;
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },

    handleDownload() {
      var vm = this;

      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['字段1', '字段2', '字段3', '字段4', '字段5'];
        const filterVal = ['chnlId', 'hisChnlId', 'chnlName', 'state', 'isavailable'];
        const list = vm.list;
        const data = vm.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '导出的列表excel');
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
};
</script>
