
<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}，<span class="welcome-text">欢迎来到 Sponsor Cube 管理平台</span></div>
      <div>管理员用户</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="6">
          <head-info title="搞手待审批" content="56" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="6">
          <head-info title="赞助商待审批" content="24" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="6">
          <head-info title="经纪人待审批" content="2,223" :center="false" />
        </a-col>
        <a-col :span="6">
          <head-info title="明星待审批" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>
    <div id="adminIndex">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <!-- <a-card :loading="loading" title="赞助详情" :bordered="false" class="my-cards">
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
                    </a-col>
                    <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24" class="item-box">
                      <v-chart :height="300" :data="pieData1" :scale="pieScale">
                        <v-legend dataKey="item" position="right" :offsetX="-50" :offsetY="-35" :useHtml="true" :itemTpl="itemTpl"/>
                        <v-tooltip :showTitle="false" dataKey="item*percent" />
                        <v-axis />
                        <v-pie position="percent" :color="c1" :vStyle="pieStyle" />
                        <v-coord type="theta" :radius="0.75" :innerRadius="0.3" />
                      </v-chart>
                    </a-col>
                  </a-row>
              </div>
            </div>
          </a-card> -->
          <a-card title="活动动态" class="my-activity">
            <a-table :columns="operationColumns" :dataSource="operation1" :pagination="false">
              <template slot="status" slot-scope="status">
                <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
              </template>
            </a-table>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <!-- <a-card title="" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 20}">
            <div class="item-group">
              <h6>Ready to publish your Campaign</h6>
              <p>Upgrade now to make your campaign public and start receiving application.</p>
              <a-button type="primary">发布活动</a-button>
            </div>
        </a-card> -->
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
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <span class="datetime">9小时前</span>
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

import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'
const sourceData = [
  { item: '现金', count: 32.2 },
  { item: '实物', count: 21 },
  
]
const sourceData1 = [
  { item: '未付', count: 60 },
  { item: '已付', count: 10 },
  
]
const DataSet = require('@antv/data-set')
const dv = new DataSet.View().source(sourceData)
const dv1 = new DataSet.View().source(sourceData1)
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
      
      // data
      
      
      operationColumns: [
        {
          title: '编号',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '活动名称',
          dataIndex: 'name',
          key: 'name'
        },
        
        {
          title: '开始时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt'
        },
        {
          title: '活动分类',
          dataIndex: 'remark',
          key: 'remark'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
      ],
      operation1: [
        {
          type: '01',
          name: '篮球比赛',
          key: 'op1',
          updatedAt: '2017-10-03  19:23:12',
          remark: '篮球',
          status: 'agree'
        },
        {
          type: '01',
          name: '篮球比赛',
          key: 'op2',
          updatedAt: '2017-10-03  19:23:12',
          remark: '篮球',
          status: 'reject'
        },
        {
          type: '01',
          name: '篮球比赛',
          key: 'op3',
          updatedAt: '2017-10-03  19:23:12',
          remark: '篮球',
          status: 'authen'
        },
        {
          type: '01',
          name: '篮球比赛',
          key: 'op4',
          updatedAt: '2017-10-03  19:23:12',
          remark: '篮球',
          status: 'agreeing'
        },
        {
          type: '01',
          name: '篮球比赛',
          key: 'op5',
          updatedAt: '2017-10-03  19:23:12',
          remark: '篮球',
          status: 'agree'
        }
        
        
        
        
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
    this.getProjects()
  },
  methods: {
    ...mapGetters(['nickname', 'welcome']),
    getProjects () {
      this.$http.get('/list/search/projects')
        .then(res => {
          this.projects = res.result && res.result.data
          this.loading = false
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
#adminIndex{
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
