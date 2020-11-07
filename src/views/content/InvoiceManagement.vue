<template>
  <div class="content">
    <div class="note">
      <div class="noteText">发票管理</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="发票抬头:">
                <el-input v-model="searchParams.getUserInvoices.key" placeholder="关键字"></el-input>
              </el-form-item>

              <el-form-item label="发票类型:">
                <el-select v-model="searchParams.getUserInvoices.type">
                  <el-option label="全部" value></el-option>
                  <el-option label="个人" value="0"></el-option>
                  <el-option label="公司" value="1"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="发票状态:">
                <el-select v-model="searchParams.getUserInvoices.state">
                  <el-option label="全部" value></el-option>
                  <el-option label="未审核" value="0"></el-option>
                  <el-option label="已寄出" value="1"></el-option>
                  <el-option label="已送达" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query" v-if="user.roleBtns.indexOf(url+'select')>-1" >查&nbsp;&nbsp;询</el-button>
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
              prop="userId"
              label="用户编号"
              width="150"
            ></el-table-column>
            <el-table-column align="center" label="类型">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.type==0">个人</el-tag>
                <el-tag type="warning" v-if="scope.row.type==1">企业</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="发票金额" width="150">
              <template slot-scope="scope">
              <span>￥{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.state ==0">未审核</el-tag>
                <el-tag type="warning" v-if="scope.row.state ==1">已寄出</el-tag>
                <el-tag v-if="scope.row.state ==2">已送达</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="title"
              label="抬头"
              width="240"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="dutyParagraph"
              label="税号"
              width="150"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="address"
              label="地址"
              width="380"
            ></el-table-column>

            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="createTime"
              label="时间"
              width="200"
            ></el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="180" v-if="user.roleBtns.indexOf(url+'select')>-1">
              <template slot-scope="scope">
                <el-button size="small" @click="check(scope.row)" type="primary" >查看</el-button>
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
    <div>
			<el-drawer size="50%" title="发票详情" :visible.sync="drawer" direction="rtl" >

				<div class="checkDrawer" style="margin-top:-32px">
          <el-divider content-position="left"></el-divider>
					<el-form>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="用户编号:">
											<!-- <label v-if="detailInfo.userId!=undefined&&detailInfo.userId.length>15">{{detailInfo.userId.substring(0,15)+"..."}}</label>
											<label v-if="detailInfo.userId!=undefined&&detailInfo.userId.length<=15">{{detailInfo.userId}}</label> -->
                      <label>{{detailInfo.userId}}</label>

									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="类型:">
										<label v-if="detailInfo.type ==0">个人</label>
										<label v-if="detailInfo.type ==1">企业</label>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="发票金额:">
										<label>￥{{detailInfo.price}}</label>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="状态:">
										<label v-if="detailInfo.state ==0">未审核</label>
										<label v-if="detailInfo.state ==1">已寄出</label>
										<label v-if="detailInfo.state ==2">已送达</label>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="抬头:">
										<label>{{detailInfo.title}} </label>
									</el-form-item>
								</el-form>
							</el-col>
							<el-col :span="12">
								<el-form label-width="100px">
									<el-form-item label="税号:">
										<label>{{detailInfo.dutyParagraph}} </label>
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
									<el-form-item label="创建时间:">
                    <label>{{detailInfo.createTime}}</label>
									</el-form-item>
								</el-form>
							</el-col>
						</el-row>
					</el-form>
				</div>
			</el-drawer>
		</div>
  </div>
</template>

<script>
import httpUtil from "../../utils/js/HttpUtil";
import {mapGetters} from 'vuex'
export default {
  name: "UserInvoices",
  path: "userInvoices",
  data() {
    return {
      //请求的接口
      actions: {
        getUserInvoices: "/userInvoice/getUserInvoices" //发票管理
      },
      //查询参数
      searchParams: {
        getUserInvoices: {
          key: "",
          type: "",
          state: ""
        }
      },
      //分页参数
      page: {
        page: 1,
        rows: 10,
        total: 1000
      },
      drawer: false,
      tableData: [],
      detailInfo:{},
      url:''
    };
  },
  methods: {
    //查看
    check(e){
      this.drawer=true;
      this.detailInfo=e;
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
      this.searchParams.getUserInvoices.key = "";
      this.searchParams.getUserInvoices.type = "";
      this.searchParams.getUserInvoices.state = "";
      this.getData();
      this.$forceUpdate();
    },

    //列表查询
    getData() {
      //   this.searchParams.getUserInvoices.type1=parseInt(this.searchParams.getUserInvoices.type);
      //   this.searchParams.getUserInvoices.state=parseInt(this.searchParams.getUserInvoices.state);
      httpUtil.xhrPost(
        this,
        this.actions.getUserInvoices,
        {
          ...this.searchParams.getUserInvoices,
          ...this.page
        },
        data => {
          this.tableData = data.data.list;
          this.page.total = data.data.total;
          this.page.page = data.data.pageNum;
        }
      );
    },
    changePage(page) {
      this.page.page = page;

      this.getData();
    }
  },
  mounted() {
      if(this.$route.params.userId){
        this.searchParams.getUserInvoices.key = this.$route.params.userId
      }
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
.el-drawer__header {
    margin-bottom: 0px !important;
  }
</style>
