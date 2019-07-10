<template>
  <div id="accountInfo">
    <page-header :title="pageTitle"></page-header>
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar" v-if="logo">
              <img :src="logo">
            </div>
            <a-avatar v-else style="backgroundColor:#23C6C8" :size="104">Sponsor Cube</a-avatar>
            <div class="username">{{personInfo.name}}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <span>{{$t('issuer.accountInfo.contact')}}：</span><a-icon type="user" class="user"></a-icon>{{personInfo.contact}}
            </p>
            <p>
              <span>{{$t('issuer.accountInfo.telphone')}}：</span><a-icon type="phone" class="tel"></a-icon>{{personInfo.phone}}
            </p>
            <p>
              <span>{{$t('issuer.accountInfo.webName')}}：</span><i class="group"></i>{{personInfo.web}}
            </p>
            <p>
              <span>{{$t('issuer.accountInfo.placeName')}}：</span><i class="address"></i>
              {{personInfo.country}}
            </p>
          </div>
          <a-divider :dashed="true"/>
          <div class="account-center-team">
            <img v-if="busiess" :src="busiess" alt>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <div class="info-box">
          
          <div class="title">
            <a-button type="primary" @click="$router.push({name: 'zhsz'})">{{$t('issuer.accountInfo.accountSet')}}</a-button>
          </div>
          <p class="company_title">{{$t('issuer.accountInfo.companyName')}}</p>
          <a-divider :dashed="true"/>
          <div class="content">
            <p>{{personInfo.intro}}</p>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<style lang="less" scoped>
.company_title{
  padding-left: 20px
}
#accountInfo {
  .account-center-avatarHolder {
    text-align: center;
    margin-bottom: 24px;
 
    & > .avatar {
      margin: 0 auto;
      width: 104px;
      height: 104px;
      margin-bottom: 20px;
      border-radius: 50%;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
    }
 
    .username {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 4px;
    }
  }
  .account-center-detail {
    p {
      margin-bottom: 8px;
      padding-left: 26px;
      position: relative;
    }
 
    i {
      position: absolute;
      height: 14px;
      width: 14px;
      left: 0;
      top: 4px;
      background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
    }
 
    .tel {
      background-position: -44px -44px;
    }
    .group {
      background-position: 0 -22px;
    }
    .address {
      background-position: 0 -44px;
    }
    .user {
      background-position: -44px -44px;
    }
  }
  .account-center-team {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
      border: 1px solid #ccc;
      padding: 10px;
    }
  }
  .info-box {
    background-color: #fff;
    .title {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 20px 40px 0;
    }
    .content {
      padding: 20px 40px;
      p {
        margin: 20px 0;
      }
    }
  }
}
</style>
<script>
import { getUserInformation } from '@api/hand'
import { mixinsTitle } from '@/utils/mixin.js'
export default {
  mixins: [mixinsTitle],
  data() {
    return {
      imgUrl: '',
      personInfo: '',
      busiess: '',
      logo: '',
    }
  },
  
  mounted(){
      this._getUserInformation()
  },
  methods: {
    // 搞手用户信息
    _getUserInformation() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token,
        internationalization: localStorage.lang
      }
      getUserInformation(params).then(res => {
        this.personInfo = res.data
        this.busiess = res.data.business_img
        this.logo = res.data.logo
      })
    },
  }
}
</script>
