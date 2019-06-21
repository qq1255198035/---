<template>
  <page-view :avatar="personInfo.logo" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ personInfo.contact }}，<span class="welcome-text">欢迎来到 Sponsor Cube 管理平台</span></div>
      <div>搞手</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <div>{{$t('issuer.index.zzdsp')}}</div>
          <div class="numCenter">{{count2}}</div>
        </a-col>
        <a-col :span="8">
          <div>{{$t('issuer.index.mxdsp')}}</div>
          <div class="numCenter">{{count1}}</div>
        </a-col>
        <a-col :span="8">
          <div>{{$t('issuer.index.hddsp')}}</div>
          <div class="numCenter">{{count3}}</div>
        </a-col>
      </a-row>
    </div>
    <div id="home">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :title="$t('issuer.index.zzxq')" :bordered="false" class="my-cards">
            <div class="item-boxes">
              <div class="item-row">
                
                  <a-row>
                    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" class="item-box" style="margin-left:-100px;">
                        <v-chart :height="300" :data="pieData" :scale="pieScale">
                          <v-legend dataKey="item" :useHtml="true" :itemTpl="itemTpl" position="right" :offsetX="-50" :offsetY="-35"/>
                          <v-tooltip :showTitle="false" dataKey="item*percent" />
                          <v-axis />
                          <v-pie position="percent" :color="c" :vStyle="pieStyle"/>
                          <v-coord type="theta" :radius="0.75" :innerRadius="0.3" />
                        </v-chart>
                        <div class="calc-price">
                          总计：￥
                          <span>{{sponSor.tolMoney}}</span>
                        </div>
                        
                    </a-col>
                    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" class="item-box">
                      <v-chart :height="300" :data="pieData1" :scale="pieScale">
                        <v-legend dataKey="item" position="right" :offsetX="-50" :offsetY="-35" :useHtml="true" :itemTpl="itemTpl1"/>
                        <v-tooltip :showTitle="false" dataKey="item*percent" />
                        <v-axis />
                        <v-pie position="percent" :color="c1" :vStyle="pieStyle" />
                        <v-coord type="theta" :radius="0.75" :innerRadius="0.3" />
                      </v-chart>
                      <div class="calc-price">
                          总计：￥
                          <span>{{sponSor.tolMoney}}</span>
                      </div>
                    </a-col>
                  </a-row>
              </div>
            </div>
          </a-card>
          <a-card :title="$t('issuer.index.hddt')" class="my-activity">
            <a-table :columns="operationColumns" :dataSource="operation" :pagination="false">
              <template slot="status" slot-scope="status">
                <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
              </template>
            </a-table>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card title="" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 20}">
            <div class="item-group">
              <h6>{{$t('issuer.index.title')}}</h6>
              <p>{{$t('issuer.index.desc')}}</p>
              <a-button type="primary" @click="$router.push({name: 'issuerCjhd'})">{{$t('issuer.index.fbhd')}}</a-button>
            </div>
        </a-card>
          <a-card class="project-list" :loading="loading" style="margin-bottom: 24px;" :bordered="false" :title="$t('issuer.index.wdxx')" :body-style="{ padding: 0 }">
            <a slot="extra" @click="$router.push({name: 'tzxx'})">{{$t('issuer.index.qbxx')}}</a>
            <div>
              <a-card-grid class="project-card-grid" :key="index" v-for="(item, index) in newsList">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.content }}
                    </div>
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
import { getSponsorshipdetails, getHandActivities, getUserInformation, getSponsoredTweets, getMyFiveNews, getMyAllNews, getStarNum, getSponsorNum, getActiveNum } from '@api/hand'
import { mapActions,mapGetters } from 'vuex'

import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'

let sourceData = [{
              "item": "现金",
              "count": null
            }, 
            {
              "item": "实物",
              "count": null
            }]
let sourceData1 = [{
              "item": "未付",
              "count": null
            }, 
            {
              "item": "已付",
              "count": null
            }]
