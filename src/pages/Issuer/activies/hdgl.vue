<template>
  <div id="hdgl">
    <page-header :title="pageTitle"></page-header>
    <div class="header">
      <a-button type="primary" class="item-input" @click="$router.push({name: 'cjhd'})">创建活动</a-button>
      <a-locale-provider :locale="locale">
        <a-date-picker class="item-input" @change="searchDate"/>
      </a-locale-provider>
      <a-cascader
        :fieldNames="{ label: 'value', value: 'label', children: 'children' }"
        :options="activeityPlace"
        @change="onChange"
        placeholder="请选择"
        :showSearch="true"
      />
      <a-select
        style="width: 174px;"
        class="item-input"
        labelInValue
        :defaultValue="{key: '请选择'}"
        @change="searchClassifyBtn"
      >
        <a-select-option
          v-for="(item, index) in activeityClass"
          :key="index"
          :value="item.id"
        >{{item.name}}</a-select-option>
      </a-select>

      <a-input-search
        placeholder="请输入中文活动名称"
        @search="onSearch"
        enterButton="搜索"
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
                <h2 class="ant-col-16 title">{{item.name}}</h2>
                <h2 class="ant-col-5 my-text">
                  ${{item.money}}
                  <span>万</span>
                </h2>
                <h2 class="ant-col-5 my-text">
                  {{item.people}}
                  <span>位</span>
                </h2>
              </div>
              <div class="second-row">
                <span class="ant-col-16">开始时间：{{item.publishTime}}</span>
                <span class="ant-col-5">已赞助</span>
                <span class="ant-col-5">参与明星</span>
              </div>
              <div class="third-row">
                <span class="col-lg-12">
                  <a-icon type="environment"/>
                  {{item.address}}
                </span>
              </div>
            </div>
<<<<<<< HEAD
            <div class="main">
                <div class="show-item" v-if="cardList.length > 0">
                    <a-col :span="11" class="my-item" v-for="(item ,index) in cardList" :key="index">
                        <div class="ibox float-e-margins">
                            <div class="ibox-content">
                                <div class="first-row">
                                    <h2 class="ant-col-16 title">
                                        {{item.title}}
                                    </h2>
                                    <h2 class="ant-col-5 my-text">
                                        ${{item.price}} <span>万</span>
                                    </h2>
                                    <h2 class="ant-col-5 my-text">
                                        {{item.num}} <span>位</span>
                                    </h2>    
                                </div>
                                <div class="second-row">
                                    <span class="ant-col-16">开始时间：{{item.time}}</span>
                                    <span class="ant-col-5">已赞助</span>
                                    <span class="ant-col-5">参与明星</span>
                                </div>
                                <div class="third-row">
                                    <span class="col-lg-12"><a-icon type="environment"/>{{item.adress}}</span>
                                </div>
                                
                            </div>
                            <div class="ibox-footer">
                                <div class="button-box" v-if="item.code == 0">
                                    <a-button ghost class="btn-success" @click="$router.push({name:'details'})"> &nbsp;&nbsp; 查 看 &nbsp;&nbsp; </a-button>
                                    <div>
                                          <a-button ghost class="btn-primary" @click="$router.push({name: 'zzsp'})"> 赞助审批 </a-button>
                                          <a-button ghost class="btn-info" @click="$router.push({name: 'issuerMxsp'})"> 明星审批 </a-button>
                                    </div>
                                </div>
                                <div class="button-box" v-if="item.code == 1">
                                    <a-button ghost class="btn-success" @click="$router.push({name:'ckhd'})"> &nbsp;&nbsp; 查 看 &nbsp;&nbsp; </a-button>
                                </div>
                                <div class="button-box" v-if="item.code == 2">
                                    <a-button ghost class="btn-success" @click="$router.push({name:'ckhd'})"> &nbsp;&nbsp; 查 看 &nbsp;&nbsp; </a-button>
                                    <div>
                                          <a-button ghost class="btn-warning" @click="$router.push({name: 'cjhd'})">&nbsp;&nbsp; 修 改 &nbsp;&nbsp;</a-button>
                                          <a-button ghost class="btn-danger" @click="showDeleteConfirm"> &nbsp;&nbsp; 删 除 &nbsp;&nbsp; </a-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a-col>
                    
