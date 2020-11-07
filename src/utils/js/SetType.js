import httpUtil from './HttpUtil';
export default {
  // data---接口返回参数，int---需要使用的数据类型，type---1后台首页上传数据排名专用，2---后台首页销售额数据专用
  setType(data,int,type){
    let materialType = [{"id":1,"name":"花","english":"Flower","list":[{"id":1,"name":"玫瑰花","english":"Rose",},{"id":2,"name":"菊花","english":"Chrysanthemum",},{"id":3,"name":"牡丹花","english":"Peony",},{"id":4,"name":"荷花","english":"Lotus",},{"id":5,"name":"兰花","english":"Orchid",},{"id":6,"name":"绣球花","english":"Hydrangea",},{"id":7,"name":"牵牛花","english":"Morning glory",},{"id":8,"name":"向日葵","english":"Sunflower",},{"id":9,"name":"山茶花","english":"Camellia",},{"id":10,"name":"郁金香","english":"Tulips",},{"id":11,"name":"百合","english":"Lily",},{"id":12,"name":"其它","english":"Other",}],},{"id":2,"name":"植物","english":"Plant","list":[{"id":1,"name":"花朵","english":"Flower",},{"id":2,"name":"花瓣","english":"Petal",},{"id":3,"name":"花环","english":"Garland",},{"id":4,"name":"草/枝叶","english":"Grass/Branches and Leaves",},{"id":5,"name":"树木","english":"Tree",},{"id":6,"name":"水果","english":"Fruits",},{"id":7,"name":"蔬菜","english":"Vegetables",},{"id":8,"name":"竹子","english":"Bamboo",},{"id":9,"name":"仙人掌","english":"Cactus",},{"id":10,"name":"蘑菇","english":"Mushroom",},{"id":11,"name":"其它","english":"Other",}],},{"id":3,"name":"昆虫","english":"Insect","list":[{"id":1,"name":"蝴蝶","english":"Butterfly",},{"id":2,"name":"甲虫","english":"Beetle",},{"id":3,"name":"蜻蜓","english":"Dragonfly",},{"id":4,"name":"蜘蛛","english":"Spider",},{"id":5,"name":"蜜蜂","english":"Honeybee",},{"id":6,"name":"独角仙","english":"Uang",},{"id":7,"name":"蜗牛","english":"Snail",},{"id":8,"name":"其它","english":"Other",}],},{"id":4,"name":"陆地动物","english":"Terrestrial animals","list":[{"id":1,"name":"斑马","english":"Zebra",},{"id":2,"name":"豹","english":"Leopard",},{"id":3,"name":"大象","english":"Elephant",},{"id":4,"name":"狗","english":"Dog",},{"id":5,"name":"狐狸","english":"Fox",},{"id":6,"name":"老虎","english":"Tiger",},{"id":7,"name":"狮子","english":"Lion",},{"id":8,"name":"鹿","english":"Deer",},{"id":9,"name":"猫","english":"Cat",},{"id":10,"name":"兔子","english":"Rabbit",},{"id":11,"name":"羊驼","english":"Alpaca",},{"id":12,"name":"长颈鹿","english":"Giraffe",},{"id":13,"name":"龙猫","english":"Totoro",},{"id":14,"name":"家禽","english":"Poultry",},{"id":13,"name":"其它","english":"Other",}],},{"id":5,"name":"飞禽动物","english":"Birds","list":[{"id":1,"name":"鸽子","english":"Dove",},{"id":2,"name":"鸟","english":"Birds",},{"id":3,"name":"鹤","english":"Crane",},{"id":4,"name":"老鹰","english":"Eagle",},{"id":5,"name":"鹦鹉","english":"Parrot",},{"id":6,"name":"孔雀","english":"Peacock",},{"id":7,"name":"其它","english":"Other",}],},{"id":6,"name":"水生动植物","english":"Aquatic","list":[{"id":1,"name":"鱼","english":"Fish",},{"id":2,"name":"贝壳","english":"Shell",},{"id":3,"name":"水母","english":"Jellyfish",},{"id":4,"name":"海马","english":"Hippocampus",},{"id":5,"name":"海星","english":"Starfish",},{"id":6,"name":"虾蟹","english":"Shrimp and crab",},{"id":7,"name":"鲸鱼","english":"Whale",},{"id":8,"name":"海豚","english":"Dolphin",},{"id":9,"name":"珊瑚","english":"Coral",},{"id":10,"name":"海草","english":"Seaweed",},{"id":11,"name":"其它","english":"Other",}],},{"id":7,"name":"人物","english":"Character","list":[{"id":1,"name":"名人","english":"Celebrity",},{"id":2,"name":"头像","english":"Head portrait",},{"id":3,"name":"脸谱","english":"Facial makeup",},{"id":4,"name":"女人","english":"Woman",},{"id":5,"name":"女孩","english":"Girl",},{"id":6,"name":"男人","english":"Men",},{"id":7,"name":"男孩","english":"Boy",},{"id":8,"name":"其它","english":"Other",}],},{"id":8,"name":"图案","english":"Pattern","list":[{"id":1,"name":"几何","english":"Geometry",},{"id":2,"name":"圆形","english":"Circular",},{"id":3,"name":"心形","english":"Heart-shaped",},{"id":4,"name":"波点","english":"Wave point",},{"id":5,"name":"格子","english":"Lattice",},{"id":6,"name":"迷彩","english":"Camouflage",},{"id":7,"name":"色块","english":"Color block",},{"id":8,"name":"涂鸦","english":"Doodling",},{"id":9,"name":"祥云","english":"Auspicious clouds",},{"id":10,"name":"中国结","english":"Chinese knot",},{"id":11,"name":"窗花","english":"Paper-cuts for Window Decoration",},{"id":12,"name":"羽毛","english":"Feather",},{"id":13,"name":"其它","english":"Other",}],},{"id":9,"name":"纹理","english":"Vein","list":[{"id":1,"name":"豹纹","english":"Leopard Print",},{"id":2,"name":"斑马纹","english":"Zebra pattern",},{"id":3,"name":"动物皮纹","english":"Animal dermatoglyph",},{"id":4,"name":"植物花纹","english":"Plant dermatoglyph",},{"id":5,"name":"民族花纹","english":"National pattern",},{"id":6,"name":"几何花纹","english":"Geometric pattern",},{"id":7,"name":"其它","english":"Other",}],},{"id":10,"name":"文字","english":"Words","list":[{"id":1,"name":"数字","english":"Number",},{"id":2,"name":"字母","english":"Letter",},{"id":3,"name":"汉字","english":"Chinese characters",},{"id":4,"name":"图文结合","english":"Combination of Graphics and Text",},{"id":5,"name":"其它","english":"Other",}],},{"id":11,"name":"自然","english":"Nature","list":[{"id":1,"name":"风景","english":"Scenery",},{"id":2,"name":"山水","english":"Landscape",},{"id":3,"name":"闪电","english":"Lightning",},{"id":4,"name":"云朵","english":"Flaky clouds",},{"id":5,"name":"彩虹","english":"Rainbow",},{"id":6,"name":"雪花","english":"Snowflake",},{"id":7,"name":"星辰","english":"Stars",},{"id":8,"name":"其它","english":"Other",}],},{"id":12,"name":"生活元素","english":"Life","list":[{"id":1,"name":"航天","english":"Space flight",},{"id":2,"name":"船","english":"Ship",},{"id":3,"name":"生活用品","english":"Articles for daily use",},{"id":4,"name":"箭","english":"Arrow",},{"id":5,"name":"挂饰","english":"Ornaments",},{"id":6,"name":"气球","english":"Balloon",},{"id":7,"name":"汽车","english":"Car",},{"id":8,"name":"钻石","english":"Diamonds",},{"id":9,"name":"其它","english":"Other",}],},{"id":13,"name":"神话传说","english":"Myth","list":[{"id":1,"name":"龙","english":"Dragon",},{"id":2,"name":"麒麟","english":"Unicorn",},{"id":3,"name":"美人鱼","english":"Mermaid",},{"id":4,"name":"独角兽","english":"Unicorn",},{"id":5,"name":"天使","english":"Angel",},{"id":6,"name":"其它","english":"Other",}],},{"id":14,"name":"2020","english":"2020",},{"id":15,"name":"3D","english":"3D",}];
    let materialStyle = [{"id":1,"name":"简笔画","english":"Concise","active":true},{"id":2,"name":"水彩画","english":"Watercolor","active":true},{"id":3,"name":"复古","english":"Retro","active":true},{"id":4,"name":"唯美","english":"Aestheticism","active":true},{"id":5,"name":"国画","english":"Traditional","active":true},{"id":6,"name":"碳棒","english":"Carbon rod","active":true},{"id":7,"name":"手绘","english":"Hand drawn","active":true},{"id":8,"name":"写实摄影","english":"Realistic","active":true},{"id":9,"name":"卡通漫画","english":"Cartoon","active":true},{"id":10,"name":"电脑绘画","english":"Computer","active":true},{"id":11,"name":"线描","english":"LineDrawing","active":true},{"id":12,"name":"刺绣","english":"Embroidery","active":true},{"id":13,"name":"其它","english":"Other","active":true}];
    let flowerType = [{"id":0,"name":"植物","english":"Plant","active":true},{"id":1,"name":"动物","english":"Animal","active":true},{"id":2,"name":"人物","english":"Character","active":true},{"id":3,"name":"风景","english":"Scenery","active":true},{"id":4,"name":"几何","english":"Geometry","active":true},{"id":5,"name":"抽象","english":"Abstract","active":true},{"id":6,"name":"迷彩","english":"Camouflage","active":true},{"id":7,"name":"格纹","english":"Trellis","active":true},{"id":8,"name":"卡通元素","english":"Cartoon Elements","active":true},{"id":9,"name":"文字","english":"Written words","active":true},{"id":10,"name":"其它","english":"Other","active":true}];
    let flowerStype = [{"id":0,"name":"复古风","english":"Vintage Style","active":true},{"id":1,"name":"休闲风","english":"Leisure Style","active":true},{"id":2,"name":"田园风","english":"Pastoral Style","active":true},{"id":3,"name":"中国风","english":"Chinese style","active":true},{"id":4,"name":"简约风","english":"Simple style","active":true},{"id":5,"name":"动漫风","english":"Animation wind","active":true},{"id":6,"name":"英伦风","english":"British style","active":true},{"id":7,"name":"卡通风","english":"Card ventilation","active":true},{"id":8,"name":"欧式风","english":"European wind","active":true},{"id":9,"name":"日系风","english":"Japanese gale","active":true},{"id":10,"name":"波西米亚","english":"Bohemia","active":true},{"id":11,"name":"街头风","english":"Street Wind","active":true},{"id":12,"name":"其它","english":"Other","active":true}];
    let newTableData = [];
    let template=[{"id":0,"name":"女装"},{"id":1,"name":"男装"},{"id":2,"name":"童装"},{"id":3,"name":"家纺"},{"id":4,"name":"其它"}];
    let template2D = [{"id":0,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%BF%9E%E8%A1%A3%E8%A3%99.jpg","title":"连衣裙","english":"Dress","elements":[],"categType":0},{"id":1,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%A4%BC%E6%9C%8D.jpg","title":"礼服","english":"Full dress","elements":[],"categType":0},{"id":2,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/T%E6%81%A4.jpg","title":"T恤","english":"T-shirt","elements":[],"categType":0},{"id":3,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%A7%E8%A1%A3.jpg","title":"大衣","english":"Overcoat","elements":[],"categType":0},{"id":4,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A5%97%E8%A3%85.jpg","title":"套装","english":"Suit","elements":[],"categType":0},{"id":5,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%BE%BD%E7%BB%92%E6%9C%8D.jpg","title":"羽绒服","english":"Down Jackets","elements":[],"categType":0},{"id":6,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A1%AC%E8%A1%AB.jpg","title":"衬衫","english":"Shirt","elements":[],"categType":0},{"id":7,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E4%B8%AD%E8%80%81%E5%B9%B4.jpg","title":"中老年","english":"Middle and old age","elements":[],"categType":0},{"id":8,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%8D%8A%E8%A3%99.jpg","title":"半裙","english":"Half skirt","elements":[],"categType":0},{"id":9,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%96%E5%A5%97.jpg","title":"外套 ","english":"Loose coat","elements":[],"categType":0},{"id":10,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A3%A4%E5%AD%90.jpg","title":"裤子","english":"Trousers","elements":[],"categType":0},{"id":11,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A1%AC%E8%A1%AB%E7%94%B7.jpg","title":"衬衫","english":"Shirt","elements":[],"categType":1},{"id":12,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%A7%E8%A1%A3%E7%94%B7.jpg","title":"大衣","english":"Overcoat","elements":[],"categType":1},{"id":13,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%9F%AD%E8%A2%96%E7%94%B7.jpg","title":"T恤","english":"T-shirt","elements":[],"categType":1},{"id":14,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A3%A4%E5%AD%90%E7%94%B7.jpg","title":"裤子","english":"Trousers","elements":[],"categType":1},{"id":15,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A5%BF%E8%A3%85%E7%94%B7.jpg","title":"西服","english":"Man's suit","elements":[],"categType":1},{"id":16,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%96%E5%A5%97%E7%94%B7.jpg","title":"外套","english":"Loose coat","elements":[],"categType":1},{"id":17,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E4%BC%9E.jpg","title":"雨伞","english":"Umbrella","elements":[],"categType":4},{"id":18,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%B8%BD%E5%AD%90.jpg","title":"太阳帽","english":"Sun hat","elements":[],"categType":4},{"id":19,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%AA%97%E5%B8%98.jpg","title":"窗帘","english":"Window curtains","elements":[],"categType":3},{"id":20,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%BE%BD%E7%BB%92%E6%9C%8D%E7%94%B7.jpg","title":"羽绒服","english":"Down Jackets","elements":[],"categType":1},{"id":21,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A4%96%E5%A5%97%E7%AB%A5.jpg","title":"外套","english":"Loose coat","elements":[],"categType":2},{"id":22,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%A3%A4%E5%AD%90%E7%AB%A5.jpg","title":"裤子","english":"Trousers","elements":[],"categType":2},{"id":23,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/T%E6%81%A4%E7%AB%A5.jpg","title":"T恤","english":"T-shirt","elements":[],"categType":2},{"id":24,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E8%BF%9E%E8%A1%A3%E8%A3%99%E7%AB%A5.jpg","title":"裙子","english":"Skirt","elements":[],"categType":2},{"id":25,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E7%BE%BD%E7%BB%92%E6%9C%8D%E7%AB%A5%E8%A3%85.jpg","title":"羽绒服","english":"Down Jackets","elements":[],"categType":2},{"id":26,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E6%97%97%E8%A2%8D.jpg","title":"旗袍","english":"Cheongsam","elements":[],"categType":0},{"id":27,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E6%B2%99%E5%8F%91.jpg","title":"沙发","english":"Sofa","elements":[],"categType":3},{"id":28,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%A3%81%E7%BA%B8.jpg","title":"墙布","english":"Wall covering","elements":[],"categType":3},{"id":29,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%BA%8A.jpg","title":"床","english":"Bed","elements":[],"categType":3},{"id":30,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E6%8A%B1%E6%9E%95.jpg","title":"抱枕","english":"Pillow","elements":[],"categType":3},{"id":31,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%9C%B0%E6%AF%AF%20%281%29.jpg","title":"地毯","english":"Carpet","elements":[],"categType":3},{"id":32,"fname":"https://youchai2019.oss-cn-hangzhou.aliyuncs.com/category/%E5%9C%B0%E6%AF%AF%20%282%29.jpg","title":"包","english":"Package","elements":[],"categType":4}];
    // let actions = {
    //   info:'/config/info'
    // };
    // let params = {};
    // httpUtil.xhrGet(this,actions,params,(data) => {
    //   type = this.classifyList.style = JSON.parse(result.json1).pdMenu;
    // })
    if(type == 1){
      for(let i = 0;i < data.data.length;i++){
        let type1 = data.data[i].genre1;
        let top = i+1;
        newTableData.push(data.data[i]);
        if(int == 1){
          for(let o = 0;o < materialType.length;o++){
            if(materialType[o].id == type1){
              let type2List = materialType[o].list;
              newTableData[i].genre1 = materialType[o].name;
              for(let y = 0;y < type2List.length;y++){
                if(type2List[y].id == type2){
                  newTableData[i].genre2 = type2List[y].name;
                }
              }
            }
          }
          for(let z = 0;z < materialStyle.length;z++){
            if(materialStyle[z].id == styleType){
              newTableData[i].styleType = materialStyle[z].name;
            }
          }
        }else if(int == 2){
          for(let o = 0;o < flowerType.length;o++){
            if(flowerType[o].id == type1){
              newTableData[i].genre1 = flowerType[o].name;
              newTableData[i].top = top;
            }
          }
        }else if(int == 3){
          for(let o = 0;o < template.length;o++){
            if(template[o].id == type1){
              newTableData[i].typename1 = template[o].name;
            }
          }
          for(let y = 0;y < template2D.length;y++){
            if(template2D[y].id == type2){
              newTableData[i].typename2 = template2D[y].title;
            }
          }
        }
      }
    }else if(type == 2){
      for(let i = 0;i < data.data.list.length;i++){
        let type1 = data.data.list[i].genre1;
        newTableData.push(data.data.list[i]);
        if(int == 1){
          for(let o = 0;o < materialType.length;o++){
            if(materialType[o].id == type1){
              newTableData[i].genre1 = materialType[o].name;
            }
          }
        }else if(int == 2){
          for(let o = 0;o < flowerType.length;o++){
            if(flowerType[o].id == type1){
              newTableData[i].genre1 = flowerType[o].name;
            }
          }
          if(type1 == -1){
            newTableData[i].genre1 = '其他';
          }
        }else if(int == 3){
          for(let o = 0;o < template.length;o++){
            if(template[o].id == type1){
              newTableData[i].typename1 = template[o].name;
            }
          }
          for(let y = 0;y < template2D.length;y++){
            if(template2D[y].id == type2){
              newTableData[i].typename2 = template2D[y].title;
            }
          }
        }
      }
    }else{
      for(let i = 0;i < data.data.list.length;i++){
        let type1 = data.data.list[i].genre1;
        let type2 = data.data.list[i].genre2;
        let typename1 = data.data.list[i].genrename1;
        let typename2 = data.data.list[i].genrename2;
        let styleType = data.data.list[i].styleType;
        newTableData.push(data.data.list[i]);
        if(int == 1){
          for(let o = 0;o < materialType.length;o++){
            if(materialType[o].id == type1){
              let type2List = materialType[o].list;
              newTableData[i].genre1 = materialType[o].name;
              for(let y = 0;y < type2List.length;y++){
                if(type2List[y].id == type2){
                  newTableData[i].genre2 = type2List[y].name;
                }
              }
            }
          }
          for(let z = 0;z < materialStyle.length;z++){
            if(materialStyle[z].id == styleType){
              newTableData[i].styleType = materialStyle[z].name;
            }
          }
        }else if(int == 2){
          for(let o = 0;o < flowerType.length;o++){
            if(flowerType[o].id == type1){
              newTableData[i].genre1 = flowerType[o].name;
            }
          }
          for(let y = 0;y < flowerStype.length;y++){
            if(flowerStype[y].id == styleType){
              newTableData[i].styleType = flowerStype[y].name;
            }
          }
        }else if(int == 3){
          for(let o = 0;o < template.length;o++){
            if(template[o].id == type1){
              newTableData[i].typename1 = template[o].name;
            }
          }
          for(let y = 0;y < template2D.length;y++){
            if(template2D[y].id == type2){
              newTableData[i].typename2 = template2D[y].title;
            }
          }
        }
      }
    }
    return newTableData;
  }

}