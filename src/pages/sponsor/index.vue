
<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}，<span class="welcome-text">欢迎来到 Sponsor Cube 管理平台</span></div>
      <div>赞助商</div>
    </div>
    <div id="home">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="赞助详情" :bordered="false" class="my-cards">
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
                          <span>{{sponsorTotal}}</span>
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
                          <span>{{agentTotal}}</span>
                        </div>
                    </a-col>
                  </a-row>
              </div>
            </div>
          </a-card>
          <a-card title="活动动态" class="my-activity">
            <a-table :columns="operationColumns" :dataSource="operation1" :pagination="false">
              
            </a-table>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          
          <a-card class="project-list" :loading="loading" style="margin-bottom: 24px;" :bordered="false" title="我的消息" :body-style="{ padding: 0 }">
            <a slot="extra" @click="$router.push({name:'tzxx'})">全部消息</a>
            <p style="color: #ccc;text-align: center; padding: 10px 0; margin: 0" v-if="projects.length == 0">暂无信息</p>
            <div v-else>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
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
                    <span class="datetime">{{ item.createtime }}</span>
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
import { mapGetters } from 'vuex'
import { headMsg,piesData } from '@/api/common'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components'


const sourceData = [
  { item: '现金', count: null },
  { item: '实物', count: null },
  
]
const sourceData1 = [
  { item: '未付', count: null },
  { item: '已付', count: null },
  
]
const DataSet = require('@antv/data-set')
const dv = new DataSet.View().source(sourceData)
const dv1 = new DataSet.View().source(sourceData1)

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]
const pieData = dv.rows
const pieData1 = dv1.rows
export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      pieData,
      pieData1,
      sourceData,
      sourceData1,
      sponsorTotal:'',
      agentTotal:'',
      c:["item", ["#4275FC","#41BDFD",]],
      c1:["item", ["#F56367","#FFB535",]],
      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],
      pieScale,
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
          title: '编号',
          dataIndex: 'number',
          key: 'number'
        },
        {
          title: '活动名称',
          dataIndex: 'name',
          key: 'name'
        },
        
        {
          title: '推广形式',
          dataIndex: 'tgxs',
          key: 'tgxs'
        },
        {
          title: '赞助形式',
          dataIndex: 'zzxs',
          key: 'zzxs'
        },
        {
          title: '现金资助',
          dataIndex: 'xjzz',
          key: 'xjzz'
        },
        {
          title: '实物赞助',
          dataIndex: 'swzz',
          key: 'swzz'
        },
        {
          title: '赞助金额',
          dataIndex: 'zzje',
          key: 'zzje'
        },
        {
          title: '已付款',
          dataIndex: 'yfk',
          key: 'yfk'
        },
        
      ],
      operation1: [
            {
                  key: '1',
                  number: '01',
                  name: '篮球比赛',
                  tgxs: '冠名',
                  zzxs: '现金+实物',
                  xjzz: '1000',
                  swzz: '30 * 衣服',
                  zzje: '1000',
                  yfk: '1000',
            },
            {
                  key: '2',
                  number: '02',
                  name: '篮球比赛',
                  tgxs: '冠名',
                  zzxs: '现金+实物',
                  xjzz: '1000',
                  swzz: '30 * 衣服',
                  zzje: '1000',
                  yfk: '1000',
            },
            {
                  key: '3',
                  number: '03',
                  name: '篮球比赛',
                  tgxs: '冠名',
                  zzxs: '现金+实物',
                  xjzz: '1000',
                  swzz: '30 * 衣服',
                  zzje: '1000',
                  yfk: '1000',
            },
            {
                  key: '4',
                  number: '04',
                  name: '篮球比赛',
                  tgxs: '冠名',
                  zzxs: '现金+实物',
                  xjzz: '1000',
                  swzz: '30 * 衣服',
                  zzje: '1000',
                  yfk: '1000',
            },
      ],
      
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.$store.getters.avatar
    console.log(this.avatar)
    
  },
  mounted () {
    this.getHeadMsg();
    this.getPiesData()
  },
  methods: {
    ...mapGetters(['nickname', 'welcome']),
    getHeadMsg(){
      headMsg().then(res => {
        if(res.code == 1000){
          this.projects = res.data
          this.loading = false
        }
      })
    },
    getPiesData(){
      piesData().then(res=>{
        if (res.code == 1000) {
          console.log(res)
          this.pieData[0].count= res.data.money;
          this.pieData[1].count= res.data.goods;
          this.pieData1[0].count= res.data.unpaid;
          this.pieData1[1].count= res.data.paid;
          this.sponsorTotal = res.data.sponsorTotal;
          this.agentTotal = res.data.agentTotal
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
    }
  },
  filters: {
    
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
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>
