<template>
  <div class="wrapper">
    <!-- 页面中引入代码按照驼峰方式处理，下面引入组件分别为 vHeader,vSiderbar -->
    <v-header />
    <v-siderbar />

    <!-- 自定义的class类需要使用 :class 这种方式 -->
    <!-- 默认 collapse 的值为 false，不伸缩，当 collapse 的值为 true 时，应用 content-collapse 样式 -->
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <transition name="move" model="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  //这么命名是为了防止和html本身的标签起冲突
  import vHeader from '../components/Header.vue';
  import vSiderbar from '../components/Sidebar.vue';

  export default {
    data() {
      return {
        collapse: false,
      };
    },
    components: {
      vHeader,
      vSiderbar,
    },
    //上面的样式代码中，只根据 Header 中传递过来的 collapse 的值改变内容框的左侧距离
    //还需要修改 子组件 Siderbar 中 el-menu 的伸缩状态
    //下面的create 和 beforeDestroy 代码是 Siderbar.vue 中 this.$bus.emit('collapse-content', msg); 传递过来的值
    created() {
      this.$bus.on("collapse-content", msg => {
        this.collapse = msg;
      })
    },
    beforeDestroy() {
      this.$bus.off("collapse-content", msg => {
        this.collapse = msg;
      })
    }
  }

</script>

<style scoped>

</style>