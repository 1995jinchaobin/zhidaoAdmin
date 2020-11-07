<template>
  <div class="content">
    <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe>
    <el-drawer size="50%" title="审核详情" :visible.sync="drawer" direction="rtl">
      <el-form class="form" style="margin-top:-32px">
        <el-divider content-position="left">工作室信息</el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="工作室名称:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.studioName "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.studioName !=undefined&&temporaryDate.studioName .length>15"
                  >{{temporaryDate.studioName .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.studioName !=undefined&&temporaryDate.studioName .length<=15"
                  >{{temporaryDate.studioName }}</label>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <!-- 个人 -->
              <el-form-item label="工作室类型:">
                <el-tooltip class="item" effect="dark" content="个人" placement="top">
                  <label v-if="temporaryDate.corporateStudioYn==0">个人</label>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="企业" placement="top">
                  <label v-if="temporaryDate.corporateStudioYn==1">企业</label>
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
              <el-form-item label="工作室Logo:">
                <img width="50%" @click="getfile(temporaryDate.studioLogo)" class="imgDown" :src="temporaryDate.studioLogo" />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item v-if="temporaryDate.corporateStudioYn==0"  @click="getfile(temporaryDate.theSampleWorks)" class="imgDown" label="示例作品:">
              </el-form-item>
              <el-form-item v-if="temporaryDate.corporateStudioYn==1"  @click="getfile(temporaryDate.businessLicense)" class="imgDown" label="营业执照:">
                <img width="50%" :src="temporaryDate.businessLicense " />
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
              <el-form-item label="工作室简介:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.studioIntroduction "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.studioIntroduction !=undefined&&temporaryDate.studioIntroduction .length>15"
                  >{{temporaryDate.studioIntroduction .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.studioIntroduction !=undefined&&temporaryDate.studioIntroduction .length<=15"
                  >{{temporaryDate.studioIntroduction }}</label>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item v-if="temporaryDate.corporateStudioYn==0" label="示例作品描述:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.descriptionOfSampleWorks "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.descriptionOfSampleWorks !=undefined&&temporaryDate.descriptionOfSampleWorks .length>15"
                  >{{temporaryDate.descriptionOfSampleWorks .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.descriptionOfSampleWorks !=undefined&&temporaryDate.descriptionOfSampleWorks .length<=15"
                  >{{temporaryDate.descriptionOfSampleWorks }}</label>
                </el-tooltip>
              </el-form-item>
              <el-form-item v-if="temporaryDate.corporateStudioYn==1" label="企业介绍:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.companyProfile "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.companyProfile !=undefined&&temporaryDate.companyProfile .length>15"
                  >{{temporaryDate.companyProfile .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.companyProfile !=undefined&&temporaryDate.companyProfile .length<=15"
                  >{{temporaryDate.companyProfile }}</label>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-divider content-position="left">设计师信息</el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="真实姓名:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.name"
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.name!=undefined&&temporaryDate.name.length>15"
                  >{{temporaryDate.name.substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.name!=undefined&&temporaryDate.name.length<=15"
                  >{{temporaryDate.name}}</label>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="手机号:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.phone "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.phone !=undefined&&temporaryDate.phone .length>15"
                  >{{temporaryDate.phone .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.phone !=undefined&&temporaryDate.phone .length<=15"
                  >{{temporaryDate.phone }}</label>
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
              <el-form-item label="邮箱:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.email "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.email !=undefined&&temporaryDate.email .length>15"
                  >{{temporaryDate.email .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.email !=undefined&&temporaryDate.email .length<=15"
                  >{{temporaryDate.email }}</label>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="身份证号:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.idNumber "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.idNumber !=undefined&&temporaryDate.idNumber .length>15"
                  >{{temporaryDate.idNumber .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.idNumber !=undefined&&temporaryDate.idNumber .length<=15"
                  >{{temporaryDate.idNumber }}</label>
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
              <el-form-item label="手持正面照:">
                <img width="50%" @click="getfile(temporaryDate.identityPersonCard)" class="imgDown" :src="temporaryDate.identityPersonCard " />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="身份证正面:">
                <img width="50%" @click="getfile(temporaryDate.identityCardFront)" class="imgDown" :src="temporaryDate.identityCardFront " />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="身份证背面:">
                <img width="50%" @click="getfile(temporaryDate.identityCardVerso)" class="imgDown" :src="temporaryDate.identityCardVerso " />
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
              <el-form-item label="单位/学校名:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.companyName "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.companyName !=undefined&&temporaryDate.companyName .length>15"
                  >{{temporaryDate.companyName .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.companyName !=undefined&&temporaryDate.companyName .length<=15"
                  >{{temporaryDate.companyName }}</label>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="个人履历:">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="temporaryDate.curriculumVitae "
                  placement="top"
                >
                  <label
                    v-if="temporaryDate.curriculumVitae !=undefined&&temporaryDate.curriculumVitae .length>15"
                  >{{temporaryDate.curriculumVitae .substring(0,15)+"..."}}</label>
                  <label
                    v-if="temporaryDate.curriculumVitae !=undefined&&temporaryDate.curriculumVitae .length<=15"
                  >{{temporaryDate.curriculumVitae }}</label>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <div v-if="check!=0">
          <el-divider content-position="left">审核面板</el-divider>
          <el-row>
            <el-col :span="24">
              <el-form label-width="100px">
                <el-form-item label="审核状态:">
                  <el-radio v-model="searchParams.getStudioAudit.examineState" label="1">审核不通过</el-radio>
                  <el-radio v-model="searchParams.getStudioAudit.examineState" label="2">审核通过</el-radio>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <el-form label-width="100px">
                <el-form-item label="审核备注:">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="searchParams.getStudioAudit.examineInfo"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-form label-width="100px">
                <el-form-item label>
                  <!-- 审核接口 -->
                  <el-button
                    v-if="check==1"
                    @click="ascertain(temporaryDate.id)"
                    type="primary"
                    size="medium"
                  >确定</el-button>
                  <!--  修改接口 -->
                  <el-button
                    v-if="check==2"
                    @click="ascertain2(temporaryDate.id)"
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
                <el-radio v-model="searchParams.getStudioAudit.examineState" label="2">通过</el-radio>
                <el-radio v-model="searchParams.getStudioAudit.examineState" label="1">不通过</el-radio>
                <br />
                <el-input
                  v-if="searchParams.getStudioAudit.examineState==1"
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
      <div class="noteText">工作室审核</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.getStudioList.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item label="审核状态:">
                <el-select placeholder="审核状态" v-model="searchParams.getStudioList.examineState">
                  <el-option label="审核中" value="0"></el-option>
                  <el-option label="审核不通过" value="1"></el-option>
                  <el-option label="审核通过" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query" v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="reset">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table class="tableData" :data="tableData" border stripe width="100%">

            <el-table-column align="center" label="工作室logo" width="150">
              <template slot-scope="scope">
                <img v-if="scope.row.studioLogo!=null" :src="scope.row.studioLogo+'?x-oss-process=image/resize,m_fixed,h_90,w_60'" style="width: 90px;height:90px" />
                <img v-if="scope.row.studioLogo==null" src="../../assets/imgs/pursedetails/no.png" style="width: 90px;height:90px" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="name"
              label="工作室名称"
              width="200"
            ></el-table-column>

            <el-table-column align="center" width="100" label="工作室类型">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.corporateStudioYn ==0">个人</el-tag>
                <el-tag v-if="scope.row.corporateStudioYn ==1">企业</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="studioIntroduction"
              label="工作室简介"
              width="300"
            ></el-table-column>
            <el-table-column align="center" width="120" label="审核状态">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.examineState ==0">审核中</el-tag>
                <el-tooltip
                  v-if="scope.row.examineState ==1"
                  class="item"
                  effect="dark"
                  :content="scope.row.examineInfo "
                  placement="top-start"
                >
                  <el-tag type="danger">审核不通过</el-tag>
                </el-tooltip>
                <el-tag v-if="scope.row.examineState ==2">审核通过</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="userId"
              label="用户编号"
              width="100"
            ></el-table-column>
            <el-table-column align="center" prop="createTime" width="250" label="创建时间"></el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <!-- <el-button
                  type="primary"
                  v-if="scope.row.examineState ==0"
                  @click="checkf(scope.row,1)"
                  size="small"
                >审核</el-button> -->
                <el-button
                  @click="checkf(scope.row,0)"
                  size="small"
                  v-if="user.roleBtns.indexOf(url+'select')>-1"
                >查看</el-button>
                <el-button
                  type="primary"
                  @click="checkf(scope.row,2)"
                  size="small"
                  v-if="user.roleBtns.indexOf(url+'update')>-1"
                >编辑</el-button>
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
        getStudioAudit: "/studio/checkStudio", //审核工作室
        getStudioList: "/studio/getStudios", //工作室查询
        updateStudio: "/studio/updateStudio" //修改工作室
      },
      //查询参数
      searchParams: {
        getStudioAudit: {
          //审核工作室
          id: "", //工作室id
          examineState: "", //1审核不通过2审核通过
          examineInfo: "" //审核备注信息
        },
        getStudioList: {
          //工作室查询
          // page:1,//页数
          // rows:10,//行数
          key: "", //关键字
          examineState: "" //空为全部0审核中1审核不通过2审核通过
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
      check: 0, //是否需要审核
      drawer: false, //抽屉控制
      gaoqingimg: "",
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
    //审核选择通过
    ascertain(e) {
      if (
        this.searchParams.getStudioAudit.examineState != 1 &&
        this.searchParams.getStudioAudit.examineState != 2
      ) {
        this.$message.error("您未选择审核通过或审核不通过");
      } else if (
        this.searchParams.getStudioAudit.examineState == 1 &&
        this.searchParams.getStudioAudit.examineInfo == ""
      ) {
        this.$message.error("审核未通过没添加驳回理由");
      } else {
        this.searchParams.getStudioAudit.id = e;
        this.getcheckStudio();
        this.drawer = false;
      }
    },
    ascertain2(e) {
      if (
        this.searchParams.getStudioAudit.examineState != 1 &&
        this.searchParams.getStudioAudit.examineState != 2
      ) {
        this.$message.error("您未选择审核通过或审核不通过");
      } else if (
        this.searchParams.getStudioAudit.examineState == 1 &&
        this.searchParams.getStudioAudit.examineInfo == ""
      ) {
        this.$message.error("审核未通过没添加驳回理由");
      } else {
        this.searchParams.getStudioAudit.id = e;
        this.getcheckStudio2();
        this.drawer = false;
      }
    },
    //审核选择取消
    cancel() {
      this.searchParams.getStudioAudit.examineState = "";
      this.searchParams.getStudioAudit.examineInfo = "";
      this.drawer=false;
    },
    //审核
    checkf(e, f) {
      this.drawer = true;
      //console.log(e);
      this.temporaryDate = e;
      this.searchParams.getStudioAudit.examineState = "";
      this.searchParams.getStudioAudit.examineInfo = "";
      this.searchParams.getStudioAudit.id = "";
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
      this.searchParams.getStudioList.key = "";
      this.searchParams.getStudioList.examineState = "";
      this.getData();
      this.$forceUpdate();
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getStudioList,
        {
          ...this.searchParams.getStudioList,
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
    //审核工作室
    getcheckStudio() {
      let self = this;
      httpUtil.xhrPost(
        this,
        this.actions.getStudioAudit,
        {
          ...this.searchParams.getStudioAudit,
          ...this.page
        },
        data => {
          //console.log(data);
          self.getData();
          messageUtil.message.success("审核成功");
        }
      );
    },
    //修改工作室 和审核工作室用的同一个数据 只是接口不同
    getcheckStudio2() {
      let self = this;
      httpUtil.xhrPost(
        this,
        this.actions.updateStudio,
        {
          ...this.searchParams.getStudioAudit,
          ...this.page
        },
        data => {
          //console.log(data);
          self.getData();
          messageUtil.message.success("修改成功");
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
.imgDown{
  cursor: pointer;
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
