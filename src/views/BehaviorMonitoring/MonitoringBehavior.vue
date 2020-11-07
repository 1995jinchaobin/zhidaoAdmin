<template>
  <div class="content">
    <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe>
    <el-drawer size="50%" title="行为监控" :visible.sync="drawer" direction="rtl">
      <el-form class="form" style="margin-top:-32px">
        <!-- <el-divider v-if="check==0" content-position="left">查询行为监控</el-divider>
        <el-divider v-if="check==1" content-position="left">新增行为监控</el-divider>
        <el-divider v-if="check==2" content-position="left">修改行为监控</el-divider>-->
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:50px"></div>
          </el-col>
          <el-col :span="22">
            <el-date-picker
              v-model="searchParams.getMonitorBehaviorsdrawer.startTime"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择起始时间"
            ></el-date-picker>
            <el-date-picker
              v-model="searchParams.getMonitorBehaviorsdrawer.endTime"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd 23:59:59"
              type="date"
              default-time="23:59:59"
              placeholder="选择结束时间"
            ></el-date-picker>
              <el-button type="primary" @click="drawerquery">查&nbsp;&nbsp;询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="23">
            <div @scroll="stepscroll" ref="step" style="height: 600px;width:460px;overflow: auto;position:relative">
          <el-steps direction="vertical" :active="10000" 
              space="400px" align-center>
            <el-step 
              v-for="(item, index) in temporaryDate"
              :key="index"
              :title="item.router"
              :description="item.time"
            ></el-step>
          </el-steps>
          <div class="stepdiv" >
              <div style="float:left;height:100px" v-for="(item, index) in temporaryDate"
              :key="index">
                <img :src="item.stepimg" class="stepimg">
              </div>
            
          </div>
        </div>
          </el-col>
          <!-- <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <div @scroll="stepimgscroll" ref="stepimg" style="height: 600px;width:230px;margin: auto;overflow: auto;">
              <div class="stepdiv" v-for="(item, index) in temporaryDate"
              :key="index">
            <img :src="item.stepimg" class="stepimg">
          </div>
        </div>
          </el-col> -->
        </el-row>
        
      </el-form>
    </el-drawer>
    <div class="note">
      <div class="noteText">行为监控</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="用户编号:">
                <el-input v-model="searchParams.getMonitorBehaviors.userId" placeholder="用户编号"></el-input>
              </el-form-item>
              <el-form-item label="ip:">
                <el-input v-model="searchParams.getMonitorBehaviors.ip" placeholder="ip"></el-input>
              </el-form-item>
              <el-date-picker
                v-model="searchParams.getMonitorBehaviors.startTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择起始时间"
              ></el-date-picker>
              <el-date-picker
                v-model="searchParams.getMonitorBehaviors.endTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd 23:59:59"
                type="date"
                default-time="23:59:59"
                placeholder="选择结束时间"
              ></el-date-picker>
              <el-form-item>
                <el-button type="primary" @click="query">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="reset">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table row-class-name="tableData trStyle" :data="tableData" border stripe width="100%">
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="userId"
              label="用户编号"
              width="150"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="routerEn"
              label="路由"
              width="150"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="router"
              label="路由中文名"
              width="150"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="time"
              label="停留时间"
              width="150"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="ip"
              label="ip地址"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="createTime"
              label="创建时间"
            ></el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" @click="checkf(scope.row,0)" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            @current-change="changePage"
            :total="page.total"
            :current="page.page"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OSSUploadNoBtn from "../../views/common/OSSUploadNoBtn";
