<template>
  <div class="content">
    <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe>
    <OSSUploadNoBtn type="1" ref="ossBtn" @setImgPath="setImgPath"></OSSUploadNoBtn>
    <el-drawer size="50%"  title="花型构图" :visible.sync="drawer" direction="rtl">
      <!-- drawertitle -->
      <el-form class="form" style="margin-top:-32px">
        <el-divider content-position="left"></el-divider>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="图片地址:">
                <img width="50%" @click="getfile(temporaryDate.ossUrl)" class="imgDown" :src="temporaryDate.ossUrl" />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <label class="formBox" for="file">
              <input
                type="file"
                style="display: none;"
                ref="file"
                id="file"
                placeholder
                @change="chooseFile1(address)"
              />
              <OSSUploadNoBtn type="1" ref="ossBtn" @setImgPath="setImgPath"></OSSUploadNoBtn>
              <el-button v-if="check!=0" type="primary" size="small" @click="clickInput(1)">替换图片</el-button>
            </label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="20">
            <el-form label-width="110px" label-position="left">
              <el-form-item v-if="check==2" label="状态:">
                <el-radio-group @change="drawerupdata()" v-model="temporaryDate.status">
                  <el-radio :label="0">上架</el-radio>
                  <el-radio :label="-10">下架</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="check==0" label="状态:">
                <div v-if="temporaryDate.status==0">上架</div>
                <div v-if="temporaryDate.status!=0">下架</div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="15">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="模版数据:">
                <textarea
                  style="width:100%"
                  v-if="check!=0"
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="temporaryDate.templateData"
                ></textarea>
                <el-input
                  v-if="check==0"
                  readonly
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="temporaryDate.templateData"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <input
              type="file"
              style="display: none;"
              ref="fileExcel"
              id="file2"
              placeholder
              @change="excelchange()"
            />
            <el-button v-if="check!=0" type="primary" size="small" @click="excelclick()">点击上传Excel文件</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="20">
            <el-form label-width="110px" label-position="left">
              <el-form-item v-if="check!=0" label="模版类型:">
                <el-radio-group @change="drawerupdata()" v-model="temporaryDate.templateType">
                  <el-radio :label="1">定位花型</el-radio>
                  <el-radio :label="2">普通花型</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="check==0" label="模版类型:">
                <div v-if="temporaryDate.templateType==1">定位花型</div>
                <div v-if="temporaryDate.templateType==2">普通花型</div>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col v-if="check==1" :span="6">
            <el-button type="primary" @click="draweradd()" size="medium">确定</el-button>
          </el-col>
          <el-col v-if="check==2" :span="6">
            <el-button type="primary" @click="drawermodify()" size="medium">确定</el-button>
          </el-col>
          <el-col :span="6">
            <el-button  @click="drawercancel()" size="medium">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
    <div class="note">
      <div class="noteText">花型构图</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.getFlowerTemplates.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item label="模板类型:">
                <el-select v-model="searchParams.getFlowerTemplates.templateType">
                  <el-option label="全部" value></el-option>
                  <el-option label="定位花型" value="1"></el-option>
                  <el-option label="普通花型" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query" v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="reset">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="add" v-if="user.roleBtns.indexOf(url+'add')>-1">新&nbsp;&nbsp;增</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table class="tableData" :data="tableData" border stripe width="100%">
            <el-table-column align="center" label="图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.ossUrl+'?x-oss-process=image/resize,m_fixed,h_90,w_60'" style="width: 60px;height:90px" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="name"
              label="名称"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              label="价格"
              width="200"
            ><template slot-scope="scope">
                ￥{{scope.row.price}}
              </template></el-table-column>

            <el-table-column align="center" label="状态" width="200">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.status==0">上架</el-tag>
                <el-tag v-if="scope.row.status==-10">下架</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="模板类型" width="200">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.templateType==1">定位花型</el-tag>
                <el-tag v-if="scope.row.templateType==2">普通花型</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="createTime"
              label="修改时间"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="updateTime"
              label="创建时间"
              width="200"
            ></el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" @click="checkf(scope.row,0)" size="small" v-if="user.roleBtns.indexOf(url+'select')>-1">查看</el-button>
                <el-button type="primary" @click="checkf(scope.row,2)" size="small" v-if="user.roleBtns.indexOf(url+'update')>-1">编辑</el-button>
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
import OSSUploadNoBtn from "../../views/common/OSSUploadNoBtn";
import httpUtil from "../../utils/js/HttpUtil";
import messageUtil from "../../utils/js/MessageUtil";
import SetType from "../../utils/js/SetType";
import axios from "axios";
import {mapGetters} from 'vuex'
export default {
  name: "getFlowerTemplates",
  path: "getFlowerTemplates",
  components: {
    OSSUploadNoBtn
  },
  data() {
    return {
      //请求的接口
      actions: {
        getFlowerTemplates: "/flowertemplate/getFlowerTemplates", //3d模特查询
        updateFlowerTemplate: "/flowertemplate/updateFlowerTemplate", //3d模特修改
        addFlowerTemplate: "/flowertemplate/addFlowerTemplate", //3d模特新增
        getlist: "/config/getConfigById", //获取头部
        autoTransform: "/flowertemplate/autoTransform" //excel格式转换
      },
      //查询参数
      searchParams: {
        autoTransform: {
          file: null
        },
        getlist1: {
          id: 4
        },
        getlist2: {
          id: 12
        },
        //花型构图新增
        updateFlowerTemplate: {},
        getFlowerTemplates: {
          //花型构图查询
          key: "", //关键字
          templateType: "" //模板类型
        },
        updateFlowerTemplate: {
          //花型构图修改
          id: 0, //id
          clotheImage: "",
          thumbnail: "",
          templateName: "",
          status: 0,
          genre1: 0,
          genre2: 0,
          height: "",
          width: ""
        }
      },
      //分页参数
      page: {
        page: 1,
        rows: 10,
        total: 1000
      },
      drawertitle:"查询花型构图",
      tableData: [],
      temporaryDate: [], //临时数据
      drawer: false, //抽屉控制
      check: 0, //修改状态
      gaoqingimg: "", //下载图片地址
      direction: "rtl",
      //oss直传
      imgPath: "",
      address: "/oss/getOssSignOfTemplate2d",
      genre1: [],
      genre2: [],
      url:''
    };
  },
  methods: {
    drawerupdata() {
      this.$forceUpdate();
    },
    excelupdata() {
      let self = this;
      //console.log(self.temporaryDate.templateData);
        httpUtil.xhrPost(
          this,
          this.actions.autoTransform,
          {
            ...this.searchParams.autoTransform,
          },
          data => {
              //console.log(data,data.data[0]);
            self.temporaryDate.templateData=JSON.stringify(data.data);
            self.$forceUpdate();
          }
        );
    },
    excelchange() {
      let self = this;
      let files = this.$refs.fileExcel;
      //console.log()
      //var files = self.files;
      if (files.files) {
        const fileLen = files.files;
        var file = fileLen[0];
        if (file) {
          var types = "xls,xlsx";
          if (
            types.indexOf(
              file.name.substring(file.name.indexOf(".") + 1, file.name.length)
            ) <= -1
          ) {
            messageUtil.message.error("请上传图片格式的文件");
            return;
          } else if (file.size / 1024 / 1024 > 500) {
            messageUtil.message.error("文件大小不能超过500M");
            return;
          }
          self.fileEnd = file.name.substring(
            file.name.indexOf("."),
            file.name.length
          );
        }
        this.searchParams.autoTransform.file = file;
        this.fileSize = file.size / 1024 / 1024;
        this.excelupdata();

      }
    },
    excelclick() {
      document.getElementById("file2").click();
      document.getElementById("file2").value=null;
    },
    draweradd() {
      if (
        this.temporaryDate.ossUrl == "" ||
        this.temporaryDate.ossUrl == null ||
        this.temporaryDate.ossUrl == undefined
      ) {
        messageUtil.message.error("图片地址为空");
      } else if (
        this.temporaryDate.templateData == "" ||
        this.temporaryDate.templateData == null ||
        this.temporaryDate.templateData == undefined
      ) {
        messageUtil.message.error("模版数据为空");
      } else if (
        this.temporaryDate.templateType === "" ||
        this.temporaryDate.templateType == undefined
      ) {
        messageUtil.message.error("模版类型为空");
      } else {
        httpUtil.xhrPost(
          this,
          this.actions.addFlowerTemplate,
          {
            ...this.temporaryDate
          },
          data => {
            messageUtil.message.success("新增成功");
            this.drawer = false;
            this.getData();
          }
        );
      }
    },
    drawermodify() {
      if (
        this.temporaryDate.ossUrl == "" ||
        this.temporaryDate.ossUrl == null ||
        this.temporaryDate.ossUrl == undefined
      ) {
        messageUtil.message.error("图片地址为空");
      } else if (
        this.temporaryDate.templateData == "" ||
        this.temporaryDate.templateData == null ||
        this.temporaryDate.templateData == undefined
      ) {
        messageUtil.message.error("模版数据为空");
      } else if (this.temporaryDate.status == undefined) {
        messageUtil.message.error("状态为空");
      } else if (
        this.temporaryDate.templateType === "" ||
        this.temporaryDate.templateType == undefined
      ) {
        messageUtil.message.error("模版类型为空");
      } else {
        httpUtil.xhrPost(
          this,
          this.actions.updateFlowerTemplate,
          {
            ...this.temporaryDate
          },
          data => {
            messageUtil.message.success("修改成功");
            this.drawer = false;
            this.getData();
          }
        );
      }
    },
    drawercancel() {
      this.drawer = false;
    },
    //新增
    add() {
      this.temporaryDate = [];
      this.check = 1;
      this.drawer = true;
    },
    //oss直传
    setImgPath(e) {
      if (this.imgPath == 1) {
        this.temporaryDate.ossUrl = e;
      }
      this.$forceUpdate();
    },
    clickInput(e) {
      this.imgPath = e;
      document.getElementById("file").click();
    },
    chooseFile1(e) {
      console.log(this.$refs.file)
      this.$refs.ossBtn.chooseFile(this.$refs.file, e);
      document.getElementById("file").value="";
    },
    //下载文件
    getfile(e) {
      this.gaoqingimg = e + "?response-content-type=application%2Foctet-stream"; //打开子页面加载
    },
    //列表查询
    getData() {
      let self = this;
      httpUtil.xhrPost(
        this,
        this.actions.getFlowerTemplates,
        {
          ...this.searchParams.getFlowerTemplates,
          ...this.page
        },
        data => {
          this.tableData = data.data.list;
          this.page.total = data.data.total;
          this.page.page = data.data.pageNum;
        }
      );
    },
    //花型构图管理选择确定
    ascertain(e) {
      this.updateFlowerTemplate();
      this.drawer = false;
    },
    //花型构图管理取消
    cancel() {
      this.drawer = false;
    },
    //编辑
    checkf(e, f) {
      this.drawer = true;
      if(f==0){
          this.drawertitle="查询花型构图"
      }
      else if(f==1){
          this.drawertitle="新增花型构图"
      }
      else if(f==2){
          this.drawertitle="修改花型构图"
      }
      this.temporaryDate.id = e.id;
      this.temporaryDate.ossUrl = e.ossUrl;
      this.temporaryDate.status = e.status;
      this.temporaryDate.templateData = e.templateData;
      this.temporaryDate.templateType = e.templateType;
      this.check = f;
      //console.log(this.temporaryDate);
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
      this.searchParams.getFlowerTemplates.key = "";
      this.getData();
      this.$forceUpdate();
    },

    //修改花型构图
    updateFlowerTemplate() {
      let self = this;

      httpUtil.xhrPost(
        this,
        this.actions.updateFlowerTemplate,
        {
          ...this.searchParams.updateFlowerTemplate,
          ...this.page
        },
        data => {
          self.getData();
          messageUtil.message.success("处理成功");
        }
      );
    },
    changePage(page) {
      this.page.page = page;
      this.getData();
    },
    getlist() {
      let self = this;
      httpUtil.xhrPost(
        this,
        this.actions.getlist,
        {
          ...this.searchParams.getlist1
        },
        data => {
          self.genre1 = JSON.parse(data.data.json1).pdMenu;
          self.genre2 = JSON.parse(data.data.json2).pdStyle;
        }
      );
    }
  },
  mounted() {
    // this.getlist();
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
.imgDown{
  cursor: pointer;
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
