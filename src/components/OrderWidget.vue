<template>
  <div class="orderForm">
    <el-form label-width="80px">
      <el-form-item label="">
        <h3 :style="direction === 0 ? 'color:#F56C6C' :'color:67C23A'">
          {{direction === 0 ? '买入' : '卖出'}}股票
        </h3>
      </el-form-item>
      <el-form-item label="证券代码">
        <code-input />
      </el-form-item>
      <el-form-item label="证券名称">
          <el-input v-model="name" readonly ></el-input>
      </el-form-item>
      <el-form-item :label="'可' + (direction === 0 ? '买' : '卖') + '(股)'">
        <el-input readonly v-model="affordCount"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number
          v-model="price"
          controls-positions="right"
          :step="0.01"
          :min="0.01"
          ></el-input-number>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number
          :label="(direction === 0 ? '买入' : '卖出') + '(股)'"
          v-model="volume"
          controls-positions="right"
          :step="100"
          :min="0"
          :max="affordCount"
          ></el-input-number>
      </el-form-item>
      <el-form-item label="">
        <el-button :type="direction===0 ? 'danger':'success'" style="float: center">{{direction === 0 ? '买入':'卖出'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import CodeInput from '../components/CodeInput.vue';
  export default {
    name:'OrderWidget',
    data(){
      return{
        code:'',
        name:'',
        affordCount: undefined,
        price:undefined,
        volume:undefined,
      }
    },
    props: {
      direction:{
        types: Number,
        required:true
      }
    },
    components: {
      CodeInput,
    },
    created(){
      this.$bus.on("codeinput-selected", this.updateSelectedCode);
    },
    beforeDestroy () {
      this.$bus.off("codeinput-selected", this.updateSelectedCode);
    },
    methods: {
      updateSelectedCode(item){
        this.code = item.code;
        this.name = item.name;
        this.price = undefined;
        this.volume = undefined;
      }
    }
  }
</script>

<style lang="scss">
  .orderForm {
    input {
        text-align: center;
    }

    .el-input-number {
        width: 100%;
    }
  }
</style>