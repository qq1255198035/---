<template>
  <div id="zzgl">
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
    <div class="zzgl-content">
      <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
        <a-tab-pane key="1" :tab="$t('issuer.hdgl.sponsorApproval')">
          <div >
            <a-collapse accordion activeKey="1" v-if="cardItemData1.length" :bordered="false">
              <a-collapse-panel   v-for="(item, index) in cardItemData1" :key="index">
                <h5 slot="header" class="panel-title" v-if="cardItemData1.length !== 0">
                  {{item.ss_kind}}
                  <span>
                    （
                    <i>{{item.cnt}}</i> /{{item.num}} ）
                  </span>
                  <a-tag color="#f50">{{item.noCnt}}</a-tag>
                </h5>
                
                
                <div class="my-cards">
                  <template v-for="y in cardItemData">
                        <template v-if="item.ss_id == y.ss_id">
                              <div
                                  class="card-item ant-card-hoverable"
                                  @mouseenter="btnShow = index"
                                  @mouseleave="btnShow = -1"
                                  v-for="(k,index) in cardItemData"
                                  :key="index"
                                >
                                <div class="title">
                                  <a-avatar
                                    :size="60"
                                    :src="logo"
                                    class="user-img"
                                  />
                                  <span>{{k.company}}</span>
                                </div>
                                <div class="content">
                                  <p>{{$t('issuer.cjhd.zzje')}}：{{k.tolMoney}}</p>
                                  <div class="my-charts">
                                    <v-chart :height="300" :data="pieData" :scale="pieScale">
                                      <v-legend
                                        data-key="item"
                                        :useHtml="true"
                                        :itemTpl="itemTpl"
                                        position="right"
                                        :offsetX="-50"
                                        :offsetY="-35"
                                      />
                                      <v-tooltip :showTitle="false" data-key="item*percent"/>
                                      <v-axis/>
                                      <v-pie position="percent" :color="c" :vStyle="pieStyle"/>
                                      <v-coord type="theta" :radius="0.75" :innerRadius="0.3"/>
                                    </v-chart>
                                  </div>
                                </div>
                                <div class="footer">
                                  <p>{{$t('issuer.accountInfo.contact')}}: {{ k.contact}}</p>
                                  <p>{{$t('issuer.accountInfo.telphone')}}：{{k.phone}}</p>
                                  <p>{{$t('issuer.accountInfo.email')}}：{{k.email}}</p>
                                  <p>{{$t('issuer.cjhd.bz')}}：{{k.bz}}</p>
                                  <div class="calc-price">
                                      {{$t('issuer.index.totalPrice')}}：￥
                                      <span>{{k.tolMoney}}</span>
                                    </div>
                                  <transition name="fade">
                                    <div class="button-box" v-show="btnShow == index" key="1">
                                      <a-button type="danger" class="danger" @click="showModal(k, index)">{{$t('issuer.hdgl.bh')}}</a-button>
                                      <a-button
                                        type="primary"
                                        class="primary"
                                        @click="success(k)"
                                        :loading="loading"
                                      >{{$t('issuer.hdgl.tg')}}</a-button>
                                    </div>
                                  </transition>
                                </div>
                              </div>
                        </template>
                  </template>
                  
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('issuer.cjhd.wdzz')">
         
                <div>
                <a-collapse accordion activeKey="1" :bordered="false">
                          <a-collapse-panel :key="index" v-for="(item, index) in dataForm">
                            <h5 slot="header" class="panel-title" >
                              {{item.ss_kind}}
                              <span>（ {{item.cnt}} ）</span>
                            </h5>
                            <div>
                                    
                              <div class="my-tables">
                                <a-locale-provider :locale="locale">
                                  <a-table :columns="columns" :dataSource="filterItems(dataList,item.ss_id)" @change="pageNext" size="middle"></a-table>
                                </a-locale-provider>
                              </div>
                            </div>
                            
                          </a-collapse-panel>
                </a-collapse>
              </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-locale-provider :locale="locale">
    <a-modal
      title
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form-item :label="$t('issuer.hdgl.yy')">
        <a-textarea placeholder="input placeholder" :autosize="{ minRows: 4 }" v-model="baseText"/>
      </a-form-item>
    </a-modal>
    </a-locale-provider>
  </div>
