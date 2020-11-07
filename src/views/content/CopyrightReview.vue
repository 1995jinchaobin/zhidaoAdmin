<template>
	<div class="content">
		<div class="note">
			<div class="noteText">
				版权审核
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
							<el-form-item label="订单状态">
								<el-select v-model="searchParams.state" >
									<el-option label="全部" value=""></el-option>
									<el-option label="待支付" value="0"></el-option>
									<el-option label="已支付" value="1"></el-option>
									<el-option label="审核中" value="2"></el-option>
                  <el-option label="审核通过" value="3"></el-option>
									<el-option label="已寄出" value="4"></el-option>
                  <el-option label="已送达" value="5"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="申请主体">
								<el-select v-model="searchParams.type2">
									<el-option label="全部" value=""></el-option>
									<el-option label="个人" value="0"></el-option>
									<el-option label="公司" value="1"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="版权区域" >
								<el-select v-model="searchParams.type1">
									<el-option label="全部" value=""></el-option>
									<el-option label="全国" value="0"></el-option>
									<el-option label="浙江" value="1"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="getData"  v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
							</el-form-item>
							<el-form-item>
								<el-button plain @click="clearSearchInfo">重&nbsp;&nbsp;置</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="dataListArea">
					<el-table row-class-name="trStyle" class="tableData" :data="tableData" border stripe width="100%">
						<el-table-column  align="center" :show-overflow-tooltip="true" prop="" label="公司全称/个人姓名" width="200">
							<template slot-scope="scope">
								<el-col v-if="scope.row.type2==0">{{scope.row.userName}}</el-col>
								<el-col v-if="scope.row.type2==1">{{scope.row.companyName}}</el-col>
							</template>
						</el-table-column>
						<el-table-column align="center" :show-overflow-tooltip="true" prop="businessLicenseNum" label="营业执照号" width="200">
						</el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="createCity" label="创作城市">
						</el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="dutyParagraph" label="税号" width="200">
						</el-table-column>
            <el-table-column align="center" label="版权区域" width="120">
							<template slot-scope="scope">
								<el-tag  v-if="scope.row.type1==0">全国版权</el-tag>
								<el-tag v-if="scope.row.type1==1">浙江版权</el-tag>
							</template>
						</el-table-column>
						<el-table-column align="center" label="申请主体" width="120">
							<template slot-scope="scope">
								<el-tag  v-if="scope.row.type2==0">个人</el-tag>
								<el-tag v-if="scope.row.type2==1">公司</el-tag>
							</template>
						</el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="orderCode" label="物流单号" width="200">
						</el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="price" label="申请费用" width="200">
						</el-table-column>
						<el-table-column align="center" label="订单状态">
							<template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.state==0">待支付</el-tag>
                <el-tag type="danger" v-if="scope.row.state==1">已付款</el-tag>
								<el-tag type="info" v-if="scope.row.state==2">审核中</el-tag>
								<el-tag type="danger" v-if="scope.row.state==3">审核完成</el-tag>
								<el-tag type="danger" v-if="scope.row.state==4">已寄出</el-tag>
								<el-tag type="danger" v-if="scope.row.state==5">已送达</el-tag>
							</template>
						</el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="idCard" label="个人身份证号" width="200">
						</el-table-column>
						<el-table-column align="center" prop="createTime" label="创建时间" width="200">
						</el-table-column>
						<el-table-column align="center" label="操作" fixed="right" width="200">
              <template slot-scope="scope">
                <el-button v-if="scope.row.state != 5&&scope.row.state != 0&&scope.row.state != 5&&user.roleBtns.indexOf(url+'check')>-1" @click="drawerOn(scope.row)" size="small" type="primary">审核</el-button>
								<el-button v-if="scope.row.state == 5&&user.roleBtns.indexOf(url+'select')>-1" @click="drawerOn(scope.row)" size="small">查看</el-button>
                <el-button v-if="scope.row.state != 5&&user.roleBtns.indexOf(url+'select')>-1" @click="drawerOn(scope.row)" size="small">查看</el-button>
              </template>
						</el-table-column>
					</el-table>
					<el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="page.total"
					 :current="page.page">
					</el-pagination>
				</div>
			</div>
		</div>
    <el-drawer  title="审核详情" :visible.sync="drawer" size="50%">
			<div class="operate" style="margin-top:-25px;">
				<el-divider content-position="left">申保文件</el-divider>
					<img @click="downLoad(detailInfo.imgUrl)" class="fileBox imgSize imgDown" :src="detailInfo.imgUrl">
				<el-divider content-position="left">版权信息</el-divider>
				<el-row class="msgBox">
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item label="申请主体:">
								<el-tag v-if="detailInfo.type2 == 0">个人</el-tag>
								<el-tag v-if="detailInfo.type2 == 1">企业</el-tag>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item v-if="detailInfo.type2 ==0" label="申请人姓名:">
								<label>{{detailInfo.userName}}</label>
							</el-form-item>
							<el-form-item v-if="detailInfo.type2 ==1" label="公司全称:">
								<label>{{detailInfo.companyName}}</label>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row class="msgBox">
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item label="创作城市:">
								<label>{{detailInfo.createCity}}</label>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item label="版权区域:">
									<el-tag v-if="detailInfo.type1==0">全国版权</el-tag>
									<el-tag v-if="detailInfo.type1==1">浙江版权</el-tag>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row v-if="detailInfo.needInvoice == 1||detailInfo.needInvoice ==2" class="msgBox">
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item label="发票类型:">
								<el-tag v-if="detailInfo.needInvoice==1">增值发票</el-tag>
								<el-tag v-if="detailInfo.type1==2">普通发票</el-tag>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item label="发票抬头:">
								<label>{{detailInfo.invoiceTitle}}</label>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row class="msgBox">
					<el-col :span="10" :offset="1">
						<el-form label-width="100px">
							<el-form-item v-if="detailInfo.type2  == 1" label="营业执照编号:">
								<label>{{detailInfo.businessLicenseNum}}</label>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="10" :offset="2">
						<el-form>
							<el-form-item v-if="detailInfo.type2  == 1" label="营业执照:">
								<img class="imgSize imgDown" @click="downLoad(detailInfo.businessLicenseFile)" :src="detailInfo.businessLicenseFile">
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row class="msgBox">
					<el-col :span="10">
						<el-form label-width="100px">
							<el-form-item label="身份证号:">
								<label>{{detailInfo.idCard}}</label>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="10" :offset="2">
						<el-form label-width="100px">
							<el-form-item label="版权区域:">
									<el-tag v-if="detailInfo.type1==0">全国版权</el-tag>
									<el-tag v-if="detailInfo.type1==1">浙江版权</el-tag>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row class="msgBox">
					<el-col :span="10" :offset="1">
						<el-form>
							<el-form-item label="身份证正面照:">
								<img class="imgSize imgDown" @click="downLoad(detailInfo.idCardFront)" :src="detailInfo.idCardFront">
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="10" :offset="2">
						<el-form>
							<el-form-item label="身份证反面照:">
								<img class="imgSize imgDown" @click="downLoad(detailInfo.idCardBack)" :src="detailInfo.idCardBack">
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row class="msgBox">
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item label="收件地址:">
								<label>{{detailInfo.receiptAddress}}</label>
							</el-form-item>
						</el-form>
					</el-col>
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item label="收件电话:">
								<label>{{detailInfo.receiptPhone}}</label>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<el-row class="msgBox">
					<el-col :span="12">
						<el-form label-width="100px">
							<el-form-item label="当前状态:">
								<el-tag v-if="detailInfo.state==0">待支付</el-tag>
								<el-tag v-if="detailInfo.state==1">已付款</el-tag>
								<el-tag v-if="detailInfo.state==2">审核中</el-tag>
								<el-tag v-if="detailInfo.state==3">审核完成</el-tag>
								<el-tag type="danger" v-if="detailInfo.state==4">已寄出</el-tag>
								<el-tag type="danger" v-if="detailInfo.state==5">已送达</el-tag>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<div  v-if="detailInfo.state > 0&&detailInfo.state < 5&&user.roleBtns.indexOf(url+'check')>-1">
					<el-divider content-position="left">审核操作</el-divider>
					<el-row class="msgBox">
						<el-col :span="24">
							<el-form label-width="100px">
								<el-form-item label="审核状态:">
									<el-radio v-model="checkParams.state" label="3">审核通过</el-radio>
									<el-radio v-model="checkParams.state" label="4">已寄出</el-radio>
									<el-radio v-model="checkParams.state" label="5">已送达</el-radio>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form label-width="100px">
								<el-form-item label="运单号:">
									<el-input type="text" :disabled="checkParams.state != 4" v-model="checkParams.logisticsNumber"></el-input>
								</el-form-item>
							</el-form>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="3">
							<el-form label-width="100px">
								<el-form-item label="">
									<el-button @click="checkFlowerPattern()" type="primary" size="medium">确定</el-button>
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
			</div>
    </el-drawer>
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
					getCopyrights: "/copyright/getCopyrights",
					checkCopyright:'/copyright/checkCopyright'
				},
				//查询参数
				searchParams: {
					//订单状态 空为全部0待付款1已支付2审核中3审核完成4已寄出5已送达
					state: "",
					//版权申请范围 空为全部0全国1浙江
					type1:"",
					//申请主体 空为全部0个人1公司
					type2:"",
					// 模糊查询关键字--为空时查找全部
					key:''
				},
				// 修改版权信息参数
				checkParams:{
					// 版权申请订单id
					id:'',
					// 要修改的版权状态--3-审核通过4-已寄出5-已送达
					state:'',
					// 快递运单号--仅在已寄出状态下有效
					logisticsNumber:''
				},
				//分页参数
				page: {
					page: 1,
					rows: 10,
					total: 0
        },
        // 抽屉
        drawer: false,
        direction: 'rtl',
				tableData: [],
				//点击审批对应list中的index
				selectIndex:0,
				//是否显示审核弹框
				dialogFormVisible:false,
				formLabelWidth: '120px',
				detailInfo:{},
        url:''
			}
		},
		methods: {
			getData() {
				httpUtil.xhrPost(this, this.actions.getCopyrights, {
					...this.searchParams,
					...this.page
				}, (data) => {
					this.tableData = data.data.list
					this.page.total = data.data.total
					this.page.page = data.data.pageNum
				})
			},
			// 清空抽屉内的状态
			closeCheckDrawer() {
				this.drawer = false;
				this.detailInfo = {};
				this.checkState.state = 0;
				this.checkState.reason = "";
				this.checkState.id = 0;
			},
			// 提交版权修改
			checkFlowerPattern() {
				if (this.checkParams.state == '') {
					this.$message.error('请选择审核状态');
					return;
				}else	if (this.checkParams.state != 4) {
						this.checkParams.logisticsNumber = ''
					}
				//请求
				this.checkParams.id = this.detailInfo.id;
				httpUtil.xhrPost(this, this.actions.checkCopyright, {
					...this.checkParams
				}, (data) => {
					this.$message.success(data.message);
					this.closeCheckDrawer();
					this.getData();
				})
			},
			// 下载文件
			downLoad(url){
				window.location.href = url+'?response-content-type=application%2Foctet-stream';
			},
      // 点击打开抽屉
      drawerOn(val){
        this.drawer = true;
        this.detailInfo = {};
        this.detailInfo = val;
      },
			changePage(page) {
				this.page.page = page;
				this.getData();
			},
			//重置
			clearSearchInfo(){
				this.page.page = 1;
				this.page.rows=10;
				this.page.total=10;
				this.searchParams={};
				this.getData()
			},
			//点击审核按钮，显示审核弹框
			review(row){
				this.dialogFormVisible=true
				this.detailInfo = row;
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
		background-color: #F0F3F7;
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
	.imgDown{
		cursor: pointer;
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
  .drawerBox .el-divider {
    margin-top: -25px !important;
  }
  .text{
    text-align: center;
  }
	.fileBox{
		margin-left: 50px;
	}
	.imgSize{
		max-width: 300px;
		max-height: 600px;
	}
	.operate{
		height: calc(100vh);
		padding-bottom: 100px;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
