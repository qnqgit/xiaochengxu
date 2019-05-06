
<template>
  <!-- 搜索 -->
  <div class="search" :class="{focused: focused}">
    <!-- 搜索框 -->
    <div class="input-box">
      <input @input="qs" v-model="query" type="text" :placeholder="placeholder" @focus="goSearch">
      <span @click="cancelSearch">取消</span>
    </div>
    <!-- 搜索结果 -->
    <div class="content">
      <div class="title">搜索历史<span class="clear"></span></div>
      <div class="history">
        <a href="">小米</a>
        <a href="">华为</a>
        <a href="">iPhone XS Max</a>
      </div>
      <!-- 搜索推荐 -->
      <div class="result" v-show="queryList.length">
        <scroll-view scroll-y>
          <a href="" :key="list.goods_id" v-for="list in queryList">{{list.goods_name}}</a>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

  // vue 中 less 是可以被支持的
  // 前提需要安装 less-loader 并配置

  // 在 mpvue 中，使用 less 仍然需要安装 less-loader、less
  // 但是不需要配置！！！

  .search {
    display: flex;
    flex-direction: column;

    .input-box {
      height: 60rpx;
      padding: 20rpx 30rpx;
      background-color: #ea4451;
      position: relative;

      display: flex;
      justify-content: space-between;

      &::after {
        content: '搜索';
        display: block;
        width: 54rpx;
        height: 44rpx;
        line-height: 44rpx;
        padding-left: 60rpx;
        transform: translate(-50%, -50%);
        font-size: 24rpx;
        color: #999;
        // 小程序样式中无法使用本地图片！！！
        background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/icon_search%402x.png);
        background-repeat: no-repeat;
        background-size: 44rpx;

        position: absolute;
        left: 50%;
        top: 50%;
      }

      &::before {
        content: '';
        display: none;
        width: 44rpx;
        height: 44rpx;

        background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/icon_search%402x.png);
        background-repeat: no-repeat;
        background-size: 44rpx;

        position: absolute;
        left: 50rpx;
        top: 50%;
        transform: translateY(-50%);
      }

      span {
        display: none;
        width: 80rpx;
        height: 60rpx;
        text-align: right;
        line-height: 60rpx;
        font-size: 27rpx;
        color: #999;
      }
    }

    input {
      height: 60rpx;
      padding: 0 15rpx 0 90rpx;
      background-color: #fff;
      border-radius: 10rpx;
      font-size: 24rpx;
      color: #666;
      flex: 1;
    }

    &.focused {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 9;

      .input-box {
        background-color: #eee;

        &::after {
          display: none;
        }

        &::before {
          display: block;
        }

        span {
          display: block;
        }
      }

      .content {
        display: block;
      }
    }

    .content {
      display: none;
      flex: 1;
      background-color: #fff;
      padding: 30rpx;
      position: relative;

      .title {
        line-height: 1;
        font-size: 27rpx;
        color: #333;
      }

      .clear {
        float: right;
        width: 27rpx;
        height: 27rpx;
        background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/clear.png);
        background-size: cover;
      }

      .history {
        padding-top: 30rpx;

        a {
          padding: 10rpx 20rpx;
          margin-right: 20rpx;
          margin-bottom: 10rpx;
          display: inline-block;
          background-color: #ddd;
          counter-reset: #333;
          font-size: 24rpx;
        }
      }

      .result {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;

        scroll-view {
          height: 100%;
        }

        a {
          padding: 18rpx 20rpx;
          font-size: 24rpx;
          border-bottom: 1rpx solid #EEE;
        }
      }
    }
  }

</style>

<script>
  // 引入 mpvue.reqeust 的 promise 封装
  import request from '@/utils/request';

  export default {

    data () {
      return {
        focused: false,
        placeholder: '',
        query: '',
        queryList: []
      }
    },

    methods: {
      goSearch () {
        this.focused = true;
        this.placeholder = '请输入商品信息'
      },
      cancelSearch () {
        this.focused = false;
        this.placeholder = '';
      },
      async qs () {
        // console.log('查一查');
        // console.log(this.query);

        let {message} = await request({
          url: '/api/public/v1/goods/search',
          data: {
            query: this.query
          }
        });

        this.queryList = message.goods;
      }
    }
  }
</script>
