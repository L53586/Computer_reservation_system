<template>
  <div id="app">
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message">教师端</i>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"
                ><router-link to="/Login">登录/注册</router-link></el-menu-item
              >
              <el-menu-item index="1-2"
                ><router-link to="/setting">修改密码</router-link></el-menu-item
              >
              <el-menu-item index="1-3"
                ><router-link to="choice_room"
                  >选择教室</router-link
                ></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu">学生端</i></template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="2-1"
                ><router-link to="/login">登录/注册</router-link></el-menu-item
              >
              <el-menu-item index="2-2"
                ><router-link to="/setting">修改密码</router-link></el-menu-item
              >
              <el-menu-item index="2-3"
                ><router-link to="choice_pc"
                  >选择电脑</router-link
                ></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting">管理员端</i>
            </template>
            <el-menu-item-group>
              <router-link to="/Login"
                ><el-menu-item index="3-1">登录/注册</el-menu-item></router-link
              >
              <el-menu-item index="3-2"
                ><router-link to="/setting">修改密码</router-link></el-menu-item
              >
              <el-menu-item index="3-3"
                ><router-link to="/addroom"
                  >添加/删除教室</router-link
                ></el-menu-item
              >
              <el-menu-item index="3-4"
                ><router-link to="/addteacher"
                  >添加/删除教师</router-link
                ></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <router-view></router-view>
      <el-container>
        <!-- <el-header style="text-align: right; font-size: 12px">
          <div v-if="!username">登录</div>
          <div v-else>{{username}}</div>
        </el-header> -->

        <el-main>
          <div class="login-container">
            <div class="login-password">用户名：</div>
            <el-input
              v-model="username"
              placeholder="请输入内容"
              class="input-login"
            ></el-input>
          </div>
          <div class="login-container">
            <div class="login-password">密码：</div>
            <!-- onkeyup限制输入字符 -->
            <el-input
              type="text"
              value="value"
              onkeyup="value=value.replace(/[^A-Za-z0-9_]/g,'');"
              v-model="password"
              placeholder="只能输入字母和数字"
              show-password
              class="input-login"
            ></el-input>
          </div>

          <button
            type="submit"
            name="submit"
            value="true"
            class="login"
            @click="loginClick"
          >
            登录
          </button>
          <router-link to="logon"
            ><button type="submit" name="submit" value="true" class="logon">
              注册
            </button></router-link
          >
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      // tableData: Array(20).fill(item),
      username: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    loginClick() {
      console.log("开始");

      this.$axios({
        method: "post",
        url: "/login",
        data: {
          password: this.password,
          username: this.username,
        },
      }).then((res) => {
        // if(res.data.code)
        console.log("res", res);
        if (res.data.code != "1") {
          // alert('您已登陆成功！')
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          // setTimeout(() => {
          //   // 要延迟的代码;
          //   this.$router.go(0);
          // }, 1000);
          this.$router.push({ path: "/", query: { username: this.username } });
          this.$router.push({  path: "/choice_pc",  query: { username: this.username }, });         
        } else {
          // alert("用户名或密码错误");
          this.$message.error('对不起，用户名或密码错误');
          // setTimeout(() => {
          //   // 要延迟的代码;
          //   this.$router.go(0);
          // }, 1000);
        }
        //location.reload();
      });
      console.log(this.username);
    },
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

.login-container {
  display: flex;
  margin: 0 auto;
  width: 260px;
  margin-top: 40px;
}
.login-password {
  width: 80px;
  line-height: 40px;
  text-align: right;
}
.logon-password {
  width: 100px;
  line-height: 40px;
  text-align: right;
}
.input-login {
  width: 220px;
}
.login {
  margin-left: 250px;
  margin-top: 75px;
  height: 40px;
  width: 150px;
  font-size: 25px;
  background: aqua;
}
.logon {
  margin-left: 50px;
  margin-top: 75px;
  height: 40px;
  width: 150px;
  font-size: 25px;
  background: aqua;
}
</style>
