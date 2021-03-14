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
            <div class="logon-password">原密码：</div>
            <!-- onkeyup限制输入字符 -->
            <el-input
              type="text"
              value="value"
              onkeyup="value=value.replace(/[^A-Za-z0-9_]/g,'');"
              v-model="oldpassword"
              placeholder="只能输入字母和数字"
              show-password
              class="input-login"
            ></el-input>
          </div>
          <div class="login-container">
            <div class="logon-password">新密码：</div>
            <!-- onkeyup限制输入字符 -->
            <el-input
              type="text"
              value="value"
              onkeyup="value=value.replace(/[^A-Za-z0-9_]/g,'');"
              v-model="new1password"
              placeholder="只能输入字母和数字"
              show-password
              class="input-login"
            ></el-input>
          </div>
          <div class="login-container">
            <div class="logon-password">确认密码：</div>
            <!-- onkeyup限制输入字符 -->
            <el-input
              type="text"
              value="value"
              onkeyup="value=value.replace(/[^A-Za-z0-9_]/g,'');"
              v-model="confirm_password"
              placeholder="请再次输入密码"
              show-password
              class="input-login"
            ></el-input>
          </div>
          <button
            type="submit"
            name="submit"
            value="true"
            class="login"
            @click="confirm"
          >
            确认
          </button>
          <button type="submit" name="submit" value="true" class="logon">
            取消
          </button>
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
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      // tableData: Array(20).fill(item),
      username: "",
      oldpassword: "",
      new1password: "",
      confirm_password: "",
    };
  },
  mounted() {},
  methods: {
    confirm() {
      console.log("开始");
      if (this.new1password != this.confirm_password) {
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
        this.$axios({
          method: "post",
          url: "/setting",
          data: {
            username: this.username,
            oldpassword: this.oldpassword,
            new1password: this.new1password,
          },
        }).then((res) => {
          // if(res.data.code)
          console.log("res", res);
          if ((res.data.code = "1")) {
            // alert("您已修改成功！");
            this.$message({
              message: "恭喜恭喜，您已修改成功！",
              type: "success",
            });
            setTimeout(() => {
              // 要延迟的代码;
              this.$router.go(0);
            }, 1000);
            // this.$router.push({path:'/',query:{username:this.username}})
          } else {
            // alert("原密码或用户名错误");
            this.$message.error("对不起，原密码或用户名错误");
            setTimeout(() => {
              // 要延迟的代码;
              this.$router.go(0);
            }, 1000);
          }
          //location.reload();
        });
        console.log(this.new1password);
      }
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
