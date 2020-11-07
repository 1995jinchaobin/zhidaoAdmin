<template>
  <div class="content">
    <div class="note">
      <div class="noteText">
        用户花型管理
      </div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="用户编号:">
                <el-input v-model="searchParams.userId"></el-input>
              </el-form-item>
              <el-form-item label="花型类型:">
                <el-select v-model="searchParams.type">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="花型设计" value="1"></el-option>
                  <el-option label="AI设计" value="2"></el-option>
                  <el-option label="商城花型" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search"  v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
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
                <img v-if="scope.row.type!=3" :src="scope.row.flowerType.preview+'?x-oss-process=image/resize,m_fixed,h_90,w_60'" style="width: 60px;height:90px">
                <img v-if="scope.row.type==3" :src="scope.row.storeIndentSubsidiary.picture1+'?x-oss-process=image/resize,m_fixed,h_90,w_60'" style="width: 60px;height:90px">
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="花型类型">
              <template slot-scope="scope">
                {{flowerType[scope.row.type-1]}}
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="用户编号">
              <template slot-scope="scope">
                {{scope.row.type==3?scope.row.storeIndentSubsidiary.sellerUserId:scope.row.flowerType.userId}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="detail(scope.row)"  v-if="user.roleBtns.indexOf(url+'select')>-1">查看</el-button>
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
      <el-drawer custom-class="drawerBox" size="50%" title="花型详情" :visible.sync="drawer" direction="rtl" :before-close="closeCheckDrawer">
        <el-divider content-position="left"></el-divider>
        <div class="checkDrawer" v-if="detailInfo.type!=3" >
          <el-form>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="图片预览:">
                    <img v-if="detailInfo.type!=3" width="50%" class="imgDown" @click="downLoad(userFlowerInfo.preview)" :src="userFlowerInfo.preview" />
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
                  <el-form-item label="格式:">
                    <label>{{userFlowerInfo.format}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="创建时间:">
                    <label>{{detailInfo.createTime}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="用户编号:">
                    <label>{{userFlowerInfo.userId}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="花型类型:">
                    <label >{{flowerType[detailInfo.type-1]}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="checkDrawer" v-if="detailInfo.type==3">
          <el-form>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="图片预览:">
                    <img width="50%" :src="userFlowerInfo.picture1" />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="花型名称:">
                    <el-tooltip class="item" effect="dark" :content="userFlowerInfo.name" placement="top">
                      <label v-if="userFlowerInfo.name!=undefined&&userFlowerInfo.name.length>15">{{userFlowerInfo.name.substring(0,15)+"..."}}</label>
                      <label v-if="userFlowerInfo.name!=undefined&&userFlowerInfo.name.length<=15">{{userFlowerInfo.name}}</label>
                    </el-tooltip>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="销量:">
                    <label>{{userFlowerInfo.salesVolume}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="尺寸(高):">
                    <label>{{userFlowerInfo.sizeHeight}} px</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="尺寸(宽):">
                    <label>{{userFlowerInfo.sizeWidth}} px</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="分辨率:">
                    <label>{{userFlowerInfo.resolutionRatio}} dpi</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="psd源文件:">
                    <el-button @click="downLoad(userFlowerInfo.sourceFile)" type="primary" size="small">点击下载</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="价格:">
                    <label>¥ {{userFlowerInfo.price}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="连接方式:">
                    <label v-if="userFlowerInfo.connect==0">未知</label>
                    <label v-if="userFlowerInfo.connect==1">独幅</label>
                    <label v-if="userFlowerInfo.connect==2">四方连续</label>
                    <label v-if="userFlowerInfo.connect==3">二方连续</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="类型:">
                    <label>{{detailInfo.genre1}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="风格:">
                    <label>{{detailInfo.styleType}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="当前状态:">
                    <el-tag v-if="userFlowerInfo.status==0" type="info">审核中</el-tag>
                    <el-tag v-if="userFlowerInfo.status==1" type="danger">审核不通过</el-tag>
                    <el-tag v-if="userFlowerInfo.status==2" type="success">审核通过</el-tag>
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
          getFlowerPatterns: "/userFlowers/getUserFlowers"
        },
        //查询参数
        searchParams: {
          //花型类型  空全部1花型设计2AI设计3花型商城
          type: "",
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
        flowerType:[
          '花型设计',
          'AI设计',
          '商城花型'
        ],
        url:''
      }
    },
    methods: {
      getData() {
        httpUtil.xhrPost(this, this.actions.getFlowerPatterns, {
          ...this.searchParams,
          ...this.page
        }, (data) => {
          if(data.data.list.length>0){
            for(var i=0;i<data.data.list.length;i++){
              if(data.data.list[i].type==3){
                data.data.list[i].genre1 = data.data.list[i].storeIndentSubsidiary.genre1;
                data.data.list[i].styleType = data.data.list[i].storeIndentSubsidiary.styleType;
              }
            }
          }
          this.tableData = SetType.setType(data,2);
          this.page.total = data.data.total
          this.page.page = data.data.pageNum
        })
      },
      search(){
        this.page.page=1
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
      }
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

<style  scoped>
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
  .imgDown{
    cursor: pointer;
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

  .drawerBox .el-divider {
    margin-top: -24px !important;
  }

  .checkDrawer {
    height: calc(90vh);
    margin-bottom: 100px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
