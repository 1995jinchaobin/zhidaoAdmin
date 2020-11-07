<template>
  <div class="content">
    <div class="note">
      <div class="noteText">
        角色信息
      </div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字">
                <el-input v-model="searchParams.key"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search()" v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="clearSearchInfo">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="openAddRole" v-if="user.roleBtns.indexOf(url+'add')>-1">新增角色</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table row-class-name="trStyle" class="tableData" :data="tableData" border stripe width="100%">
            <el-table-column align="center" :show-overflow-tooltip="true" prop="name" label="角色名称">
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="memo" label="角色描述">
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="280">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="openUpdateArea(scope.row)" v-if="user.roleBtns.indexOf(url+'update')>-1">编辑</el-button>
                <el-button type="primary" size="small" @click="deleteRole(scope.row)" v-if="user.roleBtns.indexOf(url+'delete')>-1">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="page.total"
                         :current-page.sync="page.page">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--新增抽屉-->
    <div class="addArea" :v-if="addRoleDrawer">
      <el-drawer size="50%" :title="operateType=='add'?'新增角色':'编辑角色'" :visible.sync="addRoleDrawer" direction="rtl">

        <el-row style="margin-top:-32px">
          <el-divider content-position="left"></el-divider>
          <el-col :span="23" :offset="1">
            <div class="checkDrawer">
              <el-form :inline="true" :model="roleSubmit" class="demo-form-inline" :rules="rules">
                <el-form-item label="角色名称" :hide-required-asterisk="true" prop="name">
                  <el-input v-model="roleSubmit.name" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="roleSubmit.memo" placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-form>
              <el-card class="box-card"  v-for="(item,index) in menuBtns" :key="'menu'+index">
                <div slot="header" class="clearfix">
                  <span>{{item.name}}</span>
                </div>
                <el-collapse v-model="activeNames" >
                  <el-collapse-item :title="subSysMenusItem.name" :name="subSysMenusItem.menuId" v-for="(subSysMenusItem) in item.subSysMenus" :key="subSysMenusItem.name">
                    <div>
                      <el-checkbox v-for="detaileBtn in subSysMenusItem.sysMenuBtns" :key="detaileBtn.name+detaileBtn.menuBtnId" v-model="detaileBtn.isChecked">{{detaileBtn.name}}</el-checkbox>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-card>
              <el-row>
                <el-col :span="4" :offset="6">
                  <el-button type="primary" size="middle" @click="submit(operateType)">{{operateType=='add'?'提交':'修改'}}</el-button>
                </el-col>
                <el-col :span="4" :offset="4">
                  <el-button size="middle" @click="cancle()">取消</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-drawer>
    </div>
  </div>

</template>

