<template>
  <div id="details">
    <page-header :title="pageTitle"></page-header>
    <glTitle
      :logo="logo"
      :title="name"
      :start="start"
      :type="capName"
      :num="campNum"
      :stars="starAvatar"
      :sponsors="sponsorList"
      :status="status"
      :price="price"
      :adress="adress"
    ></glTitle>
    <div class="details-content">
      <div class="details-header">
        <a-card title="活动进度">
          <div class="secetion">
            <a-steps :current="current">
              <a-popover slot="progressDot" slot-scope="{index, status, prefixCls}">
                <template slot="content">
                  <span>step {{index}} status: {{status}}</span>
                </template>
                <span :class="`${prefixCls}-icon-dot`"></span>
              </a-popover>
              <a-step title="创建活动"/>
              <a-step title="平台审核"/>
              <a-step title="活动进行中"/>
              <a-step title="完成"/>
            </a-steps>
          </div>
        </a-card>
      </div>
      <div class="details-main">
        <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
          <a-tab-pane key="1" tab="活动信息">
            <a-card :bordered="false">
              <detail-list title="活动基本信息">
                <detail-list-item term="活动中文名称">{{name}}</detail-list-item>
                <detail-list-item term="活动分类">{{capName}}</detail-list-item>
                <detail-list-item term="参赛人数">{{campNum}}人</detail-list-item>
                <detail-list-item term="活动英文名称">{{enName}}</detail-list-item>
                <detail-list-item term="活动时间">{{start}}</detail-list-item>
                <detail-list-item term="联系人">{{contact}}</detail-list-item>
                <detail-list-item term="电子邮件">{{email}}</detail-list-item>
                <detail-list-item term="联系电话">{{phone}}</detail-list-item>
              </detail-list>
              <detail-list>
                <detail-list-item term="活动地区" class="my-item">
                  <a-table
                    :columns="columns"
                    :dataSource="data"
                    size="small"
                    :pagination="false"
                    class="my-table"
                  />
                </detail-list-item>
                <!--<detail-list-item term="活动封面" class="my-item-1">
                  <img :src="imgUrl" alt>
                </detail-list-item>-->
              </detail-list>
            </a-card>
            <div class="my-item-list">
              <h3>活动详情</h3>
              <ul>
                <li>
                  <span>活动内容：</span>
                  <p>{{activityContent}}</p>
                </li>
                <li>
                  <span>活动视频：</span>
                  <video v-if="videoUrls" :src="videoUrls" controls width="200px" height="150px"></video>
                </li>
                <li>
                  <span>活动照片：</span>
                  <img v-for="item in detailsImgs" :src="item" :key="item" alt>
                </li>
              </ul>
            </div>
            <div class="my-item-list">
              <h3>活动推广</h3>
              <ul>
                <li>
                  <span>主办承办方：</span>
                  <a-table
                    :columns="columns1"
                    :dataSource="data1"
                    size="small"
                    :pagination="false"
                    class="my-table"
                  />
                </li>
                <li>
                  <span>受众群众：</span>
                  <div>
                    <a-tag color="pink" v-for="(item, index) in selectedTags1" :key="index">{{item}}</a-tag>
                  </div>
                </li>
                <li>
                  <span>活动特点：</span>
                  <div>
                    <a-tag color="orange" v-for="(item, index) in selectedTags" :key="index">{{item}}</a-tag>
                  </div>
                </li>
              </ul>
            </div>
            <div class="my-item-list">
              <h3>活动赞助</h3>
              <ul>
                <li>
                  <span>招商截止日期：</span>
                  <p>{{closingDate}}</p>
                </li>
                <li>
                  <span>赞助要求：</span>
                  <a-table
                    :columns="columns2"
                    :dataSource="data2"
                    size="small"
                    :pagination="false"
                    class="my-table"
                  />
                </li>
                <li>
                  <span>活动要求：</span>
                  <p>{{requirdContent}}</p>
                </li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="赞助信息">
            <div>
                <a-collapse accordion activeKey="1" :bordered="false">
                          <a-collapse-panel :key="index" v-for="(item, index) in dataNameArrty">
                            <h5 slot="header" class="panel-title" >
                              {{item.ss_kind}}
                              <span>（ {{item.cnt}} ）</span>
                            </h5>
                            <div>
                                    
                              <div class="my-tables">
                                  <a-table :columns="columns3" :dataSource="filterItems(dataName,item.ss_id)" @change="pageNext" size="middle"></a-table>
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
          <a-tab-pane key="3" tab="明星信息">
            <div class="my-tables">
              <a-table :columns="columns4" :dataSource="starList" size="middle"></a-table>
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
import {
  getCheckActivitiesDetail,
  getExtension,
  getPress,
  getActivityInformation,
  getSponsor,
  getStarsDeails,
  getApprovalList
} from '@api/hand'
import imgUrl from '@/assets/a1.jpg'

