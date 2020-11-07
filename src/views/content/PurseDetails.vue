<template>
  <div class="content">
    <iframe id="iframe" style="border:0;display:none" :src="gaoqingimg" width="0" height="0"></iframe>
    <div class="note">
      <div class="noteText">订单管理</div>
    </div>
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="订单类型:">
                <el-select v-model="searchParams.getUserPurseDetails.type">
                  <el-option label="全部" value></el-option>
                  <el-option label="出售操作" value="1"></el-option>
                  <el-option label="购买操作" value="2"></el-option>
                  <el-option label="提现操作" value="3"></el-option>
                  <el-option label="充值VIP" value="4"></el-option>
                  <el-option label="充值花花币" value="5"></el-option>
                  <el-option label="付费版权" value="6"></el-option>
                </el-select>
              </el-form-item>
              <el-date-picker
                v-model="searchParams.getUserPurseDetails.startTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择起始时间"
              ></el-date-picker>
              <el-date-picker
                v-model="searchParams.getUserPurseDetails.endTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd 23:59:59"
                type="date"
                default-time="23:59:59"
                placeholder="选择结束时间"
              ></el-date-picker>
              <el-form-item>
                <el-button type="primary" @click="query" v-if="user.roleBtns.indexOf(url+'select')>-1">查&nbsp;&nbsp;询</el-button>
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
                <img
                  v-if="scope.row.flowerPattern!=null"
                  :src="scope.row.flowerPattern.picture1 "
                  style="width: 60px;height:90px"
                />
                <img
                  v-if="scope.row.material!=null"
                  :src="scope.row.material.picture "
                  style="width: 60px;height:90px"
                />
                <img
                  v-if="scope.row.vipOrderDetail!=null"
                  src="../../assets/imgs/pursedetails/vip.png"
                  style="width: 60px;height:90px"
                />
                <img
                  v-if="scope.row.copyright!=null"
                  :src="scope.row.copyright.imgUrl  "
                  style="width: 60px;height:90px"
                />
                <img
                  v-if="(scope.row.flowerPattern==null&&scope.row.material==null&&scope.row.vipOrderDetail==null&&scope.row.copyright==null)"
                  src="../../assets/imgs/pursedetails/no.png"
                  style="width: 60px;height:90px"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="支付类型" width="200">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.originType==3">支付宝扫码</el-tag>
                <el-tag type="warning" v-if="scope.row.originType==4">零钱</el-tag>
                <el-tag v-if="scope.row.originType==5">微信扫码</el-tag>
                <el-tag type="danger" v-if="scope.row.originType==6">花花币</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" :show-overflow-tooltip="true" label="动账金额 " width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.type !=1">￥{{ scope.row.rmb }}</span>
                <span v-if="scope.row.type ==1">-￥{{ scope.row.rmb }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="remark"
              label="备注 "
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="orderCode"
              label="订单流水号 "
              width="200"
            ></el-table-column>
            <el-table-column align="center" label="数据类型" width="200">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.type ==1&&scope.row.buyType==1">出售花型</el-tag>
                <el-tag v-if="scope.row.type ==1&&scope.row.buyType==2">出售素材</el-tag>
                <el-tag type="warning" v-if="scope.row.type ==2&&scope.row.buyType==3">购买花型</el-tag>
                <el-tag type="warning" v-if="scope.row.type ==2&&scope.row.buyType==4">购买素材</el-tag>
                <el-tag type="warning" v-if="scope.row.type ==3">零钱提现</el-tag>
                <el-tag type="warning" v-if="scope.row.type ==4">充值VIP</el-tag>
                <el-tag type="warning" v-if="scope.row.type ==5">充值花花币</el-tag>
                <el-tag type="warning" v-if="scope.row.type ==6">付费版权</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="会员类型" width="200">
              <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.vipBuy ==0">非会员</el-tag>
                <el-tag v-if="scope.row.vipBuy ==1">个人会员</el-tag>
                <el-tag v-if="scope.row.vipBuy ==2">企业会员</el-tag>
              </template>
            </el-table-column>

            <!-- <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="moneyChange"
              label="零钱流水"
              width="150"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="storeMoneyChange"
              label="花花币流水 "
              width="150"
            ></el-table-column>-->

            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="userId"
              label="用户编号"
              width="100"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="createTime"
              label="创建时间"
              width="200"
            ></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              prop="payTime"
              label="支付时间 "
              width="200"
            ></el-table-column>
            <el-table-column align="center" label="完成状态" width="200">
              <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.detailStatus ==-10">未完成</el-tag>
                <el-tag v-if="scope.row.detailStatus ==0">已完成</el-tag>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" fixed="right" width="180" v-if="user.roleBtns.indexOf(url+'select')>-1">
              <template slot-scope="scope">
                <el-button size="small" v-if="(scope.row.type==3||scope.row.type==5)" type="info">查看</el-button>
                <el-button
                  size="small"
                  v-if="(scope.row.type!=3&&scope.row.type!=5)"
                  type="primary"
                  @click="check(scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page"
            background
            layout="prev, pager, next"
            @current-change="changePage"
            :total="page.total"
            :current-page.sync="page.page"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div>
      <el-drawer
        size="50%"
        :title="title"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="closeCheckDrawer"
      >
        <div v-if="modules==1"  style="margin-top:-32px">
          <el-divider content-position="left">模块详情</el-divider>
          <div class="checkDrawer" style="overflow-y:auto">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="图片预览:">
                      <img width="50%" :src="detailInfo.picture1" />
                      <el-button
                        @click="downLoad(detailInfo.picture1)"
                        type="primary"
                        size="small"
                      >点击下载</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="花型名称:">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="detailInfo.name"
                        placement="top"
                      >
                        <label
                          v-if="detailInfo.name!=undefined&&detailInfo.name.length>15"
                        >{{detailInfo.name.substring(0,15)+"..."}}</label>
                        <label
                          v-if="detailInfo.name!=undefined&&detailInfo.name.length<=15"
                        >{{detailInfo.name}}</label>
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
                      <el-button
                        @click="downLoad(detailInfo.sourceFile)"
                        type="primary"
                        size="small"
                      >点击下载</el-button>
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
                      <label>{{detailInfo.genre1name}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="风格:">
                      <label>{{detailInfo.styleTypename}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div v-if="modules==2"  style="margin-top:-32px">
          <el-divider content-position="left">模块详情</el-divider>
          <div class="checkDrawer" style="overflow-y:auto">
            <el-form>
              <el-row>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="图片预览:">
                      <img width="50%" :src="detailInfo.picture" />
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="素材名称:">
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="detailInfo.name"
                        placement="top"
                      >
                        <label
                          v-if="detailInfo.name!=undefined&&detailInfo.name.length>15"
                        >{{detailInfo.name.substring(0,15)+"..."}}</label>
                        <label
                          v-if="detailInfo.name!=undefined&&detailInfo.name.length<=15"
                        >{{detailInfo.name}}</label>
                      </el-tooltip>
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
                    <el-form-item label="尺寸(高):">
                      <label>{{detailInfo.height}} px</label>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="尺寸(宽):">
                      <label>{{detailInfo.width}} px</label>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="印刷方式:">
                      <label v-if="detailInfo.printingOrEmbroider ==0">印花</label>
                      <label v-if="detailInfo.printingOrEmbroider ==1">绣花</label>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="风格:">
                      <label>{{detailInfo.styleTypename}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="类型:">
                      <label>{{detailInfo.genre1name}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12">
                  <el-form label-width="100px">
                    <el-form-item label="子类型:">
                      <label>{{detailInfo.genre2name}}</label>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div v-if="modules==3"  style="margin-top:-32px">
          <el-divider content-position="left">模块详情</el-divider>
          <div class="checkDrawer" style="overflow-y:auto">
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="会员类型:">
                    <label v-if="detailInfo.type  ==0">个人会员</label>
                    <label v-if="detailInfo.type  ==1">企业会员</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="订单流水号:">
                    <label>{{detailInfo.orderCode}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="价格:">
                    <label>¥ {{detailInfo.price }}</label>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="赠送分色次数:">
                    <label>{{detailInfo.giveColorSeparation }}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form label-width="100px">
                  <el-form-item label="备注:">
                    <label>{{detailInfo.remark }}</label>
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
                  <el-form-item label="开通时间:">
                    <label>{{detailInfo.month}}月</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="修改时间:">
                    <label>{{detailInfo.updateTime}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="modules==4"  style="margin-top:-32px">
          <el-divider content-position="left">模块详情</el-divider>
          <div class="checkDrawer" style="overflow-y:auto">
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="营业执照:">
                    <img width="50%" :src="detailInfo.businessLicenseFile" />
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="营业执照号:">
                    <label>{{detailInfo.businessLicenseNum}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="公司全称:">
                    <label>{{detailInfo.companyName}}</label>
                  </el-form-item>
                </el-form>
              </el-col>

              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="创作城市:">
                    <label>{{detailInfo.createCity}}</label>
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
                  <el-form-item label="税号:">
                    <label>{{detailInfo.dutyParagraph}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="身份证号:">
                    <label>{{detailInfo.idCard}}</label>
                  </el-form-item>
                </el-form>
              </el-col>

              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="身份证反面:">
                    <img width="50%" :src="detailInfo.idCardBack" />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="身份证正面:">
                    <img width="50%" :src="detailInfo.idCardFront" />
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="版权文件:">
                    <img width="50%" :src="detailInfo.imgUrl" />
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="发票抬头:">
                    <label>{{detailInfo.invoiceTitle}}</label>
                  </el-form-item>
                </el-form>
              </el-col>

              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="物流单号:">
                    <label>{{detailInfo.logisticsNumber}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="发票类型:">
                    <label v-if="detailInfo.needInvoice ==0">不需要发票</label>
                    <label v-if="detailInfo.needInvoice ==1">增值发票</label>
                    <label v-if="detailInfo.needInvoice ==2">普通发票</label>
                  </el-form-item>
                </el-form>
              </el-col>

              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="订单流水号:">
                    <label>{{detailInfo.orderCode}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="所需费用:">
                    <label>{{detailInfo.price}}</label>
                  </el-form-item>
                </el-form>
              </el-col>

              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="收件地址 :">
                    <label>{{detailInfo.receiptAddress}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="收件电话:">
                    <label>{{detailInfo.receiptPhone}}</label>
                  </el-form-item>
                </el-form>
              </el-col>

              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="版权状态:">
                    <label v-if="detailInfo.state==0">待付款</label>
                    <label v-if="detailInfo.state==1">已支付</label>
                    <label v-if="detailInfo.state==2">审核中</label>
                    <label v-if="detailInfo.state==3">审核完成</label>
                    <label v-if="detailInfo.state==4">已寄出</label>
                    <label v-if="detailInfo.state==5">已送达</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="发票类型:">
                    <label v-if="detailInfo.titleType==0">个人</label>
                    <label v-if="detailInfo.titleType==1">企业</label>
                  </el-form-item>
                </el-form>
              </el-col>

              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="版权地区:">
                    <label v-if="detailInfo.type1==0">全国版权</label>
                    <label v-if="detailInfo.type1==1">浙江版权</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="申请人类型:">
                    <label v-if="detailInfo.type2 ==0">个人</label>
                    <label v-if="detailInfo.type2 ==1">公司</label>
                  </el-form-item>
                </el-form>
              </el-col>

              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="修改时间:">
                    <label>{{detailInfo.updateTime}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form label-width="100px">
                  <el-form-item label="个人姓名:">
                    <label>{{detailInfo.userName}}</label>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import httpUtil from "../../utils/js/HttpUtil";
import SetType from "../../utils/js/SetType";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      //请求的接口
      actions: {
        getUserPurseDetails: "/userPurseDetail/getUserPurseDetails"
      },
      //查询参数
      searchParams: {
        getUserPurseDetails: {
          type: "",
          startTime: "",
          endTime: ""
        }
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
      gaoqingimg: "",
      //判断模块类型 花型1 素材2 vip3 版权4 分色5
      modules: 0,
      title: "",
      materialType: [
        {
          id: 1,
          name: "花",
          english: "Flower",
          list: [
            { id: 1, name: "玫瑰花", english: "Rose" },
            { id: 2, name: "菊花", english: "Chrysanthemum" },
            { id: 3, name: "牡丹花", english: "Peony" },
            { id: 4, name: "荷花", english: "Lotus" },
            { id: 5, name: "兰花", english: "Orchid" },
            { id: 6, name: "绣球花", english: "Hydrangea" },
            { id: 7, name: "牵牛花", english: "Morning glory" },
            { id: 8, name: "向日葵", english: "Sunflower" },
            { id: 9, name: "山茶花", english: "Camellia" },
            { id: 10, name: "郁金香", english: "Tulips" },
            { id: 11, name: "百合", english: "Lily" },
            { id: 12, name: "其它", english: "Other" }
          ]
        },
        {
          id: 2,
          name: "植物",
          english: "Plant",
          list: [
            { id: 1, name: "花朵", english: "Flower" },
            { id: 2, name: "花瓣", english: "Petal" },
            { id: 3, name: "花环", english: "Garland" },
            { id: 4, name: "草/枝叶", english: "Grass/Branches and Leaves" },
            { id: 5, name: "树木", english: "Tree" },
            { id: 6, name: "水果", english: "Fruits" },
            { id: 7, name: "蔬菜", english: "Vegetables" },
            { id: 8, name: "竹子", english: "Bamboo" },
            { id: 9, name: "仙人掌", english: "Cactus" },
            { id: 10, name: "蘑菇", english: "Mushroom" },
            { id: 11, name: "其它", english: "Other" }
          ]
        },
        {
          id: 3,
          name: "昆虫",
          english: "Insect",
          list: [
            { id: 1, name: "蝴蝶", english: "Butterfly" },
            { id: 2, name: "甲虫", english: "Beetle" },
            { id: 3, name: "蜻蜓", english: "Dragonfly" },
            { id: 4, name: "蜘蛛", english: "Spider" },
            { id: 5, name: "蜜蜂", english: "Honeybee" },
            { id: 6, name: "独角仙", english: "Uang" },
            { id: 7, name: "蜗牛", english: "Snail" },
            { id: 8, name: "其它", english: "Other" }
          ]
        },
        {
          id: 4,
          name: "陆地动物",
          english: "Terrestrial animals",
          list: [
            { id: 1, name: "斑马", english: "Zebra" },
            { id: 2, name: "豹", english: "Leopard" },
            { id: 3, name: "大象", english: "Elephant" },
            { id: 4, name: "狗", english: "Dog" },
            { id: 5, name: "狐狸", english: "Fox" },
            { id: 6, name: "老虎", english: "Tiger" },
            { id: 7, name: "狮子", english: "Lion" },
            { id: 8, name: "鹿", english: "Deer" },
            { id: 9, name: "猫", english: "Cat" },
            { id: 10, name: "兔子", english: "Rabbit" },
            { id: 11, name: "羊驼", english: "Alpaca" },
            { id: 12, name: "长颈鹿", english: "Giraffe" },
            { id: 13, name: "龙猫", english: "Totoro" },
            { id: 14, name: "家禽", english: "Poultry" },
            { id: 13, name: "其它", english: "Other" }
          ]
        },
        {
          id: 5,
          name: "飞禽动物",
          english: "Birds",
          list: [
            { id: 1, name: "鸽子", english: "Dove" },
            { id: 2, name: "鸟", english: "Birds" },
            { id: 3, name: "鹤", english: "Crane" },
            { id: 4, name: "老鹰", english: "Eagle" },
            { id: 5, name: "鹦鹉", english: "Parrot" },
            { id: 6, name: "孔雀", english: "Peacock" },
            { id: 7, name: "其它", english: "Other" }
          ]
        },
        {
          id: 6,
          name: "水生动植物",
          english: "Aquatic",
          list: [
            { id: 1, name: "鱼", english: "Fish" },
            { id: 2, name: "贝壳", english: "Shell" },
            { id: 3, name: "水母", english: "Jellyfish" },
            { id: 4, name: "海马", english: "Hippocampus" },
            { id: 5, name: "海星", english: "Starfish" },
            { id: 6, name: "虾蟹", english: "Shrimp and crab" },
            { id: 7, name: "鲸鱼", english: "Whale" },
            { id: 8, name: "海豚", english: "Dolphin" },
            { id: 9, name: "珊瑚", english: "Coral" },
            { id: 10, name: "海草", english: "Seaweed" },
            { id: 11, name: "其它", english: "Other" }
          ]
        },
        {
          id: 7,
          name: "人物",
          english: "Character",
          list: [
            { id: 1, name: "名人", english: "Celebrity" },
            { id: 2, name: "头像", english: "Head portrait" },
            { id: 3, name: "脸谱", english: "Facial makeup" },
            { id: 4, name: "女人", english: "Woman" },
            { id: 5, name: "女孩", english: "Girl" },
            { id: 6, name: "男人", english: "Men" },
            { id: 7, name: "男孩", english: "Boy" },
            { id: 8, name: "其它", english: "Other" }
          ]
        },
        {
          id: 8,
          name: "图案",
          english: "Pattern",
          list: [
            { id: 1, name: "几何", english: "Geometry" },
            { id: 2, name: "圆形", english: "Circular" },
            { id: 3, name: "心形", english: "Heart-shaped" },
            { id: 4, name: "波点", english: "Wave point" },
            { id: 5, name: "格子", english: "Lattice" },
            { id: 6, name: "迷彩", english: "Camouflage" },
            { id: 7, name: "色块", english: "Color block" },
            { id: 8, name: "涂鸦", english: "Doodling" },
            { id: 9, name: "祥云", english: "Auspicious clouds" },
            { id: 10, name: "中国结", english: "Chinese knot" },
            {
              id: 11,
              name: "窗花",
              english: "Paper-cuts for Window Decoration"
            },
            { id: 12, name: "羽毛", english: "Feather" },
            { id: 13, name: "其它", english: "Other" }
          ]
        },
        {
          id: 9,
          name: "纹理",
          english: "Vein",
          list: [
            { id: 1, name: "豹纹", english: "Leopard Print" },
            { id: 2, name: "斑马纹", english: "Zebra pattern" },
            { id: 3, name: "动物皮纹", english: "Animal dermatoglyph" },
            { id: 4, name: "植物花纹", english: "Plant dermatoglyph" },
            { id: 5, name: "民族花纹", english: "National pattern" },
            { id: 6, name: "几何花纹", english: "Geometric pattern" },
            { id: 7, name: "其它", english: "Other" }
          ]
        },
        {
          id: 10,
          name: "文字",
          english: "Words",
          list: [
            { id: 1, name: "数字", english: "Number" },
            { id: 2, name: "字母", english: "Letter" },
            { id: 3, name: "汉字", english: "Chinese characters" },
            {
              id: 4,
              name: "图文结合",
              english: "Combination of Graphics and Text"
            },
            { id: 5, name: "其它", english: "Other" }
          ]
        },
        {
          id: 11,
          name: "自然",
          english: "Nature",
          list: [
            { id: 1, name: "风景", english: "Scenery" },
            { id: 2, name: "山水", english: "Landscape" },
            { id: 3, name: "闪电", english: "Lightning" },
            { id: 4, name: "云朵", english: "Flaky clouds" },
            { id: 5, name: "彩虹", english: "Rainbow" },
            { id: 6, name: "雪花", english: "Snowflake" },
            { id: 7, name: "星辰", english: "Stars" },
            { id: 8, name: "其它", english: "Other" }
          ]
        },
        {
          id: 12,
          name: "生活元素",
          english: "Life",
          list: [
            { id: 1, name: "航天", english: "Space flight" },
            { id: 2, name: "船", english: "Ship" },
            { id: 3, name: "生活用品", english: "Articles for daily use" },
            { id: 4, name: "箭", english: "Arrow" },
            { id: 5, name: "挂饰", english: "Ornaments" },
            { id: 6, name: "气球", english: "Balloon" },
            { id: 7, name: "汽车", english: "Car" },
            { id: 8, name: "钻石", english: "Diamonds" },
            { id: 9, name: "其它", english: "Other" }
          ]
        },
        {
          id: 13,
          name: "神话传说",
          english: "Myth",
          list: [
            { id: 1, name: "龙", english: "Dragon" },
            { id: 2, name: "麒麟", english: "Unicorn" },
            { id: 3, name: "美人鱼", english: "Mermaid" },
            { id: 4, name: "独角兽", english: "Unicorn" },
            { id: 5, name: "天使", english: "Angel" },
            { id: 6, name: "其它", english: "Other" }
          ]
        },
        { id: 14, name: "2020", english: "2020" },
        { id: 15, name: "3D", english: "3D" }
      ],
      materialStyle: [
        { id: 1, name: "简笔画", english: "Concise", active: true },
        { id: 2, name: "水彩画", english: "Watercolor", active: true },
        { id: 3, name: "复古", english: "Retro", active: true },
        { id: 4, name: "唯美", english: "Aestheticism", active: true },
        { id: 5, name: "国画", english: "Traditional", active: true },
        { id: 6, name: "碳棒", english: "Carbon rod", active: true },
        { id: 7, name: "手绘", english: "Hand drawn", active: true },
        { id: 8, name: "写实摄影", english: "Realistic", active: true },
        { id: 9, name: "卡通漫画", english: "Cartoon", active: true },
        { id: 10, name: "电脑绘画", english: "Computer", active: true },
        { id: 11, name: "线描", english: "LineDrawing", active: true },
        { id: 12, name: "刺绣", english: "Embroidery", active: true },
        { id: 13, name: "其它", english: "Other", active: true }
      ],
      flowerType: [
        { id: 0, name: "植物", english: "Plant", active: true },
        { id: 1, name: "动物", english: "Animal", active: true },
        { id: 2, name: "人物", english: "Character", active: true },
        { id: 3, name: "风景", english: "Scenery", active: true },
        { id: 4, name: "几何", english: "Geometry", active: true },
        { id: 5, name: "抽象", english: "Abstract", active: true },
        { id: 6, name: "迷彩", english: "Camouflage", active: true },
        { id: 7, name: "格纹", english: "Trellis", active: true },
        { id: 8, name: "卡通元素", english: "Cartoon Elements", active: true },
        { id: 9, name: "文字", english: "Written words", active: true },
        { id: 10, name: "其它", english: "Other", active: true }
      ],
      flowerStype: [
        { id: 0, name: "复古风", english: "Vintage Style", active: true },
        { id: 1, name: "休闲风", english: "Leisure Style", active: true },
        { id: 2, name: "田园风", english: "Pastoral Style", active: true },
        { id: 3, name: "中国风", english: "Chinese style", active: true },
        { id: 4, name: "简约风", english: "Simple style", active: true },
        { id: 5, name: "动漫风", english: "Animation wind", active: true },
        { id: 6, name: "英伦风", english: "British style", active: true },
        { id: 7, name: "卡通风", english: "Card ventilation", active: true },
        { id: 8, name: "欧式风", english: "European wind", active: true },
        { id: 9, name: "日系风", english: "Japanese gale", active: true },
        { id: 10, name: "波西米亚", english: "Bohemia", active: true },
        { id: 11, name: "街头风", english: "Street Wind", active: true },
        { id: 12, name: "其它", english: "Other", active: true }
      ],
      url:''
    };
  },
  methods: {
    query(){
      this.page.page = 1;
      this.getData();
    },
    getData() {
      httpUtil.xhrPost(
        this,
        this.actions.getUserPurseDetails,
        {
          ...this.searchParams.getUserPurseDetails,
          ...this.page
        },
        data => {
          //console.log(data.data.list);
          this.tableData = data.data.list;
          this.page.total = data.data.total;
          this.page.page = data.data.pageNum;
          //console.log(this.tableData);
          $forceUpdate();
        }
      );
    },
    changePage(page) {
      this.page.page = page;
      this.getData();
    },
    // 下载文件
    downLoad(url) {
      //console.log(url);
      this.gaoqingimg =
        url + "?response-content-type=application%2Foctet-stream"; //打开子页面加载
      // window.location.href =
      //   url + "?response-content-type=application%2Foctet-stream";
    },
    //重置
    clearSearchInfo() {
      this.page.page = 1;
      this.page.rows = 10;
      this.page.total = 0;
      this.searchParams.getUserPurseDetails.type = "";
      this.searchParams.getUserPurseDetails.startTime = "";
      this.searchParams.getUserPurseDetails.endTime = "";
      this.getData();
    },
    //抽屉显示5个模块
    check(row) {
      this.drawer = true;
      //console.log(row);
      this.detailInfo = {};
      this.modules = 0;

      if (row.flowerPattern != null) {
        this.modules = 1;
        this.detailInfo = row.flowerPattern;
        this.title = "花型模块";
        this.detailInfo.genre1name = this.flowerType[
          this.detailInfo.genre1
        ].name;
        this.detailInfo.styleTypename = this.flowerStype[
          this.detailInfo.styleType
        ].name;
      } else if (row.material != null) {
        this.modules = 2;
        this.detailInfo = row.material;
        this.title = "素材模块";
        this.detailInfo.genre1name = this.materialType[this.detailInfo.genre1-1].name;
        this.detailInfo.genre2name = this.materialStyle[
          this.detailInfo.genre2-1
        ].name;
        this.detailInfo.styleTypename = this.flowerStype[
          this.detailInfo.styleType
        ].name;
      } else if (row.vipOrderDetail != null) {
        this.modules = 3;
        this.title = "VIP模块";
        this.detailInfo = row.vipOrderDetail;
      } else if (row.copyright != null) {
        this.modules = 4;
        this.title = "分色模块";
        this.detailInfo = row.copyright;
      }
    },
    //关闭抽屉清空数据
    closeCheckDrawer() {
      this.drawer = false;
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
};
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
  height: calc(100vh - 100px);
  padding-bottom: 100px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
