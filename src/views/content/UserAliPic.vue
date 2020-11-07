<template>
  <div class="content">
    <el-drawer size="50%" title="新增以图识图会员" :visible.sync="drawer" direction="rtl">
      <el-form class="form" style="margin-top:-32px">
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="用户编号:">
                <el-input type="number" v-model="searchParams.addUserAliPic.userId" @input="$forceUpdate()"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="20">
            <el-form label-width="110px" label-position="left">
              <el-form-item  label="状态:">
                <el-radio-group @change="drawerupdata()" v-model="searchParams.addUserAliPic.type">
                  <el-radio :label="0">平台以图识图会员</el-radio>
                  <el-radio :label="1">私有化部署会员</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="20">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="有效时间:">
                <div class="block">
                  <el-date-picker
                    v-model="searchParams.addUserAliPic.time"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                    default-time="00:00:00"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="appendtrue()" size="medium" v-if="user.roleBtns.indexOf(url+'update')>-1">确定</el-button>
          </el-col>
          <el-col :span="10">
            <el-button @click="cancelappend()" size="medium">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
    <el-drawer size="50%" title="修改以图识图会员" :visible.sync="drawer2" direction="rtl">
      <el-form class="form" style="margin-top:-32px">
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="20">
            <el-form label-width="110px" label-position="left">
              <el-form-item  label="状态:">
                <el-radio-group @change="drawerupdata()" v-model="searchParams.updateUserAliPic.type">
                  <el-radio :label="0">平台以图识图会员</el-radio>
                  <el-radio :label="1">私有化部署会员</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="20">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="有效时间:">
                <div class="block">
                  <el-date-picker
                    v-model="searchParams.updateUserAliPic.time"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                    default-time="00:00:00"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="modifytrue()" size="medium">确定</el-button>
          </el-col>
          <el-col :span="10">
            <el-button @click="cancelmodify()" size="medium">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
    <div class="note">
      <div class="noteText">以图识图会员管理</div>
    </div>

    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="用户编号:">
                <el-input v-model="searchParams.getUserAliPics.userId" placeholder="用户编号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query" v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="reset">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="append" v-if="user.roleBtns.indexOf(url+'add')>-1">新&nbsp;&nbsp;增</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table row-class-name="trStyle" class="tableData" :data="tableData" border stripe width="100%">
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="userId"
              label="用户编号"
              width="200"
            ></el-table-column>
            <el-table-column align="center" label="类型" width="200">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.type==0">平台以图识图会员</el-tag>
                <el-tag v-if="scope.row.type==1">私有化部署会员</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="time" label="会员有效时间"></el-table-column>
            <el-table-column align="center" label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" @click="modify (scope.row)" size="small" v-if="user.roleBtns.indexOf(url+'update')>-1">编辑</el-button>
                <el-button type="primary" @click="modify (scope.row)" size="small" v-if="user.roleBtns.indexOf(url+'update')==-1&&user.roleBtns.indexOf(url+'select')>-1">编辑</el-button>
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
        addUserAliPic: "/alipic/addUserAliPic", //新增以图识图会员
        getUserAliPics: "/alipic/getUserAliPics", //列表/高级查询以图识图会员
        updateUserAliPic: "/alipic/updateUserAliPic" //修改以图识图会员
      },
      //查询参数
      searchParams: {
        //新增以图识图会员
        addUserAliPic: {
          type:null,
          userId: "", //以图识图会员名称
          time: "" //以图识图会员有效时间
        },
        //列表/高级查询以图识图会员
        getUserAliPics: {
          userId: "" //关键字(可以搜索以图识图会员名)
          //fkUnitId:"", //外键单位id
        },
        //修改以图识图会员
        updateUserAliPic: {
          type:null,
          id: "", //以图识图会员id
          time: "" // 以图识图会员有效时间
        }
      },
      //分页参数
      page: {
        page: 1,
        rows: 10,
        total: 1000
      },
      tableData: [],
      temporaryDate: {}, //临时数据
      check: false, //是否需要审核
      drawer: false, //抽屉控制
      drawer2: false, //判断抽屉0新增 1修改
      gaoqingimg: "",
      direction: "rtl",
      url:''
    };
  },
  methods: {
    //新增以图识图会员
    append() {
      this.searchParams.addUserAliPic.type=null;
      this.searchParams.addUserAliPic.userId="";
      this.searchParams.addUserAliPic.time="";
      this.drawer = true;
    },
    modifytrue() {
      if (this.searchParams.updateUserAliPic.name == "") {
        this.$message.error("修改以图识图会员名称为空");
      } else if (
        this.searchParams.updateUserAliPic.name == "null" ||
        this.searchParams.updateUserAliPic.name == "underfined" ||
        !/[^\s]+/.test(this.searchParams.updateUserAliPic.name)
      ) {
        this.$message.error("修改以图识图会员名称有非法字符");
      } else {
        this.updateUserAliPic();
      }
    },
    updateUserAliPic() {
      httpUtil.xhrPost(
        this,
        this.actions.updateUserAliPic,
        {
          ...this.searchParams.updateUserAliPic,
          ...this.page
        },
        data => {
          //console.log(data);
          messageUtil.message.success("修改成功");
            this.drawer2 = false;
          this.getData();
        }
      );
    },
    //确定新增
    appendtrue() {
      if (this.searchParams.addUserAliPic.time == "") {
        this.$message.error("新增时间为空");
      }else if(this.searchParams.addUserAliPic.name== ""||this.searchParams.addUserAliPic.name== "underfind"||this.searchParams.addUserAliPic.name== "null"){
        this.$message.error("用户编号为空");
      }else {
        this.addUserAliPic();
      }
    },
    //取消新增
    cancelappend() {
      this.drawer = false;
    },
    cancelmodify() {
      this.drawer2 = false;
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
      this.searchParams.getUserAliPics.userId = "";
      this.getData();
      this.$forceUpdate();
    },
    //传新增以图识图会员数据
    addUserAliPic() {
      let self=this;
      httpUtil.xhrPost(
        this,
        this.actions.addUserAliPic,
        {
          ...this.searchParams.addUserAliPic,
        },
        data => {
          //console.log(data);
          self.drawer=false;
          messageUtil.message.success("新增成功");
          self.getData();
        }
      );
    },
    //修改以图识图会员
    modify(e) {
      this.drawer = false;
      this.drawer2 = true;
      this.searchParams.updateUserAliPic.type = e.type;
      this.searchParams.updateUserAliPic.id = e.id;
      this.searchParams.updateUserAliPic.time = e.time;
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getUserAliPics,
        {
          ...this.searchParams.getUserAliPics,
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
    drawerupdata() {
      this.$forceUpdate();
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
  height: calc(100vh - 122px);
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
  height: calc(100% - 32px);
  padding: 24px 24px 24px 24px;
  background-color: #f0f3f7;
}

.dataContent {
  width: calc(100% - 48px);
  height: calc(100% + 64px);
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
