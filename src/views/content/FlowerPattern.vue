<template>
	<div class="content">
		<div class="note">
			<div class="noteText">
				花型审核
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
							<el-form-item label="审核状态:">
								<el-select v-model="searchParams.state1">
									<el-option label="全部" value=""></el-option>
									<el-option label="审核中" value="0"></el-option>
									<el-option label="审核不通过" value="1"></el-option>
									<el-option label="审核通过" value="2"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="上架状态:">
								<el-select v-model="searchParams.state2">
									<el-option label="全部" value=""></el-option>
									<el-option label="下架" value="0"></el-option>
									<el-option label="上架" value="1"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="区域类型:">
								<el-select v-model="searchParams.areaType">
									<el-option label="全部" value=""></el-option>
									<el-option label="VIP区" value="0"></el-option>
									<el-option label="公开区" value="1"></el-option>
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
					<el-table class="tableData" :data="tableData" border stripe width="100%">
						<el-table-column align="center" label="图片" width="150">
							<template slot-scope="scope">
								<img :src="scope.row.picture1+'?x-oss-process=image/resize,m_fixed,h_90,w_60'" style="width: 60px;height:90px">
							</template>
						</el-table-column>
						<el-table-column align="center" :show-overflow-tooltip="true" prop="name" label="标题名" width="300">
						</el-table-column>
						<el-table-column align="center" :show-overflow-tooltip="true" prop="shopName" label="店铺名" width="200">
						</el-table-column>
						<el-table-column align="center" label="区域类型" width="200">
							<template slot-scope="scope">
								<el-tag type="danger" v-if="scope.row.areaType==0">VIP区</el-tag>
								<el-tag v-if="scope.row.areaType==1">公开区</el-tag>
							</template>
						</el-table-column>
						<el-table-column align="center" label="连接方式" width="200">
							<template slot-scope="scope">
								<el-tag type="info" v-if="scope.row.connect==1">独幅</el-tag>
								<el-tag type="warning" v-if="scope.row.connect==2">四方连续</el-tag>
								<el-tag v-if="scope.row.connect==3">二方连续</el-tag>
								<el-tag type="danger" v-if="scope.row.connect==0">未知</el-tag>
							</template>
						</el-table-column>
						<el-table-column align="center" label="审核状态" width="200">
							<template slot-scope="scope">
								<el-tag type="info" v-if="scope.row.state1==0">审核中</el-tag>
								<el-tooltip v-if="scope.row.state1==1" class="item" effect="dark" :content="scope.row.reason" placement="top-start">
									<el-tag type="danger">审核不通过</el-tag>
								</el-tooltip>
								<el-tag v-if="scope.row.state1==2">审核通过</el-tag>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="createTime" label="创建时间" width="200">
						</el-table-column>
						<el-table-column align="center" label="操作" fixed="right" width="180">
							<template slot-scope="scope">
								<el-button v-if="(scope.row.state1==1 || scope.row.state1==2)&&user.roleBtns.indexOf(url+'select')>-1" size="small" @click="check(scope.row)">查看</el-button>
                <el-button v-if="scope.row.state1==0&&user.roleBtns.indexOf(url+'select')>-1" size="small" @click="check(scope.row)">查看</el-button>
								<el-button v-if="scope.row.state1==0&&user.roleBtns.indexOf(url+'check')>-1" type="primary" size="small" @click="check(scope.row)">审核</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="page.total"
					 :current="page.page" :current-page.sync="page.page">
					</el-pagination>
				</div>
			</div>
		</div>
		<div>
			<el-drawer custom-class="drawerBox" size="50%" title="审核详情" :visible.sync="drawer" direction="rtl" :before-close="closeCheckDrawer">
				<el-divider content-position="left"></el-divider>
				<div class="checkDrawer">
					<el-form>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="图片预览:">
										<img width="50%" :src="detailInfo.picture1" />
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="花型名称:">
										<el-tooltip class="item" effect="dark" :content="detailInfo.name" placement="top">
											<label v-if="detailInfo.name!=undefined&&detailInfo.name.length>15">{{detailInfo.name.substring(0,15)+"..."}}</label>
											<label v-if="detailInfo.name!=undefined&&detailInfo.name.length<=15">{{detailInfo.name}}</label>
										</el-tooltip>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="店铺名称:">
										<label>{{detailInfo.shopName}}</label>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="尺寸(高):">
										<label>{{detailInfo.sizeHeight}} px</label>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="尺寸(宽):">
										<label>{{detailInfo.sizeWidth}} px</label>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="分辨率:">
										<label>{{detailInfo.resolutionRatio}} dpi</label>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="psd源文件:">
										<el-button @click="downLoad(detailInfo.sourceFile)" type="primary" size="small">点击下载</el-button>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="价格:">
										<label>¥ {{detailInfo.price}}</label>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="连接方式:">
										<label v-if="detailInfo.connect==0">未知</label>
										<label v-if="detailInfo.connect==1">独幅</label>
										<label v-if="detailInfo.connect==2">四方连续</label>
										<label v-if="detailInfo.connect==3">二方连续</label>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="类型:">
										<label>{{detailInfo.genre1}}</label>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="风格:">
										<label>{{detailInfo.styleType}}</label>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="当前状态:">
										<el-tag v-if="detailInfo.state1==0" type="info">审核中</el-tag>
										<el-tag v-if="detailInfo.state1==1" type="danger">审核不通过</el-tag>
										<el-tag v-if="detailInfo.state1==2" type="success">审核通过</el-tag>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<div v-if="detailInfo.state1==0&&user.roleBtns.indexOf(url+'check')>-1">
							<el-divider content-position="left">审核面板</el-divider>
							<el-row>
								<el-col :span="24">
									<el-form label-width="100px">
										<el-form-item label="审核状态:">
											<el-radio v-model="checkState.state1" label="1">审核不通过</el-radio>
											<el-radio v-model="checkState.state1" label="2">审核通过</el-radio>
										</el-form-item>
									</el-form>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="23">
									<el-form label-width="100px">
										<el-form-item label="审核备注:">
											<el-input type="textarea" :rows="4" v-model="checkState.reason"></el-input>
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
					getFlowerPatterns: "/flowerPattern/getFlowerPatterns",
					checkFlowerPattern: "/flowerPattern/checkFlowerPattern"
				},
				//查询参数
				searchParams: {
					//关键字
					key: "",
					//审核状态 空为全部0审核中1审核不通过2审核通过
					state1: "",
					//上下架状态 空为全部0下架1上架
					state2: "",
					//区域状态 空为全部0VIP区1公开区
					areaType: ""
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
					reason: ""
				},
        url:''
			}
		},
		methods: {
			getData() {
				httpUtil.xhrPost(this, this.actions.getFlowerPatterns, {
					...this.searchParams,
					...this.page
				}, (data) => {
					this.tableData = SetType.setType(data,2);
					this.page.total = data.data.total
					this.page.page = data.data.pageNum
				})
			},
			changePage(page) {
				this.page.page = page;
				this.getData();
			},
			// 下载文件
			downLoad(url){
				window.location.href = url+'?response-content-type=application%2Foctet-stream';
			},
			search(){
				console.log(this.searchParams)
				this.page.page = 1;
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
			//点击审核按钮，显示审核弹框
			check(row) {
				this.drawer = true;
				this.detailInfo = row;
				console.log(this.detailInfo)
			},
			//关闭抽屉清空数据
			closeCheckDrawer() {
				this.drawer = false;
				this.detailInfo = {};
				this.checkState.state1 = 0;
				this.checkState.reason = "";
				this.checkState.id = 0;
			},
			checkFlowerPattern() {
				if (this.checkState.state1 == 0) {
					this.$message.error('请选择审核状态');
					return;
				} else if (this.checkState.state1 == 1) {
					if (this.checkState.reason == "") {
						this.$message.error('请输入审核不通过的理由');
						return;
					}
					if (this.checkState.reason.length > 100) {
						this.$message.error('审核不通过的理由最多100个字');
						return;
					}
				}
				//请求
				this.checkState.id = this.detailInfo.id;
				httpUtil.xhrPost(this, this.actions.checkFlowerPattern, {
					...this.checkState
				}, (data) => {
					this.$message.success(data.message);
					this.closeCheckDrawer();
					this.getData();
				})
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

  .drawerBox .el-divider {
    margin-top: -25px !important;
  }

	.checkDrawer {
		height: calc(100vh);
		padding-bottom: 100px;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
