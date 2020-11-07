<template>
  <div class="content">
    <iframe id="iframe" style="border:0" :src="gaoqingimg" width="0" height="0"></iframe>    
    <div class="note">
      <div class="noteText">个人中心</div>
    </div>

    <div class="data">
      <div class="dataContent">
          <el-form class="form">
        <div style="margin-bottom:10px;"></div>      
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="手机号:">
                <el-tooltip class="item" effect="dark" content="手机号 " placement="top">
                  <el-input
                    v-model="tableData.account"
                    show-word-limit
                    type="text"
                    disabled="true"
                    placeholder="手机号"
                  ></el-input>
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
              <el-form-item label="姓名:">
                <el-tooltip class="item" effect="dark" content="姓名 " placement="top">
                  <el-input
                    v-model="searchParams.updateUser.name"
                    show-word-limit
                    type="text"
                    placeholder="姓名"
                  ></el-input>
                </el-tooltip>
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
                  <label v-if="tableData.state==1">启用</label>
                  <label v-if="tableData.state==0">禁用</label>
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
                  <span >{{tableData.roleName}}</span>
                
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
                    <span >{{fkDepartmentName}}</span>
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
          <el-col :span="11">
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
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="再次输入密码:">
                <el-input placeholder="再次输入密码" v-model="newPassWord2" show-password></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="modifytrue()" size="medium">提交</el-button>
          </el-col>
        </el-row>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import httpUtil from "../../utils/js/HttpUtil";
import messageUtil from "../../utils/js/MessageUtil";
export default {
  name: "StudioAudit",
  path: "studioAudit",
  data() {
    return {
      //请求的接口
      actions: {
        getCurrentUser: "/system/user/getCurrentUser", //获取当前用户
        updateUser: "/system/user/updateUser", //修改用户       
        getSelectRolesIdAndName: "/system/role/getSelectRolesIdAndName", //查询角色下拉框
        getSelectDepartmentsIdAndName:
          "/system/department/getSelectDepartmentsIdAndName", //查询部门下拉框
          loginOut:"/system/user/loginOut",
      },
      //查询参数
      searchParams: {
        //新增用户
        getCurrentUser: {
          name: "", //姓名
          account: "", //账号
          fkDepartmentId: "", //外键部门id
          roleId: "" //角色id
        },
        //修改用户
        updateUser: {
          userId:"",
          account:"",
          state:"",
          fkDepartmentId:"",
          version:"",
          roleId:"",
          name: "",
          oldPassword: "",
          newPassWord: "",
        },

      },
      fkDepartmentName:"",
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
      newPassWord2: "",
    };
  },
  methods: {
   
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
      // console.log(e);
      // console.log(this.searchParams.updateUser.fkDepartmentId,'fkDepartmentId');
      // console.log(this.searchParams.updateUser.roleId,'roleId');
      this.$forceUpdate();
    },
    modifytrue() {
      if (this.searchParams.updateUser.name == "") {
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
          //console.log(data);
          this.getData();
          messageUtil.message.success("新增成功");
        }
      );
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
          //console.log(data);
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
      httpUtil.xhrPost(
        this,
        this.actions.updateUser,
        {
          ...this.searchParams.updateUser
        },
        data => {
          //console.log(data);
          this.getData();
          messageUtil.message.success("修改成功");
          httpUtil.xhrPost(this, this.actions.loginOut, {}, (data) => {
							this.$router.push("/");
						})
        }
      );
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getCurrentUser,
        {
          ...this.searchParams.getCurrentUser,
          ...this.page
        },
        data => {
          console.log(data);
          this.tableData = data.data;
          this.searchParams.updateUser.name=data.data.name;
          this.searchParams.updateUser.userId=data.data.userId;
          this.searchParams.updateUser.account=data.data.account;
          this.searchParams.updateUser.state=data.data.state;
          this.searchParams.updateUser.fkDepartmentId=data.data.fkDepartmentId;
          this.searchParams.updateUser.version=data.data.version;
          this.searchParams.updateUser.roleId=data.data.roleId;
          this.fkDepartmentName=this.department[this.tableData.fkDepartmentId].name;
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
          console.log(data.data, "角色下拉框");
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
          console.log(data.data, "部门下拉框");
          self.department = data.data;
        }
      );
    },
  },
  mounted() {
    this.getrole();
    this.getdepartment();
    this.getData();
  }
};
</script>

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
