<template>
  <div id="hdgl">
    <page-header :title="pageTitle"></page-header>
    <div class="header">
      <a-button type="primary" class="item-input" @click="setInfo">{{$t('issuer.hdgl.createAnEvent')}}</a-button>
      <a-locale-provider :locale="locale">
        <a-date-picker class="item-input" :placeholder="$t('issuer.index.startTime')" @change="searchDate" />
      </a-locale-provider>
      <a-locale-provider :locale="locale">
        <a-date-picker class="item-input" :placeholder="$t('issuer.index.endTime')" @change="searchDate1" />
      </a-locale-provider>
      <!--<a-cascader
        :fieldNames="{ label: 'value', value: 'label', children: 'children' }"
        :options="activeityPlace"
        @change="onChange"
        placeholder="请选择"
        :showSearch="true"
      />-->
      <!--<a-cascader
        :fieldNames="{ label: 'name', value: 'id',children: 'children' }"
        :options="activeityClass"
        @change="searchClassifyBtn"
        placeholder="请选择"
        :showSearch="true"
      />-->
      <a-select
        style="width: 174px;"
        class="item-input"
        labelInValue
        :defaultValue="{key: `${$t('issuer.hdgl.pleaseChoose')}`}"
        @change="searchClassifyBtn"
        placeholder="请选择"
        allowClear
      >
        <a-select-option
          v-for="(item, index) in activeityClass"
          :key="index"
          :value="item.id"
        >{{item.name}}</a-select-option>
      </a-select>

      <a-input-search
        :placeholder="$t('issuer.hdgl.pleaseChoose')"
        @search="onSearch"
        :enterButton="$t('issuer.hdgl.searchs')"
        style="width: 350px;"
        class="item-input"
        v-model="searchText"
      />
    </div>
    <div class="main">
      <div class="show-item" v-if="cardList.length > 0">
        <a-col :span="11" class="my-item" v-for="(item ,index) in cardList" :key="index">
          <div class="ibox float-e-margins">
            <div class="ibox-content">
              <div class="first-row">
                <h2 class="ant-col-12 title">{{item.name}}</h2>
                <h2 class="ant-col-6 my-text">
                  ${{item.money || 0}}
                  <span></span>
                </h2>
                <h2 class="ant-col-6 my-text">
                  {{item.people}}
                  <span>{{$t('issuer.hdgl.wei')}}</span>
                </h2>
              </div>
              <div class="second-row">
                <span class="ant-col-12">{{$t('issuer.index.startTime')}}：{{item.publishTime}}</span>
                <span class="ant-col-6">{{$t('issuer.hdgl.sponsored')}}</span>
                <span class="ant-col-6">{{$t('issuer.hdgl.participationStar')}}</span>
              </div>
              <div class="second-row">
                <span class="ant-col-12"></span>
                <span class="ant-col-6"></span>
                <span class="ant-col-6">
                  <a-badge
                    :status="item.status | statusTypeFilter"
                    :text="item.status | statusFilter"
                  />
                </span>
              </div>
              <div class="third-row">
                <span class="col-lg-12">
                  <a-icon type="environment" />
                  {{item.area_name}}
                </span>
              </div>
            </div>
            <div class="ibox-footer">
              <div class="button-box" v-if="item.status == 20">
                <a-button
                  ghost
                  class="btn-success"
                  @click="$router.push({path:'/issuerCkhd', query: {campId: item.campId}})"
                >&nbsp;&nbsp; {{$t('issuer.hdgl.examine')}} &nbsp;&nbsp;</a-button>
                <div>
                  <a-button
                    ghost
                    class="btn-primary"
                    @click="$router.push({path: '/zzsp', query: {campId: item.campId}})"
                  >{{$t('issuer.hdgl.sponsorApproval')}}</a-button>
                  <a-button
                    ghost
                    class="btn-info"
                    @click="$router.push({path: '/issuerMxsp', query: {campId: item.campId}})"
                  >{{$t('issuer.hdgl.starsApproval')}}</a-button>
                </div>
              </div>
              <div class="button-box" v-if="item.status == 0">
                <a-button
                  ghost
                  class="btn-success"
                  @click="$router.push({path:'/issuerCkhd', query: {campId: item.campId}})"
                >&nbsp;&nbsp; {{$t('issuer.hdgl.examine')}} &nbsp;&nbsp;</a-button>
              </div>
              <div class="button-box" v-if="item.status == 30">
                <a-button
                  ghost
                  class="btn-success"
                  @click="$router.push({path:'/issuerCkhd', query: {campId: item.campId}})"
                >&nbsp;&nbsp; {{$t('issuer.hdgl.examine')}} &nbsp;&nbsp;</a-button>
                <div>
                  <a-button
                    ghost
                    class="btn-warning"
                    @click="$router.push({path: '/issuerCjhd', query: {campId: item.campId}})"
                  >&nbsp;&nbsp; {{$t('issuer.hdgl.modify')}} &nbsp;&nbsp;</a-button>
                </div>
              </div>
              <div class="button-box" v-if="item.status == 10">
                <a-button
                  ghost
                  class="btn-success"
                  @click="$router.push({path:'/issuerCkhd', query: {campId: item.campId}})"
                >&nbsp;&nbsp; {{$t('issuer.hdgl.examine')}} &nbsp;&nbsp;</a-button>
                <div>
                  <a-button
                    ghost
                    class="btn-warning"
                    @click="$router.push({path: '/issuerCjhd', query: {campId: item.campId}})"
                  >&nbsp;&nbsp; {{$t('issuer.hdgl.modify')}} &nbsp;&nbsp;</a-button>
                  <a-button
                    ghost
                    class="btn-danger"
                    @click="showDeleteConfirm(item.campId, index)"
                  >&nbsp;&nbsp; {{$t('issuer.hdgl.detel')}} &nbsp;&nbsp;</a-button>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </div>
      <div slot="footer" v-if="cardList.length > 0" style="text-align: center; margin-top: 16px;">
        <a-button @click="loadMore" :loading="loadingMore" :disabled="btnDsiable">{{$t('issuer.hdgl.loadMore')}}</a-button>
      </div>
      <div class="hide-item" v-else>
        <a-col :span="8">
          <a-card title :bordered="false" :body-style="{padding: 20}">
            <div class="item-group">
              <h6>{{$t('issuer.index.title')}}</h6>
              <p>{{$t('issuer.index.desc')}}</p>
              <a-button
                type="primary"
                @click="setInfo"
              >{{$t('issuer.index.fbhd')}}</a-button>
            </div>
          </a-card>
        </a-col>
      </div>
    </div>
  </div>
