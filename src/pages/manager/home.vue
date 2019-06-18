
<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}，<span class="welcome-text">欢迎来到 Sponsor Cube 管理平台</span></div>
      <div>经纪人</div>
    </div>
    <div id="myhome">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="赞助详情" :bordered="false" class="my-cards">
            <div class="item-boxes">
              <div class="item-row">
                  <a-row>
                    
                    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" class="item-box">
                      <v-chart :height="300" :data="pieData1" :scale="pieScale">
                        <v-legend dataKey="item" position="right" :offsetX="-50" :offsetY="-35" :useHtml="true" :itemTpl="itemTpl"/>
                        <v-tooltip :showTitle="false" dataKey="item*percent" />
                        <v-axis />
                        <v-pie position="percent" :color="c1" :vStyle="pieStyle" />
                        <v-coord type="theta" :radius="0.75" :innerRadius="0.3" />
                      </v-chart>
                      <div class="calc-price">
                          总计：￥
                          <span>10000</span>
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
            <a slot="extra">全部消息</a>
            <div>
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
import { mapActions } from 'vuex'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components'
import { headMsg } from '@/api/common'
const sourceData1 = [
  { item: '未付', count: 60 },
  { item: '已付', count: 10 },
  
]
const DataSet = require('@antv/data-set')
const dv1 = new DataSet.View().source(sourceData1)
dv1.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
})
const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

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
      pieData1,
      sourceData1,
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
          title: '参与明星',
          dataIndex: 'cymx',
          key: 'cymx',
          
        },
        {
          title: '活动时间',
          dataIndex: 'hdss',
          key: 'hdss'
        },
        {
          title: '出厂总额',
          dataIndex: 'ccze',
          key: 'ccze'
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
                  name: '篮球',
                  cymx: '姚明',
                  hdss: '2016-09-21  08:50:08',
                  ccze: '2.00',
                  yfk: '1000',
            },
            {
                  key: '2',
                  number: '01',
                  name: '篮球',
                  cymx: '姚明',
                  hdss: '2016-09-21  08:50:08',
                  ccze: '2.00',
                  yfk: '1000',
            },
            {
                  key: '3',
                  number: '01',
                  name: '篮球',
                  cymx: '姚明',
                  hdss: '2016-09-21  08:50:08',
                  ccze: '2.00',
                  yfk: '1000',
            },
            {
                  key: '4',
                  number: '01',
                  name: '篮球',
                  cymx: '姚明',
                  hdss: '2016-09-21  08:50:08',
                  ccze: '2.00',
                  yfk: '1000',
            },
            {
                  key: '5',
                  number: '01',
                  name: '篮球',
                  cymx: '姚明',
                  hdss: '2016-09-21  08:50:08',
                  ccze: '2.00',
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
    this.avatar = this.userInfo.avatar

    
  },
  mounted () {
    this.getHeadMsg()
    // this.conlog();
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
#myhome{
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
          .calc-price{
            position: absolute;
            bottom: 80px;
            left: 86px;
            font-size: 16px;
            color: #FEBF56;
            width: 100%;
            span{
              font-size: 24px;
              font-weight: bold;
              color: #F5797D;
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
