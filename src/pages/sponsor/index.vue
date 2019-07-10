
<template>
  <page-view :avatar="avatar? avatar : ''" :title="false" :avatarshow="true">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ user }}，
        <span class="welcome-text">{{$t('header.HeadMenu.welcome')}} Sponsor Cube {{$t('header.HeadMenu.platform')}}</span>
      </div>
      <div>{{$t('mar.zzs')}}</div>
    </div>
    <div id="home">
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :title="$t('issuer.index.zzxq')" :bordered="false" class="my-cards">
            <div class="item-boxes">
              <div class="item-row">
                <a-row type="flex" justify="space-between">
                  <a-col
                    :xl="12"
                    :lg="12"
                    :md="12"
                    :sm="12"
                    :xs="12"
                    class="item-box"
                    v-if="nonum1"
                  >
                    <v-chart
                      :height="chartHeight"
                      :width="chartWidth"
                      :forceFit="chartBollean"
                      :data="pieData"
                      :scale="pieScale"
                    >
                      <v-legend
                        data-key="item"
                        :useHtml="true"
                        :itemTpl="itemTpl"
                        position="right"
                        :offsetX="offetX"
                        :offsetY="offetY"
                      />
                      <v-tooltip :showTitle="false" data-key="item*percent" />
                      <v-axis />
                      <v-pie position="percent" :color="c" :vStyle="pieStyle" />
                      <v-coord type="theta" :radius="0.75" :innerRadius="0.3" />
                    </v-chart>
                    <div class="calc-price">
                      {{$t('issuer.index.totalPrice')}}：￥
                      <span>{{sponsorTotal}}</span>
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
                    v-if="nonum2"
                  >
                    <v-chart
                      :height="chartHeight"
                      :width="chartWidth"
                      :forceFit="chartBollean"
                      :data="pieData1"
                      :scale="pieScale"
                    >
                      <v-legend
                        data-key="item"
                        position="right"
                        :offsetX="offetX"
                        :offsetY="offetY"
                        :useHtml="true"
                        :itemTpl="itemTpl1"
                      />
                      <v-tooltip :showTitle="false" data-key="item*percent" />
                      <v-axis />
                      <v-pie position="percent" :color="c1" :vStyle="pieStyle" />
                      <v-coord type="theta" :radius="0.75" :innerRadius="0.3" />
                    </v-chart>
                    <div class="calc-price">
                      {{$t('issuer.index.totalPrice')}}：￥
                      <span>{{agentTotal}}</span>
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
            <a-table :columns="operationColumns" :dataSource="operation1" :pagination="false"></a-table>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            :title="$t('issuer.index.wdxx')"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra" @click="$router.push({name:'tzxx'})">{{$t('issuer.index.qbxx')}}</a>
            <p
              style="color: #ccc;text-align: center; padding: 10px 0; margin: 0"
              v-if="projects.length == 0"
            >{{$t('issuer.index.noData')}}</p>
            <div v-else>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">{{ item.content }}</div>
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
import { headMsg, piesData, userInfo } from '@/api/common'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import i18n from '@/lang/index'
import { searchSponsor } from '@/api/sponsor'
const sourceData = [{ item: i18n.t('issuer.index.cash'), count: null }, { item: i18n.t('issuer.index.realThing'), count: null }]
const sourceData1 = [{ item: i18n.t('issuer.index.unpaid'), count: null }, { item: i18n.t('issuer.index.paid'), count: null }]
const DataSet = require('@antv/data-set')
const dv = new DataSet.View().source(sourceData)
const dv1 = new DataSet.View().source(sourceData1)

