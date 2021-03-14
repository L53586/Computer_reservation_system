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
        <el-header style="text-align: right; font-size: 12px">
          <!-- <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <span>王小虎</span> -->
        </el-header>

        <el-main>
          <div class="login-container">
            <div class="logon-password">教室编号：</div>
            <el-input
              v-model="roomname"
              placeholder="请输入内容"
              class="input-login"
            ></el-input>
          </div>
          <div class="login-container">
            <div class="logon-password">教室地址：</div>
            <el-input
              v-model="roomaddress"
              placeholder="请输入内容"
              class="input-login"
            ></el-input>
          </div>
          <div class="login-container">
            <div class="logon-password">电脑数量：</div>
            <el-input
              v-model="pcnumber"
              placeholder="请输入内容"
              class="input-login"
            ></el-input>
          </div>
          <router-link to="/deletepc"
            ><button class="sub" @click="deletepc">取消电脑</button>
          </router-link>
          <router-link to="/deleteroom"
            ><button class="sub" @click="deleteroom">取消教室</button>
          </router-link>
          <button class="sub" @click="addroom">添加</button>
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
      roomaddress: "",
      roomname: "",
      pcnumber: "",
    };
  },
  methods: {
    addroom() {
      this.$axios({
        method: "post",
        url: "/addroom",
        data: {
          roomaddress: this.roomaddress,
          pcnumber: this.pcnumber,
          roomname: this.roomname,
        },
      }).then((res) => {
        // if(res.data.code)
        console.log(res);
        if (res.data.code == "1") {
          // alert("您已添加成功！");
          this.$message({
            message: "恭喜你，添加成功",
            type: "success",
          });
          // setTimeout(() => {
          //   // 要延迟的代码;
          //   this.$router.go(0);
          // }, 1000);
        }
        // location.reload();
      });
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
.sub {
  margin: 20px;
  width: 80px;
  height: 30px;
  float: right;
}
.logon-password {
  width: 100px;
  line-height: 40px;
  text-align: right;
}
</style>
