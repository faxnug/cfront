<template>
  <div>
    <!--搜索条件栏-->
    <div style="padding-bottom: 10px">
      <el-row>
        <el-col :span="4">
          <code-input />
        </el-col>
        <div style="float:left;margin-left: 10px">
          <el-date-picker size="small" type="date" v-model="query.startDate" placeholder="选择日期" value-format="yyyyMMdd"></el-date-picker>
          -
          <el-date-picker size="small" type="date" v-model="query.endDate" placeholder="选择日期" value-format="yyyyMMdd"></el-date-picker>
        </div>

        <el-button style="float:left;margin-left: 10px;" size="small" type="primary" icon="el-icon-search" @click="handleSearch"></el-button>

      </el-row>

    </div>

    <!---->
    <el-table :data="tableData.slice(
        (query.currentPage-1)*query.pageSize,
        query.currentPage*query.pageSize
      )" border :cell-style="cellStyle" @sort-change="changeTableSort" :default-sort="{prop:'time',order:'descending'}">
      <!--委托时间 股票代码 名称 委托价格 委托数量 方向 状态-->
      <el-table-column label="委托时间" prop="time" align="center" sortable />
      <el-table-column label="股票代码" prop="code" align="center" />
      <el-table-column label="股票名称" prop="name" align="center" />
      <el-table-column label="委托价格" prop="price" align="center" />
      <el-table-column label="委托数量" prop="ocount" align="center" />
      <el-table-column label="方向" prop="direction" align="center" />
      <el-table-column label="状态" prop="status" align="center" />
    </el-table>

    <!---->
    <div class="pagination">
      <el-button round type="primary" size="mini" style="margin-top:2px;float:right;" icon="el-icon-refresh" @click="">
        刷新
      </el-button>
      <el-pagination layout="total,prev,pager,next" :current-page="query.currentPage" :page-size="query.pageSize" :total="4" background
        @current-change="handlePageChange" />
    </div>


  </div>
</template>

<script>
  import CodeInput from '../components/CodeInput.vue';

  export default {
    name: 'HisOrderList',
    components: {
      CodeInput,
    },
    data() {
      return {
        tableData: [
          {
            time: '09:55:00',
            code: '000001',
            name: '平安银行',
            price: 100,
            ocount: 10,
            direction: '买入',
            status: 3
          },
          {
            time: '09:50:00',
            code: '000001',
            name: '平安银行',
            price: 100,
            ocount: 10,
            direction: '买入',
            status: 1
          },
          {
            time: '09:40:00',
            code: '000001',
            name: '平安银行',
            price: 100,
            ocount: 10,
            direction: '买入',
            status: 3
          },
          {
            time: '09:23:00',
            code: '000728',
            name: '国元证券',
            price: 100,
            ocount: 10,
            direction: '卖出',
            status: 3
          }
        ],
        query: {
          currentPage: 1,
          pageSize: 3,
          code: '',
          startDate: '',
          endDate: '',
        }
      }
    },
    methods: {
      handlePageChange(val) {
        this.$set(this.query, 'currentPage', val);
      },
      updatedSelectedCode(item) {
        this.query.code = item.code;
      },
      handleSearch() {

      },
      cellStyle({ row, column, rowIndex, columnIndex }) {
        return "padding:2px;";
      },
      changeTableSort(column) {
        let fieldName = column.prop;
        let sortingType = column.order;
        if (fieldName === 'time') {
          if (sortingType == "descending") {
            this.tableData = this.tableData.sort((a, b) => {
              if (a[fieldName] < b[fieldName]) {
                return 1;
              } else if (a[fieldName] === b[fieldName]) {
                return 0;
              } else {
                return -1;
              }
            })
          } else {
            this.tableData = this.tableData.sort(
              (a, b) => {
                if (a[fieldName] > b[fieldName]) {
                  return 1;
                } else if (a[fieldName] === b[fieldName]) {
                  return 0;
                } else {
                  return -1;
                }
              }
            )
          }
        }
      }
    },
    created() {
      this.$bus.on("codeinput-selected", this.updatedSelectedCode)
    },
    beforeDestroy() {
      this.$bus.off("codeinput-selected", this.updatedSelectedCode)
    }

  }

</script>

<style scoped>

</style>