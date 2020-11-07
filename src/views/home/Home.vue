<template>
  <div class="home">
    <el-row>
      <el-col :span="leftSpan">
        <div class="headLeft">
          <img @click="goToHome" class="logo" src="../../assets/logo.png" />
        </div>
        <div class="leftNav">
          <el-menu
            class="leftMenu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#001529"
            text-color="#fff"
            active-text-color="#fff"
            :unique-opened="true"
            :router="true"
          >
            <el-submenu v-for="(item,index) in menus" :index="index+''" :key="item.name+item.key">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(nav,navIndex) in item.subSysMenus"
                  :index="nav.url"
                  :key="nav.name+navIndex"
                >{{nav.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="rightSpan">
        <div class="rightHead">
          <img @click="leftShow()" class="headIcon" src="../../assets/imgs/home/yincang.png" />
          <div class="userInfo">
            <el-link type="primary" @click="userpersonal()">
              <i class="el-icon-user-solid">欢迎你,{{user.name}}</i>
            </el-link>
            <el-link type="info" @click="quit()">
              <i class="el-icon-s-unfold">注销</i>
            </el-link>
          </div>
        </div>
        <div class="rightContent">
          <router-view />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import httpUtil from "../../utils/js/HttpUtil";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      actions: {
        getUserMenus: "/system/role/getUserMenus",
        getCurrentUser: "/system/user/getCurrentUser",
        loginOut: "/system/user/loginOut",
        getUserMenuBtns: "/system/role/getUserMenuBtns"
      },
      menus: [],
      isCollapse: false,
      leftSpan: 3,
      name: "",
      rightSpan: 21,
      roleList: []
    };
  },
  methods: {
    ...mapMutations(["saveLoginInfo"]),
    //获取权限按钮
    getUserMenuBtns() {
      let btns = "";
      httpUtil.xhrPost(this, this.actions.getUserMenuBtns, {}, data => {
        for (var i = 0; i < data.data.length; i++) {
          let sysMenus = data.data[i].subSysMenus;
          for (var j = 0; j < sysMenus.length; j++) {
            let sysMenuDetail = sysMenus[j];
            for (var k = 0; k < sysMenuDetail.sysMenuBtns.length; k++) {
              let subMenus = sysMenuDetail.sysMenuBtns[k];
              btns += sysMenuDetail.url + subMenus.ename + ",";
            }
          }
        }
        btns = btns.substring(0, btns.length - 1);
        this.user.roleBtns = btns;
        this.saveLoginInfo(this.user);
      });
    },
    goToHome() {
      this.$router.push("/home");
    },
    userpersonal() {
      this.$router.push("/userPersonal");
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      //this.$router.push("/FlowerPattern")
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    //获取导航栏
    getUserMenus() {
      httpUtil.xhrPost(this, this.actions.getUserMenus, {}, data => {
        this.menus = data.data;
      });
    },
    // 	getCurrentUser(){
    // 		httpUtil.xhrPost(
    //   this,
    //   this.actions.getCurrentUser,
    //   {},
    //   data => {
    //     // console.log(data);
    //     this.name = data.data.name;
    //   }
    // );
    // 	},
    //左侧导航的隐藏和显示
    leftShow() {
      if (!this.isCollapse) {
        this.leftSpan = 0;
        this.rightSpan = 24;
      } else {
        this.leftSpan = 3;
        this.rightSpan = 21;
      }
      this.isCollapse = !this.isCollapse;
    },
    quit() {
      this.$confirm("确认退出登录？")
        .then(_ => {
          httpUtil.xhrPost(this, this.actions.loginOut, {}, data => {
            this.$router.push("/");
          });
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.getUserMenuBtns();
    this.getUserMenus();
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>
<style>
.home {
  min-width: 1200px;
  height: 100vh !important;
}

.headLeft {
  height: 64px;
  line-height: 64px;
  background-color: #002140;
  text-align: center;
}

.leftNav {
  height: calc(100vh - 64px) !important;
}
.leftMenu::-webkit-scrollbar{
  display: none;
}
.leftMenu {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 64px) !important;
}

.el-menu {
  border-right: solid 0px;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
}

.rightHead {
  height: 64px !important;
  background: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
}

.rightContent {
  overflow: auto;
  height: calc(100vh - 64px) !important;
}

.headIcon {
  cursor: pointer;
  height: 30px;
  width: 30px;
  padding-left: 24px;
  padding-top: 16px;
}

.logo {
  cursor: pointer;
  height: 46px;
  padding-top: 10px;
}

.userInfo {
  position: fixed;
  right: 32px;
  top: 20px;
}
</style>