const DataSet = require('@antv/data-set')
let dv = new DataSet.View().source(sourceData)
let dv1 = new DataSet.View().source(sourceData1)
const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]
 let pieData = dv.rows
 let pieData1 = dv1.rows
export default {
  components: {
    PageView,
    HeadInfo
  },
  data () {
    return {
      activeList: [],
      count1: '',
      count2: '',
      count3: '',
      sponSor: '', //赞助商
      timeFix: timeFix(),
      personInfo: '', // 搞手用户信息
      avatar: '',
      number:{},
      user: {},
      newsList: [], // 5条消息
      pieData,
      pieData1,
      operation:[],
      //饼图填充颜色
      c:["item", ["#4275FC","#41BDFD",]],
      c1:["item", ["#F56367","#FFB535",]],
      projects: [],
      loading: true,
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
        const obj = dv.rows[index];
        checked = checked ? 'checked' : 'unChecked';
        return '<tr class="g2-legend-list-item item-' + index + ' ' + checked +
          '" data-value="' + value + '" data-color=' + color +
          ' style="cursor: pointer;font-size: 14px;">' +
          '<td width=150 style="border: none;padding:0;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' +
          '<span class="g2-legend-text">' + value + '</span></td>' +
          '<td style="text-align: right;border: none;padding:0;">' + obj.count + '</td>' +
          '</tr>';
      },
      itemTpl1: (value, color, checked, index) => {
        const obj = dv1.rows[index];
        checked = checked ? 'checked' : 'unChecked';
        return '<tr class="g2-legend-list-item item-' + index + ' ' + checked +
          '" data-value="' + value + '" data-color=' + color +
          ' style="cursor: pointer;font-size: 14px;">' +
          '<td width=150 style="border: none;padding:0;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' + color + ';"></i>' +
          '<span class="g2-legend-text">' + value + '</span></td>' +
          '<td style="text-align: right;border: none;padding:0;">' + obj.count + '</td>' +
          '</tr>';
      },
      // data
      operationColumns: [
        {
          title: this.$t('header.HeadMenu.logout'),
          dataIndex: 'num',
          key: 'num'
        },
        {
          title: '活动名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '开始时间',
          dataIndex: 'publishTime',
          key: 'publishTime'
        },
        {
          title: '活动分类',
          dataIndex: 'campCatalogVal',
          key: 'campCatalogVal'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          /*scopedSlots: { customRender: 'status' }*/
        },
      ],
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    },
    ...mapGetters(['notice']),
  },
  created () {
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
  },
  mounted () {
  
  },
  methods: {
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
        token: token
      }
      getHandActivities(params).then(res => {
        console.log(res)
        this.operation = res.page.rows
      })
    },
    _getMyFiveNews() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getMyFiveNews(params).then(res => {
        console.log(res)
        this.newsList = res.data
        this.loading = !this.loading
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
        if(res.code == 1000){
          console.log(res.cash)
              this.pieData[0].count= res.cash
              this.pieData[1].count= res.product
              this.pieData1[0].count= res.noPaid
              this.pieData1[1].count= res.paid
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
      })
    },
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '已审批',
        'reject': '驳回',
        'authen': '已认证',
        'agreeing': '未审批'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error',
        'authen': 'processing',
        'agreeing': 'warning'
      }
      return statusTypeMap[type]
    }
  }
}
</script>

<style lang="less">
.project-card-grid{
  width: 100%;
  padding: 20px;
  .card-description{
    height: auto !important;
  }
}
#home{
	padding: 24px;
    .my-cards{
        .ant-card-body{
    position: relative;
    height: 227px;
    overflow: hidden;
		margin-bottom: 24px;
      .item-row{
        position: absolute;
        left: 0;
        top: 0px;
          .item-box{
          display: flex;
          align-items: flex-start;
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
            position: absolute;
            bottom: 80px;
            left: 186px;
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
		.my-activity{border: 0;}
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
    h6{
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
        color: rgba(0, 0, 0, .65);
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
.more-info{
  text-align: center;
}
</style>
