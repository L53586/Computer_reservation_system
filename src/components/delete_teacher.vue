<template>
  <div id="app">
    <!-- <router-view/> -->
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

      <el-container>
         <el-main>
          <el-table :data="tableData" @selection-change="handleSelectionChange"
            >
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column
              prop="username"
              label="教师姓名"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="email"
              label="邮箱"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template class="active">
                <el-button
                  icon="el-icon-delete"
                  circle
                  type="submit"
                  @click="delete_teacher"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
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
      tableData:[],
      username:"",
      // tableData: Array(9).fill(item),
    };
  },
  mounted() {
    this.$axios({
        method: 'get',
        url:'/delete_teacher',
        params: {
          tag: 2,
        }
      })
        .then(res=>{
          console.log('res',res.data.data)
          this.tableData=res.data.data
          // this.totalData=parseInt(res.data.data.length/8)+1
          // this.showDataList=res.data.data.slice(0,8)
        })
  },
  methods: {
    delete_teacher() {
      //  handleSelectionChange();
      console.log("yuyretu", this.batchPassArr);
      this.$axios({
        method: "post",
        url: "/delete_teacher",
        data: {
          batchPassArr: this.batchPassArr,
          username: this.username,
        },
      }).then((res) => {
        // if(res.data.code)
        console.log(res);
        if (res.data.code == "1") {
        //   alert("您已添加成功！");
        this.$message({
            message: "恭喜你，删除成功",
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
     handleSelectionChange(val) {
      this.multipleSelection = val;
      this.batchPassArr = []; //每次点击需清空原本数组的内容
      this.multipleSelection.map((item) => {
        //遍历数组，把id存进自定义的数组里
        this.batchPassArr.push(item.username);
      });
      console.log(this.batchPassArr);
      this.batchPassArr = this.batchPassArr.join(",");
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
.sub {
  margin: 20px;
  width: 50px;
  height: 30px;
  float: right;
}
</style>
