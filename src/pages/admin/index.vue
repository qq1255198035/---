
<template>
  <page-view :title="false" :avatarshow="true">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{user}}，<span class="welcome-text">{{$t('header.HeadMenu.welcome')}} Sponsor Cube {{$t('header.HeadMenu.platform')}}</span></div>
      <div>{{$t('header.HeadMenu.glyyh')}}</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="6">
          <head-info :title="$t('admin.gsdsp')" :content="tohand" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="6">
          <head-info :title="$t('admin.jxsdsp')" :content="sponsor" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="6">
          <head-info :title="$t('admin.jjrdsp')" :content="agent" :center="false" />
        </a-col>
        <a-col :span="6">
          <head-info :title="$t('admin.mxdsp')" :content="star" :center="false" />
        </a-col>
      </a-row>
    </div>
    <div id="adminIndex">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :title="$t('issuer.index.hddt')" class="my-activity">
            <a-table :columns="operationColumns" :dataSource="operation1" :pagination="false" :loading="tableLoading">
              <template slot="status" slot-scope="status">
                <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
              </template>
            </a-table>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          
          <a-card class="project-list" :loading="loading" style="margin-bottom: 24px;" :bordered="false" :title="$t('issuer.index.wdxx')" :body-style="{ padding: 0 }">
            <a slot="extra" @click="$router.push({name:'admintzxx'})">{{$t('issuer.index.qbxx')}}</a>
            <p style="color: #ccc;text-align: center; padding: 10px 0; margin: 0" v-if="infoList.length == 0">{{$t('issuer.index.noData')}}</p>
            <div v-else>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in infoList" >
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
import { headMsg } from '@/api/common'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components'
import { searchCampList,rightInfo } from '@/api/admin'
import { userInfo } from "@/api/common";
import i18n from '@/lang/index'
const statusMap = {
      0: {
            status: 'processing',
            text: i18n.t('issuer.index.pending')
      },
      20: {
            status: 'success',
            text: i18n.t('issuer.index.passed')
      },
      30: {
            status: 'error',
            text: i18n.t('issuer.hdgl.bh')
      },
}
export default {
  
  components: {
    PageView,
    HeadInfo,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: '',
      infoList:[],
      loading: false,
      radarLoading: true,
      tableLoading: true,
      activities: [],
      teams: [],
      operationColumns: [
         {
                title: this.$t('issuer.cjhd.xh'),
                dataIndex: 'key',
                width: 60
                
          },
          {
                title: this.$t('issuer.index.eventName'),
                dataIndex: 'name'
          },
          {
                title: this.$t('admin.hdlx'),
                dataIndex: 'campCatalogVal',
                width: 100
          },
          {
                title: this.$t('issuer.index.status'),
                dataIndex: 'status',
                scopedSlots: { customRender: 'status' },
                width: 100
          },
          {
                title: this.$t('admin.ms'),
                dataIndex: 'content',
          },
      ],
      operation1: [],
      sponsor:'',
      agent:'',
      tohand:'',
      star:''
    }
  },
  computed: {
    
  },
  created () {
  
  },
  mounted () {
    //this.getHeadMsg();
    this.getSearchCampList('',1);
    this.getRightInfo();
    this.getUserInfo()
  },
  methods: {
    
    getHeadMsg(){
      headMsg().then(res => {
        if(res.code == 1000){
          this.infoList = res.data
          this.loading = false
        }
      })
    },
    getSearchCampList(key,page){
      searchCampList(key,page).then(res => {
        if(res.code == 1000){
          this.tableLoading = false;
          let key = 'key'
          console.log(res.page.rows)
          this.operation1 = res.page.rows
          this.operation1.map((item,index)=>{
            item[key] = index +1;
          })
        }
      })
    },
    getRightInfo(){
      rightInfo().then(res=>{
        console.log(res)
        this.sponsor = res.statistics.sponsor.toString();
        this.agent = res.statistics.agent.toString();
        this.tohand = res.statistics.tohand.toString();
        this.star = res.statistics.star.toString()
      })
    },
    getUserInfo(id){
      userInfo(id).then(res=>{
        if (res.code == 1000) {
            console.log(res);
            this.user = res.data.email;
            this.avatar = res.data.avatar;
          }
        })
      }
    },
  filters: {
    statusFilter (type) {
          return statusMap[type].text
    },
    statusTypeFilter (type) {
          return statusMap[type].status
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
	margin: 24px;
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
