<template>
  <div class="content">
    <!-- <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe> -->
    <el-drawer size="50%" title="系统配置" :visible.sync="drawer" direction="rtl">
      <el-form class="form" style="margin-top:-32px">
        <el-divider  content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="10">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="类型1 :">
                  <input
                    v-if="check==0"
                    readonly
                    type="number"                    
                    v-model="searchParams.updateConfig.decimal1"
                  />
                  <el-input @input="oninput1" v-if="check==2" type="number" v-model="searchParams.updateConfig.decimal1" ></el-input>
                  
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="2">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="10">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="类型2 :">
                  <input
                    v-if="check==0"
                    readonly
                    type="number"
                    v-model="searchParams.updateConfig.decimal2"
                  />
                  <el-input @input="oninput2" v-if="check==2" type="number" v-model="searchParams.updateConfig.decimal2"  ></el-input>
                  
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="10">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="字符串类型1 :">
                  <input
                    v-if="check==0"
                    readonly
                    type="text"
                    v-model="searchParams.updateConfig.var1"
                  />
                  <el-input v-if="check==2" type="text" v-model="searchParams.updateConfig.var1"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="2">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="10">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="字符串类型2 :">
                  <input
                    v-if="check==0"
                    readonly
                    type="text"
                    v-model="searchParams.updateConfig.var2"
                  />
                  <el-input v-if="check==2" type="text" v-model="searchParams.updateConfig.var2"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="10">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="整形类型1 :">
                  <input
                    v-if="check==0"
                    readonly
                    type="number"
                    v-model="searchParams.updateConfig.intValue1"
                  />
                  <el-input
                    v-if="check==2"
                    type="number"
                    v-model="searchParams.updateConfig.intValue1"
                  ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="2">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="10">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="整形类型2 :">
                  <input
                    v-if="check==0"
                    readonly
                    type="number"
                    v-model="searchParams.updateConfig.intValue2"
                  />
                  <el-input
                    v-if="check==2"
                    type="number"
                    v-model="searchParams.updateConfig.intValue2"
                  ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="10">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="json类型1 :">
                  <input
                    v-if="check==0"
                    readonly
                    type="text"
                    v-model="searchParams.updateConfig.json1"
                  />
                  <el-input v-if="check==2" type="text" v-model="searchParams.updateConfig.json1"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="2">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="10">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="json类型2 :">
                  <input
                    v-if="check==0"
                    readonly
                    type="text"
                    v-model="searchParams.updateConfig.json2"
                  />
                  <el-input v-if="check==2" type="text" v-model="searchParams.updateConfig.json2"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="22">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="配置描述:">
                  <input
                    v-if="check==0"
                    readonly
                    type="text"
                    v-model="searchParams.updateConfig.description"
                  />
                  <el-input
                    v-if="check==2"
                    type="textarea"
                    :rows="3"
                    v-model="searchParams.updateConfig.description"
                  ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row v-if="check==2">
          <el-col :span="4">
            <el-form label-width="100px">
              <el-form-item label>
                <!--  修改接口 -->
                <el-button
                  @click="ascertain(searchParams.updateConfig.id)"
                  type="primary"
                  size="medium"
                >确定</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3">
            <el-form label-width="100px">
              <el-form-item label>
                <el-button @click="cancel" size="medium">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
    <div class="note">
      <div class="noteText">系统配置</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.getConfigs.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query">查&nbsp;&nbsp;询</el-button>
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
              prop="id"
              label="id"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="decimal1"
              label="类型1"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="decimal2"
              label="类型2"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="var1"
              label="字符串类型1"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="var2"
              label="字符串类型2"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="intValue1"
              label="整形类型1"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="intValue2"
              label="整形类型2"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="json1"
              label="json类型1"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="json2"
              label="json类型2"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="description"
              label="配置描述"
              width="300"
            ></el-table-column>

            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" @click="checkf(scope.row,0)" size="small">查看</el-button>
                <el-button type="primary" @click="checkf(scope.row,2)" size="small">编辑</el-button>
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
export default {
  name: "StudioAudit",
  path: "studioAudit",
  data() {
    return {
      //请求的接口
      actions: {
        getConfigs: "/config/getConfigs", //系统配置查询
        updateConfig: "/config/updateConfig" //系统配置修改
      },
      //查询参数 
      searchParams: {
        getConfigs: {
          //系统配置查询
          key: "" //关键字
        },
        updateConfig: {
          //系统配置修改
          id: 0, //id
          decimal1: 0,
          decimal2: 0,
          var1: "",
          var2: "",
          intValue1: 0,
          intValue2: 0,
          json1: "",
          json2: "",
          description: ""
        }
      },
      //分页参数
      page: {
        page: 1,
        rows: 10,
        total: 1000
      },
      tableData: [],
      temporaryDate: [], //临时数据
      drawer: false, //抽屉控制
      check: 0, //修改状态
      gaoqingimg: "", //下载图片地址
      direction: "rtl"
    };
  },
  methods: {
    oninput1(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      this.searchParams.updateConfig.decimal1=e.target.value;
    },
    oninput2(e) {
        // 通过正则过滤小数点后两位
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
      this.searchParams.updateConfig.decimal2=e.target.value;
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getConfigs,
        {
          ...this.searchParams.getConfigs,
          ...this.page
        },
        data => {
          // console.log(data);
          this.tableData = data.data.list;
          this.page.total = data.data.total;
          this.page.page = data.data.pageNum;
        }
      );
    },
    //系统配置管理选择确定
    ascertain(e) {
      
      this.updateConfig();
      this.drawer = false;
    },
    //系统配置管理取消
    cancel() {
      this.drawer = false;
    },
    //编辑
    checkf(e, f) {
      this.drawer = true;
      // console.log(e);
      this.searchParams.updateConfig = e;
      this.check = f;
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
      this.searchParams.getConfigs.key = "";
      this.getData();
      this.$forceUpdate();
    },

    //修改系统配置
    updateConfig() {
      let self = this;
      
      httpUtil.xhrPost(
        this,
        this.actions.updateConfig,
        {
          ...this.searchParams.updateConfig,
          ...this.page
        },
        data => {
          // console.log(data);
          self.getData();
          messageUtil.message.success("处理成功");
        }
      );
    },
    changePage(page) {
      this.page.page = page;
      // console.log(this.page.page);
      this.getData();
    }
  },
  mounted() {
    this.getData();
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
  height: calc(100vh - 80px);
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
