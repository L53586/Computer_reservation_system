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
      <!-- <router-view></router-view> -->
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
            <div class="logon-password">用户名：</div>
            <el-input
              v-model="username"
              placeholder="请输入内容"
              class="input-login"
            ></el-input>
          </div>

          <div class="login-container">
            <div class="logon-password">邮箱：</div>
            <el-input
              v-model="email"
              placeholder="请输入邮箱"
              class="input-login"
            ></el-input>
          </div>
          <div class="login-container">
            <div class="logon-password">密码：</div>
            <el-input
              v-model="password"
              placeholder="请输入密码"
              show-password
              class="input-login"
            ></el-input>
          </div>
          <div class="login-container">
            <div class="logon-password">确认密码：</div>
            <el-input
              v-model="newpassword"
              placeholder="请再次输入密码"
              show-password
              class="input-login"
            ></el-input>
          </div>
          <div class="login-container">
            <div class="logon-password">选择身份：</div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <router-link to="login"
            ><button type="submit" name="submit" value="true" class="login">
              登录
            </button></router-link
          >
          <button
            type="submit"
            name="submit"
            value="true"
            class="logon"
            @click="logonClick"
          >
            注册
          </button>
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
      options: [
        {
          value: "1",
          label: "学生",
        },
        {
          value: "2",
          label: "教师",
        },
        {
          value: "3",
          label: "管理员",
        },
      ],
      value: "",
      // tableData: Array(20).fill(item),
      username: "",
      password: "",
      newpassword: "",
      email: " ",
      value: " ",
    };
  },
  mounted() {},
  methods: {
    logonClick() {
      // console.log("shishi1",item.value);
      console.log(
        "info" + this.username,
        this.email,
        this.password,
        this.value
      );

      if (this.password != this.newpassword) {
        // alert("两次密码不相同");
        this.$message({
          message: "警告警告，两次密码不相同",
          type: "warning",
        });
      } else {
        this.$axios({
          method: "post",
          url: "/logon",
          data: {
            username: this.username,
            password: this.password,
            email: this.email,
            newpassword: this.newpassword,
            value: this.value,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.code == "0") {
            // alert("该用户名已经存在");
            this.$message({
              message: "警告警告，该用户名已经存在",
              type: "warning",
            });
            setTimeout(() => {
              // 要延迟的代码;
              this.$router.go(0);
            }, 1000);
          } else {
            if (this.password != this.newpassword) {
              // alert("两次密码不相同");
              this.$message({
                message: "警告警告，两次密码不相同",
                type: "warning",
              });
              setTimeout(() => {
                // 要延迟的代码;
                this.$router.go(0);
              }, 1000);
            } else {
              // alert("注册成功");
              this.$message({
                message: "恭喜你，注册成功",
                type: "success",
              });
              setTimeout(() => {
                // 要延迟的代码;
                this.$router.go(0);
              }, 1000);
            }
          }
        });
      }
      // location.reload();
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
