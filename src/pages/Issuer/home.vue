<template>
  <page-view :avatar="logo ? logo : ''" :title="false" :avatarshow="true">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ personInfo.email }}，
        <span class="welcome-text">{{$t('header.HeadMenu.welcome')}} Sponsor Cube {{$t('header.HeadMenu.platform')}}</span>
      </div>
      <div>{{$t('header.HeadMenu.handName')}}</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <div style="height: 42px">{{$t('issuer.index.zzdsp')}}</div>
          <div class="numCenter">{{count2}}</div>
        </a-col>
        <a-col :span="8">
          <div style="height: 42px">{{$t('issuer.index.mxdsp')}}</div>
          <div class="numCenter">{{count1}}</div>
        </a-col>
        <a-col :span="8">
          <div style="height: 42px">{{$t('issuer.index.hddsp')}}</div>
          <div class="numCenter">{{count3}}</div>
        </a-col>
      </a-row>
    </div>
    <div id="home">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :title="$t('issuer.index.zzxq')" :bordered="false" class="my-cards">
            <div class="item-boxes">
              <div class="item-row">
                <a-row>
                  <a-col
                    :xl="12"
                    :lg="12"
                    :md="12"
                    :sm="12"
                    :xs="12"
                    class="item-box"
                    v-if="chartDis"
                    
                  >
                    <v-chart :height="chartHeight" :width="chartWidth" :forceFit="chartBollean" :data="pieData" :scale="pieScale">
                      <v-legend
                        data-key="item"
                        :useHtml="true"
                        :itemTpl="itemTpl"
                        position="right"
                        :offsetX="offetX"
                        :offsetY="offetY"
                      />
                      <v-tooltip :showTitle="false" data-key="item*percent"/>
                      <v-axis/>
                      <v-pie position="percent" :color="c" :vStyle="pieStyle"/>
                      <v-coord type="theta" :radius="0.75" :innerRadius="0.3"/>
                    </v-chart>
                    <div class="calc-price">
                      {{$t('issuer.index.totalPrice')}}：￥
                      <span>{{sponSor.tolMoney}}</span>
                    </div>
                  </a-col>
                  <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" v-else class="nonum1">
                    <p>{{$t('issuer.index.noData')}}</p>
                  </a-col>
                  <a-col
                    :xl="12"
                    :lg="12"
                    :md="12"
                    :sm="12"
                    :xs="12"
                    class="item-box"
                    v-if="chartDis1"
                  >
                    <v-chart :height="chartHeight" :width="chartWidth" :forceFit="chartBollean" :data="pieData1" :scale="pieScale">
                      <v-legend
                        data-key="item"
                        position="right"
                        :offsetX="offetX"
                        :offsetY="offetY"
                        :useHtml="true"
                        :itemTpl="itemTpl1"
                      />
                      <v-tooltip :showTitle="false" data-key="item*percent"/>
                      <v-axis/>
                      <v-pie position="percent" :color="c1" :vStyle="pieStyle"/>
                      <v-coord type="theta" :radius="0.75" :innerRadius="0.3"/>
                    </v-chart>
                    <div class="calc-price">
                      {{$t('issuer.index.totalPrice')}}：￥
                      <span>{{sponSor.tolMoney}}</span>
                    </div>
                  </a-col>
                  <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" v-else class="nonum1">
                    <p>{{$t('issuer.index.noData')}}</p>
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-card>
          <a-card :title="$t('issuer.index.hddt')" class="my-activity">
            <a-locale-provider :locale="locale">
            <a-table :columns="operationColumns" :dataSource="operation" :pagination="false">
              <template slot="status" slot-scope="status">
                <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
              </template>
            </a-table>
            </a-locale-provider>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 20}">
            <div class="item-group">
              <h6>{{$t('issuer.index.title')}}</h6>
              <p>{{$t('issuer.index.desc')}}</p>
              <a-button
                type="primary"
                @click="setInfo"
              >{{$t('issuer.index.fbhd')}}</a-button>
            </div>
          </a-card>
          <a-card
            class="project-list"
            style="margin-bottom: 24px;"
            :bordered="false"
            :title="$t('issuer.index.wdxx')"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra" @click="$router.push({name: 'tzxx'})">{{$t('issuer.index.qbxx')}}</a>
            <div>
              <a-card-grid class="project-card-grid" :key="index" v-for="(item, index) in newsList">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">{{ item.content }}</div>
                  </a-card-meta>
                  <div class="project-item">
                    <span class="datetime">{{item.createtime}}</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import {
  getSponsorshipdetails,
  getHandActivities,
  getUserInformation,
  getSponsoredTweets,
  getMyFiveNews,
  getMyAllNews,
  getStarNum,
  getSponsorNum,
  getActiveNum
} from '@api/hand'
import { judge } from '@api/common'
import { mapActions, mapGetters } from 'vuex'
import G2 from '@antv/g2'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import i18n from '@/lang/index'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
const statusMap = {
  0: {
    status: 'processing',
    text: i18n.t('issuer.index.pending')
  },
  20: {
    status: 'success',
    text: i18n.t('issuer.index.passed')
  },
  10: {
    status: 'warning',
    text: i18n.t('issuer.index.creating')
  },
  1: {
    status: 'success',
    text: i18n.t('issuer.index.deleted')
  }
}
let sourceData = [
  {
    item: i18n.t('issuer.index.cash'),
    count: null
  },
  {
    item: i18n.t('issuer.index.realThing'),
    count: null
  }
]
let sourceData1 = [
  {
    item: i18n.t('issuer.index.unpaid'),
    count: null
  },
  {
    item: i18n.t('issuer.index.paid'),
    count: null
  }
]
const DataSet = require('@antv/data-set')
let dv = new DataSet.View().source(sourceData)
console.log(new DataSet.View())
let dv1 = new DataSet.View().source(sourceData1)
const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]
let pieData = dv.rows
let pieData1 = dv1.rows
export default {
  components: {
    PageView,
    HeadInfo
  },
  
  data() {
    return {
      locale: lang[localStorage.getItem('lang')],
      chartWidth: 500,
      chartHeight:300,
      chartBollean: true,
      offetX: -50,
      offetY: -35,
      chartDis: true,
      chartDis1: true,
      logo: '',
      activeList: [],
      count1: '',
      count2: '',
      count3: '',
      sponSor: '', //赞助商
      timeFix: timeFix(),
      personInfo: '', // 搞手用户信息
      avatar: '',
      number: {},
      user: {},
      newsList: [], // 5条消息
      pieData,
      pieData1,
      operation: [],
      //饼图填充颜色
      c: ['item', ['#4275FC', '#41BDFD']],
      c1: ['item', ['#F56367', '#FFB535']],
      projects: [],
      radarLoading: true,
      activities: [],
      teams: [],
      pieScale,
      //饼图描边颜色参数
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      itemTpl: (value, color, checked, index) => {
        const obj = dv.rows[index]
        checked = checked ? 'checked' : 'unChecked'
        return (
          '<tr class="g2-legend-list-item item-' +
          index +
          ' ' +
          checked +
          '" data-value="' +
          value +
          '" data-color=' +
          color +
          ' style="cursor: pointer;font-size: 14px;margin-right:0px";min-width: 180px;>' +
          '<td style="border: none;padding:0;min-width:50px"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
          color +
          ';"></i>' +
          '<span class="g2-legend-text">' +
          value +
          '</span></td>' +
          '<td style="text-align: right;border: none;padding:0;">' +
          obj.count +
          '</td>' +
          '</tr>'
        )
      },
      itemTpl1: (value, color, checked, index) => {
        const obj = dv1.rows[index]
        checked = checked ? 'checked' : 'unChecked'
        return (
          '<tr class="g2-legend-list-item item-' +
          index +
          ' ' +
          checked +
          '" data-value="' +
          value +
          '" data-color=' +
          color +
          ' style="cursor: pointer;font-size: 14px;min-width: 180px;">' +
          '<td style="border: none;padding:0;min-width:50px"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
          color +
          ';"></i>' +
          '<span class="g2-legend-text">' +
          value +
          '</span></td>' +
          '<td style="text-align: right;border: none;padding:0;">' +
          obj.count +
          '</td>' +
          '</tr>'
        )
      },
      // data
      operationColumns: [
        {
          title: i18n.t('issuer.index.eventName'),
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: i18n.t('issuer.index.startTime'),
          dataIndex: 'publishTime',
          key: 'publishTime'
        },
        {
          title: i18n.t('issuer.index.capName'),
          dataIndex: 'capName',
          key: 'capName'
        },
        {
          title: i18n.t('issuer.index.status'),
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        }
      ]
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    },
    ...mapGetters(['notice'])
  },
  
  mounted() {
          this._getSponsorshipdetails()
          this._getUserInformation()
          this._getSponsoredTweets()
          this._getMyFiveNews()
          this._getStarNum()
          this._getSponsorNum()
          this._getActiveNum()
          this._getHandActivities()
          this.user = this.userInfo
          this.avatar = this.userInfo.avatar
          const that = this
          window.onresize = () => {
            return (() => {
              window.screenWidth = document.body.clientWidth
              console.log(window.screenWidth)
              if(window.screenWidth <= 1366) {
                console.log(window.screenWidth)
                that.chartBollean = false
                that.chartWidth = 240
                that.chartHeight = 240
                that.offetX = -80
                that.offetY = -56
              }else {
                that.chartBollean = true
                that.chartHeight = 300
                that.offetX = -50
                that.offetY = -35
              }
            })()
          }
  },
  methods: {
    setInfo() {
      let that = this
      const token = this.$ls.get('Access-Token')
      judge(token).then(res => {
        if (res.code == 1000) {
          if (res.data == 0) {
            that.$router.push({ name: 'issuerCjhd' })
          } else {
            that.$error({
              okText: this.$t('issuer.index.gotoSet'),
              title: this.$t('issuer.index.error'),
              content: this.$t('issuer.index.sorry'),
              onOk() {
                that.$router.push({ name: 'zhsz' })
              }
            })
          }
        }
      })
    },
    // 明星待审数量
    _getStarNum() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getStarNum(params).then(res => {
        console.log(res)
        this.count1 = res.data.count
      })
    },
    // 赞助待审数量
    _getSponsorNum() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getSponsorNum(params).then(res => {
        console.log(res)
        this.count2 = res.data.count
      })
    },
    // 活动待审数量
    _getActiveNum() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getActiveNum(params).then(res => {
        console.log(res)
        this.count3 = res.data.count
      })
    },
    // 活动动态
    _getHandActivities() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token,
        offset: 1,
        limit: 10,
        internationalization: localStorage.lang
      }
      getHandActivities(params).then(res => {
        console.log(res)
        let key = 'key';
        this.operation = res.page.rows;
        this.operation.map((item,index)=>{
          item[key] = index + 1
        })
      })
    },
    _getMyFiveNews() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      console.log(params)
      getMyFiveNews(params).then(res => {
        console.log(res)
        this.newsList = res.data
        console.log(this.newsList)
      })
    },
    //赞助消息接口
    _getSponsoredTweets() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getSponsoredTweets(params).then(res => {
        console.log(res)
      })
    },
    // 赞助详情
    _getSponsorshipdetails() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getSponsorshipdetails(params).then(res => {
        console.log(res)
        this.sponSor = res
        if (res.code == 1000) {
          console.log(res.cash)
          this.pieData[0].count = res.cash
          this.pieData[1].count = res.product
          this.pieData1[0].count = res.noPaid
          this.pieData1[1].count = res.paid
          if (res.cash == 0 && res.product == 0) {
            this.chartDis = false
          }
          if (res.noPaid == 0 && res.paid == 0) {
            this.chartDis1 = false
          }
          dv.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
          })
          dv1.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
          })
        }
      })
    },
    // 搞手用户信息
    _getUserInformation() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getUserInformation(params).then(res => {
        console.log(res)
        this.personInfo = res.data
        this.logo = res.data.logo
      })
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  }
}
</script>

