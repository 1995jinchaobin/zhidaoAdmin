<template>
  <!--首页报表-->
  <div class="countBg">
    <div class="countArea">
      <!--顶部四块统计-->
      <div class="topArea">
        <!--总销售额统计-->
        <div class="topAloneArea">
          <div class="topAloneAreaContent">
            <!--标题-->
            <div class="title">总销售额</div>
            <!--具体总销售额-->
            <div class="moneyCount" :title="'¥ '+topData.rmbAllCount">¥ {{topData.rmbAllCount}}</div>
            <!--周同比/日环比-->
            <div class="countCompare">
              <div>周同比</div>
              <!--<img src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/>-->
              <img v-if="topData.rmbZTB < 0||topData.rmbZTB == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="topData.rmbZTB > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
              <div class="weekNum">{{!topData.rmbZTB?0:topData.rmbZTB==0.00?0:topData.rmbZTB==1?100:topData.rmbZTB==-1?-100:(topData.rmbZTB*100).toFixed(2)}}%</div>
              <div>日环比</div>
              <img v-if="topData.rmbRHB < 0||topData.rmbRHB == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="topData.rmbRHB > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
              <!--<img src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>-->
              <div class="dayNum">{{!topData.rmbRHB?0:topData.rmbRHB==0.00?0:topData.rmbRHB==1?100:topData.rmbRHB==-1?-100:(topData.rmbRHB*100).toFixed(2)}}%</div>
            </div>
            <!--日均销售额-->
            <div class="bottomArea">
              <!-- <div>日均销售额</div> -->
              <!-- <div class="num">¥ 12,453,4</div> -->
            </div>
          </div>
        </div>
        <!--访问量统计-->
        <div class="topAloneArea">
          <div class="topAloneAreaContent">
            <!--标题-->
            <div class="title">访问量</div>
            <!--具体总销售额-->
            <div class="moneyCount" :title="topData.allCount">{{topData.allCount}}</div>
            <!--周同比/日环比-->
            <div class="countCompare">
              <div class=",-line" id="visitChart" ref="visitChart"></div>
            </div>
            <!--日访问量-->
            <div class="bottomArea">
              <div>日访问量</div>
              <div class="num">{{topData.todayCount}}</div>
            </div>
          </div>
        </div>
        <!--花型上传数量统计-->
        <div class="topAloneArea">
          <div class="topAloneAreaContent">
            <!--标题-->
            <div class="title">花型上传数量</div>
            <!--具体花型上传数量-->
            <div class="moneyCount" :title="topData.flowerCount">{{topData.flowerCount}}</div>
            <!--图表-->
            <div class="countCompare">
              <div class="echart-line" id="flowerChart" ref="flowerChart"></div>
            </div>
            <!--周同比/日环比-->
            <div class="bottomArea">
              <div>周同比</div>
              <img v-if="topData.flowerZTB < 0||topData.flowerZTB == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="topData.flowerZTB > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
              <div class="weekNum">{{!topData.flowerZTB?0:topData.flowerZTB==0.00?0:topData.flowerZTB==1?100:topData.flowerZTB==-1?-100:(topData.flowerZTB*100).toFixed(2)}}%</div>
              <div>日环比</div>
              <img v-if="topData.flowerRHB < 0||topData.flowerRHB == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="topData.flowerRHB > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
              <div class="dayNum">{{!topData.flowerRHB?0:topData.flowerRHB==0.00?0:topData.flowerRHB==1?100:topData.flowerRHB==-1?-100:(topData.flowerRHB*100).toFixed(2)}}%</div>
            </div>
          </div>
        </div>
        <!--素材上传数量统计-->
        <div class="topAloneArea lastAloneArea">
          <div class="topAloneAreaContent">
            <!--标题-->
            <div class="title">素材上传数量</div>
            <!--具体素材上传数量-->
            <div class="moneyCount" :title="topData.materialCount">{{topData.materialCount==undefined?0:topData.materialCount}}</div>
            <!--图表-->
            <div class="countCompare">
              <div class="echart-line" id="materialChart" ref="materialChart"></div>
            </div>
            <!--周同比/日环比-->
            <div class="bottomArea">
              <div>周同比</div>
              <img v-if="topData.materialZTB < 0||topData.materialZTB == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="topData.materialZTB > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
              <div class="weekNum">{{!topData.materialZTB?0:topData.materialZTB==0.00?0:topData.materialZTB==1?100:topData.materialZTB==-1?-100:(topData.materialZTB*100).toFixed(2)}}%</div>
              <div>日环比</div>
              <img v-if="topData.materialRHB < 0||topData.materialRHB == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="topData.materialRHB > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
              <div class="dayNum">{{!topData.flowerRHB?0:topData.materialRHB==0.00?0:topData.materialRHB==1?100:topData.materialRHB==-1?-100:(topData.materialRHB*100).toFixed(2)}}%</div>
            </div>
          </div>
        </div>
      </div>
      <!--销售额/访问量统计-->
      <div class="sellCountArea">
        <!--头部-->
        <el-menu default-active="2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <!--左侧菜单-->
          <el-menu-item index="1">销售额</el-menu-item>
          <el-menu-item index="2">访问量</el-menu-item>
          <div class="sellAreaRight" v-if="sellSearchAreaType==1">
            <!--日期分类按钮-->
            <div class="sellAreaRightBtnArea">
              <el-button @click="changeSellType(1)" type="text" :style="{color:sellSearchParm.type==1?'#409EFE !important':'rgba(0,0,0,0.45) !important'}">今日</el-button>
              <el-button @click="changeSellType(2)" type="text" :style="{color:sellSearchParm.type==2?'#409EFE !important':'rgba(0,0,0,0.45) !important'}">本周</el-button>
              <el-button @click="changeSellType(3)" type="text" :style="{color:sellSearchParm.type==3?'#409EFE !important':'rgba(0,0,0,0.45) !important'}">本月</el-button>
              <el-button @click="changeSellType(4)" type="text" :style="{color:sellSearchParm.type==4?'#409EFE !important':'rgba(0,0,0,0.45) !important'}">全年</el-button>
            </div>
            <!--起止日期选择-->
            <div class="sellAreaDate">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                  @change="changeSellDate"
                  v-model="sellSearchParm.sellStartDay"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="sellAreaRight" v-if="sellSearchAreaType==2">
            <!--日期分类按钮-->
            <div class="sellAreaRightBtnArea">
              <el-button @click="changeSellType(1)" type="text" :style="{color:accessParams.type==1?'#409EFE !important':'rgba(0,0,0,0.45) !important'}">近24小时</el-button>
              <el-button @click="changeSellType(2)" type="text" :style="{color:accessParams.type==2?'#409EFE !important':'rgba(0,0,0,0.45) !important'}">近7日</el-button>
              <el-button @click="changeSellType(3)" type="text" :style="{color:accessParams.type==3?'#409EFE !important':'rgba(0,0,0,0.45) !important'}">近30日</el-button>
              <el-button @click="changeSellType(4)" type="text" :style="{color:accessParams.type==4?'#409EFE !important':'rgba(0,0,0,0.45) !important'}">近12个月</el-button>
            </div>
            <!--起止日期选择-->
            <div class="sellAreaDate">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                  @change="changeSellDate"
                  v-model="sellSearchParm.sellStartDay"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
        </el-menu>
        <!--数据部分-->
        <!--销售额部分-->
        <div v-if="sellSearchAreaType==1" class="sellCountContentArea">
          <!--图表-->
          <div class="sellCountContent">
            <div class="sellCountContentTitle">销售额趋势</div>
            <div class="echart-line" id="sellCountChart" ref="sellCountChart"></div>
          </div>
          <!--右侧排名-->
          <div class="rightSellRange">
            <div class="sellCountContentTitle">工作室销售额排名</div>
            <div class="topThreeArea" v-for="(item,index) in studioData" :key = "index+'studio'" v-if="index<7">
              <div :class="{topThree:true,notTopThree:index>2?true:false}">{{index+1}}</div>
              <div class="topThreeName">{{item.name}}</div>
              <div class="topThreeNum">{{item.rmb}}</div>
            </div>
          </div>
        </div>
        <!--访问量部分-->
        <div v-if="sellSearchAreaType==2" class="sellCountContentArea">
          <!--图表-->
          <div class="sellCountContent">
            <div class="sellCountContentTitle">访问量趋势</div>
            <div class="echart-line" id="accessCountChart" ref="accessCountChart"></div>
          </div>
          <!--右侧排名-->
          <div class="rightSellRange">
            <div class="sellCountContentTitle">用户来源排名</div>
            <div class="topThreeArea" v-for="(item,index) in userSourceData" :key = "index+'studio'" v-if="index<7">
              <div :class="{topThree:true,notTopThree:index>2?true:false}">{{index+1}}</div>
              <div class="topThreeName">{{item.name}}</div>
              <div class="topThreeNum">{{item.num}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 类别占比 -->
      <el-row class="classScore">
        <!-- 上传作品类型占比 -->
        <el-col :span='11' class="worksScore">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>上传作品类别占比TOP5</span>
            </div>
            <el-row>
              <el-col :span="10" class="flower">
                <div class="title">花型上传数量</div>
                <!--具体花型上传数量-->
                <el-row>
                  <el-col :span="12" class="bottomArea">
                    <div class="moneyCount" :title="topData.flowerCount">{{topData.flowerCount}}</div>
                  </el-col>
                  <el-col :span="12" class="bottomArea">
                    <div class="weekNum">{{!topData.flowerZTB?0:topData.flowerZTB==0.00?0:topData.flowerZTB==1?100:topData.flowerZTB==-1?-100:(topData.flowerZTB*100).toFixed(2)}}%</div><img v-if="topData.flowerZTB < 0||topData.flowerZTB == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="topData.flowerZTB > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
                  </el-col>
                </el-row>
                <!--图表-->
                <div class="countCompare">
                  <div class="echart-line" id="flowerChartScore" ref="flowerChartScore"></div>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="title">素材上传数量</div>
                <!--具体花型上传数量-->
                <el-row>
                  <el-col :span="12" class="bottomArea">
                    <div class="moneyCount" :title="topData.materialCount">{{topData.materialCount==undefined?0:topData.materialCount}}</div>
                  </el-col>
                  <el-col :span="12" class="bottomArea">
                    <div class="weekNum">{{!topData.materialZTB?0:topData.materialZTB==0.00?0:topData.materialZTB==1?100:topData.materialZTB==-1?-100:(topData.materialZTB*100).toFixed(2)}}%</div><img v-if="topData.materialZTB < 0||topData.materialZTB == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="topData.materialZTB > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
                  </el-col>
                </el-row>
                <!--图表-->
                <div class="countCompare">
                  <div class="echart-line" id="materialChartScore" ref="materialChartScore"></div>
                </div>
              </el-col>
            </el-row>
            <el-table :data="flowerdata" style="width: 100%" >
              <el-table-column prop="top" label="排名">
              </el-table-column>
              <el-table-column prop="genre1" label="类型">
              </el-table-column>
              <el-table-column prop="num" label="上传数量" sortable>
              </el-table-column>
              <el-table-column align="percent" prop="num" :show-overflow-tooltip="true" label="周涨幅" width="110" sortable>
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="12">{{!scope.row.percent?0:scope.row.percent==0.00?0:scope.row.percent==1?100:scope.row.percent==-1?-100:(scope.row.percent*100).toFixed(2)}}%</el-col>
                    <el-col :span="12"><img v-if="scope.row.percent < 0||scope.row.percent== 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="scope.row.percent > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/></el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col >
        <el-col :span='11' :offset="2" class="worksScore">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>销售额类别占比</span>
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="花型" name="first"></el-tab-pane>
                <el-tab-pane label="素材" name="second"></el-tab-pane>
                <el-tab-pane label="分色" name="third"></el-tab-pane>
                <el-tab-pane label="VIP" name="fourth"></el-tab-pane>
              </el-tabs>
            </div>
            <el-row>
              <el-col :span="3" class="title">销售额</el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <div class="echart-line" id="salesChart" ref="salesChart"></div>
              </el-col>
            </el-row>
          </el-card>
        </el-col >
      </el-row>
      <!-- 访客 -->
      <el-row class="classScore visitor">
        <!-- 新老访客 -->
        <el-col :span="11" class="">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>新老访客</span>
            </div>
            <el-row style="margin-bottom: 45px;">
              <el-col :span="20" :offset='2'>
                <el-row>
                  <el-col class="visitorNum" :span="8">
                    <img class="icon" src="../../assets/imgs/home/accountImg.png" alt="">
                  </el-col>
                  <el-col class="visitorNum" :span="8">
                    <p>新访客</p>
                    <p class="newUserNum">{{!VisitorsData.newUserPercent?0:VisitorsData.newUserPercent==0.00?0:VisitorsData.newUserPercent==1?100:VisitorsData.newUserPercent==-1?-100:(VisitorsData.newUserPercent*100).toFixed(2)}}%</p>
                  </el-col>
                  <el-col class="visitorNum" :span="8">
                    <p>老访客</p>
                    <p class="oldUserNum">{{!VisitorsData.oldUserPercent?0:VisitorsData.oldUserPercent==0.00?0:VisitorsData.oldUserPercent==1?100:VisitorsData.oldUserPercent==-1?-100:(VisitorsData.oldUserPercent*100).toFixed(2)}}%</p>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20" :offset="2">
                <el-row class="visitorBox">
                  <el-col class="visitorTitle" :span="8">访客数</el-col>
                  <el-col :span="8">{{VisitorsData.newUserNum}}</el-col>
                  <el-col :span="8">{{VisitorsData.oldUserNum}}</el-col>
                </el-row>
                <el-row class="visitorBox">
                  <el-col class="visitorTitle" :span="8">浏览量</el-col>
                  <el-col :span="8">{{VisitorsData.newUserVisitNum}}</el-col>
                  <el-col :span="8">{{VisitorsData.oldUserVisitNum}}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <!--关键事件指标-->
        <el-col :span='11' :offset="2" class="worksScore">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>关键事件指标</span>
              <el-tabs v-model="keyName" type="card" @tab-click="handleKeyDataClick">
                <el-tab-pane label="注册成功" name="firstKey"></el-tab-pane>
                <el-tab-pane label="保存AI花型" name="secondKey"></el-tab-pane>
                <el-tab-pane label="支付订单" name="thirdKey"></el-tab-pane>
              </el-tabs>
            </div>
            <el-row>
              <el-col :span="11" :offset="1">
                <el-row class="colorGray">近30天</el-row>
                <el-row><span class="timeNumber">{{keyType==1?keyData.registerNumOf30Day:keyType==2?keyData.flowerDesignNumOf30Day:keyData.payOrderNumOf30Day}}</span><span class="colorGray">次</span></el-row>
                <el-row class="colorGray timeChange">环比
                  <img v-if="keyDayChange < 0||keyDayChange == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="keyDayChange > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
                  <span class="timeChangeNum">{{keyDayChange}}%</span>
                </el-row>
                <el-row class="colorGray timeChange">同比
                  <img v-if="keyWeekChange < 0||keyWeekChange == 0" src="../../../src/assets/imgs/home/caretDown.png" class="logoFlag"/><img v-else-if="keyWeekChange > 0" src="../../../src/assets/imgs/home/caretUp.png" class="logoFlag"/>
                  <span class="timeChangeNum">{{keyWeekChange}}%</span>
                </el-row>
                <el-row><div class="line"></div></el-row>
                <el-row class="colorGray">合计<span class="detailNum">{{keyType==1?keyData.registerAllNum:keyType==2?keyData.flowerDesignAllNum:keyData.payOrderAllNum}}</span>次</el-row>
              </el-col>
              <el-col :span="12">
                <div class="echart-line" id="keyChart" ref="keyChart"></div>
              </el-col>
            </el-row>
          </el-card>
        </el-col >
      </el-row>
      <div style="height: 30px;"></div>
    </div>
  </div>
</template>

<script>
  import httpUtil from '../../utils/js/HttpUtil';
  import dataUtil from '../../utils/js/DataUtil';
  import echarts from 'echarts';
  import setType from '../../utils/js/SetType';
  import "echarts/lib/echarts.js";
  import "echarts/lib/chart/bar";
  import "echarts/lib/component/tooltip";
  import "echarts/lib/component/title";
    export default {
        name: "homeCount",
        data() {
          return {
            //请求的接口
            actions: {
              //首页顶部4块数据
              getHeaderCount: "/index/getIndexLine1",
              //销售额趋势
              getSellCount:'/index/getIndexLine2',
              //工作室销量
              getStudioSellRange:'/index/getIndexLine4',
              // 访问量
              getAccessNums:'/index/getIndexLine3',
              // 花型访问数据排行
              getFlowerData: '/index/getIndexLine5',
              // 销售额类型占比
              getSalesData: '/index/getIndexLine7',
              // 查询新老访客
              getVisitorsData: '/index/getIndexLine8',
              //查询关键指标
              getKeyData:'/index/getIndexLine9',
              // 用户来源
              getUserSource:'/index/getIndexLine10'
            },
            //顶部四个模块数据
            topData:{},
            //工作室销量排名数据
            studioData:[],
            // 花型访问量排名TOP5数据
            flowerdata:[],
            // 用户来源数据
            userSourceData:[],
            flowerChart:null,
            flowerOption:{},
            materialChart:null,
            visitChart:null,
            sellCountChart:null,
            accessCountChart:null,
            flowerChartScore:null,
            materialChartScore: null,
            //销售额统计部分查询参数
            sellSearchParm:{
              sellStartDay:'',
              sellEndDay:'',
              //1近24小时 2近7日 3近30日 4近12个月 5按固定时间查询
              type:1
            },
            // 访问量查询参数
            accessParams:{
              //1近24小时 2近7日 3近30日 4近12个月 5按固定时间查询
              type:1,
              // 起始时间
              startTime:'',
              // 结束时间
              endTime:''
            },
            // 销售额类型占比查询参数
            salesParams:{
              // 查询类型1---花型，2---素材，3---VIP
              type: 1
            },
            // 新老用户数据
            VisitorsData:[],
            salesData:[],
            salesChart:null,
            //销售额统计部分左上角菜单，1：销售额，2：访问量
            sellSearchAreaType:1,
            // 销售额占比表格切换
            activeName:'first',
            // 重要事件切换
            visitorName:"first",
            //关键指标数据
            // 销售额占比表格切换
            keyName:'firstKey',
            keyData:[],
            keyChart:null,
            //关键指标参数 1注册2花型设计3支付订单
            keyType:1,
            keyDayChange:0,
            keyWeekChange:0
          }
        },
      methods: {
        //首页顶部4块数据
        getData() {
          httpUtil.xhrPost(this, this.actions.getHeaderCount, {}, (data) => {
            this.topData = data.data;
            this.topData.allCount = dataUtil.fmoney(this.topData.allCount)
            this.topData.rmbAllCount = dataUtil.fmoney(this.topData.rmbAllCount)
            this.topData.flowerCount = dataUtil.fmoney(this.topData.flowerCount)
            this.topData.materialCount = dataUtil.fmoney(this.topData.materialCount)
            //设置花型上传图表数据
            this.setFlowerChart(this.topData.flowerMonth12Map)
            //设置素材上传图表数据
            this.setMaterialChart(this.topData.materialMonth12Map)
            //设置访问量图表数据
            this.setVisitChart(this.topData.month12Map)
          })
        },
        getAccessData(){
          httpUtil.xhrPost(this, this.actions.getAccessNums,{...this.accessParams},(data) => {
            // 设置访问量统计图表
            this.setAccessCountChart(data.data);
          })
        },
        //销售额趋势
        getSellData() {
          httpUtil.xhrPost(this, this.actions.getSellCount, {...this.sellSearchParm}, (data) => {
            // this.sellCountData = data.data;
            // 设置销售额统计图表数据
            this.setSellCountChart(data.data)
          })
        },
        //工作室销量
        getStudioSellRangeData() {
          httpUtil.xhrPost(this, this.actions.getStudioSellRange, {}, (data) => {
            this.studioData = data.data;
            for(var i = 0; i < this.studioData.length;i++){
              this.studioData[i].rmb = dataUtil.fmoney(this.studioData[i].rmb)
            }
          })
        },
        // 花型访问排行数据
        getFlowerData(){
          httpUtil.xhrPost(this, this.actions.getFlowerData,{},(data) => {
            this.flowerdata = setType.setType(data,2,1);
          })
        },
        // 获取用户来源数据
        getUserSource(){
          httpUtil.xhrPost(this,this.actions.getUserSource,{},(data) => {
            let dataList = [];
            for(let i = 0;i < data.data.length;i++){
              if(data.data[i].origin == 0){
                let datas = {
                  name: '未知',
                  num: data.data[i].num
                }
                dataList.push(datas);
              }else if (data.data[i].origin == 10){
                let datas = {
                  name: '微信小程序',
                  num: data.data[i].num
                }
                dataList.push(datas);
              }else if (data.data[i].origin == 4){
                let datas = {
                  name: '网页端',
                  num: data.data[i].num
                }
                dataList.push(datas);
              }else if (data.data[i].origin == 1){
                let datas= {
                  name: 'PC端',
                  num: data.data[i].num
                }
                dataList.push(datas);
              }else if(data.data[i].origin == 2){
                let datas= {
                  name: '老版app',
                  num: data.data[i].num
                }
                dataList.push(datas);
              }else if(data.data[i].origin == 11){
                let datas= {
                  name: '新版app',
                  num: data.data[i].num
                }
                dataList.push(datas);
              }
            }
            this.userSourceData = dataList;
          })
        },
        // 获取关键指标数据
        getKeyData(){
          httpUtil.xhrPost(this, this.actions.getKeyData,{"type":this.keyType},(data) => {
            this.keyData = data.data;
            if(this.keyType==1){
              this.keyDayChange=(this.keyData.registerNumOfYesterday==0?this.keyData.registerNumOfToday==0?'0':'100':(this.keyData.registerNumOfToday-this.keyData.registerNumOfYesterday)/this.keyData.registerNumOfYesterday*100).toFixed(2);
              this.keyWeekChange=(this.keyData.registerNumOfLast7Day==0?this.keyData.registerNumOf7Day==0?'0':'100':(this.keyData.registerNumOf7Day-this.keyData.registerNumOfLast7Day)/this.keyData.registerNumOfLast7Day*100).toFixed(2);
              this.setKeyChart(data.data.register30Day)
            }else if(this.keyType==2){
              this.keyDayChange=(this.keyData.flowerDesignNumOfYesterday==0?this.keyData.flowerDesignNumOfToday==0?'0':'100':(this.keyData.flowerDesignNumOfToday-this.keyData.flowerDesignNumOfYesterday)/this.keyData.flowerDesignNumOfYesterday*100).toFixed(2);
              this.keyWeekChange=(this.keyData.flowerDesignNumOfLast7Day==0?this.keyData.flowerDesignNumOf7Day==0?'0':'100':(this.keyData.flowerDesignNumOf7Day-this.keyData.flowerDesignNumOfLast7Day)/this.keyData.flowerDesignNumOfLast7Day*100).toFixed(2);
              this.setKeyChart(data.data.flowerDesignOf30Day)
            }else if(this.keyType==3){
              this.keyDayChange=(this.keyData.payOrderNumOfYesterday==0?this.keyData.payOrderNumOfToday==0?'0':'100':(this.keyData.payOrderNumOfToday-this.keyData.payOrderNumOfYesterday)/this.keyData.payOrderNumOfYesterday*100).toFixed(2);
              this.keyWeekChange=(this.keyData.payOrderNumOfLast7Day==0?this.keyData.payOrderNumOf7Day==0?'0':'100':(this.keyData.payOrderNumOf7Day-this.keyData.payOrderNumOfLast7Day)/this.keyData.payOrderNumOfLast7Day*100).toFixed(2);
              this.setKeyChart(data.data.payOrderOf30Day)
            }


          })
        },
        changeSellDate(){
          // console.log(this.sellSearchParm.sellStartDay)
        },
        setKeyChart(data) {
          let xAxisData=[]
          let dataList=[]
          if(data.length>0){
            for(var i=0;i<data.length;i++){
              xAxisData.push(data[i].day)
              dataList.push(data[i].num)
            }
          }
          // 指定图表的配置项和数据
          let keyChart = {
            tooltip: {},
            color:'#90acd4',
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData
            },
            yAxis: {
              max: function(value) {
                return value.max;
              }
            },
            series: [{
              smooth: true,
              type: 'line',
              data: dataList
            }]
          };
          this.keyChart.setOption(keyChart);
        },
        setVisitChart(data) {
          let xAxisData=[]
          let dataList=[]
          if(data.length>0){
            for(var i=0;i<data.length;i++){
              xAxisData.push(data[i].month)
              dataList.push(data[i].num)
            }
          }
          // 指定图表的配置项和数据
          let visitOption = {
            tooltip: {},
            color:'#8543E0',
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              show:false
            },
            yAxis: {
              show:false,
              splitNumber:1,
              max: function(value) {
                return value.max;
              }
            },
            series: [{
              smooth: true,
              type: 'line',
              data: dataList,
              areaStyle: {}
            }]
          };
          this.visitChart.setOption(visitOption);
        },
        setMaterialChart(data) {
          let xAxisData=[]
          let dataList=[]
          if(data.length>0){
            for(var i=0;i<data.length;i++){
              xAxisData.push(data[i].month)
              dataList.push(data[i].num)
            }
          }
          // 指定图表的配置项和数据
          let flowerOption = {
            tooltip: {},
            color:'#33ABFB',
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              show:false
            },
            yAxis: {
              show:false,
              splitNumber:1,
              max: function(value) {
                return value.max;
              }
            },
            series: [{
              name: '数量',
              type: 'line',
              data: dataList,
              areaStyle: {}
            }]
          };
          this.materialChart.setOption(flowerOption);
          this.materialChartScore.setOption(flowerOption);
        },
        setFlowerChart(data) {
          let xAxisData=[]
          let dataList=[]
          if(data.length>0){
            for(var i=0;i<data.length;i++){
              xAxisData.push(data[i].month)
              dataList.push(data[i].num)
            }
          }
          // 指定图表的配置项和数据
          let flowerOption = {
            tooltip: {},
            color:'#33ABFB',
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              show:false
            },
            yAxis: {
              show:false,
              splitNumber:1,
              max: function(value) {
                return value.max;
              }
            },
            series: [{
              name: '数量',
              type: 'line',
              data: dataList,
              areaStyle: {}
            }]
          };
          this.flowerChart.setOption(flowerOption);
          this.flowerChartScore.setOption(flowerOption);
        },
        setSellCountChart(data) {
          let xAxisData=[]
          let dataList=[]
          if(data.length>0){
            //今日数据
            if(this.sellSearchParm.type==1){
              for(var i=0;i<data.length;i++){
                xAxisData.push(data[i].hour)
                dataList.push(data[i].rmb)
              }
            } else if(this.sellSearchParm.type==2 || this.sellSearchParm.type==3){
              //本周/月数据
              for(var i=0;i<data.length;i++){
                xAxisData.push(data[i].day)
                dataList.push(data[i].rmb)
              }
            } else if(this.sellSearchParm.type==4){
              //全年数据
              for(var i=0;i<data.length;i++){
                xAxisData.push(data[i].month)
                dataList.push(data[i].rmb)
              }
            }
          }
          // 指定图表的配置项和数据
          let sellCountOption = {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              top:'10px'
            },
            xAxis : [
              {
                type : 'category',
                data : xAxisData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine:{
                  lineStyle:{
                    color:'#D9D9D9'
                  }
                },
                axisLabel:{
                  color:'#000'
                }
              }
            ],
            yAxis : [
              {
                type : 'value',
                axisLine:{
                  show:false
                },
                splitLine :{    //网格线
                  lineStyle:{
                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                  },
                  show:true //隐藏或显示
                }
              }
            ],
            series : [
              {
                type:'bar',
                barWidth: '60%',
                data:dataList
              }
            ]
          };
          this.sellCountChart.setOption(sellCountOption);

        },
        setAccessCountChart(data) {
          let xAxisData=[];
          let dataList=[];
          if(data.length>0){
            //今日数据
            if(this.accessParams.type==1){
              for(var i=0;i<data.length;i++){
                xAxisData.push(data[i].hour);
                dataList.push(data[i].num);
              }
            } else if(this.accessParams.type==2 || this.accessParams.type==3){
              //本周/月数据
              for(var i=0;i<data.length;i++){
                xAxisData.push(data[i].day)
                dataList.push(data[i].num)
              }
            } else if(this.accessParams.type==4){
              //全年数据
              for(var i=0;i<data.length;i++){
                xAxisData.push(data[i].month)
                dataList.push(data[i].num)
              }
            }
          };
          // 指定图表的配置项和数据
          let sellCountOption = {
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              top:'10px'
            },
            xAxis : [
              {
                type : 'category',
                data : xAxisData,
                axisTick: {
                  alignWithLabel: true
                },
                axisLine:{
                  lineStyle:{
                    color:'#D9D9D9'
                  }
                },
                axisLabel:{
                  color:'#000'
                }
              }
            ],
            yAxis : [
              {
                type : 'value',
                axisLine:{
                  show:false
                },
                splitLine :{    //网格线
                  lineStyle:{
                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                  },
                  show:true //隐藏或显示
                }
              }
            ],
            series : [
              {
                type:'bar',
                barWidth: '60%',
                data:dataList
              }
            ]
          };
          this.accessCountChart.setOption(sellCountOption);
        },
        handleSelect(key, keyPath) {
          if(key == 1){
            this.sellSearchAreaType = 1;
            this.getSellData();
            this.$nextTick(()=>{
              //处理
              var sellCountChart = document.getElementById('sellCountChart');
              var resize = function(){
                sellCountChart.style.width = '100%';
                sellCountChart.style.height = '265px';
              }
              resize();
              this.sellCountChart = echarts.init(sellCountChart);
            })
          }else if(key == 2){
            this.getAccessData();
            this.sellSearchAreaType = 2;
            this.$nextTick(()=>{
              //处理
              var accessCountChart = document.getElementById('accessCountChart');
              var resize = function(){
                accessCountChart.style.width = '100%';
                accessCountChart.style.height = '265px';
              }
              resize();
              this.accessCountChart = echarts.init(accessCountChart);
            })
          }
        },
        changeSellType(type){
          if(this.sellSearchAreaType == 1){
            this.sellSearchParm.type = type;
            this.getSellData();
          }else if(this.sellSearchAreaType == 2){
            this.accessParams.type = type;
            this.getAccessData();
          }
        },
        handleKeyDataClick(tab, event) {
          let type = tab.label;
          switch(type){
            case '注册成功':
              this.keyType = 1;
              break;
            case '保存AI花型':
              this.keyType = 2;
              break;
            case '支付订单':
              this.keyType = 3;
              break;
            default:
              break;
          }
          this.getKeyData();
        },
        handleClick(tab, event) {
          let type = tab.label;
          switch(type){
            case '花型':
              this.salesParams.type = 1;
              break;
            case '素材':
              this.salesParams.type = 2;
              break;
            case 'VIP':
              this.salesParams.type = 3;
              break;
            case '分色':
              this.salesParams.type = 1;
              break;
            default:
              break;
          }
          this.getSalesData();
        },
        // 获取销售额类型占比
        getSalesData(){
            httpUtil.xhrPost(this, this.actions.getSalesData,{...this.salesParams},(data)=>{
              this.salesData.count = '';
              this.salesData.count = data.data.count;
              this.$forceUpdate();
              if(this.salesParams.type == 1){
                this.salesData.list = setType.setType(data,2,2);
              }else if(this.salesParams.type == 2){
                this.salesData.list = setType.setType(data,1,2);
              }else if(this.salesParams.type == 3){
                let list = []
                for(let i = 0;i < data.data.list.length;i++){
                  let newList = {
                    rmb: data.data.list[i].rmb,
                    genre1: data.data.list[i].type == 1 ? '企业VIP' : '个人VIP'
                  }
                  list.push(newList)
                }
                this.salesData.list = list;
              };
              let dataList = [];
              for(let i = 0;i < this.salesData.list.length;i++){
                let salesData = {
                  value: this.salesData.list[i].rmb,
                  name: this.salesData.list[i].genre1
                };
                dataList.push(salesData);
              }
              this.setSalesChart(dataList);
            })
        },
        setSalesChart(data){
          let dataName = [];
          for(let i = 0;i < data.length;i++){
            dataName.push(data[i].name);
          }
          let sellCountOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y: '47',
                data:dataName
            },
                                graphic: [{　　　　　　　　　　　　　　　　//环形图中间添加文字
                    type: 'text',　　　　　　　　　　　　//通过不同top值可以设置上下显示
                    left: 'center',　　　　　　　　　　
                    top: '42%',
                    style: {　　　　　　　　　　　　　　　　
                        text: "总销售额",
                        textAlign: 'center',
                        fill: 'rgba(0,0,0,0.45)',　　　　　　　　//文字的颜色
                        width: 30,
                        height: 30,
                        fontSize: 14,
                        color: "#4d4f5c",
                        fontFamily: "Microsoft YaHei"
                    }
                }, {
                    type: 'text',
                    left: 'center',
                    top: '52%',
                    style: {
                        text: '￥'+this.salesData.count,
                        textAlign: 'center',
                        fill: 'color: rgba(0,0,0,0.85)',
                        width: 30,
                        height: 30,
                        fontSize: 20,
                    }
                }],
            series: [
              {
                    itemStyle: {
                        normal: {
                        color: function(params) {
                                //自定义颜色
                                var colorList = [
                                '#1890FF', '#13C2C2', '#2FC25B','#FACC14 ','#F04864','#8543E0'
                                ];
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    name:'销售额占比',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },

                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:data
                }
            ]
          };
          this.salesChart.setOption(sellCountOption);
        },
        // 获取新老用户数据
        getVisitorsData(){
          httpUtil.xhrPost(this,this.actions.getVisitorsData,{},(data)=>{
            this.VisitorsData = data.data;
          })
        },
        visitorClick(tab, event){
        }
      },
      mounted() {
        //查询顶部数据
        this.getData();
        //查询销售额统计数据
        this.getSellData();
        //查询工作室销售额排名
        this.getStudioSellRangeData();
        // 查询访问量
        this.getAccessData();
        //  查询花型访问量排行数据
        this.getFlowerData();
        // 默认显示日访问量
        this.handleSelect(2,'')
        // 查询新老用户数据
        this.getVisitorsData();
        //查询关键指标数据
        this.getKeyData();
        this.$nextTick(()=>{
          //处理
          var flowerChart = document.getElementById('flowerChart');
          var materialChart = document.getElementById('materialChart');
          var visitChart = document.getElementById('visitChart');
          // var sellCountChart = document.getElementById('sellCountChart');
          var salesChart = document.getElementById('salesChart');
          var flowerChartScore = document.getElementById('flowerChartScore');
          var materialChartScore = document.getElementById('materialChartScore');
          var keyChart = document.getElementById('keyChart');
          var resize = function(){
            flowerChart.style.width='100%';
            flowerChart.style.height='100px';
            materialChart.style.width='100%';
            materialChart.style.height='100px';
            visitChart.style.width='100%';
            visitChart.style.height='100px';
            // sellCountChart.style.width='100%';
            // sellCountChart.style.height='265px';
            salesChart.style.width = "450px";
            salesChart.style.height = '290px';
            flowerChartScore.style.width='100%';
            flowerChartScore.style.height="100px";
            materialChartScore.style.width='100%';
            materialChartScore.style.height="100px";
            keyChart.style.width='100%';
            keyChart.style.height="260px";
          }
          resize();
          this.flowerChart = echarts.init(flowerChart);
          this.materialChart = echarts.init(materialChart);
          this.visitChart = echarts.init(visitChart);
          // this.sellCountChart = echarts.init(sellCountChart);
          this.salesChart = echarts.init(salesChart);
          this.materialChartScore = echarts.init(materialChartScore);
          this.flowerChartScore = echarts.init(flowerChartScore);
          this.keyChart = echarts.init(keyChart);
        })
        // 查询销售额类型占比数据
        this.getSalesData();
        // 查询用户来源数据
        this.getUserSource();
      }
    }
