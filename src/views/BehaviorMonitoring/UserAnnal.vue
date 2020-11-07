<template>
  <div class="content">
    <div class="note">
			<div class="noteText">用户行为监控</div>
		</div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
					<div class="searchForm">
						<el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="查询项目">
                    <el-radio-group v-model="getParams.type" @change="typeCheck">
                      <el-radio :label="1">用户登录记录</el-radio>
                      <el-radio :label="2">用户访问记录</el-radio>
                    </el-radio-group>
                    <span style="margin-left: 30px;">共有{{annalNum}}条记录</span>
                  </el-form-item>
                </el-col>
              </el-row>
							<el-form-item label="用户编号:">
								<el-input v-model="getParams.userId"></el-input>
							</el-form-item>
              <el-form-item label="用户来源:">
                <el-select v-model="getParams.userFrom">
									<el-option label="全部" value=""></el-option>
									<el-option label="网页端" value="4"></el-option>
									<el-option label="PC端" value="1"></el-option>
                  <el-option label="小程序" value="10"></el-option>
									<el-option label="APP端" value="11"></el-option>
                  <el-option label="公众号" value="12"></el-option>
									<el-option label="未知" value="0"></el-option>
								</el-select>
              </el-form-item>
              <el-date-picker
                v-model="getParams.startTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择起始时间">
              </el-date-picker>
              <el-date-picker
                v-model="getParams.endTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd 23:59:59"
                type="date"
                default-time="23:59:59"
                placeholder="选择结束时间">
              </el-date-picker>
							<el-form-item>
								<!-- <el-button type="primary" @click="getData"  v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button> -->
                <el-button type="primary"  @click="getData">查&nbsp;&nbsp;询</el-button>
							</el-form-item>
							<el-form-item>
								<el-button plain @click="clearGetParams">重&nbsp;&nbsp;置</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
        <div class="dataListArea">
          <el-table row-class-name="trStyle" class="tableData" :data="userMonitorData" border stripe width="100%">
						<el-table-column align="center" :show-overflow-tooltip="true" prop="userId" label="用户编号" width='150'>
						</el-table-column>
						<el-table-column align="center" :show-overflow-tooltip="true" prop="createTime" label="访问时间" width="200">
						</el-table-column>
						<el-table-column align="center" :show-overflow-tooltip="true" prop="ip" label="用户IP" width="200">
						</el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" prop="city" label="用户IP所在地" width="200">
						</el-table-column>
						<el-table-column align="center" :show-overflow-tooltip="true" prop="origin" label="用户来源" width="200">
						</el-table-column>
					</el-table>
          <el-pagination class="page" background layout="prev, pager, next" @current-change="changePage" :total="pageInfo.total" :current-page.sync="pageInfo.page">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import httpUtil from '../../utils/js/HttpUtil';
export default {
  data(){
    return{
      actions:{
        getUserMonitorInfo:'/monitor/getUserMonitorInfos',
        // 获取用户地址
        getAddressByIp:'/system/ip/getAddressByIp'
      },
      getParams:{
        userId:'',
        // 查询项目 1---登录情况查询,2---访问记录查询
        type:2,
        // 用户来源 空---全部,0---未知,1---PC,4---网页,10---小程序,11---APP,12---公众号
        userFrom:'',
        startTime:'',
        endTime:''
      },
      // 分页参数
      pageInfo:{
        page:1,
        rows:10,
        total:0
      },
      // 查询到的结果数量
      annalNum:0,
      userMonitorData:[]
    }
  },
  methods:{
    getData(){
      httpUtil.xhrPost(this,this.actions.getUserMonitorInfo,{
        ...this.getParams,
        ...this.pageInfo
      },(res)=>{
        for(let i = 0;i < res.data.list.length;i++){
          let ip = res.data.list[i].ip;
          let obj = {
            ip: ip
          };
          httpUtil.xhrPost(this,this.actions.getAddressByIp,{...obj},(data)=>{
            let start = data.data.indexOf(":") + 1;
            let end = data.data.length;
            let address = data.data.substring(start,end);
            res.data.list[i].city = address;
          })
          if(this.getParams.type == 2){
            switch(res.data.list[i].origin){
              case 0:
                  res.data.list[i].origin = '未知';
                break;
              case 1:
                  res.data.list[i].origin = 'PC端';
                break;
              case 4:
                  res.data.list[i].origin = '网页端';
                break;
              case 10:
                  res.data.list[i].origin = '小程序';
                break;
              case 11:
                  res.data.list[i].origin = 'APP';
                break;
              case 12:
                  res.data.list[i].origin = '公众号';
                break;
              default:
                break;
            }
          }else if(this.getParams.type == 1){
            switch(res.data.list[i].userFrom){
              case 0:
                  res.data.list[i].origin = '未知';
                break;
              case 1:
                  res.data.list[i].origin = 'PC端';
                break;
              case 4:
                  res.data.list[i].origin = '网页端';
                break;
              case 10:
                  res.data.list[i].origin = '小程序';
                break;
              case 11:
                  res.data.list[i].origin = 'APP';
                break;
              case 12:
                  res.data.list[i].origin = '公众号';
                break;
              default:
                break;
            }
          }
        }
        this.userMonitorData = res.data.list;
        this.annalNum = res.data.total;
        this.pageInfo.total = res.data.total;
        this.pageInfo.page = res.data.pageNum;
      })
    },
    clearGetParams(){
      this.getParams = {
        userId:'',
        type:2,
        userFrom:'',
        startTime:'',
        endTime:''
      };
      this.pageInfo = {
        page:1,
        rows:10,
        total:0
      };
      this.getData();
    },
    changePage(page){
      this.pageInfo.page = page;
      this.getData();
    },
    typeCheck(value){
      this.getData();
    }
  },
  mounted(){
    if(this.$route.params.userId){
      this.getParams.userId = this.$route.params.userId;
    }
    this.getData();
  }
}
</script>

<style>
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
</style>