</template>
<style lang="less" scoped>
.calc-price{
  text-align: center
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
#zzgl {
  margin: -24px -24px 0;
  .zzgl-content {
    background-color: #fff;
    padding: 20px;
    margin: 20px;
    .my-icon {
      font-size: 24px;
    }
    .panel-title {
      font-size: 18px;
      font-weight: normal;
      color: #333;
      margin: 15px 0;
      span {
        i {
          color: #f50;
        }
      }
    }
    .card-avatar {
      width: 48px;
      height: 48px;
      border-radius: 48px;
    }
    .ant-card-actions {
      background: #f7f9fa;
      li {
        float: left;
        text-align: center;
        margin: 12px 0;
        color: rgba(0, 0, 0, 0.45);
        width: 50%;
        &:not(:last-child) {
          border-right: 1px solid #e8e8e8;
        }
        a {
          color: rgba(0, 0, 0, 0.45);
          line-height: 22px;
          display: inline-block;
          width: 100%;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
    .my-cards {
      display: flex;
      //justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 0 50px;
      .card-item {
        width: 22%;
        margin: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 0 20px;
        height: 500px;

        .title {
          display: flex;
          align-items: center;
          padding: 10px 0;
          .user-img {
            border: 1px solid #ccc;
          }
          span {
            font-size: 14px;
            color: #333;
            margin-right: 5px;
          }
        }
        .content {
          position: relative;

          padding: 20px 0;
          height: 230px;
          border-bottom: 1px solid #ccc;
          .my-charts {
            overflow: hidden;
            position: absolute;
            right: 0;
            top: 10px;
          }
        }
        .footer {
          padding: 10px 0;
          p {
            margin: 3px;
          }

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
    .my-tables {
      .table-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h6 {
          text-align: center;
          width: 107px;

          margin: 0;
        }
        .total-price {
          display: flex;
          align-items: center;
          span {
            width: 176px;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
<script>
import glTitle from '@/components/glTitle1/glTitle1'
import { getApprovalList, getMineSupport, getApproval, getActivityInformation } from '@api/hand'
import { mixinsTitle } from '@/utils/mixin.js'
import { PageView } from '@/layouts'
import i18n from '@/lang/index'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
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
const DataSet = require('@antv/data-set')
let dv = new DataSet.View().source(sourceData)
let pieData = dv.rows
const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]

const columns = [
  
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
const data = []
export default {
  components: {
    glTitle
  },
  mixins: [mixinsTitle],
  data() {
    return {
      locale: lang[localStorage.getItem('lang')],
      btnShow: -1,
      logo: [],
      current: 1,
      data,
      columns,
      logo: '',
      name: '',
      start: '',
      capName: '',
      campNum: '',
      starList: [],
      status: '',
      price: '',
      adress: [],
      dataForm: [],
      status: '',
      visible: false,
      confirmLoading: false,
      loading: false,
      cardItemData: [],
      cardItemData1: [],
      cardItemData2: [],
      starAvatar: [],
      sponsorList: [],
      dataList: [],
      dataList1: [],
      dataList2: [],
      data2: [],
      baseText: '',
      orderId: '',
      length: '',
      length1: '',
      length2: '',
      
      pieData,
      sourceData,
      pieScale,
      c: ['item', ['#FBD437', '#F2637B']],
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
          ' style="cursor: pointer;font-size: 14px;min-width: 180px">' +
          '<td style="border: none;padding:0; color:{color};min-width: 50px;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
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
          ' style="cursor: pointer;font-size: 14px;">' +
          '<td width=150 style="border: none;padding:0; color:{color};"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
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
      itemTpl2: (value, color, checked, index) => {
        const obj = dv2.rows[index]
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
          ' style="cursor: pointer;font-size: 14px;">' +
          '<td width=150 style="border: none;padding:0; color:{color};"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
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
      }
    }
  },
  comments: {
    PageView
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
        this._getApprovalList()
    this._getMineSupport()
    this._getActivityInformation()
  },
  methods: {
    filterItems(a,b){
      return a.filter(item=>{
        return item.ss_id == b
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
        console.log(avatarArrty)
        this.starAvatar = avatarArrty
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
    // 赞助审批列表
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
        const logoList = []
        for (let i = 0;i<res.data.campInputSponsorList.length; i++) {
          if(!res.data.campInputSponsorList.length == 0) {
            logoList.push(res.data.campInputSponsorList[i].logo)
          }
        }
        this.logo = logoList
        this.cardItemData = res.data.campInputSponsorList
        this.cardItemData1 = res.data.campSponsorAllList
        console.log(this.cardItemData2)
        this.length = this.cardItemData.length
        for (let i = 0; i < this.cardItemData.length; i++) {
          this.pieData[0].count = parseInt(this.cardItemData[i].cash)
          this.pieData[1].count = parseInt(this.cardItemData[i].productVal)
          dv.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
          })
        }
       
      })
    },
    // 我的赞助
    _getMineSupport() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        campId: campId,
        internationalization: localStorage.lang
      }
      getMineSupport(params).then(res => {
        console.log(res)
        let key = 'key'
        this.loading = false;
        this.dataForm = res.data.campSponsorAllList
        this.dataList = res.data.campSponsorList
        this.dataList.map((item,index)=>{
              item[key] = index + 1
        })
        console.log(this.dataList)
        
      })
    },
    pageNext(pagination, filters, sorte) {
      console.log(pagination, filters, sorte)
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    showModal(item, index) {
      console.log(item, index)
      this.orderId = item.orderId
      this.visible = true
    },
    handleOk(e) {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        orderId: this.orderId,
        agreement: 30,
        reject: this.baseText,
        internationalization: localStorage.lang
      }
      console.log(params)
      getApproval(params).then(res => {
        console.log(res)
        if(res.data.code == 1) {
          this._getApprovalList()
        this._getMineSupport()
          this.$notification.success({
          message: this.$t('issuer.hdgl.successNmae'),
          description: this.$t('issuer.hdgl.spcg')
        })
        }else {
          this.$notification['error']({
          message: this.$t('issuer.hdgl.sb'),
          description: this.$t('issuer.hdgl.spsb')
        })
        }
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
      console.log('Clicked cancel button')
      this.visible = false
    },
    success(item) {
      console.log(item)
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId
      const params = {
        token: token,
        orderId: item.orderId,
        agreement: 20,
        internationalization: localStorage.lang
      }
      console.log(params)
      getApproval(params).then(res => {
        console.log(res)
        if(res.data.code == 1) {
          this._getApprovalList()
        this._getMineSupport()
          this.$notification.success({
          message: this.$t('issuer.hdgl.successNmae'),
          description: this.$t('issuer.hdgl.tg')
        })
        }else {
          this.$notification['error']({
          message: this.$t('issuer.hdgl.sb'),
          description: this.$t('issuer.hdgl.wtg')
        })
        }
      })
      
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$message.success(this.$t('issuer.hdgl.czcg'))
      }, 2000)
    }
  }
}
</script>
