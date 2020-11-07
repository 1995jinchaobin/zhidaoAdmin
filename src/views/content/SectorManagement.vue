<template>
  <div class="content">
    <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe>
    <el-drawer size="50%" title="新增部门" :visible.sync="drawer" direction="rtl">

      <el-form class="form" style="margin-top:-32px">
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="部门名称:">
                  <el-input
                    v-model="searchParams.addDepartment.name"
                    show-word-limit
                    maxlength="8"
                    type="text"
                    placeholder="部门名称"
                  ></el-input>
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
              <el-form-item label="部门描述:">
                  <el-input
                    rows="7"
                    v-model="searchParams.addDepartment.memo"
                    maxlength="100"
                    type="textarea"
                    placeholder="部门描述"
                    show-word-limit
                  ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="appendtrue()" size="medium">确定</el-button>
          </el-col>
          <el-col :span="10">
            <el-button @click="cancelappend()" size="medium">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
    <el-drawer size="50%" title="修改部门" :visible.sync="drawer2" direction="rtl">

      <el-form class="form" style="margin-top:-32px">
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="部门名称:">
                  <el-input
                    v-model="searchParams.updateDepartment.name"
                    show-word-limit
                    maxlength="8"
                    type="text"
                    placeholder="部门名称"
                  ></el-input>
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
              <el-form-item label="部门描述:">
                  <el-input
                    rows="7"
                    v-model="searchParams.updateDepartment.memo"
                    maxlength="100"
                    type="textarea"
                    placeholder="部门描述"
                    show-word-limit
                  ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
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
      <div class="noteText">部门管理</div>
    </div>

    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.getDepartments.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query"  v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="reset">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="append"  v-if="user.roleBtns.indexOf(url+'add')>-1">新&nbsp;&nbsp;增</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table row-class-name="trStyle" class="tableData" :data="tableData" border stripe width="100%">
            <!-- <el-table-column
              align="center"
              show-overflow-tooltip="true"
              prop="userId"
              label="用户编号"
              width="100"
            ></el-table-column>-->
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="name"
              label="部门名称"
              width="100"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="memo"
              label="部门简介"
              width="300"
            ></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建日期"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" @click="modify (scope.row)" size="small"  v-if="user.roleBtns.indexOf(url+'update')>-1">编辑</el-button>
                <el-button type="primary" @click="cutout(scope.row)" size="small"  v-if="user.roleBtns.indexOf(url+'delete')>-1">删除</el-button>
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
import {mapGetters} from 'vuex'
export default {
  name: "StudioAudit",
  path: "studioAudit",
  data() {
    return {
      //请求的接口
      actions: {
        addDepartment: "/system/department/addDepartment", //新增部门
        delDepartment: "/system/department/delDepartment", //删除部门
        getDepartmentById: "/system/department/getDepartmentById", //根据id查询部门
        getDepartments: "/system/department/getDepartments", //列表/高级查询部门
        getSelectDepartmentsIdAndName:
          "/system/department/getSelectDepartmentsIdAndName", //查询部门下拉框
        updateDepartment: "/system/department/updateDepartment" //修改部门
      },
      //查询参数
      searchParams: {
        //新增部门
        addDepartment: {
          name: "", //部门名称
          memo: "" //部门描述
          //fkUnitId:"",//外键单位id
          //token:"", //防重token
        },
        //删除部门
        delDepartment: {
          departmentId: "" //部门id
        },
        //根据id查询部门
        getDepartmentById: {
          deptId: "" //部门id
        },
        //列表/高级查询部门
        getDepartments: {
          key: "" //关键字(可以搜索部门名)
          //fkUnitId:"", //外键单位id
        },
        //查询部门下拉框
        getSelectDepartmentsIdAndName: {},
        //修改部门
        updateDepartment: {
          deptId: "", //部门id
          name: "", // 部门名称
          memo: "", //部门描述
          //fkUnitId:"",// 外键单位id
          version: "" //版本号
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
    //新增部门
    append() {
      this.drawer = true;
    },
    modifytrue() {
      if (this.searchParams.updateDepartment.name == "") {
        this.$message.error("修改部门名称为空");
      } else if (
        this.searchParams.updateDepartment.name == "null" ||
        this.searchParams.updateDepartment.name == "underfined" ||
        !/[^\s]+/.test(this.searchParams.updateDepartment.name)
      ) {
        this.$message.error("修改部门名称有非法字符");
      } else {
        this.updateDepartment();
      }
    },
    updateDepartment() {
      httpUtil.xhrPost(
        this,
        this.actions.updateDepartment,
        {
          ...this.searchParams.updateDepartment,
          ...this.page
        },
        data => {
          this.getData();
        }
      );
    },
    //确定新增
    appendtrue() {
      if (this.searchParams.addDepartment.name == "") {
        this.$message.error("新增部门名称为空");
      } else if (
        this.searchParams.addDepartment.name == "null" ||
        this.searchParams.addDepartment.name == "underfined" ||
        !/[^\s]+/.test(this.searchParams.addDepartment.name)
      ) {
        this.$message.error("新增部门名称有非法字符");
      } else {
        this.addDepartment();
      }
    },
    //取消新增
    cancelappend() {
      this.searchParams.addDepartment.name = "";
      this.searchParams.addDepartment.memo = "";
      this.drawer = false;
    },
    cancelmodify() {
      this.searchParams.updateDepartment.name = "";
      this.searchParams.updateDepartment.memo = "";
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
      this.searchParams.getDepartments.key = "";
      this.searchParams.getDepartmentById.deptId = "";
      this.getData();
      this.$forceUpdate();
    },
    //传新增部门数据
    addDepartment() {
      httpUtil.xhrPost(
        this,
        this.actions.addDepartment,
        {
          ...this.searchParams.addDepartment,
          ...this.page
        },
        data => {
          this.getData();
        }
      );
    },
    //删除部门
    cutout(e) {
      this.$confirm("此操作将永久删除该部门, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.searchParams.delDepartment.deptId = e.deptId;
          httpUtil.xhrPost(
            this,
            this.actions.delDepartment,
            {
              ...this.searchParams.delDepartment,
              ...this.page
            },
            data => {
              //console.log(data);
              this.getData();
            }
          );
        })
        .catch(() => {});
    },
    //修改部门
    modify(e) {
      this.drawer = false;
      this.drawer2 = true;
      this.searchParams.updateDepartment.name = e.name;
      this.searchParams.updateDepartment.memo = e.memo;
      this.searchParams.updateDepartment.deptId = e.deptId;
      this.searchParams.updateDepartment.version = e.version;
      //console.log(e);
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getDepartments,
        {
          ...this.searchParams.getDepartments,
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
