<template>
  <div id="app">
    <div class="head">
      <router-link to="/"
        ><button class="button_login"  @click="exit">
          退出
        </button></router-link>
      <router-link to="/login" v-if="!username"
        ><button class="button_login" style="margin-right: 50px">
          登录
        </button></router-link>
      <router-link to="/login" v-else
        ><button class="button_login">{{ username }}</button></router-link>
    </div>
    <router-view />
    <el-container>
      <el-main>
        <h2>
          欢迎使用电脑室预约电脑网站 由"雷坤峰"个人开发 欢迎提出您的宝贵意见
        </h2>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    exit() {
      this.username = "";
      console.log("123", this.username);
    },
    hasLogin() {
      if (!this.username) {
        console.log("test",this.username);
        this.username = this.$route.query.username;
      }
    },
  },
  watch: {
    $route: "hasLogin",
  },
};
</script>

<style>
#app {
  width: 1200px;
  margin: 6px auto;
}
.el-header {
  /* background-color: #b3c0d1; */
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.user {
  float: right;
  width: 100px;
  height: 30px;
}
.head {
  width: 1200px;
  height: 50px;
  background-color: #b3c0d1;
}
.button_login {
  margin: 20px 0 0 0;
  margin-right: 20px;
  float: right;
  height: 30px;
  width: 70px;
}
</style>