import httpUtil from "../../utils/js/HttpUtil";
import messageUtil from "../../utils/js/MessageUtil";
import SetType from "../../utils/js/SetType";
export default {
  name: "getMonitorBehaviors",
  path: "getMonitorBehaviors",
  components: {
    OSSUploadNoBtn
  },
  data() {
    return {
      //请求的接口
      actions: {
        getMonitorBehaviors: "/monitor/getMonitorBehaviors" //3d模特查询
      },
      //查询参数
      searchParams: {
        getMonitorBehaviors: {
          //行为监控查询
          userId: "", //用户id
          ip: "", //ip地址
          startTime: "",
          endTime: "",
          order: 1
        },
        getMonitorBehaviorsdrawer: {
          //行为监控查询
          userId: "", //用户id
          ip: "", //ip地址
          startTime: "",
          endTime: "",
          order: ""
        }
      },
      //分页参数
      page: {
        page: 1,
        rows: 10,
        total: 1000
      },
      pagedrawer: {
        page: 1,
        rows: 9999,
        total: 1000
      },
      tableData: [],
      temporaryDate: [], //临时数据
      drawer: false, //抽屉控制
      gaoqingimg: "", //下载图片地址
      direction: "rtl"
    };
  },
  methods: {
    stepscroll(e){
      // this.$refs.stepimg.scrollTop=e.target.scrollTop;
    },
    stepimgscroll(e){
      // this.$refs.step.scrollTop=e.target.scrollTop;
    },
    drawerupdata() {
      this.$forceUpdate();
    },
    drawercancel() {
      this.drawer = false;
    },
    //下载文件
    getfile(e) {
      this.gaoqingimg = e + "?response-content-type=application%2Foctet-stream"; //打开子页面加载
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getMonitorBehaviors,
        {
          ...this.searchParams.getMonitorBehaviors,
          ...this.page
        },
        data => {
          this.tableData = data.data.list;
          this.page.total = data.data.total;
          this.page.page = data.data.pageNum;
          let self=this;
          for(let i=0;i<self.tableData.length;i++){           
            if(self.tableData[i].userId==0){
              self.tableData[i].userId="未登录"
            }
            if(self.tableData[i].ip=='null'){
              self.tableData[i].ip=""
            }
          }
        }
      );
    },
    getDatadrawer() {
      let self=this;
      let type = typeof this.searchParams.getMonitorBehaviorsdrawer.userId;
      if (!this.searchParams.getMonitorBehaviorsdrawer.userId||type != 'number'){
        this.searchParams.getMonitorBehaviorsdrawer.userId = "";
      }
      httpUtil.xhrPost(
        this,
        this.actions.getMonitorBehaviors,
        {
          ...this.searchParams.getMonitorBehaviorsdrawer,
          ...this.pagedrawer
        },
        data => {
          this.temporaryDate = data.data.list;
          for(let i=0;i<self.temporaryDate.length;i++){
            if(self.temporaryDate[i].routerEn=='关闭'){      
              self.temporaryDate[i].stepimg="";       
            }else{              
            let img = self.temporaryDate[i].routerEn.split("/").join("");
            self.temporaryDate[i].stepimg = "../../static/" + img + ".png";
            }
          }
        }
      );
    },
    //行为监控管理选择确定
    ascertain(e) {
      this.drawer = false;
    },
    //行为监控管理取消
    cancel() {
      this.drawer = false;
    },
    //编辑
    checkf(e, f) {
      this.drawer = true;
      this.searchParams.getMonitorBehaviorsdrawer.userId = e.userId;
      this.searchParams.getMonitorBehaviorsdrawer.ip = e.ip;
      this.check = f;
      this.getDatadrawer();
    },
    query() {
      //查询
      this.page.page = 1;
      this.page.rows = 10;
      this.page.total = 0;
      this.searchParams.getMonitorBehaviors.order = 1;
      this.getData();
    },
    drawerquery() {
      this.page.page = 1;
      this.page.rows = 10;
      this.page.total = 0;
      this.getDatadrawer();
    },
    reset() {
      //重置
      this.page.page = 1;
      this.page.rows = 10;
      this.page.total = 0;
      this.searchParams.getMonitorBehaviors.key = "";
      this.searchParams.getMonitorBehaviors.userId = ""; //用户id
      this.searchParams.getMonitorBehaviors.ip = ""; //ip地址
      this.searchParams.getMonitorBehaviors.startTime = "";
      this.searchParams.getMonitorBehaviors.endTime = "";
      this.$forceUpdate();
    },

    changePage(page) {
      this.page.page = page;
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
.el-step__head{
  height: 100px!important;
}
.el-step__icon{
  width: 36px!important;
  height: 36px!important;
}
.is-vertical{
  left: 6px;
  width: 194px;
}
.is-text{
  left: -6px;
}
tbody tr.trStyle{
  height: 60px !important;
}
</style>
<style scoped>

.form {
  overflow-y: auto;
  height: calc(100vh - 80px);
}
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
  padding: 24px 24px 24px 24px;
  background-color: #f0f3f7;
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
  width: 100%;
  height: 100%;
}

.page {
  margin: 15px 15px;
  float: right;
}
.el-drawer__header {
  margin-bottom: 0px !important;
}
.stepdiv{
      width: 170px;
    position: absolute;
    top: 0;
    left: 230px;
}
.stepimg{
  width: 155px;
  height: 100px;
  margin: auto;
}
</style>
