<template>
  <div class="zzgl-title">
    <div class="main">
      <a-col :span="10" class="item">
        <div class="profile-image">
          <a-avatar :size="96" :src="logo" class="img-circle"/>
        </div>
        <div class="profile-info">
          <h2 class="no-margins">{{title}}</h2>
          <p>{{$t('issuer.cjhd.timer')}}：{{start}}</p>
          <slot name="a">
          </slot>
          <slot name="b">
            <a-icon type="environment" class="my-icon"/>
            {{adre}}
          </slot>
        </div>
      </a-col>
      <a-col :span="10">
        <ul class="dl-horizontal">
          <li>{{$t('issuer.cjhd.sort')}}：{{type}}</li>
          <li>{{$t('issuer.cjhd.number')}}：{{num}} {{$t('admin.people')}}</li>
          <li>
            {{$t('issuer.hdgl.participationStar')}}：
            <ul style="display: flex; padding: 0">
              <li v-for="(item,index) in stars" :key="index">
                <a-avatar :size="40" class="img-circle" :src="item.avatar"/>
              </li>
              <li style="display:flex;align-items: flex-end;">
                  <i v-if="stars.length >= 4">...</i>
              </li>
              
            </ul>
          </li>
          <li>
           {{$t('issuer.cjhd.cyzz')}}：
            <ul style="display: flex; padding: 0">
              <li v-for="(item,index) in sponsors" :key="index">
                <a-avatar :size="40" class="img-circle" :src="item.logo"/>
              </li>
              <li style="display:flex;align-items: flex-end;">
                <i v-if="sponsors.length >= 4">...</i>
              </li>
              
            </ul>
          </li>
        </ul>
      </a-col>
    </div>
    <div class="side">
      <a-row class="status-list">
        <a-col :xs="12" :sm="12">
          <div class="text">{{$t('issuer.index.status')}}</div>
          <div class="heading">{{status}}</div>
        </a-col>
        <a-col :xs="12" :sm="12">
          <div class="text">{{$t('issuer.cjhd.yjzzje')}}</div>
          <div class="heading">¥ {{price}}</div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<style lang="less" scoped>
.zzgl-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  .main {
    width: 80%;
    .item {
      padding: 20px;
      display: flex;
      justify-content: flex-start;
      .profile-info {
        margin-left: 20px;
        p {
          color: #999;
        }
        span {
          color: #999;
        }
        .no-margins {
          font-size: 18px;
          color: #21c5c7;
          font-weight: 500;
        }
        .my-icon {
          margin-right: 5px;
        }
      }
    }
  }
  .side {
    width: 20%;
    display: flex;
    align-items: center;
    .status-list {
      width: 100%;
      text-align: left;
      .text {
        color: rgba(0, 0, 0, 0.45);
      }

      .heading {
        color: rgba(0, 0, 0, 0.85);
        font-size: 20px;
      }
    }
  }

  .dl-horizontal {
    padding: 20px;
    margin: 0;
    li {
      display: flex;
      color: #999;
      margin: 2px 0;
    }
    .img-circle {
      margin: 0 2px;
    }
  }
}
</style>
<script>
export default {
  props: {
    title: {
      
    },
    logo: {
      
    },
    start: {
      
    },
    adre: {
      
    },
    type: {
      
    },
    num: {},
    stars: {
      
    },
    sponsors: {},
    status: {
      
    },
    price: {}
  },
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  filters: {}
}
</script>
