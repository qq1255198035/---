<template>
  <div id="zzsxq">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatars">
            </div>
            <div class="username">{{starDetils.surname}}{{starDetils.monicker}}</div>
            <p>{{starDetils.enName}}</p>
          </div>
          <div class="account-center-detail">
            <p>
              <a-icon type="man"/>
              {{sex}}
            </p>
            <p>
              <a-icon type="bank" class="tel"></a-icon>
              {{starDetils.nationality}}
            </p>
            <p>
              <a-icon type="sort-descending"/>
              {{starDetils.height}}cm
            </p>
            <p>
              <a-icon type="contacts"/>
              {{starDetils.weight}}kg
            </p>
            <p>
              <a-icon type="environment"/>
              <span>{{starDetils.addr}}</span>
            </p>
          </div>
          <a-divider :dashed="true"/>
          <div class="account-center-team">
            <p>{{$t('issuer.accountInfo.companyTitle')}}：{{starDetils.company}}</p>
            <p>{{$t('issuer.accountInfo.contact')}}：{{starDetils.contact}}</p>
            <p>{{$t('issuer.accountInfo.telphone')}}：{{starDetils.phone}}</p>
            <p>{{$t('issuer.accountInfo.email')}}：{{starDetils.email}}</p>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <div class="info-box">
          <div class="title">
            <h5>{{$t('issuer.accountInfo.companyName')}}</h5>
          </div>
          <div class="content">
            <p>{{starDetils.introduction}}</p>
          </div>
          <div class="title">
            <h5>{{$t('issuer.accountInfo.grtc')}}</h5>
          </div>
          <div class="img-content">
            <img :src="detailsImgs" alt="">
            <!--<img v-for="(item, index) in detailsImgs" :key="index" :src="item" alt>-->
          </div>
        </div>
      </a-col>
    </a-row>
    <div class="back_btn"><a-button type="primary" @click="handleBack">{{$t('issuer.accountInfo.back')}}</a-button></div>
  </div>
</template>
<style lang="less" scoped>
.back_btn{
  text-align: right;
  padding: 20px;
}
#zzsxq {
  margin: 24px;
  background: #fff;
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
      color: #21c5c7;
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
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    p {
      margin: 5px 0;
    }
  }
  .info-box {
    background-color: #fff;
    .title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 20px 40px 0;
      h5 {
        margin: 0;
        font-size: 16px;
      }
    }
    .img-content {
      display: flex;
      justify-content: flex-start;
      padding: 20px 40px;
      flex-wrap: wrap;
      img {
        width: 40%;
        height: 100%;
        margin: 10px;
      }
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
import { mapGetters } from 'vuex'
import { getStarDetails } from '@api/hand'
import imgUrl from '@/assets/123.png'
export default {
  data() {
    return {
      imgUrl,
      starDetils: '',
      sex: '',
      avatars: '',
      detailsImgs: []
    }
  },
  
  mounted(){
      this._getStarDetails()
  },
  methods: {
    handleBack() {
      this.$router.push({
        path: '/issuerMxsp',
        query: {
          campId: this.$route.query.campId
        }
      })
    },
    _getStarDetails() {
      const token = this.$ls.get('Access-Token')
      const userId = this.$route.query.userId
      const params = {
        token: token,
        athleteId: userId
      }
      console.log(params)
      getStarDetails(params).then(res => {
        console.log(res)
        this.starDetils = res.data
        this.avatars = res.data.avatar
        console.log(this.avatar)
        this.sex = res.data.sex === '1' ? this.$t('issuer.accountInfo.boy') : this.$t('issuer.accountInfo.gril')
        this.detailsImgs = res.data.imgs
        console.log(this.detailsImgs)
      })
    },
    ...mapGetters(['nickname', 'avatar'])
  }
}
</script>
