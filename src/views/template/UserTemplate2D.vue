<template>
  <div class="content">
    <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe>
    <OSSUploadNoBtn type="1" ref="ossBtn" @setImgPath="setImgPath"></OSSUploadNoBtn>
    <el-drawer size="50%" title="私人衣橱" :visible.sync="drawer" direction="rtl">
      <el-form class="form" style="margin-top:-32px">
        <!-- <el-divider v-if="check==0" content-position="left">查询私人衣橱</el-divider>
        <el-divider v-if="check==1" content-position="left">新增私人衣橱</el-divider>
        <el-divider v-if="check==2" content-position="left">修改私人衣橱</el-divider>-->
        <el-divider content-position="left"></el-divider>
        <el-row v-if="check==1">
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="所属用户Id:">
                <el-input
                @input="changenumber"
                  :show-overflow-tooltip="true"
                  type="number"
                  v-model="temporaryDate.userId"
                ></el-input>
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
              <el-form-item label="服装原图:">
                <img width="50%" @click="getfile(temporaryDate.clotheImage)" class="imgDown" :src="temporaryDate.clotheImage" />
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
              <!-- <img src="../../assets/image/homepage/23.inbox.png" alt /> -->
              <el-button v-if="check!=0" type="primary" size="small" @click="clickInput(1)">更换原图</el-button>
            </label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="背景原图:">
                <img width="50%" @click="getfile(temporaryDate.thumbnail)" class="imgDown" :src="temporaryDate.thumbnail" />
              </el-form-item>
            </el-form>
          </el-col>>
          <el-col :span="6">
            <label class="formBox" for="file">
              <el-button v-if="check!=0" type="primary" size="small" @click="clickInput(2)">更换原图</el-button>
            </label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1">
            <div style="width:100%;height:40px"></div>
          </el-col>
          <el-col :span="11">
            <el-form label-width="110px" label-position="left">
              <el-form-item label="模型名:">
                <el-input
                @input="changenumber"
                  v-if="check!=0"
                  :show-overflow-tooltip="true"
                  type="text"
                  v-model="temporaryDate.templateName"
                  id
                ></el-input>
                <input
                  v-if="check==0"
                  :show-overflow-tooltip="true"
                  readonly
                  type="text"
                  v-model="temporaryDate.templateName"
                  id
                />
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
              <el-form-item label="类型1:">
                <!-- searchParams addUser name account fkDepartmentId roleId -->
                <el-select
                  v-if="check==0"
                  disabled="disabled"
                  v-model="temporaryDate.genre1"
                  @change="genre1click"
                  placeholder="请选择类型1"
                >
                  <el-option
                    v-for="item in template"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-select
                  v-if="check!=0"
                  v-model="temporaryDate.genre1"
                  @change="genre1click"
                  placeholder="请选择类型1"
                >
                  <el-option
                    v-for="item in template"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
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
              <el-form-item label="类型2:">
                <!-- searchParams addUser name account fkDepartmentId roleId -->
                <el-select
                  v-if="check==0"
                  disabled="disabled"
                  v-model="temporaryDate.genre2"
                  @change="genre2click"
                  placeholder="请选择类型2"
                >
                  <el-option
                    v-for="item in template2D[this.temporaryDate.genre1]"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-select
                  v-if="check!=0"
                  v-model="temporaryDate.genre2"
                  @change="genre2click"
                  placeholder="请选择类型2"
                >
                  <el-option
                    v-for="item in template2D[this.temporaryDate.genre1]"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
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
              <el-form-item label="宽度:">
                  <input
                    v-if="check==0"
                    readonly
                    type="number"
                    v-model="temporaryDate.width"
                  />
                  <el-input
                  @input="changenumber"
                    v-if="check!=0"
                    :show-overflow-tooltip="true"
                    type="number"
                    v-model="temporaryDate.width"
                  ></el-input>
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
              <el-form-item label="高度:">
                  <input
                    v-if="check==0"
                    type="number"
                    readonly
                    v-model="temporaryDate.height"
                  />
                  <el-input
                    @input="changenumber"
                    v-if="check!=0"
                    type="number"
                    v-model="temporaryDate.height"
                  ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row v-if="check!=1">
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
          <el-col v-if="check==1" :span="5">
            <el-button type="primary" @click="draweradd()" size="small">确定</el-button>
          </el-col>
          <el-col v-if="check==2" :span="5">
            <el-button type="primary" @click="drawermodify()" size="small">确定</el-button>
          </el-col>
          <el-col :span="4">
            <el-button  @click="drawercancel()" size="small">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-drawer>
    <div class="note">
      <div class="noteText">私人衣橱</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="关键字:">
                <el-input v-model="searchParams.getUserTemplate2ds.key" placeholder="关键字"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="query"  v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="reset">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="add"  v-if="user.roleBtns.indexOf(url+'add')>-1">新&nbsp;&nbsp;增</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="dataListArea">
          <el-table class="tableData" :data="tableData" border stripe width="100%">
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="userId"
              label="管理员ID"
              width="100"
            ></el-table-column>
            <el-table-column align="center" label="背景缩略图" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.backgroudImage" style="width: 60px;height:90px" />
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="背景图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.thumbnail" style="width: 60px;height:90px" />
              </template>
            </el-table-column> -->
            <el-table-column align="center" label="服装缩略图 " width="150">
              <template slot-scope="scope">
                <img :src="scope.row.clotheThumbnail" style="width: 60px;height:90px" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="150">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.status==0">上架</el-tag>
                <el-tag v-if="scope.row.status==-10">下架</el-tag>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="服装图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.clotheImage" style="width: 60px;height:90px" />
              </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" label="外套缩略图" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.coatTmb" style="width: 60px;height:90px" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="外套图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.coat" style="width: 60px;height:90px" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="衬衣缩略图" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.coatInnerTmb" style="width: 60px;height:90px" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="衬衣图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.coatInner" style="width: 60px;height:90px" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="下衣缩略图 " width="150">
              <template slot-scope="scope">
                <img :src="scope.row.coatUnderTmb" style="width: 60px;height:90px" />
              </template>
            </el-table-column>
            <el-table-column align="center" label="下衣图片" width="150">
              <template slot-scope="scope">
                <img :src="scope.row.coatUnder" style="width: 60px;height:90px" />
              </template>
            </el-table-column>-->
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="typename1"
              label="类型1"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="typename2"
              label="类型2"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="width"
              label="宽（px）"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="height"
              label="高（px）"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="templateName"
              label="模型名 "
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="createTime"
              label="创建时间"
              width="200"
            ></el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" @click="checkf(scope.row,0)" size="small"  v-if="user.roleBtns.indexOf(url+'select')>-1">查看</el-button>
                <el-button type="primary" @click="checkf(scope.row,2)" size="small"  v-if="user.roleBtns.indexOf(url+'update')>-1">编辑</el-button>
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
import {mapGetters} from 'vuex';
export default {
  name: "UsergetUserTemplate2ds",
  path: "UsergetUserTemplate2ds",
  components: {
    OSSUploadNoBtn
  },
  data() {
    return {
      //请求的接口
      actions: {
        getUserTemplate2ds: "/usertemplate2d/getUserTemplate2ds", //私人衣橱查询
        updateTemplate2d: "/usertemplate2d/updateTemplate2d", //私人衣橱修改
        addUserTemplate2d: "/usertemplate2d/addUserTemplate2d" //私人衣橱新增
      },
      //查询参数
      searchParams: {
        getUserTemplate2ds: {
          //3D模型查询
          key: "" //关键字
        },
        updateTemplate2d: {
          //3D模型修改
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
      tableData: [],
      temporaryDate: [], //临时数据
      drawer: false, //抽屉控制
      check: 0, //修改状态
      gaoqingimg: "", //下载图片地址
      direction: "rtl",
      //oss直传
      address: "/oss/getOssSignOfTemplate2d",
      imgPath: "",
      template: [
        { id: 0, name: "女装" },
        { id: 1, name: "男装" },
        { id: 2, name: "童装" },
        { id: 3, name: "家纺" },
        { id: 4, name: "其它" }
      ],
      template2D: [
        {
          id: 0,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%BF%9E%E8%A1%A3%E8%A3%99.jpg",
          title: "连衣裙",
          english: "Dress",
          elements: [],
          categType: 0
        },
        {
          id: 1,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%A4%BC%E6%9C%8D.jpg",
          title: "礼服",
          english: "Full dress",
          elements: [],
          categType: 0
        },
        {
          id: 2,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/T%E6%81%A4.jpg",
          title: "T恤",
          english: "T-shirt",
          elements: [],
          categType: 0
        },
        {
          id: 3,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%A7%E8%A1%A3.jpg",
          title: "大衣",
          english: "Overcoat",
          elements: [],
          categType: 0
        },
        {
          id: 4,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A5%97%E8%A3%85.jpg",
          title: "套装",
          english: "Suit",
          elements: [],
          categType: 0
        },
        {
          id: 5,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%BE%BD%E7%BB%92%E6%9C%8D.jpg",
          title: "羽绒服",
          english: "Down Jackets",
          elements: [],
          categType: 0
        },
        {
          id: 6,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A1%AC%E8%A1%AB.jpg",
          title: "衬衫",
          english: "Shirt",
          elements: [],
          categType: 0
        },
        {
          id: 7,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E4%B8%AD%E8%80%81%E5%B9%B4.jpg",
          title: "中老年",
          english: "Middle and old age",
          elements: [],
          categType: 0
        },
        {
          id: 8,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%8D%8A%E8%A3%99.jpg",
          title: "半裙",
          english: "Half skirt",
          elements: [],
          categType: 0
        },
        {
          id: 9,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%96%E5%A5%97.jpg",
          title: "外套 ",
          english: "Loose coat",
          elements: [],
          categType: 0
        },
        {
          id: 10,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A3%A4%E5%AD%90.jpg",
          title: "裤子",
          english: "Trousers",
          elements: [],
          categType: 0
        },
        {
          id: 11,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A1%AC%E8%A1%AB%E7%94%B7.jpg",
          title: "衬衫",
          english: "Shirt",
          elements: [],
          categType: 1
        },
        {
          id: 12,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%A7%E8%A1%A3%E7%94%B7.jpg",
          title: "大衣",
          english: "Overcoat",
          elements: [],
          categType: 1
        },
        {
          id: 13,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%9F%AD%E8%A2%96%E7%94%B7.jpg",
          title: "T恤",
          english: "T-shirt",
          elements: [],
          categType: 1
        },
        {
          id: 14,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A3%A4%E5%AD%90%E7%94%B7.jpg",
          title: "裤子",
          english: "Trousers",
          elements: [],
          categType: 1
        },
        {
          id: 15,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A5%BF%E8%A3%85%E7%94%B7.jpg",
          title: "西服",
          english: "Man's suit",
          elements: [],
          categType: 1
        },
        {
          id: 16,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%96%E5%A5%97%E7%94%B7.jpg",
          title: "外套",
          english: "Loose coat",
          elements: [],
          categType: 1
        },
        {
          id: 17,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E4%BC%9E.jpg",
          title: "雨伞",
          english: "Umbrella",
          elements: [],
          categType: 4
        },
        {
          id: 18,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%B8%BD%E5%AD%90.jpg",
          title: "太阳帽",
          english: "Sun hat",
          elements: [],
          categType: 4
        },
        {
          id: 19,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%AA%97%E5%B8%98.jpg",
          title: "窗帘",
          english: "Window curtains",
          elements: [],
          categType: 3
        },
        {
          id: 20,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%BE%BD%E7%BB%92%E6%9C%8D%E7%94%B7.jpg",
          title: "羽绒服",
          english: "Down Jackets",
          elements: [],
          categType: 1
        },
        {
          id: 21,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%96%E5%A5%97%E7%AB%A5.jpg",
          title: "外套",
          english: "Loose coat",
          elements: [],
          categType: 2
        },
        {
          id: 22,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A3%A4%E5%AD%90%E7%AB%A5.jpg",
          title: "裤子",
          english: "Trousers",
          elements: [],
          categType: 2
        },
        {
          id: 23,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/T%E6%81%A4%E7%AB%A5.jpg",
          title: "T恤",
          english: "T-shirt",
          elements: [],
          categType: 2
        },
        {
          id: 24,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%BF%9E%E8%A1%A3%E8%A3%99%E7%AB%A5.jpg",
          title: "裙子",
          english: "Skirt",
          elements: [],
          categType: 2
        },
        {
          id: 25,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%BE%BD%E7%BB%92%E6%9C%8D%E7%AB%A5%E8%A3%85.jpg",
          title: "羽绒服",
          english: "Down Jackets",
          elements: [],
          categType: 2
        },
        {
          id: 26,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E6%97%97%E8%A2%8D.jpg",
          title: "旗袍",
          english: "Cheongsam",
          elements: [],
          categType: 0
        },
        {
          id: 27,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E6%B2%99%E5%8F%91.jpg",
          title: "沙发",
          english: "Sofa",
          elements: [],
          categType: 3
        },
        {
          id: 28,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A3%81%E7%BA%B8.jpg",
          title: "墙布",
          english: "Wall covering",
          elements: [],
          categType: 3
        },
        {
          id: 29,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%BA%8A.jpg",
          title: "床",
          english: "Bed",
          elements: [],
          categType: 3
        },
        {
          id: 30,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E6%8A%B1%E6%9E%95.jpg",
          title: "抱枕",
          english: "Pillow",
          elements: [],
          categType: 3
        },
        {
          id: 31,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%9C%B0%E6%AF%AF%20%281%29.jpg",
          title: "地毯",
          english: "Carpet",
          elements: [],
          categType: 3
        },
        {
          id: 32,
          fname:
            "https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%9C%B0%E6%AF%AF%20%282%29.jpg",
          title: "包",
          english: "Package",
          elements: [],
          categType: 4
        }
      ],
      url:''
    };
  },
  methods: {
    draweradd() {
      let self=this;
      if (
        this.temporaryDate.clotheImage == "" ||
        this.temporaryDate.clotheImage == null ||
        this.temporaryDate.clotheImage == undefined
      ) {
        messageUtil.message.error("服装图片为空");
      } else if (
        this.temporaryDate.userId == "" ||
        this.temporaryDate.userId == null ||
        this.temporaryDate.userId == undefined
      ) {
        messageUtil.message.error("userId为空");
      }else if (
        this.temporaryDate.thumbnail == "" ||
        this.temporaryDate.thumbnail == null ||
        this.temporaryDate.thumbnail == undefined
      ) {
        messageUtil.message.error("背景原图为空");
      } else if (
        this.temporaryDate.templateName == "" ||
        this.temporaryDate.templateName == null ||
        this.temporaryDate.templateName == undefined
      ) {
        messageUtil.message.error("模型名为空");
      } else if (
        this.temporaryDate.genre1 === "" ||
        this.temporaryDate.genre1 == undefined
      ) {
        messageUtil.message.error("类型1为空");
      } else if (
        this.temporaryDate.genre2 === "" ||
        this.temporaryDate.genre2 == undefined
      ) {
        messageUtil.message.error("类型2为空");
      } else if (
        this.temporaryDate.height == "" ||
        this.temporaryDate.height == null ||
        this.temporaryDate.height == undefined ||
        this.temporaryDate.height < 0
      ) {
        messageUtil.message.error("高度为空或小于0");
      } else if (
        this.temporaryDate.width == "" ||
        this.temporaryDate.width == null ||
        this.temporaryDate.width == undefined ||
        this.temporaryDate.width < 0
      ) {
        messageUtil.message.error("宽度为空或小于0");
      } else {
        httpUtil.xhrPost(
          self,
          self.actions.addUserTemplate2d,
          {
            ...self.temporaryDate
          },
          data => {
            messageUtil.message.success("新增成功");
            self.drawer = false;
            self.getData();
          }
        );
      }
    },
    drawermodify() {
      if (
        this.temporaryDate.clotheImage == "" ||
        this.temporaryDate.clotheImage == null ||
        this.temporaryDate.clotheImage == undefined
      ) {
        messageUtil.message.error("服装图片为空");
      } else if (
        this.temporaryDate.thumbnail == "" ||
        this.temporaryDate.thumbnail == null ||
        this.temporaryDate.thumbnail == undefined
      ) {
        messageUtil.message.error("背景原图为空");
      } else if (
        this.temporaryDate.templateName == "" ||
        this.temporaryDate.templateName == null ||
        this.temporaryDate.templateName == undefined
      ) {
        messageUtil.message.error("模型名为空");
      } else if (
        this.temporaryDate.genre1 === "" ||
        this.temporaryDate.genre1 == undefined
      ) {
        messageUtil.message.error("类型1为空");
      } else if (
        this.temporaryDate.genre2 === "" ||
        this.temporaryDate.genre2 == undefined
      ) {
        messageUtil.message.error("类型2为空");
      } else if (
        this.temporaryDate.height == "" ||
        this.temporaryDate.height == null ||
        this.temporaryDate.height == undefined ||
        this.temporaryDate.height < 0
      ) {
        messageUtil.message.error("高度为空或小于0");
      } else if (
        this.temporaryDate.width == "" ||
        this.temporaryDate.width == null ||
        this.temporaryDate.width == undefined ||
        this.temporaryDate.width < 0
      ) {
        messageUtil.message.error("宽度为空或小于0");
      } else {
        httpUtil.xhrPost(
          this,
          this.actions.updateTemplate2d,
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
    genre1click() {
      this.temporaryDate.genre2 = null;
      this.$forceUpdate();
    },
    genre2click() {
      this.$forceUpdate();
    },
    changenumber(){
      this.$forceUpdate();
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
        this.temporaryDate.clotheImage = e;
      } else {
        this.temporaryDate.thumbnail = e;
      }

      this.$forceUpdate();
    },
    clickInput(e) {
      this.imgPath = e;
      document.getElementById("file").click();
    },
    chooseFile1(e) {
      //console.log(e);
      this.$refs.ossBtn.chooseFile(this.$refs.file, e);
      document.getElementById("file").value="";
    },
    //下载文件
    getfile(e) {
      this.gaoqingimg = e + "?response-content-type=application%2Foctet-stream"; //打开子页面加载
    },
    //列表查询
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getUserTemplate2ds,
        {
          ...this.searchParams.getUserTemplate2ds,
          ...this.page
        },
        data => {
          // this.tableData = data.data.list;
          this.tableData = SetType.setType(data, 3);
          this.page.total = data.data.total;
          this.page.page = data.data.pageNum;
        }
      );
    },
    //3D模型管理选择确定
    ascertain(e) {
      this.updateTemplate2d();
      this.drawer = false;
    },
    //3D模型管理取消
    cancel() {
      this.drawer = false;
    },
    //编辑
    checkf(e, f) {
      this.drawer = true;
      this.temporaryDate.id = e.id;
      this.temporaryDate.userId = e.userId;
      this.temporaryDate.clotheImage = e.clotheImage;
      this.temporaryDate.thumbnail = e.thumbnail;
      this.temporaryDate.status = e.status;
      this.temporaryDate.templateName = e.templateName;
      this.temporaryDate.genre1 = e.genre1;
      this.temporaryDate.genre2 = e.genre2;
      this.temporaryDate.height = e.height;
      this.temporaryDate.width = e.width;
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
      this.searchParams.getUserTemplate2ds.key = "";
      this.getData();
      this.$forceUpdate();
    },

    //修改3D模型
    updateTemplate2d() {
      let self = this;

      httpUtil.xhrPost(
        this,
        this.actions.updateTemplate2d,
        {
          ...this.searchParams.updateTemplate2d,
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
    fortemplate2D() {
      let a = [[], [], [], [], []];
      for (let i = 0; i < this.template2D.length; i++) {
        if (this.template2D[i].categType == 0) {
          a[0].push(this.template2D[i]);
        } else if (this.template2D[i].categType == 1) {
          a[1].push(this.template2D[i]);
        } else if (this.template2D[i].categType == 2) {
          a[2].push(this.template2D[i]);
        } else if (this.template2D[i].categType == 3) {
          a[3].push(this.template2D[i]);
        } else if (this.template2D[i].categType == 4) {
          a[4].push(this.template2D[i]);
        }
      }
      this.template2D = a;
    }
  },
  mounted() {
    this.fortemplate2D();
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
.imgDown{
  cursor: pointer;
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