</template>
<script>
import { mixinsTitle } from '@/utils/mixin.js'
import { getHandActivities, getPlace, getClassify, getDetele } from '@api/hand'
import { judge } from '@api/common'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
import api from '@/api/index'
import i18n from '@lang/index'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
}
const statusMap = {
  0: {
    status: 'processing',
    text: i18n.t('issuer.hdgl.application')
  },
  20: {
    status: 'success',
    text: i18n.t('issuer.hdgl.successNmae')
  },
  10: {
    status: 'warning',
    text: i18n.t('issuer.index.creating')
  },
  30: {
    status: 'error',
    text: i18n.t('issuer.hdgl.turnDown')
  },
  50: {
    status: 'error',
    text: i18n.t('issuer.hdgl.shutDown')
  }
}
export default {
  mixins: [mixinsTitle],
  data() {
    return {
      cardList: [],
      locale: lang[localStorage.getItem('lang')],
      activeityPlace: [],
      activeityClass: [],
      avtiveityDate: '',
      searchPlace: '',
      searchClassify: '',
      searchText: '',
      loading: true,
      loadingMore: false,
      offset: 1,
      btnDsiable: false,
      pages: 0,
      moneys: '',
      avtiveityDateEnd: '' // 结束时间
    }
  },
  computed: {},
  mounted() {
    this._getHandActivities()
    this._getPlace()
    this._getClassify()
  },
  methods: {
    setInfo() {
      let that = this
      const token = this.$ls.get('Access-Token')
      console.log(token)
      judge(token).then(res => {
        console.log(res)
        if (res.code == 1000) {
          if (res.data == 0) {
            that.$router.push({ name: 'issuerCjhd' })
          } else {
            that.$error({
              okText: this.$t('issuer.index.gotoSet'),
              title: this.$t('issuer.index.error'),
              content: this.$t('issuer.index.sorry'),
              onOk() {
                that.$router.push({ name: 'zhsz' })
              }
            })
          }
        }
      })
    },
    // 活动管理
    _getHandActivities() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token,
        offset: this.offset,
        limit: 10
      }
      console.log(this.offset)
      getHandActivities(params).then(res => {
        console.log(res)
        this.cardList = res.page.rows

        this.pages = res.page.pages
      })
    },
    // 地点
    _getPlace() {
      const lang = {
        internationalization: localStorage.lang
      }
      getPlace(lang).then(res => {
        console.log(res)
        this.activeityPlace = res.data
      })
    },
    _getClassify() {
      const lang = {
        internationalization: localStorage.lang
      }
      getClassify(lang).then(res => {
        console.log(res)
        this.activeityClass = res.data
      })
    },
    loadMore() {
      this.offset++
      this.loadingMore = true
      this.loading = true
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token,
        offset: this.offset,
        limit: 10
      }
      console.log(params)
      getHandActivities(params).then(res => {
        console.log(res)
        if (res.code == 1000) {
          this.cardList = this.cardList.concat(res.page.rows)
          console.log(this.cardList)
          let page = parseInt(this.pages)
          if (this.offset > page) {
            this.btnDsiable = true
            this.$message.warning(this.$t('issuer.hdgl.allLoaded'))
            this.loadingMore = false
            this.loading = false
            return
          }

          this.loading = false
          this.loadingMore = false
          this.pages = res.page.pages
          this.loading = false
        }
      })
    },
    onSearch(value) {
      console.log(value)
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token,
        limit: 10,
        offset: 1,
        startime: this.avtiveityDate ? this.avtiveityDate : '',
        endtime: this.avtiveityDateEnd ? this.avtiveityDateEnd : '',
        area: this.searchPlace ? this.searchPlace : '',
        campCatalog: this.searchClassify ? this.searchClassify : '',
        content: this.searchText ? this.searchText : ''
      }
      console.log(params)
      getHandActivities(params).then(res => {
        console.log(res)
        this.cardList = res.page.rows
      })
    },
    // 日期搜索
    searchDate(date, dateString) {
      console.log(dateString)
      this.avtiveityDate = dateString
    },
    searchDate1(date, dateString) {
      console.log(dateString)
      this.avtiveityDateEnd = dateString
    },
    showDeleteConfirm(item, index) {
      const that = this
      const token = this.$ls.get('Access-Token')
      const campId = item
      const params = {
        token: token,
        campId: campId
      }
      console.log(params)
      this.$confirm({
        title: this.$t('issuer.hdgl.whetherDetel'),
        //content: 'Some descriptions',
        okText: this.$t('issuer.hdgl.yes'),
        okType: 'danger',
        cancelText: this.$t('issuer.hdgl.not'),
        onOk() {
          console.log('OK')
          getDetele(params).then(res => {
            console.log(res)
            that.cardList.splice('index', 1)
            that._getHandActivities()
          })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    onChange(value) {
      console.log(value)
      this.searchPlace = value['0']
    },
    searchClassifyBtn(value) {
      console.log(value)
      this.searchClassify = value.key
    }
  },
  computed: {},

  beforeCreate() {
    this.form = this.$form.createForm(this)
    console.log(this.form)
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      //在这里可以处理对应的跳转逻辑
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  }
}
</script>
<style lang="less" scoped>
#hdgl {
  margin: -24px -24px 0;
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    .item-input {
      margin: 0 10px;
    }
  }
  .main {
    .show-item {
      display: flex;
      justify-content: space-between;
      padding: 20px 30px;
      flex-wrap: wrap;
      .my-item {
        border: 1px solid #ccc;
        margin: 20px;
        background-color: #fff;
        border-radius: 5px;
        .ibox {
          margin: 0;
          .ibox-content {
            padding: 20px;
          }
          .ibox-footer {
            padding: 10px;
            border-top: 1px solid #ccc;
            .btn-success {
              border-color: #52c41a;
              background-color: #52c41a !important;
              color: #fff;
            }
            .btn-primary {
              border-color: #23c6c8;
              background-color: #23c6c8 !important;
              color: #fff;
            }
            .btn-info {
              border-color: #fe980e;
              background-color: #fe980e !important;
              color: #fff;
            }
            .btn-danger {
              color: #fff;
              border-color: #fe0302;
              background-color: #fe0302 !important;
            }
            .btn-warning {
              color: #fff;
              border-color: #fe980e;
              background-color: #fe980e !important;
            }
          }
        }
        .first-row {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          .title {
            font-size: 20px;
            font-weight: bold;
            color: #21c5c7;
            padding-right: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .my-text {
            color: #333;
            font-size: 26px;
            font-weight: normal;
            display: flex;
            align-items: baseline;
            span {
              font-size: 14px;
              margin-left: 5px;
              font-weight: normal;
            }
          }
        }
        .second-row {
          display: flex;
          span {
            font-size: 14px;
            color: #999;
          }
        }
        .third-row {
          display: flex;
          margin-top: 20px;
          span {
            font-size: 14px;
            color: #999;
            i {
              font-size: 18px;
              margin-right: 10px;
            }
          }
        }
        .button-box {
          display: flex;
          justify-content: space-between;
          button {
            margin: 0 5px;
          }
        }
      }
    }
    .hide-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 100px;
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
    }
  }
}
</style>
