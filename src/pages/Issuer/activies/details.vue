<template>
  <div id="details">
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
    <div class="details-content">
      <div class="details-header">
        <a-card :title="$t('issuer.cjhd.activityProgress')">
          <div class="secetion">
            <a-steps :current="current">
              <a-popover slot="progressDot" slot-scope="{index, status, prefixCls}">
                <template slot="content">
                  <span>step {{index}} status: {{status}}</span>
                </template>
                <span :class="`${prefixCls}-icon-dot`"></span>
              </a-popover>
              <a-step :title="$t('issuer.hdgl.createAnEvent')"/>
              <a-step :title="$t('issuer.cjhd.platformReview')"/>
              <a-step :title="$t('issuer.cjhd.activityProgress')"/>
              <a-step :title="$t('issuer.cjhd.okOver')"/>
            </a-steps>
          </div>
        </a-card>
      </div>
      <div class="details-main">
        <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
          <a-tab-pane key="1" :tab="$t('issuer.cjhd.hdxxs')">
            <a-card :bordered="false">
              <detail-list :title="$t('issuer.cjhd.hdjbxx')">
                <detail-list-item :term="$t('issuer.cjhd.hdzwmc')">{{name}}</detail-list-item>
                <detail-list-item :term="$t('issuer.cjhd.hdfl')">{{capName}}</detail-list-item>
                <detail-list-item :term="$t('issuer.cjhd.number')">{{campNum}} {{$t('admin.people')}}</detail-list-item>
                <detail-list-item :term="$t('issuer.cjhd.hdywmc')">{{enName}}</detail-list-item>
                <detail-list-item :term="$t('issuer.cjhd.hdsj')">{{start}}</detail-list-item>
                <detail-list-item :term="$t('issuer.accountInfo.contact')">{{contact}}</detail-list-item>
                <detail-list-item :term="$t('issuer.accountInfo.email')">{{email}}</detail-list-item>
                <detail-list-item :term="$t('issuer.accountInfo.telphone')">{{phone}}</detail-list-item>
              </detail-list>
              <detail-list>
                <detail-list-item :term="$t('issuer.cjhd.hddq')" class="my-item">
                  <a-locale-provider :locale="locale">
                  <a-table
                    :columns="columns"
                    :dataSource="data"
                    size="small"
                    :pagination="false"
                    class="my-table"
                  />
                  </a-locale-provider>
                </detail-list-item>
                <!--<detail-list-item term="活动封面" class="my-item-1">
                  <img :src="imgUrl" alt>
                </detail-list-item>-->
              </detail-list>
            </a-card>
            <div class="my-item-list">
              <h3>{{$t('issuer.cjhd.hdxq')}}</h3>
              <ul>
                <li>
                  <span>{{$t('issuer.cjhd.Activities')}}：</span>
                  <p>{{activityContent}}</p>
                </li>
                <li>
                  <span>{{$t('issuer.cjhd.hdsp')}}：</span>
                  <video v-if="videoUrls" :src="videoUrls" controls width="200px" height="150px"></video>
                </li>
                <li>
                  <span>{{$t('issuer.cjhd.hdzp')}}：</span>
                  <img v-for="item in detailsImgs" :src="item" :key="item" alt>
                </li>
              </ul>
            </div>
            <div class="my-item-list">
              <h3>{{$t('issuer.cjhd.hdtg')}}</h3>
              <ul>
                <li>
                  <span>{{$t('issuer.cjhd.mainContractor')}}：</span>
                  <a-locale-provider :locale="locale">
                  <a-table
                    :columns="columns1"
                    :dataSource="data1"
                    size="small"
                    :pagination="false"
                    class="my-table"
                  />
                  </a-locale-provider>
                </li>
                <li>
                  <span>{{$t('issuer.cjhd.szqz')}}：</span>
                  <div>
                    <a-tag color="pink" v-for="(item, index) in selectedTags1" :key="index">{{item}}</a-tag>
                  </div>
                </li>
                <li>
                  <span>{{$t('issuer.cjhd.hdtd')}}：</span>
                  <div>
                    <a-tag color="orange" v-for="(item, index) in selectedTags" :key="index">{{item}}</a-tag>
                  </div>
                </li>
              </ul>
            </div>
            <div class="my-item-list">
              <h3>{{$t('issuer.cjhd.hdzz')}}</h3>
              <ul>
                <li>
                  <span>{{$t('issuer.cjhd.zsjzrq')}}：</span>
                  <p>{{closingDate}}</p>
                </li>
                <li>
                  <span>{{$t('issuer.cjhd.zzyq')}}：</span>
                  <a-locale-provider :locale="locale">
                  <a-table
                    :columns="columns2"
                    :dataSource="data2"
                    size="small"
                    :pagination="false"
                    class="my-table"
                  />
                  </a-locale-provider>
                </li>
                <li>
                  <span>{{$t('issuer.cjhd.hdyq')}}：</span>
                  <p>{{requirdContent}}</p>
                </li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" :tab="$t('issuer.cjhd.zzxx')">
            <div>
                <a-collapse accordion activeKey="1" :bordered="false">
                          <a-collapse-panel :key="index" v-for="(item, index) in dataNameArrty">
                            <h5 slot="header" class="panel-title" >
                              {{item.ss_kind}}
                              <span>（ {{item.cnt}} ）</span>
                            </h5>
                            <div>
                                    
                              <div class="my-tables">
                                <a-locale-provider :locale="locale">
                                  <a-table :columns="columns3" :dataSource="filterItems(dataName,item.ss_id)" @change="pageNext" size="middle"></a-table>
                                </a-locale-provider>
                              </div>
                            </div>
                            
                          </a-collapse-panel>
                </a-collapse>
              </div>
            <!--<div class="my-tables">
              <h3>
                非冠名赞助
                <span>（ {{dataNoName.length}} ）</span>
              </h3>
              <a-table :columns="columns3" :dataSource="dataNoName" size="middle"></a-table>
            </div>
            <div class="my-tables">
              <h3>
                其他赞助
                <span>（ {{dataOther.length}} ）</span>
              </h3>
              <a-table :columns="columns3" :dataSource="dataOther" size="middle"></a-table>
            </div>-->
          </a-tab-pane>
          <a-tab-pane key="3" :tab="$t('issuer.cjhd.mxxx')">
            <div class="my-tables">
              <a-locale-provider :locale="locale">
              <a-table :columns="columns4" :dataSource="starList" size="middle"></a-table>
               </a-locale-provider>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