<style lang="less">
.project-card-grid {
  width: 100%;
  padding: 20px;
  .card-description {
    height: auto !important;
  }
}
@media screen and(max-width: 1336px) {
  #home .my-cards .ant-card-body .item-boxes .item-row .item-box .calc-price{
    font-size: 14px
  }
}
#home {
  padding: 24px;
  .my-cards {
    .ant-card-body {
      position: relative;
      height: 227px;
      overflow: hidden;
      margin-bottom: 24px;
      .item-boxes{
              width: 100%;
              height:100%;
              .item-row{
                width: 100%;
                position: absolute;
                left: -20px;
                bottom: -60px;
                .nonum1{
                  display: flex;
                  align-items: center;
                  position: relative;
                  P{
                    position: absolute;
                    bottom: 155px;
                    left: 200px;
                    color: #ccc;
                  }
                }
                
                .item-box{
                  position: relative;
                  //display: flex;
                  align-items: flex-end;
                  justify-content: center;
                  &:nth-child(2){
                    .calc-price{
                    color: #FEBF56;
                    span{
                      color: #F5797D;
                    }
                  }
                }
                .calc-price{
                  width: 100%;
                  position: absolute;
                  bottom: 80px;
                  text-align: center;
                  font-size: 16px;
                  color: #5DC6FC;
                  span{
                    font-size: 24px;
                    font-weight: bold;
                    color: #1890ff;
                  }
                }
          .desc{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 85px;
          h5{
            color: #333;
            font-size: 20px;
            span{
              color: #666;
              font-size: 14px;
            }
          }
          p{
            font-size: 15px;
            &:nth-child(1){
              color: #42BCFD;
            }
            &:nth-child(2){
              color: #4075FC;
            }
          }
        }
      }
      }
      
      }
    }
  }
  .my-activity {
    border: 0;
  }
}

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  text-align: center;
  h6 {
    font-size: 20px;
    color: #666;
    text-align: center;
  }

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
    text-align: center;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
.more-info {
  text-align: center;
}
</style>
