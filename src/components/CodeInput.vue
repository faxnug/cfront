<template>
  <!--
    state:用户选择的内容
    fetch-suggestions:通过给出queryString，callback来填充提示框内容
    trigger-on-focus：是否获取焦点之后立即触发搜索
    debounce：查询触发阈值，用户输入间隔大于某个值再开始搜索
    select：自动提示框的消息(用户选中的 item)
  -->
  <el-autocomplete style="width: 100%;" size="small" v-model="state" placeholder="代码/简称" :fetch-suggestions="querySearchAsync"
    :trigger-on-focus="false" :debounce=100 @select="updateInput"></el-autocomplete>

</template>

<script>
  export default {
    name: 'CodeInput',
    data() {
      return {
        state: '',
      }
    },
    methods: {
      //queryString 输入框的值 callback 回调函数
      querySearchAsync(queryString, callback) {
        //
        let list = [
          {
            code: 1,
            name: '平安银行',
            value: '000001-平安银行',
          },
          {
            code: 600000,
            name: '浦发银行',
            value: '600000-浦发银行',
          }
        ];
        //调用 callback 返回建议列表的数据
        callback(list);
      },
      updateInput(item) {
        // code[int] 000001
        // this.state = item.code; 1
        // 1 --> 0000001
        this.state = ('0000000' + item.code).slice(-6);

        // 消息总线，通知其他组件获取
        this.$bus.emit("codeinput-selected", item);

      }
    }
  }

</script>

<style scoped>

</style>