#details {
  margin: -24px -24px 0;
  .details-content {
    padding: 0 30px 20px;
    margin-top: 20px;
    .details-header {
      margin: 0 0 20px;
      .ant-card-bordered {
        border: 0;
      }
      .secetion {
        padding: 20px 0;
      }
    }
    .details-main {
      background-color: #fff;
      padding: 20px;
      .my-item-list {
        padding: 32px;
        margin: 0 32px;
        width: 80%;
        border-top: 1px solid #ccc;
        h3 {
          font-size: 16px;
          color: #333;
          margin-bottom: 24px;
        }
        ul {
          padding: 0;
          li {
            display: flex;
            align-items: flex-start;
            margin: 20px 0;
            .my-table {
              width: 70%;
            }
            span {
              min-width: 70px;
              margin-right: 20px;
            }
            p {
              margin: 0;
            }
            img {
              border: 1px solid #ccc;
              border-radius: 5px;
              width: 200px;
              height: 150px;
              margin-right: 20px;
            }
          }
        }
      }
      .my-item {
        width: 50%;
        display: flex;
        justify-content: center;
      }
      .my-item-1 {
        margin-left: 50px;
        display: flex;

        img {
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 300px;
          height: 150px;
        }
      }
      .my-tables {
        padding: 30px 40px 0;
        h3 {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
<script>
import glTitle from '@/components/glTitle1/glTitle1'
import DetailList from '@/components/tools/DetailList'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
import {
  getCheckActivitiesDetail,
  getExtension,
  getPress,
  getActivityInformation,
  getSponsor,
  getStarsDeails,
  getApprovalList,
  getMineSupport
} from '@api/hand'
import imgUrl from '@/assets/a1.jpg'

import { mixinsTitle } from '@/utils/mixin.js'
import i18n from '@/lang/index'
const DetailListItem = DetailList.Item
const columns = [
  {
    title: i18n.t('issuer.cjhd.dq'),
    dataIndex: 'area_name'
  },
  {
    title: i18n.t('issuer.cjhd.xx'),
    dataIndex: 'addr'
  }
]
const columns1 = [
  {
    title: i18n.t('issuer.cjhd.mainContractor'),
    dataIndex: 'work_name'
  },
  {
    title: i18n.t('issuer.cjhd.mc'),
    dataIndex: 'name'
  }
]
const columns2 = [
  {
    title: i18n.t('issuer.cjhd.tgxs'),
    dataIndex: 'ss_kind'
  },
  {
    title: i18n.t('issuer.cjhd.zzxs'),
    dataIndex: 'sponsorship'
  },
  {
    title: i18n.t('issuer.cjhd.zzje'),
    dataIndex: 'money'
  },
  {
    title: i18n.t('issuer.cjhd.zzme'),
    dataIndex: 'num'
  },
  {
    title: i18n.t('issuer.cjhd.bz'),
    dataIndex: 'bz'
  }
]
const data = [
  {
    key: '1',
    address: '香港',
    desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场'
  },
  {
    key: '2',
    address: '深圳',
    desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场'
  },
  {
    key: '3',
    address: '广州',
    desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场'
  }
]
const data1 = [
  {
    key: '1',
    name: '主办方',
    desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场'
  },
  {
    key: '2',
    name: '承办方',
    desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场'
  },
  {
    key: '3',
    name: '协办方',
    desc: '南关区 长春市南关区亚泰大街与自由大路交会处 体育场'
  }
]
const data2 = [
  {
    key: '1',
    tgWay: '冠名赞助',
    zzWay: '现金+实物',
    zzprice: '1000万',
    zzNum: '10名',
    remarks: '宽城区万达广场3楼某某某'
  },
  {
    key: '2',
    tgWay: '冠名赞助',
    zzWay: '现金+实物',
    zzprice: '1000万',
    zzNum: '10名',
    remarks: '宽城区万达广场3楼某某某'
  }
]
const columns3 = [
  {
    title: i18n.t('issuer.cjhd.xh'),
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: i18n.t('issuer.cjhd.zzgsmc'),
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: i18n.t('issuer.cjhd.zzxs'),
    dataIndex: 'sponsorship',
    align: 'center'
  },

  {
    title: i18n.t('issuer.cjhd.xjzz'),
    dataIndex: 'cash',
    align: 'center'
  },
  {
    title: i18n.t('issuer.cjhd.swzz'),
    dataIndex: 'productVal',
    align: 'center'
  },
  {
    title: i18n.t('issuer.cjhd.zzze'),
    dataIndex: 'tolMoney',
    align: 'center'
  },
  {
    title: i18n.t('issuer.cjhd.yfkje'),
    dataIndex: 'paid',
    align: 'center'
  }
]
const columns4 = [
  {
    title: i18n.t('issuer.cjhd.xm'),
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: i18n.t('issuer.cjhd.ccfy'),
    dataIndex: 'cost',
    align: 'center'
  },
  {
    title: i18n.t('issuer.accountInfo.contact'),
    dataIndex: 'contact',
    align: 'center'
  },
  {
    title: i18n.t('issuer.accountInfo.telphone'),
    dataIndex: 'phone',
    align: 'center'
  },
  {
    title: i18n.t('issuer.accountInfo.email'),
    dataIndex: 'email',
    align: 'center'
  },
  {
    title: i18n.t('issuer.accountInfo.companyTitle'),
    dataIndex: 'company',
    align: 'center'
  }
]
export default {
  mixins: [mixinsTitle],
  components: {
    glTitle,
    DetailList,
    DetailListItem
  },
  data() {
    return {
      locale: lang[localStorage.getItem('lang')],
      lists: [
        {
          title: '形式1',
          list: [{ cash: 6000 ,tolMoney:630000}]
        },
        {
          title: '形式2',
          list: [{ cash: 3000, tolMoney:630000}]
        }
      ],
      activitiesList: '',
      starAvatar: [],
      sponsorList: [],
      logo: '',
      current: 0,
      status: '',
      starList: [],
      detailsImgs: [],
      dataName: [],
      dataNameArrty: [],
      dataNoName: [],
      dataOther: [],
      name: '',
      start: '',
      adress: [],
      capName: '',
      campNum: '',
      price: '',
      email: '',
      enName: '',
      contact: '',
      phone: '',
      data: [],
      columns,
      data1: [],
      columns1,
      data2: [],
      columns2,
      columns3,
      columns4,
      imgUrl,
      btnShow: -1,
      activityContent: '',
      detailImgs: '',
      videoUrls: '',
      palyPlatfrom: '',
      selectedTags: [],
      selectedTags1: [],
      companyList1: '',
      closingDate: '',
      requirdContent: '',
      dataTable: ''
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
  mounted(){
      this._getCheckActivitiesDetail()
      this._getPress()
      this._getActivityInformation()
      this._getSponsor()
      this._getStarsDeails()
      //this._getApprovalList()
      this._getExtension()
      this._getMineSupport()
      console.log(11)
  },
  methods: {
    filterItems(a,b){
      return a.filter(item=>{
        return item.ss_id == b
      }) 
    },
    pageNext(pagination, filters, sorte) {
      console.log(pagination, filters, sorte)
    },
    _getMineSupport() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId,
        internationalization: localStorage.lang
      }
      console.log(params)
      getMineSupport(params).then(res => {
        console.log(res)
        let key = 'key'
        this.dataNameArrty = res.data.campSponsorAllList
        this.dataName = res.data.campSponsorList
        console.log(this.dataName.length)
        this.dataName.map((item, index) => {
          item[key] = index + 1
        })
      })
    },
    _getActivityInformation() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId,
        internationalization: localStorage.lang
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
        this.imgUrl =activityDetail.cover_img ? activityDetail.cover_img : ''
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
    _getStarsDeails() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      getStarsDeails(params).then(res => {
        console.log(res)
        this.starList = res.data.length ? res.data : []
      })
    },
    _getSponsor() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      getSponsor(params).then(res => {
        console.log(res)
        this.data2 = res.data.length ? res.data : []
        console.log(this.data2)
        this.closingDate = res.endTime
        this.requirdContent = res.demand
        const dataArrty = res.data
      })
    },
    _getPress() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      getPress(params).then(res => {
        console.log(res)
        this.current = res.data.schedule
      })
    },
    _getCheckActivitiesDetail() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      getCheckActivitiesDetail(params).then(res => {
        console.log(res)
        this.activityContent = res.data.list[0].content
        console.log(this.activityContent)
        this.videoUrls = res.data.list[0].video ? res.data.list[0].video : ''
        const detailsArrty = []
        for (let i = 0; i < res.data.listCampAtt.length; i++) {
          if (!res.data.listCampAtt.length == 0) {
            detailsArrty.push(res.data.listCampAtt[i].location)
          }
        }
        this.detailsImgs = detailsArrty
      })
    },
    _getExtension() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      console.log(params)
      getExtension(params).then(res => {
        console.log(res)
        this.data1 = res.data ? res.data : []
        console.log(this.data1)
        this.palyPlatfrom = res.platform
        const selectArry = res.audiencesName ? res.audiencesName.split(',') : []
        const selectArry1 = res.campFeatureName ? res.campFeatureName.split(',') : []
        console.log(selectArry)
        const tagList = []
        const tagList1 = []
        for (let i = 0; i < selectArry.length; i++) {
          if(selectArry.length !==0) {
            tagList.push(selectArry[i])
          }
         
        }
        for (let i = 0; i < selectArry1.length; i++) {
          if(selectArry1.length !== 0) {
            tagList1.push(selectArry1[i])
          }
         
        }
         this.selectedTags = tagList
         this.selectedTags1 = tagList1
      })
    }
  }
}
</script>