</script>

<style >
  .countBg{
    width: calc(100% - 48px);
    /* height: calc(100vh - 88px) !important; */
    min-width: 1136px;
    background-color: #f0f2f5;
    top: 0px !important;
    padding: 24px 24px 0;
  }
  .countBg .countArea{
    width: 94.67rem;
    min-width: 264px;
    margin: 0 auto;
  }
  .countBg .topArea{
    display: flex;
  }
  .countBg .topAloneArea{
    width: 22rem;
    height: 168px;
    background-color:#fff;
    position: relative;
    padding-top: 20px;
    margin-right: 2rem;
  }
  .countBg .topAloneArea .title{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.45);
  }
  .countBg .topAloneArea .moneyCount{
    width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-family: HelveticaNeue;
    font-size: 30px;
    color: rgba(0,0,0,0.85);
  }
  .countBg .countCompare{
    width: 18rem;
    min-width: 232px;
    height: 25px;
    margin-top: 17px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.65);
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;;
    align-items: center
  }
  .countBg .weekNum{
    color: rgba(0,0,0,0.85);
    margin-right: 4.3px;
    margin-left: 4.3px;
  }
  .countBg .dayNum{
    color: rgba(0,0,0,0.85);
    margin-left: 4.3px;
  }
  .countBg .bottomArea{
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.65);
    align-items: center;
    height: 45px;
  }
  .countBg .bottomArea .num{
    margin-left: 8px;
    color: rgba(0,0,0,0.85);
  }
  .countBg .lastAloneArea{
    margin-right: 0px;
  }
  .countBg .logoFlag{
    width: 8.7px;
    height: 5.6px;
    margin-left: 9px;
  }
  .countBg .topAloneAreaContent{
    margin: 0 auto;
    width: 20rem;
    padding-left: 2rem;
  }
  .countBg .sellCountArea{
    width: 93.87rem;
    height: 404px;
    background-color: #fff;
    margin-top: 24px;
  }
  .countBg .el-menu-item.is-active{
    background-color: #fff !important;

  }
  .countBg .el-menu--horizontal>.el-menu-item{
    height: 50px !important;
    line-height: 50px !important;
  }
  .countBg .sellAreaRightBtnArea{
    height: 50px;
    display: flex;
    width: 310px;
  }
  .countBg .el-button--text{
    color: rgba(0,0,0,0.45) !important;
  }
  .countBg .sellAreaDate{
    width: auto;
    height: 50px;
    line-height: 50px;
  }
  .countBg .sellAreaRight{
    display: flex;
    width: 680px;
    float: right;
  }
  .countBg .el-button+.el-button{
    margin-left: 30px !important;
  }
  .countBg .sellCountContent{
    margin-top: 27.5px;
    margin-left: 33px;
    width: 60rem;
    height: 100%;
  }
  .countBg .sellCountContentTitle{
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: rgba(0,0,0,0.85);
    font-weight: bold;
    margin-bottom: 30px;
  }
  .countBg .rightSellRange{
    width: 21.63rem;
    margin-top: 27.5px;
    margin-left: 7.54rem;
    height: 24.5rem;
  }
  .countBg .sellCountContentArea{
    display: flex;
    align-items: center;
    height: 24.5rem;
  }
  .countBg .topThree{
    width: 20px;
    height: 20px;
    color: #fff;
    background-color: #3f8ff7;
    border-radius: 50px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    margin-right: 2rem;
  }
  .countBg .notTopThree{
    background-color: #f0f2f5 !important;
    color: #000;
  }
  .countBg .topThreeName{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.65);
    width: 13.54rem;
  }
  .countBg .topThreeArea{
    display: flex;
    margin-bottom: 17.5px;
  }
  .countBg .topThreeNum{
    width: 4.3rem;
    text-align: right;
    font-size: 14px;
  }
  .countBg .classScore{
    width: 93.87rem;
    margin-top: 24px;
    margin-bottom: 30px;
  }
  .countBg .classScore .clearfix>span{
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: rgba(0,0,0,0.85);
    line-height: 24px;
    margin: 16px 0 15px 24px;
    font-weight: bold;
  }
  .countBg .classScore .title{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: rgba(0,0,0,0.45);
    line-height: 22px;
  }
  .classScore>div{
    max-height: 507px;
    overflow: hidden;
  }
  .countBg .classScore .moneyCount{
    font-family: HelveticaNeue;
    font-size: 24px;
    color: rgba(0,0,0,0.85);
    line-height: 32px;
  }
  .classScore .weekNum+img{
    margin: 0;
  }
  .el-card__header{
    padding: 0 !important;
  }
  .flower{
    margin-right: 70px;
  }
  tr.el-table__row{
    height: 38px !important;
    text-align: center;
  }
  tr.el-table__row td{
    padding: 0;
  }
  tr.el-table__row td:nth-child(2){
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #1890FF;
    line-height: 22px;
  }
  tr.el-table__row td:last-child .el-row div:nth-child(1){
    text-align: right;
  }
  /* 销售额占比标签页样式 */
  .el-tabs__nav-wrap{
    margin-bottom: 20px;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border: none !important;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__nav>div+div{
    border-left: 1px solid #D9D9D9;
  }
  .el-tabs__nav div{
    padding-left: 19px;
    padding-right: 19px;
    width: auto;
    height: 32px;
    background: #FFFFFF;
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #d9d9d9;
    /*padding: 0 !important;*/
    font-size: 14px;
    color: rgba(0,0,0,0.65);
    line-height: 32px;
    text-align: center;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item:first-child{
    border-left: 1px solid #D9D9D9;
  }
  .el-tabs__nav div:last-child{
    border-right: 1px solid #d9d9d9 ;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-bottom: 1px solid #d9d9d9 ;
  }
  .el-tabs__item.is-active{
    border: 1px solid #1890FF !important;
  }
  .worksScore{
    max-height: 511px;
    background: #FFFFFF;
    border-radius: 2px;
  }
  .countBg .classScore .box-card .title{
    font-size: 14px;
    color: rgba(0,0,0,0.85);
    font-weight: bold;
    margin-bottom: 30px;
  }
  .salesTitle{
    position: absolute;
    left: 0;
  }
  .salesTitle p:first-child{
    font-size: 14px;
    color: rgba(0,0,0,0.45);
  }
  .salesTitle p:last-child{
    font-size: 20px;
    color: rgba(0,0,0,0.85);
  }
  .visitor{
    margin-bottom: 0 !important;
  }
  .visitorNum{
    height: 56px;
  }
  .icon{
    width: 56px;
    height: 56px;
  }
  .visitorNum p:first-child{
    font-size: 14px;
  }
  .newUserNum{
    font-size: 24px;
    color: #52C41A;
  }
  .oldUserNum{
    font-size: 24px;
    color: #1890FF;
  }
  .visitorTitle{
    font-size: 12px;
    color: rgba(0,0,0,0.45);
  }
  .visitorBox{
    height: 40px;
    border-top: 1px solid #E8E8E8;
    line-height: 40px;
  }
  .visitorBox+.visitorBox{
    border-bottom: 1px solid #E8E8E8;
  }
  .el-tabs--card > .el-tabs__header{
    border: none;
  }
  .el-tabs{
    padding-left: 24px;
  }
  .timeNumber{
    font-size: 60px;
  }
  .colorGray{
    color: #8e9099;
  }
  .timeChange{
    display: flex;
    align-items:center;
  }
  .timeChangeNum{
    margin-left: 2px;
  }
  .line{
    width: 60%;
    border-bottom: 1px solid #eeeff1;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }
  .detailNum{
    font-size: 30px;
    color: #000;
    margin: 0 4px;
  }
</style>
