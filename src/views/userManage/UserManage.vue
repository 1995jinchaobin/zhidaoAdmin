<template>
  <div class="userManageContent">
    <div class="note">
      <div class="noteText">
        平台用户管理
      </div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.key"></el-input>
              </el-form-item>
              <el-form-item label="会员类型:">
                <el-select v-model="searchParams.vipType">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="非会员" value="1"></el-option>
                  <el-option label="个人会员" value="2"></el-option>
                  <el-option label="企业会员" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search" v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="clearSearchInfo">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table row-class-name="trStyle" class="tableData" :data="tableData" border stripe width="100%">
            <el-table-column align="center" :show-overflow-tooltip="true" prop="id" label="编号" >
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="loginName" label="账号">
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="adress" label="注册IP所在地">
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="注册时间" width="200">
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="是否是VIP" >
              <template slot-scope="scope">
                {{vipTypeList[scope.row.vipType-1]}}
                {{scope.row.vipType==1?'':scope.row.vipType==2?'到期时间'+scope.row.expirationTime:'到期时间'+scope.row.expirationTimePlus}}
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="是否开通工作室" >
              <template slot-scope="scope">
                {{(scope.row.studio!=null && scope.row.studio.examineState==2)?scope.row.studio.personalStudioYn==1? '个人工作室':'企业工作室':'否'}}
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="可开发票金额" >
              <template slot-scope="scope">
                ¥ {{(scope.row.userInvoicePrice==null||scope.row.userInvoicePrice.unbilledPrice==null)?'0':scope.row.userInvoicePrice.unbilledPrice}}
              </template>
            </el-table-column>
            <!--<el-table-column align="center" :show-overflow-tooltip="true" label="状态" >-->
              <!--<template slot-scope="scope">-->
                <!--{{(scope.row.size/1024/1024).toFixed(2)}}M-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="操作" width="400px" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="check(scope.row)" v-if="user.roleBtns.indexOf(url+'select')>-1">查看详情</el-button>
                <el-button type="primary" size="mini" @click="lookDetail(scope.row,'StoreFlowerManage')" v-if="user.roleBtns.indexOf(url+'selectOwnFlowerPattern')>-1">商城花型</el-button>
                <el-button type="primary" size="mini" @click="lookDetail(scope.row,'UserFlowerManage')" v-if="user.roleBtns.indexOf(url+'selectOwnUserFlower')>-1">用户花型</el-button>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    ...<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="user.roleBtns.indexOf(url+'selectOwnFlowerMyUpload')>-1"><div @click="lookDetail(scope.row,'MyUploadFlowerManage')">用户面料</div></el-dropdown-item>
                    <el-dropdown-item v-if="user.roleBtns.indexOf(url+'selectOwnMaterial')>-1"><div @click="lookDetail(scope.row,'StoreMaterialManage')">商城素材</div></el-dropdown-item>
                    <el-dropdown-item v-if="user.roleBtns.indexOf(url+'selectOwnMaterialMe')>-1"><div @click="lookDetail(scope.row,'UserMaterialManage')">用户素材</div></el-dropdown-item>
                    <el-dropdown-item v-if="user.roleBtns.indexOf(url+'selectOwnMaterialMe2')>-1"><div @click="lookDetail(scope.row,'UserShadingManage')">用户底纹</div></el-dropdown-item>
                    <el-dropdown-item v-if="user.roleBtns.indexOf(url+'selectOwnInvoice')>-1"><div @click="lookDetail(scope.row,'InvoiceManagement')">发票信息</div></el-dropdown-item>
                    <el-dropdown-item v-if="user.roleBtns.indexOf(url+'selectOwnCopyright')>-1"><div @click="lookDetail(scope.row,'CopyrightReview')">版权信息</div></el-dropdown-item>
                    <el-dropdown-item v-if="user.roleBtns.indexOf(url+'selectOwnBehavior')>-1"><div @click="lookDetail(scope.row,'UserAnnal')">行为监控</div></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="page.total" :current-page.sync="page.page">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <el-drawer size="50%" title="平台用户详情" :visible.sync="drawer" direction="rtl" :before-close="closeCheckDrawer">

        <div class="checkDrawer" style="margin-top:-32px">
          <el-divider content-position="left"></el-divider>
          <el-form>
            <el-row>
              <el-col :span="12" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="头像:">
                    <img class="userHeaderImg" width="50%" :src="detailInfo.headPhoto==null?defaultUserImg:detailInfo.headPhoto" />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="编号:">
                    <label>{{detailInfo.id}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="账号:">
                    <label>{{detailInfo.loginName}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="手机号:">
                    <label>{{detailInfo.phone}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="邮箱:">
                    <label>{{detailInfo.email==null?'暂未填写':detailInfo.email}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="用户身份:">
                    <label>{{detailInfo.identity}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="注册时间:">
                    <label>{{detailInfo.createTime}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="已开发票金额:">
                    <label>¥ {{(detailInfo.userInvoicePrice==null||detailInfo.userInvoicePrice.openedPrice==null)?'0':detailInfo.userInvoicePrice.openedPrice}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="未开发票金额:">
                    <label>¥ {{(detailInfo.userInvoicePrice==null||detailInfo.userInvoicePrice.unbilledPrice==null)?'0':detailInfo.userInvoicePrice.unbilledPrice}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-form label-width="100px">
                  <el-form-item label="vip类型:">
                    <label>{{vipTypeList[detailInfo.vipType]}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="到期时间:">
                    <label v-if="detailInfo.vipType!=1">{{detailInfo.vipType==2?detailInfo.expirationTime:detailInfo.expirationTimePlus}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <!--<el-row>-->
              <!--<el-col :span="12">-->
                <!--<el-form label-width="100px">-->
                  <!--<el-form-item label="当前状态:">-->
                    <!--<el-tag v-if="detailInfo.state1==0" type="info">正常</el-tag>-->
                    <!--<el-tag v-if="detailInfo.state1==1" type="danger">禁用</el-tag>-->
                  <!--</el-form-item>-->
                <!--</el-form>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <div v-if="detailInfo.studio!=null" style="margin-bottom: 30px;">
              <el-divider content-position="left">用户工作室信息</el-divider>
              <el-row>
                <el-row>
                  <el-col :span="11" :offset="1" v-if="detailInfo.studio.studioLogo!=null">
                    <el-form label-width="100px">
                      <el-form-item label="工作室logo:">
                        <img class="studioHeaderImg" width="50%" :src="detailInfo.studio.studioLogo" />
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="11" :offset="1" v-if="detailInfo.studio.businessLicense!=null">
                    <el-form label-width="100px">
                      <el-form-item label="营业执照:">
                        <img class="studioHeaderImg" width="50%" :src="detailInfo.studio.businessLicense" />
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <el-col :span="11" :offset="1">
                  <el-form label-width="100px">
                    <el-form-item label="编号:">
                      <label>{{detailInfo.studio.id}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="工作室名称:">
                      <label>{{detailInfo.studio.companyName==null?'暂未填写':detailInfo.studio.companyName}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11" :offset="1">
                  <el-form label-width="100px">
                    <el-form-item label="注册时间:">
                      <label>{{detailInfo.studio.createTime}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="工作室邮箱:">
                      <label>{{detailInfo.studio.email==null?'暂未填写':detailInfo.studio.email}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11" :offset="1">
                  <el-form label-width="100px">
                    <el-form-item label="工作室类型:">
                      <label>{{detailInfo.studio.personalStudioYn==1?'个人工作室':'企业工作室'}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="工作室介绍:">
                      <label>{{detailInfo.studio.companyProfile==null?'暂未填写':detailInfo.studio.companyProfile}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row v-if="detailInfo.studio.personalStudioYn==0">
                <el-col :span="11" :offset="1">
                  <el-form label-width="100px">
                    <el-form-item label="税号:">
                      <label>{{detailInfo.studio.businessLicenseNum==null?'暂未填写':detailInfo.studio.businessLicenseNum}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23" :offset="1">
                  <el-form label-width="100px">
                    <el-form-item label="审核状态:">
                      <el-tag v-if="detailInfo.studio.examineState==0" type="info">审核中</el-tag>
                      <el-tag v-if="detailInfo.studio.examineState==1" type='danger' >审核不通过</el-tag>
                      <el-tag v-if="detailInfo.studio.examineState==2" type="success">审核通过</el-tag>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
            <!--<el-row>-->
              <!--<el-col :span="12" :offset="6">-->
                <!--<el-form label-width="100px">-->
                  <!--<el-form-item label="">-->
                    <!--<el-button @click="closeCheckDrawer()" size="medium">取消</el-button>-->
                  <!--</el-form-item>-->
                <!--</el-form>-->
              <!--</el-col>-->
            <!--</el-row>-->
          </el-form>
        </div>
      </el-drawer>
    </div>
  </div>

</template>

<script>
  import httpUtil from '../../utils/js/HttpUtil';
  import SetType from '../../utils/js/SetType';
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        //请求的接口
        actions: {
          getAppUsers: "/appUser/getAppUsers",
          updateFlowerPattern: "/flowerPattern/updateFlowerPattern",
          // 获取用户地址
          getAddressByIp:'/system/ip/getAddressByIp'
        },
        //查询参数
        searchParams: {
          //关键字
          key: "",
          //vip类型  空全部 1非会员2个人会员3企业会员
          vipType: "",
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
        //审核状态
        checkState: {
          id: 0,
          state1: 0,
          state2:0,
          areaType:0,
          reason: ""
        },
        vipTypeList:['非会员','个人会员','企业会员'],
        defaultUserImg:require('../../assets/imgs/common/defaultUserImg.png'),
        url:''
      }
    },
    methods: {
      getData() {
        httpUtil.xhrPost(this, this.actions.getAppUsers, {
          ...this.searchParams,
          ...this.page
        }, (data) => {
          for(let i = 0; i < data.data.list.length;i++){
            let ip = data.data.list[i].ip;
            let obj = {
              ip: ip
            }
            httpUtil.xhrPost(this,this.actions.getAddressByIp,{ ...obj },(res)=>{
              let start = res.data.indexOf(":") + 1;
              let end = res.data.length;
              let address = res.data.substring(start,end);
              data.data.list[i].adress = address;
            })
          }
          this.tableData = data.data.list;
          this.page.total = data.data.total
          this.page.page = data.data.pageNum
        })
      },
      search(){
        this.page.page=1;
        this.getData()
      },
      changePage(page) {
        this.page.page = page;
        this.getData();
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
      check(row) {
        this.drawer = true;
        this.detailInfo = row;
        this.checkState.state1=this.detailInfo.state1;
        this.checkState.state2=this.detailInfo.state2;
        this.checkState.areaType=this.detailInfo.areaType;
        this.checkState.reason=this.detailInfo.reason;
        this.checkState.id=this.detailInfo.id;
      },
      //关闭抽屉清空数据
      closeCheckDrawer() {
        this.drawer = false;
        this.detailInfo = {};
        this.checkState.state1 = 0;
        this.checkState.reason = "";
        this.checkState.id = 0;
      },
      lookDetail(detail,url){
        this.$router.push({ name: url, params: { userId:detail.id} });
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

<style >
  .userManageContent {
    overflow-y: auto;
    overflow-x: hidden;
    width: calc(100%);
    height: calc(100vh - 64px) !important;
  }

  .userManageContent .note {
    height: 64px;
  }
  tr.trStyle{
    height: 60px !important;
  }
  .userManageContent .noteText {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    height: 28px;
    padding-left: 32px;
    padding-top: 18px;
    font-weight: bold;
  }

  .userManageContent .data {
    width: calc(100%);
    min-height: calc(100% - 64px);
    height: auto;
    padding: 24px 24px 24px 24px;
    background-color: #F0F3F7;
  }

  .userManageContent .dataContent {
    width: calc(100% - 48px);
    background-color: #fff;
    border-radius: 2px;
    border-radius: 2px;
    padding-bottom: 32px;
  }

  .userManageContent .searchArea {
    width: calc(100%);
    margin: 0px 24px 0px 0px;
  }

  .userManageContent .searchForm {
    padding-top: 24px;
    padding-left: 32px;
  }

  .userManageContent .dataListArea {
    margin: 0px 24px 24px 24px;
  }

  .userManageContent .tableData {
    height: 100%;
  }

  .userManageContent .page {
    margin: 15px 15px;
    float: right;
  }

  .userManageContent .el-drawer__header {
    margin-bottom: 0px !important;
  }
  .userManageContent .checkDrawer {
    height: calc(90vh);
    margin-bottom: 100px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .userManageContent .userHeaderImg{
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
</style>