import { mixinsTitle } from '@/utils/mixin.js'
const DetailListItem = DetailList.Item
const columns = [
  {
    title: '地区',
    dataIndex: 'area_name'
  },
  {
    title: '详细',
    dataIndex: 'addr'
  }
]
const columns1 = [
  {
    title: '主办承办方',
    dataIndex: 'work_name'
  },
  {
    title: '名称',
    dataIndex: 'name'
  }
]
const columns2 = [
  {
    title: '推广形式',
    dataIndex: 'ss_kind'
  },
  {
    title: '赞助形式',
    dataIndex: 'sponsorship'
  },
  {
    title: '赞助金额',
    dataIndex: 'money'
  },
  {
    title: '赞助名额',
    dataIndex: 'num'
  },
  {
    title: '备注',
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
    title: '序号',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: '赞助公司名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '赞助形式',
    dataIndex: 'sponsorship',
    align: 'center'
  },

  {
    title: '现金赞助',
    dataIndex: 'cash',
    align: 'center'
  },
  {
    title: '实物赞助',
    dataIndex: 'productVal',
    align: 'center'
  },
  {
    title: '赞助总额',
    dataIndex: 'tolMoney',
    align: 'center'
  },
  {
    title: '已付款金额',
    dataIndex: 'paid',
    align: 'center'
  }
]
const columns4 = [
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '出厂费用',
    dataIndex: 'cost',
    align: 'center'
  },
  {
    title: '联系人',
    dataIndex: 'contact',
    align: 'center'
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    align: 'center'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center'
  },
  {
    title: '公司',
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
  
  mounted(){
      this._getCheckActivitiesDetail()
      this._getPress()
      this._getActivityInformation()
      this._getSponsor()
      this._getStarsDeails()
      this._getApprovalList()
      this._getExtension()
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
    _getApprovalList() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId
      }
      console.log(params)
      getApprovalList(params).then(res => {
        console.log(res)
        let key = 'key'
        this.dataNameArrty = res.data.campSponsorAllList
        this.dataName = res.data.campInputSponsorList
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
        campId: campId
      }
      console.log(params)
      getActivityInformation(params).then(res => {
        console.log(res)
        this.data = res.data.listLoc
        const avatarArrty = []
        for (let i = 0; i < res.data.starList.length; i++) {
          if (!res.data.starList.length == 0) {
            avatarArrty.push(this.$host + res.data.starList[i].avatar)
          }
        }
        const sponsorList = []
        for (let i = 0; i < res.data.sponsorList.length; i++) {
          if (!res.data.sponsorList.length == 0) {
            sponsorList.push(this.$host + res.data.sponsorList[i].logo)
          }
        }
        this.sponsorList = sponsorList
        console.log(this.sponsorList)
        
        this.starAvatar = avatarArrty
        console.log(this.starAvatar)
        let activityDetail = res.data.list[0]
        this.name = activityDetail.name
        this.start = activityDetail.createTime
        this.adress = res.data.listLoc
        this.capName = activityDetail.capName
        this.campNum = activityDetail.campNum
        this.price = res.data.amount
        this.email = activityDetail.email
        this.phone = activityDetail.phone
        this.enName = activityDetail.enName
        this.contact = activityDetail.contact
        this.imgUrl =activityDetail.cover_img ? this.$host + activityDetail.cover_img : ''
        this.logo = activityDetail.cover_img ? this.$host + activityDetail.cover_img : ''
        console.log(this.logo)
        console.log(this.campNum)
        if (activityDetail.status == 10) {
          this.status = '创建活动'
        }
        if (activityDetail.status == 0) {
          this.status = '平台审核'
        }
        if (activityDetail.status == 20) {
          this.status = '活动进行中'
        }
        if (activityDetail.status == 30) {
          this.status = '创建活动'
        }
        if (activityDetail.status == 50) {
          this.status = '活动完成'
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
        this.videoUrls = res.data.list[0].video ? this.$host + res.data.list[0].video : ''
        const detailsArrty = []
        for (let i = 0; i < res.data.listCampAtt.length; i++) {
          if (!res.data.listCampAtt.length == 0) {
            detailsArrty.push(this.$host + res.data.listCampAtt[i].location)
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
