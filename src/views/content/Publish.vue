<template>
  <div class="supplyReview">
    <div class="title">
      供求审核
    </div>
    <div class="data">
      <div class="type">
        <div :class="params.type===0?'check type0':'type0'" @click="changeType(0)">
          供应信息
        </div>
        <div :class="params.type===1?'check type1':'type1'" @click="changeType(1)">
          求购信息
        </div>
      </div>
      <div class="status">
        <el-select
          v-model="params.status"
          placeholder="请选择"
          @change="getTableList">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-table
        :data="tableData"
        class="tableList"
        border
        stripe>
        <el-table-column
          prop="createTime"
          label="时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="area"
          label="地点"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="总金额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center">
          <template slot-scope="scoped">
            <el-button v-if="scoped.row.status===0" @click="daishenheBtn(scoped.row)" size="mini" type="primary">审核</el-button>
            <el-button v-else-if="scoped.row.status===1" size="mini" @click="daishenheBtn(scoped.row)">查看</el-button>
            <el-button v-else-if="scoped.row.status===2" size="mini" @click="daishenheBtn(scoped.row)">查看</el-button>
            <el-button v-else size="mini" @click="daishenheBtn(scoped.row)">审核失败</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBottom">
        <el-pagination
          background
          :hide-on-single-page="true"
          layout="prev, pager, next"
          @current-change="changePage"
          :total="total"
          :current="params.page">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="'内容简介:'+ content.description"
      width="950px"
      :visible.sync="drawer"
      :before-close="handleClose">
      <SupplyReviewMould :content="content"></SupplyReviewMould>
      <div class="statusRadio" v-if="listStatus===0">
        <el-radio v-model="status" label="1">通过</el-radio>
        <el-radio v-model="status" label="3">不通过</el-radio>
      </div>
      <el-input
        type="textarea"
        autosize
        v-if="status==='3'&&listStatus===0"
        placeholder="请输入审核不通过原因"
        v-model="note">
      </el-input>
      <el-button type="primary" class="statusPostBtn" @click="statusPostBtn" v-if="listStatus===0">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import httpUtil from '../../utils/js/HttpUtil'
import { Message, Loading } from 'element-ui'
import SupplyReviewMould from './SupplyReviewMould'
export default {
  components: {
    SupplyReviewMould
  },
  data () {
    return {
      actions: {
        // 获取供求审核列表数据
        getCheckList: '/publish/supply/demand/check/list',
        // 审核
        postCheck: '/publish/supply/demand/check'
      },
      params: {
        page: 1,
        rows: 10,
        type: 0,
        status: ''
      },
      total: 0,
      tableData: [],
      statusList: [
        { value: '', label: '全部' },
        { value: '0', label: '待审核' },
        { value: '1', label: '上架中' },
        { value: '2', label: '已下架' },
        { value: '3', label: '审核失败' },
      ],
      drawer: false,
      content: {},
      status: '1',
      id: null,
      note: '',
      listStatus: 0
    }
  },
  methods: {
    // 获取供求审核列表数据
    getTableList () {
      httpUtil.xhrGet(
        this,
        this.actions.getCheckList,
        {
          ...this.params
        },
        data => {
          this.tableData = data.data.list
          this.total = data.data.total
        }
      )
    },
    // 改变type值
    changeType (value) {
      this.params.type = value
      this.getTableList()
    },
    // 页码切换
    changePage(page) {
      this.params.page = page;
      this.getTableList();
    },
    // 点击待审核
    daishenheBtn (value) {
      let startDate = value.createTime
      startDate= startDate.replace(new RegExp("-","gm"),"/")
      const createTime = (new Date(startDate)).getTime()
      this.content = JSON.parse(JSON.stringify(value))
      this.content.createTime = createTime
      this.id = value.id
      this.listStatus = value.status
      this.drawer = true
    },
    // 关闭预览抽屉
    handleClose () {
      this.content = {}
      this.note = ''
      this.status = '1'
      this.listStatus = 0
      this.drawer = false
    },
    // 提交审核结果
    statusPostBtn () {
      if (this.status === '3' && this.note.trim() === '') {
        return Message.error('请填写审核不通过理由')
      }
      const params = {
        id: this.id,
        status: this.status,
        note: ''
      }
      if (this.status === '3') {
        params.note = this.note
      }
      httpUtil.xhrPost(
        this,
        this.actions.postCheck,
        {
          ...params
        },
        data => {
          this.getTableList()
          this.handleClose()
        }
      )
    }
  },
  created () {
    this.getTableList()
  }
}
</script>

<style scoped>
  .title{
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    height: 46px;
    padding-left: 32px;
    padding-top: 18px;
    font-weight: bold;
  }
  .data{
    border: 24px solid #F0F3F7;
    min-height: calc(100vh - 128px);
    box-sizing: border-box;
  }
  .type{
    display: flex;
    height: 40px;
    line-height: 40px;
  }
  .type0,.type1{
    font-size: 20px;
    margin-left: 20px;
    font-weight: 500;
    cursor: pointer;
  }
  .check{
    color: #409EFF;
    border-bottom: 4px solid #409EFF;
  }
  .statusRadio{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .statusPostBtn{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
  }
  .status{
    margin: 20px;
  }
  .tableList{
    margin: auto 20px;
    width: calc(100% - 40px);
  }
  .pageBottom{
    margin: 10px;
    display: flex;
    justify-content: flex-end;
  }
</style>