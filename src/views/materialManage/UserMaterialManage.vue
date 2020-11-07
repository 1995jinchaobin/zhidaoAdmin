<template>
  <div class="content">
    <div class="note">
      <div class="noteText">
        用户素材管理
      </div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="卖家用户编号:">
                <el-input v-model="searchParams.userId"></el-input>
              </el-form-item>
              <el-form-item label="素材来源:">
                <el-select v-model="searchParams.origin">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="本地上传" value="0"></el-option>
                  <el-option label="商城素材" value="1"></el-option>
                  <el-option label="工作室上传" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search" v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="clearSearchInfo">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
            </el-form>

          </div>
        </div>
        <div class="dataListArea">
          <el-table class="tableData" :data="tableData" border stripe width="100%">
            <el-table-column align="center" :show-overflow-tooltip="true" prop="id" label="编号" >
            </el-table-column>
            <el-table-column align="center" label="图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.picture+'?x-oss-process=image/resize,m_fixed,h_90,w_60'" style="width: 60px;height:90px">
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="素材来源">
              <template slot-scope="scope">
                {{originList[scope.row.origin]}}
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="卖家用户编号" prop="userId">
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="detail(scope.row)" v-if="user.roleBtns.indexOf(url+'select')>-1">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="page.total"
                         :current-page.sync="page.page">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <el-drawer  custom-class="drawerBox" size="50%" title="素材详情" :visible.sync="drawer" direction="rtl" :before-close="closeCheckDrawer">
        <el-divider content-position="left"></el-divider>
        <div class="checkDrawer">
          <el-form>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="图片预览:">
                    <img width="50%" @click="downLoad(detailInfo.picture)" class="imgDown" :src="detailInfo.picture" />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="编号:">
                    <label >{{detailInfo.id}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="来源:">
                    <label>{{originList[detailInfo.origin]}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="上传时间:">
                    <label>{{detailInfo.createTime}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="上传用户id:">
                    <label>{{detailInfo.userId}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-drawer>
    </div>
  </div>

</template>

<script>
  import httpUtil from '../../utils/js/HttpUtil';
  import SetType from '../../utils/js/SetType'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        //请求的接口
        actions: {
          getMaterialMes: "/materialMe/getMaterialMes"
        },
        //查询参数
        searchParams: {
          //素材来源  空全部 0本地上传1商城购买的素材2工作室上传自动转换
          origin: "",
          //用户编号(不查请传空)
          userId: ""
        },
        //分页参数
        page: {
          page: 1,
          rows: 10,
          total: 0
        },
        tableData: [],
        //抽屉
        drawer: false,
        //某条详情的信息
        detailInfo: {},
        userFlowerInfo:{},
        originList:[
          '本地上传',
          '商城素材',
          '工作室上传'
        ],
        url:''
      }
    },
    methods: {
      getData() {
        httpUtil.xhrPost(this, this.actions.getMaterialMes, {
          ...this.searchParams,
          ...this.page,
          type1:'1'
        }, (data) => {
          this.tableData = SetType.setType(data,1);
          this.page.total = data.data.total
          this.page.page = data.data.pageNum
        })
      },
      search(){
        this.page.page=1;
        this.getData()
      },
      changePage(page) {
        this.page.page = page;
        this.getData();
      },
      // 下载文件
      downLoad(url){
        window.location.href = url+'?response-content-type=application%2Foctet-stream';
      },
      //重置
      clearSearchInfo() {
        this.page.page = 1;
        this.page.rows = 10;
        this.page.total = 0;
        this.searchParams = {}
        this.getData()
      },
      //点击编辑按钮，显示编辑弹框
      detail(row) {
        this.drawer = true;
        this.detailInfo = row;
        this.userFlowerInfo = row.type==3?this.detailInfo.storeIndentSubsidiary:this.detailInfo.flowerType
      },
      //关闭抽屉清空数据
      closeCheckDrawer() {
        this.drawer = false;
        this.detailInfo = {};
      },
      // 下载文件
			downLoad(url){
				window.location.href = url+'?response-content-type=application%2Foctet-stream';
			},
    },
    mounted() {
      if(this.$route.params.userId){
        this.searchParams.userId = this.$route.params.userId
      }
      this.getData();
      this.url=this.$route.path;
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    }
  }
</script>

<style scoped>
  .content {
    overflow-y: auto;
    overflow-x: hidden;
    width: calc(100%);
    height: calc(100vh - 64px) !important;
  }

  .note {
    height: 64px;
  }

  .noteText {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    height: 28px;
    padding-left: 32px;
    padding-top: 18px;
    font-weight: bold;
  }

  .data {
    width: calc(100%);
    min-height: calc(100% - 64px);
    height: auto;
    padding: 24px 24px 24px 24px;
    background-color: #F0F3F7;
  }

  .dataContent {
    width: calc(100% - 48px);
    background-color: #fff;
    border-radius: 2px;
    border-radius: 2px;
    padding-bottom: 32px;
  }

  .searchArea {
    width: calc(100%);
    margin: 0px 24px 0px 0px;
  }
  .imgDown{
    cursor: pointer;
  }
  .searchForm {
    padding-top: 24px;
    padding-left: 32px;
  }

  .dataListArea {
    margin: 0px 24px 24px 24px;
  }

  .tableData {
    height: 100%;
  }

  .page {
    margin: 15px 15px;
    float: right;
  }

  .el-drawer__header {
    margin-bottom: 0px !important;
  }

  .checkDrawer {
    height: calc(90vh);
    margin-bottom: 100px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .drawerBox .el-divider {
    margin-top: -24px !important;
  }
</style>
