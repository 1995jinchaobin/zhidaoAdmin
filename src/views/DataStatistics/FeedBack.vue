<template>
  <div class="content">
    <!-- <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe> -->
    <el-drawer size="50%" title="反馈管理" :visible.sync="drawer" direction="rtl">
      <el-form class="form" style="margin-top:-32px">
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="姓名 :">
                <label
                  :show-overflow-tooltip="true"
                  v-if="temporaryDate.name !=undefined&&temporaryDate.name .length>15"
                >{{temporaryDate.name .substring(0,15)+"..."}}</label>
                <label
                  :show-overflow-tooltip="true"
                  v-if="temporaryDate.name !=undefined&&temporaryDate.name .length<=15"
                >{{temporaryDate.name }}</label>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <!-- 个人 -->
              <el-form-item label="类型:">
                  <label v-if="temporaryDate.feedbackType ==0">其他</label>
                  <label v-if="temporaryDate.feedbackType ==1">使用建议</label>
                  <label v-if="temporaryDate.feedbackType ==2">故障错误</label>
                  <label v-if="temporaryDate.feedbackType ==3">内容漏缺</label>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="图片:">
                <img width="50%" :src="temporaryDate.picUrl" />
                <el-button type="primary" @click="getfile(temporaryDate.picUrl)" size="small">点击下载</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="23">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="内容:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.content"
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.content !=undefined&&temporaryDate.content .length>30"
                  >{{temporaryDate.content .substring(0,30)+"..."}}</label>
                  <label
                    v-if="temporaryDate.content !=undefined&&temporaryDate.content .length<=30"
                  >{{temporaryDate.content }}</label>
                  </el-tooltip>


              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="邮箱 :">
                <label
                  v-if="temporaryDate.email!=undefined&&temporaryDate.email.length>15"
                >{{temporaryDate.email.substring(0,15)+"..."}}</label>
                <label
                  v-if="temporaryDate.email!=undefined&&temporaryDate.email.length<=15"
                >{{temporaryDate.email}}</label>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="电话:">
                <label
                  v-if="temporaryDate.phone !=undefined&&temporaryDate.phone .length>15"
                >{{temporaryDate.phone .substring(0,15)+"..."}}</label>
                <label
                  v-if="temporaryDate.phone !=undefined&&temporaryDate.phone .length<=15"
                >{{temporaryDate.phone }}</label>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <div v-if="check!=0">
          <el-divider content-position="left">修改面板</el-divider>
          <el-row>
            <el-col :span="24">
              <el-form label-width="100px">
                <el-form-item label="反馈状态:">
                  <el-radio v-model="searchParams.updateFeedBack.state" :label="0">未处理</el-radio>
                  <el-radio v-model="searchParams.updateFeedBack.state" :label="1">已处理</el-radio>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form label-width="100px">
                <el-form-item label>
                  <!--  修改接口 -->
                  <el-button
                    v-if="check==2"
                    @click="ascertain(temporaryDate.id)"
                    type="primary"
                    size="medium"
                  >确定</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="3">
              <el-form label-width="100px">
                <el-form-item label>
                  <el-button @click="cancel" size="medium">取消</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <!-- <el-row v-if="check">
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="23">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="审核状态:">
                <el-radio v-model="searchParams.getStudioAudit.state" label="2">通过</el-radio>
                <el-radio v-model="searchParams.getStudioAudit.state" label="1">不通过</el-radio>
                <br />
                <el-input
                  v-if="searchParams.getStudioAudit.state==1"
                  v-model="searchParams.getStudioAudit.examineInfo"
                  show-word-limit
                  maxlength="100"
                  type="text"
                  placeholder="驳回理由"
                ></el-input>
                <el-button type="primary" @click="ascertain(temporaryDate.id)" size="small">确定</el-button>
                <el-button type="primary" @click="cancel" size="small">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>-->
      </el-form>
    </el-drawer>
    <div class="note">
      <div class="noteText">反馈管理</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.getFeedBacks.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item label="状态:">
                <el-select placeholder="状态" v-model="searchParams.getFeedBacks.state">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="未处理" value="0"></el-option>
                  <el-option label="已处理" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query"  v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="reset">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table row-class-name="trStyle" class="tableData" :data="tableData" border stripe width="100%">
            <!-- <el-table-column align="center" label="图片" width="150">
              <template slot-scope="scope">
                <img
                  v-if="scope.row.picUrl!=null&&scope.row.picUrl!=''"
                  :src="scope.row.picUrl"
                  style="width: 90px;height:90px"
                />
                <img
                  v-if="scope.row.picUrl==null||scope.row.picUrl==''"
                  src="../../assets/imgs/pursedetails/no.png"
                  style="width: 90px;height:90px"
                />
              </template>
            </el-table-column>-->
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="name"
              label="姓名"
              width="200"
            ></el-table-column>

            <el-table-column align="center" width="100" label="类别">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.feedbackType  ==0">其他</el-tag>
                <el-tag v-if="scope.row.feedbackType  ==1">使用建议</el-tag>
                <el-tag v-if="scope.row.feedbackType  ==2">故障错误</el-tag>
                <el-tag v-if="scope.row.feedbackType  ==3">内容漏缺</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="content"
              label="内容"
              width="300"
            ></el-table-column>
            <el-table-column align="center" width="120" label="状态">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.state  ==0">未处理</el-tag>
                <el-tag v-if="scope.row.state ==1">已处理</el-tag>
              </template>
            </el-table-column>
            <!-- <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="id"
              label="用户编号"
              width="100"
            ></el-table-column>-->
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="phone"
              label="电话"
              width="150"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="email"
              label="邮箱"
              width="150"
            ></el-table-column>
            <el-table-column align="center" prop="createTime" width="250" label="创建时间"></el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" @click="checkf(scope.row,0)" size="small"  v-if="user.roleBtns.indexOf(url+'select')>-1">查看</el-button>
                <el-button type="primary" @click="checkf(scope.row,2)" size="small"  v-if="user.roleBtns.indexOf(url+'update')>-1">编辑</el-button>
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
import httpUtil from "../../utils/js/HttpUtil";
import messageUtil from "../../utils/js/MessageUtil";
import {mapGetters} from 'vuex'
export default {
  name: "StudioAudit",
  path: "studioAudit",
  data() {
    return {
      //请求的接口
      actions: {
        getFeedBacks: "/feedback/getFeedBacks", //反馈查询
        updateFeedBack: "/feedback/updateFeedBack" //反馈修改
      },
      //查询参数
      searchParams: {
        getFeedBacks: {
          //反馈查询
          key: "", //关键字
          state: "" //0未处理1已处理
        },
        updateFeedBack: {
          //反馈修改
          id: "", //id
          state: "" //0未处理1已处理
        }
      },
      //分页参数
      page: {
        page: 1,
        rows: 10,
        total: 1000
      },
      tableData: [],
      temporaryDate: [], //临时数据
      drawer: false, //抽屉控制
      check: 0, //修改状态
      gaoqingimg: "", //下载图片地址
      direction: "rtl",
      url:''
    };
  },
  methods: {
    //下载文件
    getfile(e) {
      //console.log(e);
      this.gaoqingimg = e + "?response-content-type=application%2Foctet-stream"; //打开子页面加载
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getFeedBacks,
        {
          ...this.searchParams.getFeedBacks,
          ...this.page
        },
        data => {
          //console.log(data);
          this.tableData = data.data.list;
          this.page.total = data.data.total;
          this.page.page = data.data.pageNum;
        }
      );
    },
    //反馈管理选择确定
    ascertain(e) {
      //console.log(e);
      this.searchParams.updateFeedBack.id = e;
      this.updateFeedBack();
      this.drawer = false;
    },
    //反馈管理取消
    cancel() {
      this.drawer = false;
    },
    //编辑
    checkf(e, f) {
      this.drawer = true;
      //console.log(e);
      this.temporaryDate = e;
      this.searchParams.updateFeedBack.state = e.state;
      this.check = f;
    },
    query() {
      //查询
      this.page.page = 1;
      this.page.rows = 10;
      this.page.total = 0;
      this.getData();
    },

    reset() {
      //重置
      this.page.page = 1;
      this.page.rows = 10;
      this.page.total = 0;
      this.searchParams.getFeedBacks.key = "";
      this.searchParams.getFeedBacks.state = "";
      this.getData();
      this.$forceUpdate();
    },

    //修改反馈
    updateFeedBack() {
      let self = this;
      httpUtil.xhrPost(
        this,
        this.actions.updateFeedBack,
        {
          ...this.searchParams.updateFeedBack,
          ...this.page
        },
        data => {
          //console.log(data);
          self.getData();
          messageUtil.message.success("处理成功");
        }
      );
    },
    changePage(page) {
      this.page.page = page;
      //console.log(this.page.page);
      this.getData();
    }
  },
  mounted() {
    this.getData();
    this.url=this.$route.path;
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
};
</script>

<style>
/* 此处为element ui样式,请勿合并到下面 */
 tr.trStyle{
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
</style>
