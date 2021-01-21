<template>
  <div>
    <!--可用资金-->
    <el-row>
      <el-col :span="5" style="padding-top: 10px; padding-bottom:10px;">
        <div style="float:left">
          可用资金：{{balance}}
        </div>
      </el-col>
    </el-row>

    <!--持仓列表 table-->
    <el-table :data="tableData.slice(
        (query.currentPage-1)*query.pageSize,
        query.currentPage*query.pageSize
      )" border :cell-style="cellStyle" @sort-change="changeTableSort">
      <el-table-column prop="code" label="股票代码" align="center" sortable />
      <el-table-column prop="name" label="股票名称" align="center" />
      <el-table-column prop="count" label="持仓数" align="center" />
      <el-table-column prop="cost" label="总投入" align="center" />
      <el-table-column prop="currentprice" label="当前价格" align="center" />
      <el-table-column label="成本" />

    </el-table>

    <!--分页控件 刷新按钮-->
    <div class="pagination">
      <el-button round type="primary" size="mini" style="margin-top:2px;float:right;" icon="el-icon-refresh" @click="">
        刷新
      </el-button>
      <el-pagination layout="total,prev,pager,next" :current-page="query.currentPage" :page-size="query.pageSize" :total="dataTotalCount"
        background @current-change="handlePageChange" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PosiList',
    data() {
      return {
        tableData: [
          { code: '600809', name: '山西汾酒', count: 500, cost: 60, currentprice: 400 },
          { code: '603198', name: '迎驾贡酒', count: 1000, cost: 16, currentprice: 40 },
          { code: '600519', name: '贵州茅台', count: 100, cost: 600, currentprice: 2000 },
          { code: '002071', name: '国轩高科', count: 1000, cost: 13, currentprice: 40 },
        ],
        balance: 100000,
        dataTotalCount: 4,
        query: {
          currentPage: 1,
          pageSize: 2,
        }
      }
    },
    methods: {
      //处理分页
      handlePageChange(val) {
        //this.$set(this.data,”key”,value')
        this.$set(this.query, 'currentPage', val);
      },
      //修改单元格的格式
      cellStyle({ row, column, rowIndex, columnIndex }) {
        return "padding:2px";
      },
      //排序
      changeTableSort(column) {
        if (column.order == "descending") {
          this.tableData = this.tableData.sort(
            (a, b) => b[column.prop] - a[column.prop]
          )
        } else {
          this.tableData = this.tableData.sort(
            (a, b) => a[column.prop] - b[column.prop]
          )
        }
      }
    }
  }

</script>

<style scoped>

</style>