<template>
  <div id="zzgl">
    <page-header :title="pageTitle"></page-header>
    <glTitle
      :logo="logo"
      :title="name"
      :start="start"
      :type="capName"
      :num="campNum"
      :stars="starList"
      :sponsors="data2"
      :status="status"
      :price="price"
      :adress="adress"
    ></glTitle>
    <div class="zzgl-content">
      <a-tabs defaultActiveKey="1" tabPosition="top" size="large">
        <a-tab-pane key="1" tab="赞助审批">
          <div>
            <a-collapse accordion activeKey="1" :bordered="false">
              <a-collapse-panel key="1">
                <h5 slot="header" class="panel-title">
                  冠名赞助
                  <span>
                    （
                    <i>1</i> / 2 ）
                  </span>
                  <a-tag color="#f50">{{length}}</a-tag>
                </h5>
                <div class="my-cards">
                  <div
                    class="card-item ant-card-hoverable"
                    @mouseenter="btnShow = index"
                    @mouseleave="btnShow = -1"
                    v-for="(item,index) in cardItemData"
                    :key="index"
                  >
                    <div class="title">
                      <a-avatar
                        :size="40"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        class="user-img"
                      />
                      <span>{{item.company}}</span>
                    </div>
                    <div class="content">
                      <p>赞助金额：</p>
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
                        <div class="calc-price">
                          总计：￥
                          <span>{{item.tolMoney}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="footer">
                      <p>联系人: {{ item.contact}}</p>
                      <p>联系电话：{{item.phone}}</p>
                      <p>邮箱：{{item.email}}</p>
                      <p>备注：{{item.bz}}</p>
                      <transition name="fade">
                        <div class="button-box" v-show="btnShow == index" key="1">
                          <a-button type="danger" class="danger" @click="showModal(item, index)">驳回</a-button>
                          <a-button
                            type="primary"
                            class="primary"
                            @click="success(item)"
                            :loading="loading"
                          >通过</a-button>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="2" :disabled="false" :bordered="false">
                <h5 slot="header" class="panel-title">
                  非冠名赞助
                  <span>
                    （
                    <i>1</i> / 2 ）
                  </span>
                  <a-tag color="#f50">{{length1}}</a-tag>
                </h5>
                <div class="my-cards">
                  <div
                    class="card-item ant-card-hoverable"
                    @mouseenter="btnShow = index"
                    @mouseleave="btnShow = -1"
                    v-for="(item,index) in cardItemData1"
                    :key="index"
                  >
                    <div class="title">
                      <a-avatar
                        :size="40"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        class="user-img"
                      />
                      <span>李宁体育用品有限公司</span>
                    </div>
                    <div class="content">
                      <p>赞助金额：</p>
                      <div class="my-charts">
                        <v-chart :height="320" :data="pieData1" :scale="pieScale">
                          <v-legend
                            data-key="item"
                            :useHtml="true"
                            :itemTpl="itemTpl1"
                            position="right"
                            :offsetX="-50"
                            :offsetY="-40"
                          />
                          <v-tooltip :showTitle="false" data-key="item*percent"/>
                          <v-axis/>
                          <!--<v-guide
                            :type="guideOpts.type"
                            :position="guideOpts.position"
                            :content="guideOpts.content"
                            :v-style="guideOpts.style"
                          />-->
                          <v-pie position="percent" :color="c" :vStyle="pieStyle"/>
                          <v-coord type="theta" :radius="0.75" :innerRadius="0.6"/>
                        </v-chart>
                      </div>
                    </div>
                    <div class="footer">
                      <p>联系人: {{ item.contact}}</p>
                      <p>联系电话：{{item.phone}}</p>
                      <p>邮箱：{{item.email}}</p>
                      <p>备注：{{item.bz}}</p>
                      <transition name="fade">
                        <div class="button-box" v-show="btnShow == index">
                          <a-button type="danger" class="danger" @click="showModal(item, index)">驳回</a-button>
                          <a-button
                            type="primary"
                            class="primary"
                            @click="success(item)"
                            :loading="loading"
                          >通过</a-button>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="3" :disabled="false" :bordered="false">
                <h5 slot="header" class="panel-title">
                  其他
                  <span>
                    （
                    <i>1</i> / 2 ）
                  </span>
                  <a-tag color="#f50">{{length2}}</a-tag>
                </h5>
                <div class="my-cards">
                  <div
                    class="card-item ant-card-hoverable"
                    @mouseenter="btnShow = index"
                    @mouseleave="btnShow = -1"
                    v-for="(item,index) in cardItemData2"
                    :key="index"
                  >
                    <div class="title">
                      <a-avatar
                        :size="40"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        class="user-img"
                      />
                      <span>李宁体育用品有限公司</span>
                    </div>
                    <div class="content">
                      <p>赞助金额：</p>
                      <div class="my-charts">
                        <v-chart :height="320" :data="pieData2" :scale="pieScale">
                          <v-legend
                            data-key="item"
                            :useHtml="true"
                            :itemTpl="itemTpl2"
                            position="right"
                            :offsetX="-50"
                            :offsetY="-40"
                          />
                          <v-tooltip :showTitle="false" data-key="item*percent"/>
                          <v-axis/>
                          <!--<v-guide
                            :type="guideOpts.type"
                            :position="guideOpts.position"
                            :content="guideOpts.content"
                            :v-style="guideOpts.style"
                          />-->
                          <v-pie position="percent" :color="c" :vStyle="pieStyle"/>
                          <v-coord type="theta" :radius="0.75" :innerRadius="0.6"/>
                        </v-chart>
                      </div>
                    </div>
                    <div class="footer">
                      <p>联系人: {{ item.contact}}</p>
                      <p>联系电话：{{item.phone}}</p>
                      <p>邮箱：{{item.email}}</p>
                      <p>备注：{{item.bz}}</p>
                      <transition name="fade">
                        <div class="button-box" v-show="btnShow == index">
                          <a-button type="danger" class="danger" @click="showModal(item, index)">驳回</a-button>
                          <a-button
                            type="primary"
                            class="primary"
                            @click="success(item)"
                            :loading="loading"
                          >通过</a-button>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="我的赞助">
          <div>
            <a-collapse accordion activeKey="1" :bordered="false">
              <a-collapse-panel key="1">
                <h5 slot="header" class="panel-title">
                  冠名赞助
                  <span>（ 2 ）</span>
                </h5>
                <div class="my-tables">
                  <a-table :columns="columns" :dataSource="dataList" @change="pageNext" size="middle"></a-table>
                </div>
              </a-collapse-panel>
              <a-collapse-panel key="2" :disabled="false" :bordered="false">
                <h5 slot="header" class="panel-title">
                  非冠名赞助
                  <span>（ 2 ）</span>
                </h5>
                <a-table :columns="columns" :dataSource="dataList1" size="middle"></a-table>
              </a-collapse-panel>
              <a-collapse-panel key="3" :disabled="false" :bordered="false">
                <h5 slot="header" class="panel-title">
                  其他
                  <span>（ 2 ）</span>
                </h5>
                <a-table :columns="columns" :dataSource="dataList2" size="middle"></a-table>
              </a-collapse-panel>
            </a-collapse>
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
      <a-form-item label="原因">
        <a-textarea placeholder="input placeholder" :autosize="{ minRows: 4 }" v-model="baseText"/>
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
      justify-content: space-between;
      flex-wrap: wrap;

      .card-item {
        width: 24%;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 0 20px;
        height: 455px;

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
let sourceData = [
  {
    item: '现金',
    count: null
  },
  {
    item: '实物',
    count: null
  }
]
let sourceData1 = [
  {
    item: '未付',
    count: null
  },
  {
    item: '已付',
    count: null
  }
]
let sourceData2 = [
  {
    item: '现金',
    count: null
  },
  {
    item: '实物',
    count: null
  }
]
/*const guideOpts = {
  type: 'text',
  position: ['50%', '50%'],
  content: '24001110 万',
  style: {
    lineHeight: '240px',
    fontSize: '20',
    fill: '#FF0000',
    textAlign: 'center'
  }
}*/
const DataSet = require('@antv/data-set')
let dv = new DataSet.View().source(sourceData)
let dv1 = new DataSet.View().source(sourceData1)
let dv2 = new DataSet.View().source(sourceData2)
let pieData = dv.rows
let pieData1 = dv1.rows
let pieData2 = dv2.rows
const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]

const columns = [
  {
    title: '编号',
    dataIndex: 'key',
    align: 'center'
  },
  {
    title: '赞助公司名称',
    dataIndex: 'company',
    align: 'center'
  },
  {
    title: '赞助形式',
    dataIndex: 'ssKind',
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
const data = []
export default {
  components: {
    glTitle
  },
  mixins: [mixinsTitle],
  data() {
    return {
      btnShow: -1,
      current: 1,
      data,
      columns,
      logo: '',
      name: '',
      start: '',
      capName: '',
      campNum: '',
      starList: [],
      sponsorList: [],
      status: '',
      price: '',
      adress: [],
      status: '',
      visible: false,
      confirmLoading: false,
      loading: false,
      cardItemData: [],
      cardItemData1: [],
      cardItemData2: [],
      dataList: [],
      dataList1: [],
      dataList2: [],
      data2: [],
      baseText: '',
      orderId: '',
      length: '',
      length1: '',
      length2: '',
      dataSource: [
        {
          title: '李宁体育用品有限公司',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          content:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
        },
        {
          title: '李宁体育用品有限公司',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          content:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
        },
        {
          title: '李宁体育用品有限公司',
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
          content:
            '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
        }
      ],
      pieData,
      pieData1,
      pieData2,
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
  activated() {
    this._getApprovalList()
    this._getMineSupport()
    this._getActivityInformation()
  },
  methods: {
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
        this.imgUrl = this.$host + activityDetail.cover_img
        this.logo = this.$host + activityDetail.cover_img
        console.log(this.campNum)
        if (activityDetail.status == 10) {
          this.status = '创建中'
        }
        if (activityDetail.status == 0) {
          this.status = '申请中'
        }
        if (activityDetail.status == 20) {
          this.status = '成功'
        }
        if (activityDetail.status == 30) {
          this.status = '驳回'
        }
        if (activityDetail.status == 50) {
          this.status = '关闭'
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
        this.cardItemData = res.data.namingCampSponsor
        this.cardItemData1 = res.data.noNamingCampSponsor
        this.cardItemData2 = res.data.otherCampSponsor
        console.log(this.cardItemData2)
        this.length = this.cardItemData.length
        console.log(this.cardItemData.length)
        this.length1 = this.cardItemData1.length
        this.length2 = this.cardItemData2.length
        for (let i = 0; i < this.cardItemData.length; i++) {
          this.pieData[0].count = this.cardItemData[i].cash
          this.pieData[1].count = this.cardItemData[i].productVal
          dv.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
          })
        }
        for (let i = 0; i < this.cardItemData1.length; i++) {
          this.pieData1[0].count = this.cardItemData1[i].cash
          this.pieData1[1].count = this.cardItemData1[i].productVal
          dv1.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
          })
        }
        for (let i = 0; i < this.cardItemData2.length; i++) {
          this.pieData2[0].count = this.cardItemData2[i].cash
          this.pieData2[1].count = this.cardItemData2[i].productVal
          dv2.transform({
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
        campId: campId
      }
      getMineSupport(params).then(res => {
        console.log(res)
        let key = 'key'
        this.loading = false;
        this.dataList = res.data.namingCampSponsor
        this.dataList.map((item,index)=>{
              item[key] = index
        })
        console.log(this.dataList)
        this.dataList1 = res.data.noNamingCampSponsor
        this.dataList1.map((item,index)=>{
              item[key] = index
        })
        this.dataList2 = res.data.otherCampSponsor
        this.dataList2.map((item,index)=>{
              item[key] = index
        })
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
        reject: this.baseText
      }
      console.log(params)
      getApproval(params).then(res => {
        console.log(res)
        if(res.data.code == 1) {
          this.$notification.success({
          message: '成功',
          description: '审批通过'
        })
        }else {
          this.$notification['error']({
          message: '失败',
          description: '审批失败'
        })
        }
        this._getApprovalList()
      })
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
        this.$message.success('操作成功')
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
        agreement: 20
      }
      console.log(params)
      getApproval(params).then(res => {
        console.log(res)
        if(res.data.code == 1) {
          this.$notification.success({
          message: '成功',
          description: '通过'
        })
        }else {
          this.$notification['error']({
          message: '失败',
          description: '未通过'
        })
        }
      })
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$message.success('操作成功')
      }, 2000)
    }
  }
}
</script>