const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
    height: window.innerHeight
  }
]
const pieData = dv.rows
const pieData1 = dv1.rows
export default {
  components: {
    PageView,
    HeadInfo
  },
  data() {
    return {
      chartWidth: 500,
      chartHeight: 300,
      chartBollean: true,
      offetX: -50,
      offetY: -35,
      timeFix: timeFix(),
      avatar: '',
      user: '',
      pieData,
      pieData1,
      sourceData,
      sourceData1,
      sponsorTotal: '',
      agentTotal: '',
      c: ['item', ['#4275FC', '#41BDFD']],
      c1: ['item', ['#F56367', '#FFB535']],
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
          ' style="cursor: pointer;font-size: 14px;min-width:180px;">' +
          '<td style="border: none;padding:0;min-width:50px;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
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
          ' style="cursor: pointer;font-size: 14px;min-width:180px;">' +
          '<td style="border: none;padding:0;min-width:50px;"><i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:' +
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
          title: this.$t('issuer.cjhd.xh'),
          dataIndex: 'key',
          key: 'number'
        },
        {
          title: this.$t('admin.hdmc'),
          dataIndex: 'name',
          key: 'name'
        },

        {
          title: this.$t('issuer.cjhd.tgxs'),
          dataIndex: 'ssKind',
          key: 'tgxs'
        },
        {
          title: this.$t('issuer.cjhd.zzxs'),
          dataIndex: 'sponsorship',
          key: 'zzxs'
        },
        {
          title: this.$t('issuer.cjhd.xjzz'),
          dataIndex: 'cash',
          key: 'xjzz'
        },
        {
          title: this.$t('issuer.cjhd.swzz'),
          dataIndex: 'product',
          key: 'swzz'
        },
        {
          title: this.$t('issuer.cjhd.zzje'),
          dataIndex: 'tolMoney',
          key: 'zzje'
        },
        {
          title: this.$t('admin.yfk'),
          dataIndex: 'paid',
          key: 'yfk'
        }
      ],
      operation1: [],
      nonum1: true,
      nonum2: true
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getHeadMsg()
    this.getPiesData()
    this.getSponsorList('', '', '', 1)
    this.getUserInfo()
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        console.log(window.screenWidth)
        if (window.screenWidth <= 1366) {
          console.log(window.screenWidth)
          that.chartBollean = false
          that.chartWidth = 240
          that.chartHeight = 240
          that.offetX = -80
          that.offetY = -56
        } else {
          that.chartBollean = true
          that.chartWidth = 500
          that.chartHeight = 300
          that.offetX = -50
          that.offetY = -35
        }
      })()
    }
  },
  methods: {
    getHeadMsg() {
      headMsg().then(res => {
        if (res.code == 1000) {
          this.projects = res.data
          this.loading = false
        }
      })
    },
    getPiesData() {
      piesData().then(res => {
        if (res.code == 1000) {
          console.log(res)
          this.pieData[0].count = res.data.money
          this.pieData[1].count = res.data.goods
          this.pieData1[0].count = res.data.unpaid
          this.pieData1[1].count = res.data.paid
          this.sponsorTotal = res.data.sponsorTotal
          this.agentTotal = res.data.agentTotal
          if (res.data.money == 0 && res.data.goods == 0) {
            this.nonum1 = false
          }
          if (res.data.unpaid == 0 && res.data.paid == 0) {
            this.nonum2 = false
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
    getSponsorList(name, startime, endtime, offset) {
      searchSponsor(name, startime, endtime, offset).then(res => {
        if (res.code == 1000) {
          console.log(res)
          let key = 'key'
          this.operation1 = res.page.rows

          this.operation1.map((item, index) => {
            item[key] = index + 1
          })
        }
      })
    },
    getUserInfo(id) {
      userInfo(id).then(res => {
        if (res.code == 1000) {
            this.user = res.data.email;
            this.avatar = res.data.logo;
          }
        })
    },
    
  },
  filters: {}
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
#home {
  padding: 24px;
  .my-cards {
    .ant-card-body {
      position: relative;
      height: 227px;
      overflow: hidden;
      margin-bottom: 24px;
      .item-boxes {
        width: 100%;
        height: 100%;
        .item-row {
          width: 100%;
          position: absolute;
          left: -20px;
          bottom: -60px;
          .nonum1 {
            display: flex;
            align-items: center;
            position: relative;
            p {
              position: absolute;
              bottom: 155px;
              left: 200px;
              color: #ccc;
            }
          }

          .item-box {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            &:nth-child(2) {
              .calc-price {
                color: #febf56;
                span {
                  color: #f5797d;
                }
              }
            }
            .calc-price {
              position: absolute;
              bottom: 80px;
              text-align: center;
              font-size: 16px;
              color: #5dc6fc;
              span {
                font-size: 24px;
                font-weight: bold;
                color: #1890ff;
              }
            }
            .desc {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              padding-top: 85px;
              h5 {
                color: #333;
                font-size: 20px;
                span {
                  color: #666;
                  font-size: 14px;
                }
              }
              p {
                font-size: 15px;
                &:nth-child(1) {
                  color: #42bcfd;
                }
                &:nth-child(2) {
                  color: #4075fc;
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
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