<script>
  import httpUtil from '../../utils/js/HttpUtil'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        //请求的接口
        actions: {
          //查询角色列表
          getRoleList: "/system/role/getRoles",
          //查询当前用户权限下的一级菜单和二级菜单和权限按钮
          getUserMenuBtns: "/system/role/getAllMenuAndBtn",
          //新增角色
          addRole:'/system/role/addRole',
          //根据id查询权限
          getRoleById:'/system/role/getRoleById',
          //编辑角色信息
          updateRole:'/system/role/updateRole',
          //删除角色信息
          delRole:'/system/role/delRole'
        },
        //查询参数
        searchParams: {
          //关键字
          key: ""
        },
        //分页参数
        page: {
          page: 1,
          rows: 10,
          total: 0
        },
        tableData: [],
        //新增角色抽屉
        addRoleDrawer: false,
        //某条详情的信息
        detailInfo: {},
        //菜单按钮
        menuBtns:[],
        menuBtnsOld:[],
        activeNames:[],
        //新增时的对象
        roleSubmit:{
          name:'',
          memo:'',
          sysPermission:[]
        },
        //编辑时的对象
        roleUpdate:{
          roleId:'',
          name:'',
          memo:'',
          sysPermission:[],
          version:''
        },
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ]},
        //操作类型：add/uptate
        operateType:'add',
        url:''
      }
    },
    methods: {
      //获取角色列表信息
      getData() {
        httpUtil.xhrPost(this, this.actions.getRoleList, {
          ...this.searchParams,
          ...this.page
        }, (data) => {
          this.tableData = data.data.list
          this.page.total = data.data.total
          this.page.page = data.data.pageNum
        })
      },
      changePage(page) {
        this.page.page = page;
        this.getData();
      },
      search(){
        this.page.page=1;
        this.getData()
      },
      //重置
      clearSearchInfo() {
        this.page.page = 1;
        this.page.rows = 10;
        this.page.total = 0;
        this.searchParams = {}
        this.getData()
      },
      //点击新增角色按钮，显示新增角色弹框
      openAddRole() {
        this.getRoleBtn();
        this.operateType='add'
        this.roleSubmit.name = '';
        this.roleSubmit.memo = '';
        this.addRoleDrawer = true;
      },
      //查询当前用户权限下的一级菜单和二级菜单和权限按钮
      getRoleBtn(){
        httpUtil.xhrPost(this, this.actions.getUserMenuBtns, {}, (data) => {
          console.log(data.data)
          let menuBtns = data.data;
          let self = this
          let menu = {}
          for(var i=0;i<menuBtns.length;i++){
            for(var j=0;j<menuBtns[i].subSysMenus.length;j++){
              self.activeNames.push(menuBtns[i].subSysMenus[j].menuId)
              for(var k=0;k<menuBtns[i].subSysMenus[j].sysMenuBtns.length;k++){
                menuBtns[i].subSysMenus[j].sysMenuBtns[k].isChecked=true;
              }
            }
          }
          self.menuBtns = menuBtns;
        })
      },
      //关闭抽屉
      cancle(){
        this.addRoleDrawer=false;
      },
      //提交新增/编辑
      submit(type){
        //验证信息
        if(!this.roleSubmit.name){
          this.$message.error('请输入角色名称');
          return;
        }
        let menu={};
        let self = this;
        //处理数据
        for(var i=0;i<self.menuBtns.length;i++){
          for(var j=0;j<self.menuBtns[i].subSysMenus.length;j++){
            for(var k=0;k<self.menuBtns[i].subSysMenus[j].sysMenuBtns.length;k++){
              if(self.menuBtns[i].subSysMenus[j].sysMenuBtns[k].isChecked){
                menu.btnEname = self.menuBtns[i].subSysMenus[j].sysMenuBtns[k].ename;
                menu.fkMenuId = self.menuBtns[i].subSysMenus[j].sysMenuBtns[k].fkMenuId;
                menu.fkBtnId = self.menuBtns[i].subSysMenus[j].sysMenuBtns[k].menuBtnId;
                menu.menuEname = self.menuBtns[i].subSysMenus[j].ename;
                menu.permissionEname = self.menuBtns[i].subSysMenus[j].ename+':'+self.menuBtns[i].subSysMenus[j].sysMenuBtns[k].ename;
                self.roleSubmit.sysPermission.push(menu)
                menu={}
              }
            }
          }
        }
        self.roleSubmit.sysPermission = JSON.stringify(self.roleSubmit.sysPermission)
        if(type=='update'){
          self.roleUpdate.name = self.roleSubmit.name;
          self.roleUpdate.memo = self.roleSubmit.memo;
          self.roleUpdate.sysPermission = self.roleSubmit.sysPermission;
        }
        let actionUrl = type=='add'?self.actions.addRole:self.actions.updateRole
        let submit = type=='add'?self.roleSubmit:self.roleUpdate;
        //提交
        httpUtil.xhrPost(self, actionUrl, {...submit}, (data) => {
          self.$message.success(data.message);
          self.cancle();
          self.getData();
          self.roleSubmit={
                            name:'',
                              memo:'',
                              sysPermission:[]
                          }
        })
      },
      //点击编辑按钮
      openUpdateArea(row){
        this.operateType='update'
        this.getRoleDetail(row.roleId)

      },
      //根据角色id查询详情
      getRoleDetail(roleId){
        if(this.menuBtns.length<=0){
          httpUtil.xhrPost(this, this.actions.getUserMenuBtns, {}, (data) => {
            let menuBtns = data.data;
            let self = this
            let menu = {}
            for(var i=0;i<menuBtns.length;i++){
              for(var j=0;j<menuBtns[i].subSysMenus.length;j++){
                self.activeNames.push(menuBtns[i].subSysMenus[j].menuId)
                for(var k=0;k<menuBtns[i].subSysMenus[j].sysMenuBtns.length;k++){
                  menuBtns[i].subSysMenus[j].sysMenuBtns[k].isChecked=true;
                }
              }
            }
            self.menuBtns = menuBtns;
            httpUtil.xhrPost(this, this.actions.getRoleById, {'roleId':roleId}, (data) => {
              let menuBtns = data.data;
              let self = this
              self.roleSubmit.name = menuBtns.name;
              self.roleSubmit.memo = menuBtns.memo;
              self.roleUpdate.roleId = menuBtns.roleId;
              self.roleUpdate.version = menuBtns.version;
              let menu = self.menuBtns
              let index=0
              for(var i=0;i<menu.length;i++){
                for(var j=0;j<menu[i].subSysMenus.length;j++){
                  for(var k=0;k<menu[i].subSysMenus[j].sysMenuBtns.length;k++){
                    let btnDetail = {
                      fkMenuId:'',
                      ename:'',
                      menuBtnId:'',
                      name:'',
                      pageId:''
                    }
                    btnDetail.ename=menu[i].subSysMenus[j].sysMenuBtns[k].ename;
                    btnDetail.fkMenuId=menu[i].subSysMenus[j].sysMenuBtns[k].fkMenuId;
                    btnDetail.menuBtnId=menu[i].subSysMenus[j].sysMenuBtns[k].menuBtnId;
                    btnDetail.name=menu[i].subSysMenus[j].sysMenuBtns[k].name;
                    btnDetail.pageId=menu[i].subSysMenus[j].sysMenuBtns[k].pageId;
                    if((JSON.stringify(menuBtns).indexOf(JSON.stringify(btnDetail)))>-1){
                      menu[i].subSysMenus[j].sysMenuBtns[k].isChecked=true;
                    }else{
                      menu[i].subSysMenus[j].sysMenuBtns[k].isChecked=false;
                    }
                  }
                }
              }
              self.menuBtns = menu;
              self.addRoleDrawer=true;
            })
          })
        }else {
          httpUtil.xhrPost(this, this.actions.getRoleById, {'roleId':roleId}, (data) => {
            let menuBtns = data.data;
            let self = this
            self.roleSubmit.name = menuBtns.name;
            self.roleSubmit.memo = menuBtns.memo;
            self.roleUpdate.roleId = menuBtns.roleId;
            self.roleUpdate.version = menuBtns.version;
            let menu = self.menuBtns
            let index=0
            for(var i=0;i<menu.length;i++){
              for(var j=0;j<menu[i].subSysMenus.length;j++){
                for(var k=0;k<menu[i].subSysMenus[j].sysMenuBtns.length;k++){
                  let btnDetail = {
                    fkMenuId:'',
                    ename:'',
                    menuBtnId:'',
                    name:'',
                    pageId:''
                  }
                  btnDetail.ename=menu[i].subSysMenus[j].sysMenuBtns[k].ename;
                  btnDetail.fkMenuId=menu[i].subSysMenus[j].sysMenuBtns[k].fkMenuId;
                  btnDetail.menuBtnId=menu[i].subSysMenus[j].sysMenuBtns[k].menuBtnId;
                  btnDetail.name=menu[i].subSysMenus[j].sysMenuBtns[k].name;
                  btnDetail.pageId=menu[i].subSysMenus[j].sysMenuBtns[k].pageId;
                  if((JSON.stringify(menuBtns).indexOf(JSON.stringify(btnDetail)))>-1){
                    menu[i].subSysMenus[j].sysMenuBtns[k].isChecked=true;
                  }else{
                    menu[i].subSysMenus[j].sysMenuBtns[k].isChecked=false;
                  }
                }
              }
            }
            self.menuBtns = menu;
            self.addRoleDrawer=true;
          })
        }
      },
      //删除角色
      deleteRole(row){
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          httpUtil.xhrPost(this, this.actions.delRole, {'roleId':row.roleId}, (data) => {
            this.getData();
            this.$message.success(data.message);
          })
        }).catch(() => {

        });
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
  }
</script>

<style>
/* 此处为element ui样式,请勿合并到下面 */
 tr.trStyle{
   height: 60px !important;
 }
</style>


<style scoped>
  .content {
    overflow-y: auto;
    overflow-x: hidden;
    width: calc(100%);
    height: calc(100vh - 64px) !important;
    /*background-color: #F0F3F7;*/
  }

  .note {
    height: 64px;
    /*background-color: #fff;*/
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
    height: calc(88vh);
    width: 96%;
    margin: 0 auto;
    padding-right: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .firstMenu{
    font-size: 14px;
    padding-left: 20px;
  }
  .subSysMenus{
    font-size: 12px;
    margin-left: 30px;
  }
  .box-card{
    margin-bottom: 10px;
  }
  .addContent{
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 100px;
  }
</style>
