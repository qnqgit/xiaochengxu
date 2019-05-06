<template>
  <div class="app">
    <!-- 搜索 -->
    <div class="search">
      <div class="input-box">
        <input type="text">
      </div>
      <!-- 搜索结果 -->
      <div class="result"></div>
    </div>
    <!-- 轮播图 -->
    <swiper
      class="banner"
      indicator-dots
      indicator-color="rgba(255,255,255,0.6)"
      indicator-active-color="#ffffff"
      autoplay
      circular
    >
      <swiper-item :key="k" v-for="(list,k) in bannerList">
        <navigator :url="list.navigator_url">
          <image :src="list.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航条 -->
    <div class="navs">
      <navigator :url="list.navigator_url" :key="key" v-for="(list, key) in navList">
        <image :src="list.image_src"></image>
      </navigator>
    </div>
    <!-- 楼层 -->
    <div class="floor">
      <div class="floor" :key="key" v-for="(list, key) in floorList">
        <!-- 标题 -->
        <div class="title">
          <image :src="list.floor_title.image_src"></image>
        </div>
        <div class="pics">
          <navigator :url="item.navigator_url" :key="k" v-for="(item, k) in list.product_list">
            <image :src="item.image_src"></image>
          </navigator>
        </div>
      </div>
    </div>
    <span class="gotop" @click="goTop" v-show="!isTop"></span>
  </div>
</template>
<script>
import request from '@/utils/request.js'
export default {
    data () {
      return {
        bannerList: [],
        navList: [],
        floorList: [],
        isTop: true
      }
    },
    methods: {
      // 焦点图接口
      async getBanner () {
        // let _this = this;
        // mpvue.request({
        //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata',
        //   method: 'get',
        //   success: function(info) {
        //     console.log(info);
        //     // 更新数据模型
        //     _this.bannerList = info.data.message;
        //   }
        // });

        let {message} = await request({
          url: '/api/public/v1/home/swiperdata'
        });

        this.bannerList = message;
      },

      // 导航接口
      async getNavs () {
        // var _this = this;
        // mpvue.request({
        //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/catitems',
        //   success: function (info) {
        //     // console.log(info);
        //     _this.navList = info.data.message;
        //   }
        // });

        let {message} = await request({
          url: '/api/public/v1/home/catitems'
        });

        this.navList = message;
      },

      // 楼层接口
      async getFloors () {

        let {message} = await request({
          url: '/api/public/v1/home/floordata'
        });

        this.floorList = message;
      },

      // 回到顶部
      goTop () {
        mpvue.pageScrollTo({
          scrollTop: 200
        });
      }
    },

    async mounted () {
      // 获取焦点图
      this.getBanner();

      // 获取导航数据
      this.getNavs();

      // 获取楼层数据
      this.getFloors();
    },

    // 下接刷新
    onPullDownRefresh () {
      // 将首页接口重新调用
      this.getBanner();
      this.getNavs();
      this.getFloors();

      // 停止下接的动态效果
      mpvue.stopPullDownRefresh();
    },

    // 上拉加载
    onReachBottom () {
      // 在这里完成上拉加载更多数据功能
    },

    // 页面滚动
    onPageScroll (ev) {
      // console.log(ev);
      this.isTop = ev.scrollTop < 100;
    }
  }
</script>

<style scoped lang="less">
// 搜索
.search .input-box {
  background-color: #ff2d4a;
  padding: 21rpx 15rpx;
}
.search .input-box input {
  background-color: #fff;
  height: 60rpx;
  border-radius: 10rpx;
  padding: 0 15rpx;
  font-size: 24rpx;
  color: #666;
}

// 轮播图
.banner {
  width: 750rpx;
  height: 340rpx;

  navigator {
    width: 100%;
    height:100%;
  }
}
.banner image {
  width: 100%;
  height: 100%;
}

// 导航条
.navs {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 44rpx;
}
.navs image {
  width: 128rpx;
  height: 140rpx;
}

// 楼层
 .floor .title {
    width: 750rpx;
    height: 60rpx;
    padding-top: 24rpx;
    padding-left: 10rpx;
    background-color: #f4f4f4;
  }

.floor .title image {
  width: 100%;
  height: 100%;
}
  .floor .pics image {
    width: 232rpx;
    height: 188rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    float: left;
  }

  .floor .pics {
    padding: 22rpx;
    overflow: hidden;
  }

  .floor .pics navigator:nth-child(2n+1) image {
    margin-right: 0;
  }

  .floor .pics navigator:first-child image {
    height: 386rpx;
    margin-right: 10rpx;
  }

// 回到顶部
  .gotop {
    position: fixed;
    bottom: 70rpx;
    right: 30rpx;

    width: 88rpx;
    height: 88rpx;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
  }
</style>
