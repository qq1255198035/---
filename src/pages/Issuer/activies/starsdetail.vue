<template>
  <div id="zzsxq">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="starDetils.avatar">
            </div>
            <div class="username">{{starDetils.monicker}}{{starDetils.surname}}</div>
            <p>{{starDetils.enName}}</p>
          </div>
          <div class="account-center-detail">
            <p>
              <a-icon type="man"/>{{sex}}
            </p>
            <p>
              <a-icon type="bank" class="tel"></a-icon>{{starDetils.nationality}}
            </p>
            <p>
              <a-icon type="sort-descending"/>{{starDetils.height}}cm
            </p>
            <p>
              <a-icon type="contacts"/>{{starDetils.weight}}公斤
            </p>
            <p>
              <a-icon type="environment"/>
              <span>{{starDetils.addr}}</span>
            </p>
          </div>
          <a-divider :dashed="true"/>
          <div class="account-center-team">
            <p>公司名称：{{starDetils.company}}</p>
            <p>联系人：{{starDetils.contact}}</p>
            <p>联系电话：{{starDetils.phone}}</p>
            <p>邮箱：{{starDetils.email}}</p>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <div class="info-box">
          <div class="title">
            <h5>公司简介</h5>
          </div>
          <div class="content">
           <p>{{starDetils.introduction}}</p>
          </div>
          <div class="title">
            <h5>个人图册</h5>
          </div>
          <div class="img-content">
            <img v-for="(item, index) in starDetils.imgs" :key="index" :src="item" alt>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<style lang="less" scoped>
#zzsxq {
  margin: 24px;
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
        width: 22%;
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
      sex: ''
    }
  },
  activated() {
    this._getStarDetails()
  },
  methods: {
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
        this.sex = res.data.sex === '1' ? '男' : '女'
      })
    },
    ...mapGetters(['nickname', 'avatar'])
  }
}
</script>
