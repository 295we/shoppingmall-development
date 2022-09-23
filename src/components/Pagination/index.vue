<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="StartNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="StartNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(page, index) in StartNumAndEndNum.end"
      :key="index"
      v-show="page >= StartNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      <!-- 1,2,3,4,18,19,20,21 -->
      {{ page }}
    </button>
    <!-- 下 -->
    <button v-if="StartNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="StartNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算总共有多少页
    totalPage() {
      // 除的结果向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始的数字与结束的数字
    StartNumAndEndNum() {
      // 先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0;
      //连续的页码数字是5，就代表至少得有5页，如果出现不正常的现象【就是总页数不够5页】
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 总页数大于连续的页码数 正常现象
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        // start不能出现 负数,0,这种数字
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // end不能出现大于总页码
        if (end > this.totalPage) {
          end = this.totalPage;
          start = end - this.continues + 1;
          //  17 18 19 20 21
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #f40;
      color: #fff;
    }
  }
}
</style>
