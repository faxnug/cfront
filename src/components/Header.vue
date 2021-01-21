<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <!-- 函数使用 @click 这种方式 -->
    <div class="collapse-btn" @click="collapseChange">
      <!-- 使用 v-if 和 v-else 这种方式来改变图标的样式 -->
      <i v-if="!collapse" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-s-fold"></i>
    </div>

    <!-- LOGO -->
    <div class="logo">证券交易测试demo</div>

    <!-- 右侧下拉菜单-->
    <div class="header-right">
      <div class="header-user-con">
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  import { logout } from '../api/loginApi.js'

  export default {
    name: "Header",
    data() {
      return {
        collapse: false,
      };
    },
    computed: {
      username(){
        let acc = sessionStorage.getItem("uid");
        return acc ? acc : 'guest';
      }
    },
    methods: {
      // 侧边栏折叠
      collapseChange() {
        //改变图标的样式
        this.collapse = !this.collapse;
        //利用总线传递 collapse 的状态
        //把本组件的 collapse 的值传递给父组件 Home 中 data 里面定义的变量 collaspe
        this.$bus.emit("collapse", this.collapse);
      },
      handleCommand(command){
        if(command == 'loginout'){
          logout();
        }
      }
    },
  };

</script>

<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>