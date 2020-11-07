<template>
  <div class="content">
    <div class="note">
      <div class="noteText">
        口罩订单管理
      </div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.key" placeholder="请输入姓名/手机号码"></el-input>
              </el-form-item>
              <el-form-item label="用户编号:">
                <el-input v-model="searchParams.userId" placeholder="请输入用户编号"></el-input>
              </el-form-item>
              <el-form-item label="摇号结果:">
                <el-select v-model="searchParams.type" placeholder="请选择摇号结果">
                  <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="支付方式:">
                <el-select v-model="searchParams.payType" placeholder="请选择支付方式">
                  <el-option
                    v-for="item in payTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="快递状态:">
                <el-select v-model="searchParams.expressType" placeholder="请选择快递状态">
                  <el-option
                    v-for="item in expressTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
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
        <!--列表数据-->
        <div class="dataListArea">
          <el-table class="tableData" row-class-name="trStyle" :data="tableData" border stripe >
            <el-table-column align="center" prop="orderCode" label="订单号" width="180">
            </el-table-column>
            <el-table-column align="center" prop="orderCode" label="商品类型" width="180">
              <template slot-scope="scope">
                {{scope.row.goodsType==0?'50个防护口罩':scope.row.goodsType==1?'50个医用口罩':'50个防护+50个医用'}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="姓名" width="100">
            </el-table-column>
            <el-table-column align="center" prop="phone" label="手机号码" width="140">
            </el-table-column>
            <el-table-column align="center" prop="address" label="地址" :show-overflow-tooltip="true" width="200">
            </el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间" width="180">
            </el-table-column>
            <el-table-column align="center"  label=" 结果" width="100">
              <template slot-scope="scope">
                {{scope.row.type==0?'等待摇号':scope.row.type==1?'未摇中':'摇中'}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="payTime" label="支付方式" width="100">
              <template slot-scope="scope">
                {{scope.row.type==2?scope.row.payType==0?'未支付':scope.row.payType==1?'微信支付':'支付宝支付':''}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="payTime" label="支付时间" width="180">
            </el-table-column>
            <el-table-column align="center" prop="expressNumber" label="快递单号" width="200">
              <template slot-scope="scope">
                {{scope.row.expressNumber==0?'':scope.row.expressNumber}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="expressType" label=" 快递状态" width="100">
              <template slot-scope="scope">
                {{scope.row.expressType==0?'无':scope.row.expressType==1?'等待发货':scope.row.expressType==2?'投件中':scope.row.expressType==3?'已发货':'已退款'}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="300">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="check(scope.row)" v-if="user.roleBtns.indexOf(url+'update')>-1">编辑</el-button>
                <el-button type="primary" size="small" @click="passCheck(scope.row.id)" v-if="user.roleBtns.indexOf(url+'update')>-1 &&scope.row.type==3">通过</el-button>
                <el-button type="primary" size="small" @click="notPassCheck(scope.row.id)" v-if="user.roleBtns.indexOf(url+'update')>-1 &&scope.row.type==3">不通过</el-button>
                <el-button type="primary" size="small" @click="check(scope.row)" v-if="user.roleBtns.indexOf(url+'select')>-1&&user.roleBtns.indexOf(url+'update')==-1">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="page.total"
                         :current-page.sync="page.page">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <el-drawer custom-class="drawerBox" size="50%" title="订单详情" :visible.sync="drawer" direction="rtl" :before-close="closeCheckDrawer">
        <el-divider content-position="left"></el-divider>
        <div class="checkDrawer">
          <el-form>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="商品类型:">
                    <label>{{detailInfo.goodsType==0?'50个防护口罩':detailInfo.goodsType==1?'50个医用口罩':'50个防护+50个医用'}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="订单编号:">
                    <label>{{detailInfo.orderCode}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="姓名:">
                    <label>{{detailInfo.name}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="手机号码:">
                    <label>{{detailInfo.phone}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="地址:">
                    <label>{{detailInfo.address}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="用户编号:">
                    <label>{{detailInfo.userId}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="数量(包):">
                    <label>{{detailInfo.num}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="价格:">
                    <label>¥ {{detailInfo.price}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="创建时间:">
                    <label>{{detailInfo.createTime}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="摇号状态:">
                    <label>{{detailInfo.type==0?'等待摇号':detailInfo.type==1?'未摇中':'摇中'}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <!--当摇中了才显示支付信息-->
            <el-row v-if="detailInfo.type==2">
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="支付状态:">
                    <label v-if="detailInfo.expressType==4">已退款</label>
                    <label v-if="detailInfo.expressType!=4">{{detailInfo.payType==0?'未支付':detailInfo.payType==1?'微信支付':'支付宝支付'}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="支付时间:">
                    <label>{{detailInfo.payType==0?'无':detailInfo.payTime}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <!--当摇中并且支付，才显示物流信息-->
            <el-row v-if="detailInfo.type==2 && detailInfo.payType!=0 && detailInfo.expressType!=4">
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="发货状态:">
                    <label>{{detailInfo.expressType==0?'无':detailInfo.expressType==1?'等待发货':detailInfo.expressType==2?'投件中':detailInfo.expressType==3?'已发货':'已退款'}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="快递单号:">
                    <label>{{detailInfo.expressNumber==0?'':detailInfo.expressNumber}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <div style="margin-bottom: 30px;margin-top: 30px;" v-if="user.roleBtns.indexOf(url+'update')>-1 && detailInfo.type==2 && detailInfo.payType!=0 && detailInfo.expressType!=4">
              <el-divider content-position="left">编辑面板</el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form label-width="100px">
                    <el-form-item label="快递状态:">
                      <el-radio-group v-model="checkState.expressType">
                        <el-radio :label="2">投件中</el-radio>
                        <el-radio :label="3">已发货</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23">
                  <el-form label-width="100px">
                    <el-form-item label="快递单号:">
                      <el-input v-model="checkState.expressNumber"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="23">
                  <el-form label-width="100px">
                    <el-form-item label="备注:">
                      <el-input type="textarea" :rows="4" v-model="checkState.remark"></el-input>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="3">
                  <el-form label-width="100px">
                    <el-form-item label="">
                      <el-button @click="checkOrder()" type="primary" size="medium">确定</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="3">
                  <el-form label-width="100px">
                    <el-form-item label="">
                      <el-button @click="closeCheckDrawer()" size="medium">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>

            </div>
          </el-form>
        </div>
      </el-drawer>
    </div>
  </div>

</template>

<script>
  import httpUtil from '../../utils/js/HttpUtil';
  import SetType from '../../utils/js/SetType'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        //请求的接口
        actions: {
          getOrderList: "/apply/getApplys",
          updateOrder: "/apply/updateApply",
          updateApplyType: "/apply/updateApplyType"
        },
        //查询参数
        searchParams: {
          //关键字，包括姓名和手机号码
          key: "",
          //用户编号
          userId: "",
          type:'',
          payType:'',
          expressType:''
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
          expressNumber: '',
          expressType:2,
          reason: ""
        },
        url:'',
        //摇号结果
        typeList:[{
          label:'全部',
          value:''
        },{
          label:'等待摇号',
          value:0
        },{
          label:'未摇中',
          value:1
        },{
          label:'摇中',
          value:2
        },{
          label:'待审核',
          value:3
        }],
        //支付方式
        payTypeList:[{
          label:'全部',
          value:''
        },{
          label:'未支付',
          value:0
        },{
          label:'微信支付',
          value:1
        },{
          label:'支付宝支付',
          value:2
        }],
        //快递单号
        expressTypeList:[{
          label:'全部',
          value:''
        },{
          label:'无',
          value:0
        },{
          label:'等待发货',
          value:1
        },{
          label:'投件中',
          value:2
        },{
          label:'已发货',
          value:3
        },{
          label:'已退款',
          value:4
        }]
      }
    },
    methods: {
      getData() {
        httpUtil.xhrPost(this, this.actions.getOrderList, {
          ...this.searchParams,
          ...this.page
        }, (data) => {
          this.tableData = SetType.setType(data,1);
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
        this.checkState.expressNumber=this.detailInfo.expressNumber==0?'':this.detailInfo.expressNumber;
        this.checkState.expressType=this.detailInfo.expressType == 2 || this.detailInfo.expressType ==3?this.detailInfo.expressType:2;
        this.checkState.reason=this.detailInfo.reason;
        this.checkState.id=this.detailInfo.id;
      },
      //关闭抽屉清空数据
      closeCheckDrawer() {
        this.drawer = false;
        this.detailInfo = {};
        this.checkState.expressType = 2;
        this.checkState.expressNumber = "";
        this.checkState.reason = "";
        this.checkState.id = 0;
      },
      checkOrder() {
        if (this.checkState.expressType == 0) {
          this.$message.error('请选择快递状态');
          return;
        } else if (this.checkState.expressType == 3) {
          if (this.checkState.expressNumber == "") {
            this.$message.error('请输入快递单号');
            return;
          }
        }
        //请求
        httpUtil.xhrPost(this, this.actions.updateOrder, {
          ...this.checkState
        }, (data) => {
          this.$message.success(data.message);
          this.closeCheckDrawer();
          this.getData();
        })
      },
      //通过审核
      passCheck(id) {
        //请求
        httpUtil.xhrPost(this, this.actions.updateApplyType, {
          id:id,
          type:2
        }, (data) => {
          this.getData();
        })
      },
      //不通过审核
      notPassCheck(id) {
        //请求
        httpUtil.xhrPost(this, this.actions.updateApplyType, {
          id:id,
          type:1
        }, (data) => {
          this.getData();
        })
      }
    },
    mounted() {
      if(this.$route.params.userId){
        this.searchParams.key = this.$route.params.userId
      }
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

<style scoped>
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
  .imgDown{
    cursor: pointer;
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
    height: calc(90vh);
    margin-bottom: 100px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .drawerBox .el-divider {
    margin-top: -24px !important;
  }
</style>
