<template>
  <div id="mxgl">
    <page-header :title="pageTitle"></page-header>
    <glTitle
      :logo="logo"
      :title="name"
      :start="start"
      :type="capName"
      :num="campNum"
      :stars="starAvatar | filterLength"
      :sponsors="sponsorList | filterLength"
      :status="status"
      :price="price"
      :adress="adress"
    ></glTitle>
    <div class="mxgl-content">
      <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
        <a-tab-pane key="1" :tab="$t('issuer.hdgl.starsApproval')">
          <div class="my-cards">
            <div
              class="card-item ant-card-hoverable"
              @mouseenter="btnShow = index"
              @mouseleave="btnShow = -1"
              v-for="(item,index) in cardItemData"
              :key="index"
            >
              <div class="title">
                <h5>{{item.name}}</h5>
                <span>{{item.company}}</span>
                <a-avatar :size="64" :src="item.avatar" />
                <p>
                  <span>$</span>
                  {{item.cost}}
                </p>
                <span>{{$t('issuer.cjhd.ccfy')}}</span>
              </div>
              <div class="content">
                <p>{{$t('issuer.accountInfo.contact')}}: {{ item.contact}}</p>
                <p>{{$t('issuer.accountInfo.telphone')}}：{{item.phone}}</p>
                <p>{{$t('issuer.accountInfo.email')}}：{{item.email}}</p>
                <p>{{$t('issuer.accountInfo.companyTitle')}}：{{item.company}}</p>
              </div>
              <div class="footer">
                <transition name="fade">
                  <div class="button-box" v-show="btnShow == index" key="1">
                    <a-button
                      type="primary"
                      class="primary"
                      style="background:#ccc;border:solid 1px #ccc;"
                      @click="details(item)"
                    >{{$t('issuer.hdgl.examine')}}</a-button>
                    <a-button type="danger" class="danger" @click="showModal(item)">{{$t('issuer.hdgl.bh')}}</a-button>
                    <a-button type="primary" class="primary" @click="success(item)">{{$t('issuer.hdgl.tg')}}</a-button>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('issuer.hdgl.participationStar')">
          <div class="my-cards">
            <div
              class="card-item ant-card-hoverable"
              @mouseenter="btnShow = index"
              @mouseleave="btnShow = -1"
              v-for="(item,index) in joinStar"
              :key="index"
            >
              <div class="title">
                <h5>{{item.name}}</h5>
                <span>{{item.company}}</span>
                <a-avatar :size="64" :src="item.avatar" />
                <p>
                  <span>$</span>
                  {{item.cost}}
                </p>
                <span>{{$t('issuer.cjhd.ccfy')}}</span>
              </div>
              <div class="content">
                <p>{{$t('issuer.accountInfo.contact')}}: {{ item.contact}}</p>
                <p>{{$t('issuer.accountInfo.telphone')}}：{{item.phone}}</p>
                <p>{{$t('issuer.accountInfo.email')}}：{{item.email}}</p>
                <p>{{$t('issuer.accountInfo.companyTitle')}}：{{item.company}}</p>
              </div>
              <div class="footer">
                <transition name="fade">
                  <div class="button-box" v-show="btnShow == index" key="1">
                    <a-button type="primary" class="primary" @click="starDetail(item)">{{$t('issuer.hdgl.examine')}}</a-button>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-modal
      title
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form-item :label="$t('issuer.hdgl.yy')">
        <a-textarea placeholder="input placeholder" :autosize="{ minRows: 4 }" v-model="baseText" />
      </a-form-item>
    </a-modal>
  </div>
