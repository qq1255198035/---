<template>
  <div id="zzsxq">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img :src="avatar()">
            </div>
            <div class="username">{{ nickname() }}</div>
            <p>Stephon Xavier Marbury</p>
          </div>
          <div class="account-center-detail">
            <p>
              <a-icon type="man"/>男
            </p>
            <p>
              <a-icon type="bank" class="tel"></a-icon>美国
            </p>
            <p>
              <a-icon type="sort-descending"/>188cm
            </p>
            <p>
              <a-icon type="contacts"/>93公斤
            </p>
            <p>
              <a-icon type="environment"/>
              <span>美国纽约州纽约市布鲁克林区科尼岛</span>
            </p>
          </div>
          <a-divider :dashed="true"/>
          <div class="account-center-team">
            <p>公司名称：北京大学附属中学初中男篮</p>
            <p>联系人：张凉冰</p>
            <p>联系电话：15590030000</p>
            <p>邮箱：jacky@mlsports.com.hk</p>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <div class="info-box">
          <div class="title">
            <h5>公司简介</h5>
          </div>
          <div class="content">
            <p>段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</p>
            <p>段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</p>
            <p>段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。</p>
          </div>
          <div class="title">
            <h5>个人图册</h5>
          </div>
          <div class="img-content">
            <img :src="imgUrl" alt>
            <img :src="imgUrl" alt>
            <img :src="imgUrl" alt>
            <img :src="imgUrl" alt>
            <img :src="imgUrl" alt>
            <img :src="imgUrl" alt>
            <img :src="imgUrl" alt>
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
import { getStarInfo } from '@api/hand'
import imgUrl from '@/assets/123.png'
export default {
  data() {
    return {
      imgUrl
    }
  },
  created() {
    this._getStarInfo()
  },
  methods: {
    _getStarInfo() {
      const token = this.$ls.get('Access-Token')
      const userId = this.$route.query.userId
      const params = {
        token: token,
        userId: userId
      }
      console.log(params)
      getStarInfo(params).then(res => {
        console.log(res)
      })
    },
    ...mapGetters(['nickname', 'avatar'])
  }
}
</script>
