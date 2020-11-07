<template>
  <div class="content">
    <div class="note">
      <div class="noteText">热力图</div>
    </div>
    
    <div class="data">
      <div class="dataContent">
        <div class="searchArea">
          <div class="searchForm">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="用户编号:">
                <el-input v-model="searchParams.getMonitorClicks.userId" placeholder="用户编号"></el-input>
              </el-form-item>
              <el-form-item label="路由:">
                <el-cascader
                  
                  checkStrictly="true"
                  v-model="searchParams.getMonitorClicks.router"
                  :options="router"
                ></el-cascader>
                <!-- <el-input v-model="searchParams.getMonitorClicks.router" placeholder="路由"></el-input> -->
              </el-form-item>
              <el-form-item label="ip:">
                <el-input v-model="searchParams.getMonitorClicks.ip" placeholder="ip"></el-input>
              </el-form-item>
              <el-form-item label="数据量:">
                <el-input type="number" v-model="page.rows" placeholder="数据量"></el-input>
              </el-form-item>

              <el-date-picker
                v-model="searchParams.getMonitorClicks.startTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择起始时间"
              ></el-date-picker>
              <el-date-picker
                v-model="searchParams.getMonitorClicks.endTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd 23:59:59"
                type="date"
                default-time="23:59:59"
                placeholder="选择结束时间"
              ></el-date-picker>
              <el-form-item>
                <el-button type="primary"  @click="getData">生成热力图</el-button>
              </el-form-item>
              <el-form-item>
                <el-button plain @click="reset">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div id="container"></div>
      <div class="containerbackimgdiv">
        <img class="containerbackimg" :src="Heatimg" alt />
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import httpUtil from "../../utils/js/HttpUtil";
import echarts from "echarts";
import messageUtil from "../../utils/js/MessageUtil";
export default {
  name: "ThermodynamicDiagram",
  path: "thermodynamicDiagram",
  data() {
    return {
      //请求的接口
      actions: {
        getMonitorClicks: "/monitor/getMonitorClicks" //查询登陆日志
      },
      //查询参数
      searchParams: {
        getMonitorClicks: {
          userId: "",
          ip: "",
          router: "",
          startTime: "",
          endTime: ""
        }
      },
      //分页参数
      page: {
        page: 1,
        rows: 10000,
        total: 1000
      },
      tableData: [],
      resData: [],
      router: [
        {
          label: "首页",
          children: [
            {
              value: "首页",
              label: "首页"
            },
            {
              value: "AI分色",
              label: "AI分色"
            },
            {
              value: "花型设计",
              label: "花型设计"
            },
            {
              value: "花型设计操作页面",
              label: "花型设计操作页面"
            },
            {
              value: "AI配色",
              label: "AI配色"
            },
            {
              value: "AI设计",
              label: "AI设计"
            },
            {
              value: "AI配色操作页面",
              label: "AI配色操作页面"
            },
            {
              value: "花型商城",
              label: "花型商城"
            },
            {
              value: "花型商城图片购买",
              label: "花型商城图片购买"
            },
            {
              value: "3D展示",
              label: "3D展示"
            },
            {
              value: "3D展示操作页面",
              label: "3D展示操作页面"
            },
            {
              value: "AI分色",
              label: "AI分色"
            },
            {
              value: "设计师招募",
              label: "设计师招募"
            },
            {
              value: "智能抠图",
              label: "智能抠图"
            },
            {
              value: "智能抠图操作页面",
              label: "智能抠图操作页面"
            },
            {
              value: "新手教程",
              label: "新手教程"
            },
            {
              value: "版权",
              label: "版权"
            },
          ]
        },
        {
          label: "个人中心",
          children: [
            {
              value: "个人中心/我的花型",
              label: "我的花型",
            },
            {
              value: "个人中心/我的素材",
              label: "我的素材",             
            },
            {
              value: "个人中心/我的版权",
              label: "我的版权",             
            },
            {
              value: "个人中心/我的发票",
              label: "我的发票",             
            },
            {
              value: "个人中心/购物车",
              label: "购物车",             
            },
            {
              value: "个人中心/我的钱包",
              label: "我的钱包",             
            },
            {
              value: "个人中心/修改密码",
              label: "修改密码",             
            },
            {
              value: "个人中心/创建子账号",
              label: "创建子账号",             
            },
            {
              value: "个人中心/个人信息",
              label: "个人信息",             
            },
            {
              value: "个人中心/我的素材",
              label: "我的素材",             
            },
            {
              value: "个人中心/我的订单",
              label: "我的订单",             
            }]},
        
        {
          // value: '',
          label: "工作室",
          children: [         
            {
              value: "工作室主页/上传素材",
              label: "上传素材"
            },
            {
              value: "工作室主页/管理素材",
              label: "管理素材"
            },
            {
              value: "工作室主页/编辑素材",
              label: "编辑素材"
            },
            {
              value: "工作室主页/上传花型",
              label: "上传花型"
            },
            {
              value: "工作室主页/管理花型",
              label: "管理花型"
            },
            {
              value: "工作室主页/编辑花型",
              label: "编辑花型"
            },
            {
              value: "工作室主页/交易管理",
              label: "交易管理"
            },
            {
              value: "工作室主页/我的钱包",
              label: "我的钱包"
            },
            {
              value: "工作室主页/规范设计",
              label: "规范设计"
            },
            {
              value: "工作室主页/工作室管理条例",
              label: "工作室管理条例"
            },
            {
              value: "工作室主页/免责说明",
              label: "免责说明"
            },
            {
              value: "工作室主页/设计师说明",
              label: "设计师说明"
            },
            {
              value: "工作室申请",
              label: "工作室申请"
            },
            {
              value: "工作室申请成功",
              label: "工作室申请成功"
            }
          ]
        },
      ],
      Heatimg: "", //热力图片
      zoom: 0.01 //缩放比例
    };
  },
  methods: {
    //热力图相关
    generateData(theta, min, max, noise, xData, yData) {
      var data = [];
      for (var i = 0; i <= 200; i++) {
        for (var j = 0; j <= 100; j++) {
          // var x = (max - min) * i / 200 + min;
          // var y = (max - min) * j / 100 + min;
          // data.push([i, j, 0]);
          data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5]);
          // data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);
        }
        xData.push(i);
      }
      for (var j = 0; j < 100; j++) {
        yData.push(j);
      }
      return data;
    },
    getNoiseHelper(global) {
      var module = {};

      function Grad(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }

      Grad.prototype.dot2 = function(x, y) {
        return this.x * x + this.y * y;
      };

      Grad.prototype.dot3 = function(x, y, z) {
        return this.x * x + this.y * y + this.z * z;
      };

      var grad3 = [
        new Grad(1, 1, 0),
        new Grad(-1, 1, 0),
        new Grad(1, -1, 0),
        new Grad(-1, -1, 0),
        new Grad(1, 0, 1),
        new Grad(-1, 0, 1),
        new Grad(1, 0, -1),
        new Grad(-1, 0, -1),
        new Grad(0, 1, 1),
        new Grad(0, -1, 1),
        new Grad(0, 1, -1),
        new Grad(0, -1, -1)
      ];
      var p = [
        151,
        160,
        137,
        91,
        90,
        15,
        131,
        13,
        201,
        95,
        96,
        53,
        194,
        233,
        7,
        225,
        140,
        36,
        103,
        30,
        69,
        142,
        8,
        99,
        37,
        240,
        21,
        10,
        23,
        190,
        6,
        148,
        247,
        120,
        234,
        75,
        0,
        26,
        197,
        62,
        94,
        252,
        219,
        203,
        117,
        35,
        11,
        32,
        57,
        177,
        33,
        88,
        237,
        149,
        56,
        87,
        174,
        20,
        125,
        136,
        171,
        168,
        68,
        175,
        74,
        165,
        71,
        134,
        139,
        48,
        27,
        166,
        77,
        146,
        158,
        231,
        83,
        111,
        229,
        122,
        60,
        211,
        133,
        230,
        220,
        105,
        92,
        41,
        55,
        46,
        245,
        40,
        244,
        102,
        143,
        54,
        65,
        25,
        63,
        161,
        1,
        216,
        80,
        73,
        209,
        76,
        132,
        187,
        208,
        89,
        18,
        169,
        200,
        196,
        135,
        130,
        116,
        188,
        159,
        86,
        164,
        100,
        109,
        198,
        173,
        186,
        3,
        64,
        52,
        217,
        226,
        250,
        124,
        123,
        5,
        202,
        38,
        147,
        118,
        126,
        255,
        82,
        85,
        212,
        207,
        206,
        59,
        227,
        47,
        16,
        58,
        17,
        182,
        189,
        28,
        42,
        223,
        183,
        170,
        213,
        119,
        248,
        152,
        2,
        44,
        154,
        163,
        70,
        221,
        153,
        101,
        155,
        167,
        43,
        172,
        9,
        129,
        22,
        39,
        253,
        19,
        98,
        108,
        110,
        79,
        113,
        224,
        232,
        178,
        185,
        112,
        104,
        218,
        246,
        97,
        228,
        251,
        34,
        242,
        193,
        238,
        210,
        144,
        12,
        191,
        179,
        162,
        241,
        81,
        51,
        145,
        235,
        249,
        14,
        239,
        107,
        49,
        192,
        214,
        31,
        181,
        199,
        106,
        157,
        184,
        84,
        204,
        176,
        115,
        121,
        50,
        45,
        127,
        4,
        150,
        254,
        138,
        236,
        205,
        93,
        222,
        114,
        67,
        29,
        24,
        72,
        243,
        141,
        128,
        195,
        78,
        66,
        215,
        61,
        156,
        180
      ];
      // To remove the need for index wrapping, double the permutation table length
      var perm = new Array(512);
      var gradP = new Array(512);

      // This isn't a very good seeding function, but it works ok. It supports 2^16
      // different seed values. Write something better if you need more seeds.
      module.seed = function(seed) {
        if (seed > 0 && seed < 1) {
          // Scale the seed out
          seed *= 65536;
        }

        seed = Math.floor(seed);
        if (seed < 256) {
          seed |= seed << 8;
        }

        for (var i = 0; i < 256; i++) {
          var v;
          if (i & 1) {
            v = p[i] ^ (seed & 255);
          } else {
            v = p[i] ^ ((seed >> 8) & 255);
          }

          perm[i] = perm[i + 256] = v;
          gradP[i] = gradP[i + 256] = grad3[v % 12];
        }
      };

      module.seed(0);

      var F2 = 0.5 * (Math.sqrt(3) - 1);
      var G2 = (3 - Math.sqrt(3)) / 6;

      var F3 = 1 / 3;
      var G3 = 1 / 6;

      // 2D simplex noise
      module.simplex2 = function(xin, yin) {
        var n0, n1, n2; // Noise contributions from the three corners
        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin) * F2; // Hairy factor for 2D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var t = (i + j) * G2;
        var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
        var y0 = yin - j + t;
        // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.
        var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
        if (x0 > y0) {
          // lower triangle, XY order: (0,0)->(1,0)->(1,1)
          i1 = 1;
          j1 = 0;
        } else {
          // upper triangle, YX order: (0,0)->(0,1)->(1,1)
          i1 = 0;
          j1 = 1;
        }
        // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6
        var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
        var y1 = y0 - j1 + G2;
        var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
        var y2 = y0 - 1 + 2 * G2;
        // Work out the hashed gradient indices of the three simplex corners
        i &= 255;
        j &= 255;
        var gi0 = gradP[i + perm[j]];
        var gi1 = gradP[i + i1 + perm[j + j1]];
        var gi2 = gradP[i + 1 + perm[j + 1]];
        // Calculate the contribution from the three corners
        var t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 < 0) {
          n0 = 0;
        } else {
          t0 *= t0;
          n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
        }
        var t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 < 0) {
          n1 = 0;
        } else {
          t1 *= t1;
          n1 = t1 * t1 * gi1.dot2(x1, y1);
        }
        var t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 < 0) {
          n2 = 0;
        } else {
          t2 *= t2;
          n2 = t2 * t2 * gi2.dot2(x2, y2);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 70 * (n0 + n1 + n2);
      };

      // 3D simplex noise
      module.simplex3 = function(xin, yin, zin) {
        var n0, n1, n2, n3; // Noise contributions from the four corners

        // Skew the input space to determine which simplex cell we're in
        var s = (xin + yin + zin) * F3; // Hairy factor for 2D
        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var k = Math.floor(zin + s);

        var t = (i + j + k) * G3;
        var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
        var y0 = yin - j + t;
        var z0 = zin - k + t;

        // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.
        var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
        var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
        if (x0 >= y0) {
          if (y0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          } else if (x0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          } else {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          }
        } else {
          if (y0 < z0) {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } else if (x0 < z0) {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } else {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          }
        }
        // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.
        var x1 = x0 - i1 + G3; // Offsets for second corner
        var y1 = y0 - j1 + G3;
        var z1 = z0 - k1 + G3;

        var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
        var y2 = y0 - j2 + 2 * G3;
        var z2 = z0 - k2 + 2 * G3;

        var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
        var y3 = y0 - 1 + 3 * G3;
        var z3 = z0 - 1 + 3 * G3;

        // Work out the hashed gradient indices of the four simplex corners
        i &= 255;
        j &= 255;
        k &= 255;
        var gi0 = gradP[i + perm[j + perm[k]]];
        var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
        var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
        var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];

        // Calculate the contribution from the four corners
        var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
        if (t0 < 0) {
          n0 = 0;
        } else {
          t0 *= t0;
          n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
        }
        var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
        if (t1 < 0) {
          n1 = 0;
        } else {
          t1 *= t1;
          n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
        }
        var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
        if (t2 < 0) {
          n2 = 0;
        } else {
          t2 *= t2;
          n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
        }
        var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
        if (t3 < 0) {
          n3 = 0;
        } else {
          t3 *= t3;
          n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
        }
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].
        return 32 * (n0 + n1 + n2 + n3);
      };

      // ##### Perlin noise stuff

      function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
      }

      function lerp(a, b, t) {
        return (1 - t) * a + t * b;
      }

      // 2D Perlin Noise
      module.perlin2 = function(x, y) {
        // Find unit grid cell containing point
        var X = Math.floor(x),
          Y = Math.floor(y);
        // Get relative xy coordinates of point within that cell
        x = x - X;
        y = y - Y;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255;
        Y = Y & 255;

        // Calculate noise contributions from each of the four corners
        var n00 = gradP[X + perm[Y]].dot2(x, y);
        var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
        var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
        var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

        // Compute the fade curve value for x
        var u = fade(x);
        // Interpolate the four results
        return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
      };

      // 3D Perlin Noise
      module.perlin3 = function(x, y, z) {
        // Find unit grid cell containing point
        var X = Math.floor(x),
          Y = Math.floor(y),
          Z = Math.floor(z);
        // Get relative xyz coordinates of point within that cell
        x = x - X;
        y = y - Y;
        z = z - Z;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255;
        Y = Y & 255;
        Z = Z & 255;

        // Calculate noise contributions from each of the eight corners
        var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
        var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
        var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
        var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
        var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
        var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
        var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
        var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(
          x - 1,
          y - 1,
          z - 1
        );

        // Compute the fade curve value for x, y, z
        var u = fade(x);
        var v = fade(y);
        var w = fade(z);
        // Interpolate
        return lerp(
          lerp(lerp(n000, n100, u), lerp(n001, n101, u), w),
          lerp(lerp(n010, n110, u), lerp(n011, n111, u), w),
          v
        );
      };

      return module;
    },
    generatestart() {
      this.getData();
    },
    generate() {
      let self = this;
      var dom = document.getElementById("container");
      var myChart = echarts.init(dom);
      var app = {};
      var option = null;
      app.title = "热力图 - 2w 数据";
      // var noise = this.getNoiseHelper();
      var xData = [];
      var yData = [];
      // var data = this.generateData(2, -5, 5, noise, xData, yData);
      // noise.seed(Math.random());
      for (let i = 0; i < self.tableData.length; i++) {
        if (self.tableData[i].width > 1400) {
          self.tableData[i].left = Math.round(
            (self.tableData[i].left / self.tableData[i].width) * 1400
          );
        }
      }
      self.resData = [];
      for (let x = 0; x <= 200; x++) {
        for (let y = 0; y <= 100; y++) {
          self.resData.push([x, y, 0]);
        }
      }
      for (let i = 0; i < self.tableData.length; i++) {
        // self.resData.push([Math.round(self.tableData[i].left/6),100-Math.round(self.tableData[i].top/9), Math.round(self.tableData[i].num)]);
        let number =
          Math.round(self.tableData[i].left / 7) * 101 +
          (100 - Math.round(self.tableData[i].top / 9));
        this.DrawCircle(
          self.resData[number][0],
          self.resData[number][1],
          self.tableData[i].num,
          number
        );
        self.resData[number][2] += self.tableData[i].num * self.zoom;
      }
      option = {
        tooltip: {},
        xAxis: {
          type: "category",
          data: xData
        },
        yAxis: {
          type: "category",
          data: yData
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          realtime: false,
          inRange: {
            color: ["#0000FF", "#00FFFF", "#00FF00", "yellow", "#FF0000"]
          }
        },
        series: [
          {
            name: "Gaussian",
            type: "heatmap",
            data: self.resData,
            // data: data,
            pointSize: 5,
            blurSize: 6,
            itemStyle: {
              emphasis: {
                borderColor: "#333",
                borderWidth: 1
              }
            },
            progressive: 1000,
            animation: false
          }
        ]
      };
      myChart.setOption(option, true);
    },
    //画圆
    DrawCircle(x, y, num, number) {
      let self = this;
      //dx横向距离 dy纵向距离
      for (let dx = 0; dx <= 5; dx++) {
        for (let dy = 0; dy <= 5; dy++) {
          if (Math.sqrt(dx * dx + dy * dy) < 5) {
            // self.resData[number][2]+=(5-Math.sqrt(dx*dx+dy*dy))*num*0.2;
            //4个方向
            if (number - 101 * dx - dy > 0) {
              self.resData[number - 101 * dx - dy][2] +=
                (5 - Math.sqrt(dx * dx + dy * dy)) * self.zoom * num;
            }
            if (number - 101 * dx + dy > 0) {
              self.resData[number - 101 * dx + dy][2] +=
                (5 - Math.sqrt(dx * dx + dy * dy)) * self.zoom * num;
            }
            if (number + 101 * dx - dy > 0) {
              self.resData[number + 101 * dx - dy][2] +=
                (5 - Math.sqrt(dx * dx + dy * dy)) * self.zoom * num;
            }
            self.resData[number + 101 * dx + dy][2] +=
              (5 - Math.sqrt(dx * dx + dy * dy)) * self.zoom * num;
          }
        }
      }
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
      this.page.rows = 10000;
      this.searchParams.getMonitorClicks.startTime = "";
      this.searchParams.getMonitorClicks.endTime = "";
      this.searchParams.getMonitorClicks.userId = "";
      this.searchParams.getMonitorClicks.ip = "";
      this.searchParams.getMonitorClicks.router = "";
    },
    //列表查询
    getData() {
      if (this.searchParams.getMonitorClicks.router == "") {
        this.searchParams.getMonitorClicks.router = "首页";
      }
      if (this.page.rows < 0) {
        this.page.rows = 10000;
      }
     if(typeof(this.searchParams.getMonitorClicks.router)=="object")
     {this.searchParams.getMonitorClicks.router = this.searchParams.getMonitorClicks.router.join("").split(",").join("");}           
      httpUtil.xhrPost(
        this,
        this.actions.getMonitorClicks,
        {
          ...this.searchParams.getMonitorClicks,
          ...this.page
        },
        data => {
          this.tableData = data.data.list;
          this.page.total = data.data.total;
          let self = this;
          //  let img=this.tableData[0].routerEn.substr(1);
          if(this.tableData==""){
            messageUtil.message.error("暂无数据");
          }
          let img = this.tableData[0].routerEn.split("/").join("");
          this.Heatimg = "../../static/" + img + ".png";
          this.generate();
          //data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5]);
        }
      );
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

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
  min-width: 1200px;
  background-color: #fff;
  border-radius: 2px;
  border-radius: 2px;
  padding-bottom: 32px;
  position: relative;
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
#container {
  width: 1200px;
  height: 737px;
  left:calc(50% - 600px);
  margin-top: 24px;
  z-index: 2;
  opacity: 0.5;
}
.containerbackimgdiv {
  width: 1200px;
  height: 800px;
  left:calc(50% - 600px);
  position: absolute;
  top: 150px;
}
.containerbackimg {
  position: relative;
    top: 83px;
    opacity: 1;
    width: 960px;
    height: 617px;
    left: 120px;
}
</style>