</template>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
#mxgl {
  margin: -24px -24px 0;
  .mxgl-content {
    background-color: #fff;
    margin: 24px;
    padding: 20px;
    .my-cards {
      display: flex;
      //justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 0 50px;

      .card-item {
        width: 22%;
        height: 423px;
        margin: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 0 20px;
        .title {
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 20px 0;
          border-bottom: 1px solid #ccc;
          p {
            color: #21c5c7;
            font-size: 28px;
            margin: 20px 0 10px;
            span {
              font-size: 14px;
              color: #333;
              margin-right: 5px;
            }
          }
          span {
            &:nth-child(2) {
              font-size: 12px;
              color: #333;
              margin-bottom: 10px;
            }
            &:nth-child(5) {
              font-size: 14px;
              color: #999;
            }
          }
          h5 {
            font-size: 16px;
            color: #239fd5;
            margin: 0;
          }
        }
        .content {
          padding-top: 10px;
          p {
            margin: 5px;
          }
        }
        .footer {
          .button-box {
            padding: 10px 0;
            display: flex;
            justify-content: center;

            .danger {
              background-color: #ff0000;
              color: #fff;
              margin: 0 15px;
              border-color: red;
            }
            .primary {
              background-color: #23c6c8;
              color: #fff;
              margin: 0 15px;
              border-color: #23c6c8;
            }
          }
        }
      }
    }
  }
}
</style>
<script>
import glTitle from '@/components/glTitle1/glTitle1'
import { getStarList, getStarCheck, getJoinStar, getActivityInformation } from '@api/hand'
import { mixinsTitle } from '@/utils/mixin.js'
export default {
  mixins: [mixinsTitle],
  components: {
    glTitle
  },
  data() {
    return {
      btnShow: -1,
      visible: false,
      confirmLoading: false,
      cardItemData: [],
      baseText: '',
      orderId: '',
      joinStar: [],
      logo: '',
      name: '',
      start: '',
      capName: '',
      campNum: '',
      starList: [],
      sponsorList: [],
      starAvatar: [],
      status: '',
      price: '',
      adress: [],
      status: ''
    }
  },
  filters: {
    filterLength(val) {
      if (val.length > 4) {
        return val.slice(0, 4)
      } else {
        return val
      }
    }
  },

  mounted() {
    this._getStarList()
    this._getJoinStar()
    this._getActivityInformation()
  },
  methods: {
    starDetail(item) {
      this.$router.push({ path: '/issuerMxxq', query: { userId: item.athlete_id, campId: this.$route.query.campId } })
    },
    _getActivityInformation() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      console.log(params)
      getActivityInformation(params).then(res => {
        console.log(res)
        this.data = res.data.listLoc
        const avatarArrty = []
        for (let i = 0; i < res.data.starList.length; i++) {
          if (!res.data.starList.length == 0) {
            avatarArrty.push(res.data.starList[i].avatar)
          }
        }
        const sponsorList = []
        for (let i = 0; i < res.data.sponsorList.length; i++) {
          if (!res.data.sponsorList.length == 0) {
            sponsorList.push(res.data.sponsorList[i].logo)
          }
        }
        this.sponsorList = sponsorList
        console.log(this.sponsorList)

        this.starAvatar = avatarArrty
        console.log(this.starAvatar)
        let activityDetail = res.data.list[0]
        this.name = activityDetail.name
        this.start = activityDetail.publishTime + '-' + activityDetail.endTime + '-' + activityDetail.concreteTime
        this.adress = res.data.listLoc1
        this.capName = activityDetail.capName
        this.campNum = activityDetail.campNum
        this.price = res.data.amount
        this.email = activityDetail.email
        this.phone = activityDetail.phone
        this.enName = activityDetail.enName
        this.contact = activityDetail.contact
        this.imgUrl = activityDetail.cover_img ? activityDetail.cover_img : ''
        this.logo = activityDetail.cover_img ? activityDetail.cover_img : ''
        console.log(this.logo)
        console.log(this.campNum)
        if (activityDetail.status == 10) {
          this.status = this.$t('issuer.hdgl.createAnEvent')
        }
        if (activityDetail.status == 0) {
          this.status = this.$t('issuer.cjhd.platformReview')
        }
        if (activityDetail.status == 20) {
          this.status = this.$t('issuer.cjhd.activityProgress')
        }
        if (activityDetail.status == 30) {
          this.status = this.$t('issuer.hdgl.createAnEvent')
        }
        if (activityDetail.status == 50) {
          this.status = this.$t('issuer.cjhd.hdwc')
        }
      })
    },
    // 参加明星
    _getJoinStar() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      getJoinStar(params).then(res => {
        console.log(res)
        this.joinStar = res.data
      })
    },
    _getStarList() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      getStarList(params).then(res => {
        console.log(res)
        this.cardItemData = res.data
      })
    },
    showModal(item) {
      this.visible = true
      console.log(item)
      this.orderId = item.recordId
    },
    details(item) {
      this.$router.push({ path: '/issuerMxxq', query: { userId: item.athleteId, campId: this.$route.query.campId } })
    },
    handleOk(e) {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        orderId: this.orderId,
        agreement: 0,
        reject: this.baseText,
        internationalization: localStorage.lang
      }
      console.log(params)
      getStarCheck(params).then(res => {
        console.log(res)
        /*this._getStarList()
        this._getJoinStar()*/
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
        this.$message.success(this.$t('issuer.hdgl.czcg'))
        //失败提示
        //this.$message.error('This is a message of error');
      }, 2000)
    },
    handleCancel(e) {
      this.visible = false
    },
    success(item) {
      console.log(item)
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        orderId: item.recordId,
        agreement: 1,
        internationalization: localStorage.lang
      }
      console.log(params)
      getStarCheck(params).then(res => {
        console.log(res)
        if (res.data.code == '1') {
          /*this._getStarList()
          this._getJoinStar()*/
          setTimeout(() => {
            window.location.reload()
          }, 1000)
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.$message.success(this.$t('issuer.hdgl.czcg'))
          }, 2000)
        } else {
          setTimeout(() => {
            this.loading = false
            this.$message.error(this.$t('issuer.hdgl.czsb'))
          }, 2000)
        }
      })
    }
  }
}
</script>