=======
            <div class="ibox-footer">
              <div class="button-box" v-if="item.status == 20">
                <a-button
                  ghost
                  class="btn-success"
                  @click="$router.push({name:'details'})"
                >&nbsp;&nbsp; 查 看 &nbsp;&nbsp;</a-button>
                <div>
                  <a-button ghost class="btn-primary" @click="$router.push({name: 'zzgl', query: {campId: item.campId}})">赞助审批</a-button>
                  <a-button ghost class="btn-info" @click="$router.push({name: 'mxgl', query: {campId: item.campId}})">明星审批</a-button>
>>>>>>> 6.18
                </div>
              </div>
              <div class="button-box">
                <a-button
                  ghost
                  class="btn-success"
                  @click="$router.push({name:'details'})"
                >&nbsp;&nbsp; 查 看 &nbsp;&nbsp;</a-button>
              </div>
              <div class="button-box" v-if="item.status == 0">
                <a-button
                  ghost
                  class="btn-success"
                  @click="$router.push({name:'details'})"
                >&nbsp;&nbsp; 查 看 &nbsp;&nbsp;</a-button>
                <div>
                  <a-button
                    ghost
                    class="btn-warning"
                    @click="$router.push({name: 'cjhd', query: {campId: item.campId}})"
                  >&nbsp;&nbsp; 修 改 &nbsp;&nbsp;</a-button>
                  <a-button
                    ghost
                    class="btn-danger"
                    @click="showDeleteConfirm"
                  >&nbsp;&nbsp; 删 除 &nbsp;&nbsp;</a-button>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </div>
      <div class="hide-item" v-else>
        <a-col :span="8">
          <a-card title :bordered="false" :body-style="{padding: 20}">
            <div class="item-group">
              <h6>Ready to publish your Campaign</h6>
              <p>Upgrade now to make your campaign public and start receiving application.</p>
              <a-button type="primary" @click="$router.push({name: 'cjhd'})">发布活动</a-button>
            </div>
          </a-card>
        </a-col>
      </div>
    </div>
  </div>
</template>
<script>
import { mixinsTitle } from '@/utils/mixin.js'
import { getHandActivities, getPlace, getClassify } from '@api/hand'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
import api from '@/api/index'
const lang = {
  'zh-TW': zhTW,
  'zh-CN': zhCN,
  'en-US': enUS
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
    }
  },
  created() {
    this._getHandActivities()
    this._getPlace()
    this._getClassify()
  },
  methods: {
    // 活动管理
    _getHandActivities() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getHandActivities(params).then(res => {
        console.log(res)
        this.cardList = res.page.rows
      })
    },
    // 地点
    _getPlace() {
      getPlace().then(res => {
        console.log(res)
        this.activeityPlace = res.data
      })
    },
    _getClassify() {
      getClassify().then(res => {
        console.log(res)
        this.activeityClass = res.data
      })
    },
    onSearch(value) {
      console.log(value)
      const token = this.$ls.get('Access-Token')
      const params = {
          token: token,
          startime: this.avtiveityDate,
          area: this.searchPlace,
          campCatalog: this.searchClassify,
          content: this.searchText
      }
      console.log(params)
      getHandActivities(params).then(res => {
          console.log(res)
      })
    },
    // 日期搜索
    searchDate(date, dateString) {
      console.log(dateString)
      this.avtiveityDate = dateString
    },
    showDeleteConfirm() {
      this.$confirm({
        title: 'Are you sure delete this task?',
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    getCardData() {
      this.$http.get(api.IssHdglCard).then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.cardList = res.data
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
  mounted() {
    //this.getCardData();
    console.log(this.$store.getters.lang)
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
    console.log(this.form)
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
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
