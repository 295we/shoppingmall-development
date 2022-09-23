<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级联动的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖的属性值展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(':')[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-up': isAsc,
                        'icon-long-arrow-down': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-up': isAsc,
                        'icon-long-arrow-down': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img" @click="toDetail(good.id)">
                    <a target="_blank"><img v-lazy="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SearchSelector from './SearchSelector';
export default {
  name: 'Search',
  components: {
    SearchSelector,
  },
  data() {
    return {
      searchParams: {
        // 一级分类的id
        category1Id: '',
        // 二级分类的id
        category2Id: '',
        // 三级分类的id
        category3Id: '',
        // TagNav的分类名
        categoryName: '',
        // 搜索框的关键字
        keyword: '',
        // 排序
        order: '1:desc',
        // 分页器，代表当前是第几页
        pageNo: 1,
        // 代表的是每一页展示数据的个数
        pageSize: 5,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: '',
      },
    };
  },
  beforeMount() {
    // 后面两个跟前面有相同的key时，后面的key的value会给前面的对象
    // 在发请求之前，把接口需要传递的参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回你查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 在发请求之前带给服务器的参数searchParams要发生变化（有数值带给服务器）
    this.getData();
    // 接收子组件传递过来的参数
    this.$bus.$on('trademarkInfo', trademark => {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    });
  },
  computed: {
    // mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块的
    ...mapGetters(['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf('1') != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1;
    },
    isAsc() {
      return this.searchParams.order.slice(2) == 'asc';
    },
    isDesc() {
      return this.searchParams.order.slice(2) == 'desc';
    },
    // 获取仓库中存储的商品总条数
    ...mapState({
      total: state => state.search.searchList.total,
    }),
  },
  methods: {
    // 因为请求要发送多次，所以当我们需要在发送请求的时候执行下面的函数就行
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    removeCategoryName() {
      // 先清空上次残留的路由跳转时不会覆盖的数据
      // 有些带给服务器的参数是可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器，所以赋值为undefined，这样不会带给服务器这些数据
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      this.getData();
      this.$router.push({
        name: 'search',
        query: undefined,
        params: {
          keyword: this.searchParams.keyword,
        },
      });
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      this.$bus.$emit('clear');
      if (this.$route.query) {
        this.$router.push({
          name: 'search',
          query: this.$route.query,
          params: undefined,
        });
      }
    },
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 自定义事件中子组件传递来的参数
    attrInfo(props) {
      if (!this.searchParams.props.includes(props))
        this.searchParams.props.push(props);
      this.getData();
    },
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      // 再次发请求更新数据
      this.getData();
    },
    // 排序的操作
    changeOrder(flag) {
      // flag是一个标记，代表用户点击的是综合（1），还是价格（2）
      let OriginFlag = this.searchParams.order.split(':')[0]; //1
      let OriginSort = this.searchParams.order.split(':')[1]; //desc
      let newOrder = '';
      if (flag == OriginFlag) {
        // 首次点击的一定是综合按钮 || 上次点击和这次点击时同一个按钮 flag不变 改变sort
        newOrder = `${OriginFlag}:${OriginSort == 'desc' ? 'asc' : 'desc'}`;
      } else {
        // 首次点击的一定是价格按钮 || 上次点击和这次点击不是同一个按钮 sort不变 改变flag
        newOrder = `${flag}:${OriginSort}`;
      }
      // 将新的order赋予searchParams，然后将数据送给服务器，服务器返回新的数据
      this.searchParams.order = newOrder;
      this.getData();
    },
    // 自定义事件的回调，获取当前第几页
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
    toDetail(id) {
      this.$router.push({
        name: 'detail',
        params: {
          skuid: id,
        },
      });
    },
  },
  watch: {
    $route: {
      handler() {
        // 先清空上次残留的路由跳转时不会覆盖的数据
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        // 路由数据一发生变化，再次进行参数合并然后发请求
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        this.getData();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
