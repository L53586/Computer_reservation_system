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
              <el-menu-item index="1-1"><router-link to='/Login'>登录/注册</router-link></el-menu-item>                     
              <el-menu-item index="1-2"><router-link to="/setting">修改密码</router-link></el-menu-item>
              <el-menu-item index="1-3"><router-link to="choice_room">选择教室</router-link></el-menu-item>         
              
            </el-menu-item-group>           
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu">学生端</i></template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="2-1"><router-link to='/login'>登录/注册</router-link></el-menu-item>                        
               <el-menu-item index="2-2"><router-link to="/setting">修改密码</router-link></el-menu-item>
              <el-menu-item index="2-3"><router-link to="choice_pc">选择电脑</router-link></el-menu-item>
              
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting">管理员端</i>
            </template>
            <el-menu-item-group>
              <router-link  to='/Login'><el-menu-item index="3-1">登录/注册</el-menu-item></router-link>                        
               <el-menu-item index="3-2"><router-link to="/setting">修改密码</router-link></el-menu-item>
              <el-menu-item index="3-3"><router-link to="/addroom">添加/删除教室</router-link></el-menu-item>
              <el-menu-item index="3-4"><router-link to="/addteacher">添加/删除教师</router-link></el-menu-item>              
            </el-menu-item-group>            
          </el-submenu>
          
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view/>
          <h2>欢迎使用电脑室预约电脑网站</h2>
          <h2>由雷坤峰个人开发</h2>
          <h2>
            欢迎提出您的宝贵意见
          </h2>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date"  width="140"> </el-table-column>        
            <el-table-column prop="name"  width="140"></el-table-column>
            <el-table-column prop="address"> </el-table-column>
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
      tableData: Array(10).fill(item),
    };
  },
  methods:{
    goTo(path){
      this.$router.replace(path);
    }
  }
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
</style>
