<template>
  <div class="content">
    <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe>
    <el-drawer size="50%" title="新增用户" :visible.sync="drawer" direction="rtl">
      
      <el-form class="form" style="margin-top:-24px">
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="姓名:">
                  <el-input
                    v-model="searchParams.addUser.name"
                    show-word-limit
                    maxlength="4"
                    type="text"
                    placeholder="姓名"
                  ></el-input>
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
              <el-form-item label="手机号:">
                  <el-input
                    v-model="searchParams.addUser.account"
                    show-word-limit
                    type="text"
                    placeholder="手机号"
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
              <el-form-item label="所属角色:">
                <!-- searchParams addUser name account fkDepartmentId roleId -->
                <el-select v-model="searchParams.addUser.roleId" placeholder="请选择角色">
                  <el-option
                    v-for="item in role"
                    :key="item.index"
                    :label="item.name"
                    :value="item.roleId"
                  ></el-option>
                </el-select>
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
              <el-form-item label="所属部门:">
                <!-- searchParams addUser name account fkDepartmentId roleId -->
                <el-select v-model="searchParams.addUser.fkDepartmentId" placeholder="请选择部门">
                  <el-option
                    v-for="item in department"
                    :key="item.index"
                    :label="item.name"
                    :value="item.deptId"
                  ></el-option>
                </el-select>
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
    <el-drawer size="50%" title="修改用户" :visible.sync="drawer2" direction="rtl">

      <el-form class="form"  style="margin-top:-32px">
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="手机号:">
                  <el-input
                    v-model="searchParams.updateUser.account"
                    show-word-limit
                    type="text"
                    disabled="true"
                    placeholder="手机号"
                  ></el-input>
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
              <el-form-item label="姓名:">
                  <el-input
                    v-model="searchParams.updateUser.name"
                    show-word-limit
                    type="text"
                    placeholder="姓名"
                  ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="23">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="状态:">
                <el-radio v-model="searchParams.updateUser.state" @click="state(1)" :label="1">启用</el-radio>
                <el-radio v-model="searchParams.updateUser.state" @click="state(0)" :label="0">禁用</el-radio>
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
              <el-form-item label="所属角色:">
                <!-- searchParams addUser name account fkDepartmentId roleId -->
                <el-select v-model="searchParams.updateUser.roleId" placeholder="请选择角色">
                  <el-option
                    v-for="item in role"
                    :key="item.index"
                    :label="item.name"
                    :value="item.roleId"
                  ></el-option>
                </el-select>
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
              <el-form-item label="所属部门:">
                <!-- searchParams addUser name account fkDepartmentId roleId -->
                <el-select v-model="searchParams.updateUser.fkDepartmentId" placeholder="请选择部门">
                  <el-option
                    v-for="item in department"
                    :key="item.index"
                    :label="item.name"
                    :value="item.deptId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="20">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="旧密码:">
                <el-input placeholder="请输入旧密码" v-model="searchParams.updateUser.oldPassword" show-password></el-input>
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
              <el-form-item label="新密码:">
                <el-input placeholder="请输入新密码" v-model="searchParams.updateUser.newPassWord" show-password></el-input>
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
              <el-form-item label="再次输入密码:">
                <el-input placeholder="再次输入密码" v-model="newPassWord2" show-password></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>-->
        <el-row>
          <el-col :span="6">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="modifytrue()" size="medium">完成</el-button>
          </el-col>
          <el-col :span="10">
            <el-button @click="cancelmodify()" size="medium">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
    <div class="note">
      <div class="noteText">用户管理</div>
    </div>

    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字">
                <el-input v-model="searchParams.getUsers.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query" id=""  v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
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
              width="100"
            ></el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="name" label="用户名称"></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="account"
              label="手机号"
            ></el-table-column>
            <!-- <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="roleName"
              label="角色名称"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="fkDepartmentName "
              label="部门名称"
              width="200"
            ></el-table-column>-->
            <el-table-column align="center" width="100" label="状态">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.state==0">禁用</el-tag>
                <el-tag v-if="scope.row.state ==1">启用</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="createTime"
              label="创建时间"
            ></el-table-column>
            <el-table-column align="center" label="操作" width="250" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" @click="modify (scope.row)" size="small" v-if="user.roleBtns.indexOf(url+'update')>-1">编辑</el-button>
                <el-button
                  type="primary"
                  @click="disable(scope.row)"
                  size="small"
                  v-if="scope.row.state==1 &&user.roleBtns.indexOf(url+'update')>-1"
                >禁用</el-button>
                <el-button
                  type="primary"
                  @click="enable(scope.row)"
                  size="small"
                  v-if="scope.row.state==0&&user.roleBtns.indexOf(url+'update')>-1"
                >启用</el-button>
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
import messageUtil from "../../utils/js/MessageUtil";
import {mapGetters} from 'vuex'
export default {
  name: "StudioAudit",
  path: "studioAudit",
  data() {
    return {
      //请求的接口
      actions: {
        addUser: "/system/user/addUser", //新增用户
        delUser: "/system/user/delUser", //删除用户
        getUsers: "/system/user/getUsers", //列表/高级查询用户
        getSelectRolesIdAndName: "/system/role/getSelectRolesIdAndName", //查询角色下拉框
        getSelectDepartmentsIdAndName:
          "/system/department/getSelectDepartmentsIdAndName", //查询部门下拉框
        updateUser: "/system/user/updateUser", //修改用户
        updateUserState: "/system/user/updateUserState" //修改状态
      },
      //查询参数
      searchParams: {
        //新增用户
        addUser: {
          name: "", //姓名
          account: "", //账号
          fkDepartmentId: "", //外键部门id
          roleId: "" //角色id
        },
        //删除用户
        delUser: {
          userId: 0 //用户id
        },

        //列表/高级查询用户
        getUsers: {
          key: "", //关键字(可以搜索用户名)
          fkDepartmentId: 0
        },
        //查询用户下拉框
        getSelectDepartmentsIdAndName: {},
        //修改用户
        updateUser: {
          userId: 0, //用户id
          account: "", //用户账号
          name: "", // 用户名称
          state: 1, //0禁用1启用
          fkDepartmentId: 0, //外键部门id
          version: "", //版本号
          roleId: 0, //角色id
          oldPassword: "", //旧密码
          newPassWord: "" //新密码
        },
        updateUserState: {
          userId: "",
          state: 1,
          version: ""
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
      role: {}, //角色下拉框
      department: {}, //部门下拉框
      drawer: false, //抽屉控制
      drawer2: false, //判断抽屉0新增 1修改
      gaoqingimg: "",
      newPassWord2: "",
      direction: "rtl",
      url:''
    };
  },
  methods: {
    state(e) {
      this.searchParams.updateUser.state = e;
    },
    //新增用户
    append() {
      this.drawer = true;
    },
    //修改用户
    modify(e) {
      // this.state=e.state;
      this.searchParams.updateUser.userId = e.userId;
      this.searchParams.updateUser.account = e.account;
      this.searchParams.updateUser.name = e.name;
      this.searchParams.updateUser.state = e.state;
      if (e.fkDepartmentId == 0) {
        this.searchParams.updateUser.fkDepartmentId = "";
      } else {
        this.searchParams.updateUser.fkDepartmentId = e.fkDepartmentId;
      }
      if (e.roleId == 0) {
        this.searchParams.updateUser.roleId = "";
      } else {
        this.searchParams.updateUser.roleId = e.roleId;
      }
      //   this.searchParams.updateUser.roleId = e.roleId;
      this.searchParams.updateUser.version = e.version;
      this.searchParams.updateUser.oldPassword = "";
      this.searchParams.updateUser.newPassWord = "";
      this.newPassWord2 = "";
      this.drawer = false;
      this.drawer2 = true;
      this.$forceUpdate();
    },
    modifytrue() {
      if (this.searchParams.updateUser.account == "") {
        this.$message.error("手机号为空");
      } else if (
        !/^1[3456789]\d{9}$/.test(this.searchParams.updateUser.account)
      ) {
        this.$message.error("手机号格式错误");
      } else if (this.searchParams.updateUser.name == "") {
        this.$message.error("用户姓名为空");
      } else if (
        this.searchParams.updateUser.name == "null" ||
        this.searchParams.updateUser.name == "underfined" ||
        !/[^\s]+/.test(this.searchParams.updateUser.name)
      ) {
        this.$message.error("用户名称有非法字符");
      } else if (
        this.searchParams.updateUser.oldPassword != "" &&
        this.searchParams.updateUser.newPassWord == ""
      ) {
        this.$message.error("新密码为空");
      } else if (
        this.searchParams.updateUser.oldPassword != "" &&
        this.searchParams.updateUser.newPassWord.length < 6
      ) {
        this.$message.error("新密码过短至少为6个字符");
      } else if (
        this.searchParams.updateUser.oldPassword != "" &&
        this.searchParams.updateUser.newPassWord != this.newPassWord2
      ) {
        this.$message.error("2次输入密码不同");
      } else {
        this.updateUser();
        this.drawer2 = false;
      }
    },

    //确定新增
    appendtrue() {
      if (this.searchParams.addUser.name == "") {
        this.$message.error("新增用户姓名为空");
      } else if (
        this.searchParams.addUser.name == "null" ||
        this.searchParams.addUser.name == "underfined" ||
        !/[^\s]+/.test(this.searchParams.addUser.name)
      ) {
        this.$message.error("新增用户姓名有非法字符");
      } else if (this.searchParams.addUser.account == "") {
        this.$message.error("新增用户手机号为空");
      } else if (!/^1[3456789]\d{9}$/.test(this.searchParams.addUser.account)) {
        this.$message.error("手机号格式错误");
      } else {
        //int类型判断为空的改为0
        if (this.searchParams.addUser.fkDepartmentId == "") {
          this.searchParams.addUser.fkDepartmentId = 0;
        }
        if (this.searchParams.addUser.roleId == "") {
          this.searchParams.addUser.roleId = 0;
        }
        this.addUser();
        this.drawer = false;
        //int类型判断为空的改为0
        if (this.searchParams.addUser.fkDepartmentId == 0) {
          this.searchParams.addUser.fkDepartmentId = "";
        }
        if (this.searchParams.addUser.roleId == 0) {
          this.searchParams.addUser.roleId = "";
        }
      }
    },

    //取消新增
    cancelappend() {
      this.searchParams.addUser.name = "";
      this.searchParams.addUser.account = "";
      this.searchParams.addUser.fkDepartmentId = "";
      this.searchParams.addUser.roleId = "";
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
      this.searchParams.getUsers.key = "";
      this.getData();
      this.$forceUpdate();
    },
    //传新增用户数据
    addUser() {
      httpUtil.xhrPost(
        this,
        this.actions.addUser,
        {
          ...this.searchParams.addUser,
          ...this.page
        },
        data => {
          this.getData();
          messageUtil.message.success("新增成功");
        }
      );
    },
    //删除用户
    cutout(e) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.searchParams.delUser.userId = e.userId;
          httpUtil.xhrPost(
            this,
            this.actions.delUser,
            {
              ...this.searchParams.delUser,
              ...this.page
            },
            data => {
              this.getData();
              messageUtil.message.success(data.message);
            }
          );
        })
        .catch(() => {});
    },
    //禁用
    disable(e) {
      this.searchParams.updateUserState.userId = e.userId;
      this.searchParams.updateUserState.state = 0;
      this.searchParams.updateUserState.version = e.version;
      httpUtil.xhrPost(
        this,
        this.actions.updateUserState,
        {
          ...this.searchParams.updateUserState,
          ...this.page
        },
        data => {
          this.getData();
          messageUtil.message.success("禁用成功");
        }
      );
    },
    //启用
    enable(e) {
      this.searchParams.updateUserState.userId = e.userId;
      this.searchParams.updateUserState.state = 1;
      this.searchParams.updateUserState.version = e.version;
      httpUtil.xhrPost(
        this,
        this.actions.updateUserState,
        {
          ...this.searchParams.updateUserState,
          ...this.page
        },
        data => {
          this.getData();
          messageUtil.message.success("启用成功");
        }
      );
    },
    //修改完成
    updateUser() {
      if (this.searchParams.updateUser.fkDepartmentId == "") {
        this.searchParams.updateUser.fkDepartmentId = 0;
      }
      if (this.searchParams.updateUser.roleId == "") {
        this.searchParams.updateUser.roleId = 0;
      }
      httpUtil.xhrPost(
        this,
        this.actions.updateUser,
        {
          ...this.searchParams.updateUser,
          ...this.page
        },
        data => {
          this.getData();
          messageUtil.message.success("修改成功");
          if (this.searchParams.updateUser.fkDepartmentId == 0) {
            this.searchParams.updateUser.fkDepartmentId = "";
          }
          if (this.searchParams.updateUser.roleId == 0) {
            this.searchParams.updateUser.roleId = "";
          }
        }
      );
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getUsers,
        {
          ...this.searchParams.getUsers,
          ...this.page
        },
        data => {
          this.tableData = data.data.list;
          this.page.total = data.data.total;
          this.page.page = data.data.pageNum;
        }
      );
    },
    //获取角色下拉框
    getrole() {
      let self = this;
      httpUtil.xhrPost(
        this,
        this.actions.getSelectRolesIdAndName,
        {
          ...this.searchParams.getSelectRolesIdAndName
        },
        data => {
          self.role = data.data;
        }
      );
    },
    //获取部门下拉框
    getdepartment() {
      let self = this;
      httpUtil.xhrPost(
        this,
        this.actions.getSelectDepartmentsIdAndName,
        {
          ...this.searchParams.getSelectDepartmentsIdAndName
        },
        data => {
          self.department = data.data;
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
          self.getData();
        }
      );
    },
    changePage(page) {
      this.page.page = page;
      this.getData();
    }
  },
  mounted() {
    this.getrole();
    this.getdepartment();
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
  overflow-y: scroll;
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
