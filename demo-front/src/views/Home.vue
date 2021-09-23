<template>
  <div class="home">
    <div class="head">
      <Header ref="headData"></Header>
    </div>
    <div class="content">
      <div class="nav">
        <div class="topInfo">
          <div class="logo">D</div>
          <div class="logoTit" v-show="isCollapse">Demo</div>
        </div>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="!isCollapse"
        >
        <el-menu-item 
            v-for="(k, index) in menu"
            :class="[{ active: (activeIndex == index) && isCollapse, active2: (activeIndex == index) && !isCollapse }]"
            :key="index"
            class="la"
            @click="bread(index, k.path)"
            :index="k.id"
            >
            <i :class="k.icon"></i>
            <span slot="title">{{ k.name }}</span>
            </el-menu-item>
        </el-menu>
        <div :class="[{ left: isCollapse, left2: !isCollapse }]" @click="isC">
          <i v-show="isCollapse" class="el-icon-s-fold"></i>
          <i v-show="!isCollapse" class="el-icon-s-unfold"></i>
          <span v-show="isCollapse">收缩</span>
          <span v-show="!isCollapse">展开</span>
        </div>
      </div>
      <div class="cont">
        <div class="page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios"
// const url = CONFIG
export default {
  data() {
    return {
      menu: [],
      activeIndex: 0,
      isCollapse: true
    };
  },
  methods: {
    bread(index, path) {
      this.activeIndex = index;
      this.$router.push(path);
    },
    isC() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  created() {
    // 获取菜单列表
    this.menu = [
      {
        id: "1",
        name: "文本填空",
        sorted: 1,
        icon: 'el-icon-edit-outline',
        path: "/text"
      },
      {
        id: "2",
        name: "智能对话",
        sorted: 1,
        icon: 'el-icon-chat-dot-square',
        path: "/dialog"
      },
      {
        id: "3",
        name: "生成故事",
        sorted: 1,
        icon: 'el-icon-reading',
        path: "/story"
      }
    ];
    // 默认点击第一个
    this.$router.push(this.menu[0].path);
  }
};
</script>
<style scoped lang="scss">
@import "./secondarylist/style/home.scss";
.topInfo {
  text-align: center;
  .logo {
    width: 60px;
    height: 60px;
    color: #fff;
    background: #1067ee;
    border-radius: 50%;
    line-height: 60px;
    margin: 16px auto 20px;
    font-size: 28px;
  }
  .logoTit {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #151935;
  }
}
.active {
  background: #f6f7fb;
  border-left: 5px solid #3280fa;
  text-indent: -5px;
}
.active2 {
  background: #f6f7fb;
  padding-left: 0px !important;
}
.left {
  font-size: 14px;
  position: absolute;
  bottom: 100px;
  left: 90px;
  cursor: pointer;
  display: inline-block;
  width: 45px;
}
.left2{
  font-size: 14px;
  position: absolute;
  bottom: 100px;
  left: 11px;
  cursor: pointer;
  display: inline-block;
  width: 45px;
}
// /deep/ .el-menu-vertical:not(.el-menu--collapse) {
//   width: 200px;
// }
/deep/ .el-icon-s-fold,.el-icon-s-unfold {
  font-size: 16px;
  vertical-align: text-bottom;
}
/deep/ .el-menu-item {
  font-size: 16px;
}
.collapse {
  width: 225px;
}
.collapseNot {
  width: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 225px;
  min-height: 400px;
}
</style>
