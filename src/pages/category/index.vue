
<template>
  <div>
    <!-- 搜索组件 -->
    <search></search>
    <!-- 分类 -->
    <div class="catrgory">
      <!-- 顶级分类 -->
      <ul class="sup" v-show="categoryList.length">
        <scroll-view scroll-y>
          <li @click="getSub(topKey)" :key="top.cat_id" v-for="(top, topKey) in categoryList" :class="{active: topKey === currentIndex}">
            {{top.cat_name}}
          </li>
        </scroll-view>
      </ul>
      <!-- 子分类 -->
      <div class="sub">
        <scroll-view scroll-y>
          <!-- 缩略图 -->
          <image v-show="categoryList.length" src="/static/uploads/category.png" class="thumb"></image>
          <div :key="child.cat_id" v-for="child in sub" class="children">
            <div class="title">{{child.cat_name}}</div>
            <div class="brands">
              <a :key="k" v-for="(brand,k) in child.children" href="">
                <image :src="brand.cat_icon"></image>
                <span>{{brand.cat_name}}</span>
              </a>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

  .catrgory {
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    display: flex;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      scroll-view {
        height: 100%;
      }

      li {
        height: 100rpx;
        font-size: 27rpx;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;

        &.active {
          color: #ea4451;
          background-color: #FFF;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            background-color: #ea4451;
            transform: translateY(-50%);

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx;

      scroll-view {
        height: 100%;
      }

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;

        .title {
          padding: 30rpx 0;
          font-size: 30rpx;
          color: #333;

          &::before {
            content: '/';
            color: #999;
            margin-right: 20rpx;
          }

          &::after {
            content: '/';
            color: #999;
            margin-left: 20rpx;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        a {
          width: 33.3333%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        span {
          display: block;
          font-size: 24rpx;
          color: #333;
        }
      }
    }
  }

</style>

<script>

  // 引入 搜索组件
  import search from '@/components/search';

  // 引入 request 的 promise 封装
  import request from '@/utils/request';

  export default {

    data () {
      return {
        categoryList: [],
        currentIndex: 0
      }
    },

    computed: {
      sub () {
        // 当顶级分类数据获取成功才可以
        return this.categoryList.length && this.categoryList[this.currentIndex].children;
      }
    },

    components: {
      search
    },

    methods: {
      // 分类接口
      async getCategory () {

        // 发起网络请求，获取分类数据
        let {message} = await request({
          url: '/api/public/v1/categories'
        });

        // console.log(message);
        this.categoryList = message;
      },

      // 查找子分类
      getSub (key) {
        // 改变当前的索引值
        this.currentIndex = key;
      }
    },

    mounted () {
      // 获取分类数据
      this.getCategory();
    }
  }

</script>
