<template>
  <div class="content">
    <div class="note">
      <div class="noteText">登录日志</div>
    </div>

    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.getLoginlogs.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-date-picker
                v-model="searchParams.getLoginlogs.startTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择起始时间"
              ></el-date-picker>
              <el-date-picker
                v-model="searchParams.getLoginlogs.endTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd 23:59:59"
                type="date"
                default-time="23:59:59"
                placeholder="选择结束时间"
              ></el-date-picker>
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
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="userAccount"
              label="用户账号"
              width="200"
            ></el-table-column>
            <el-table-column align="center" label="登录状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.state ==0" type="danger">失败</el-tag>
                <el-tag v-if="scope.row.state ==1">成功</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="登录类型">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.type ==0">电脑</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="loginDate"
              label="登录时间"
              width="200"
            ></el-table-column>

            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="requestIp"
              label="ip地址"
              width="200"
            ></el-table-column>


          </el-table>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            @current-change="changePage"
            :total="page.total"
            :current="page.page"
            :current-page.sync="page.page"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUtil from "../../utils/js/HttpUtil";
import {mapGetters} from 'vuex'
export default {
  name: "StudioAudit",
  path: "studioAudit",
  data() {
    return {
      //请求的接口
      actions: {
        getLoginlogs: "/system/log/getLoginlogs" //查询登陆日志
      },
      //查询参数
      searchParams: {
        getLoginlogs: {
          key: "",
          startTime: "",
          endTime: ""
        }
      },
      //分页参数
      page: {
        page: 1,
        rows: 10,
        total: 1000
      },
      tableData: [],
      url:''
    };
  },
  methods: {
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
      this.searchParams.getLoginlogs.key = "";
      this.searchParams.getLoginlogs.startTime = "";
      this.searchParams.getLoginlogs.endTime = "";
      this.getData();
      this.$forceUpdate();
    },

    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getLoginlogs,
        {
          ...this.searchParams.getLoginlogs,
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
  overflow: scroll;
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
