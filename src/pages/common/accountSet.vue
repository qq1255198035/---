<template>
  <div id="accountSet">
    <page-header :title="pageTitle"></page-header>
    <a-row :gutter="200" type="flex" justify="center" style="padding: 20px 0">
      <a-col :lg="9">
        <div>
          <a-form layout="vertical" :form="form">
            <a-form-item :label="$t('issuer.accountInfo.email')">
              <a-input
                :placeholder="$t('issuer.accountInfo.email')"
                :disabled="true"
                v-decorator="['email',{rules: [{ required: true, message: `${$t('issuer.accountInfo.email')}` }]}]"
              />
            </a-form-item>
            <a-form-item :label="$t('issuer.accountInfo.companyTitle')">
              <a-input
                :placeholder="$t('issuer.accountInfo.companyTitle')"
                v-decorator="['companyName',{rules: [{ required: true, message: `${$t('issuer.accountInfo.companyTitle')}` }]}]"
              />
            </a-form-item>
            <a-form-item :label="$t('issuer.accountInfo.webName')">
              <a-input
                :placeholder="$t('issuer.accountInfo.webName')"
                v-decorator="['webName',{rules: [{ required: true, message: `${$t('issuer.accountInfo.webName')}` }]}]"
              />
            </a-form-item>
            <a-form-item :label="$t('issuer.accountInfo.companyName')">
              <a-textarea
                :placeholder="$t('issuer.accountInfo.companyName')"
                :autosize="{ minRows: 6 }"
                v-decorator="['textName',{rules: [{ max:30,required: true, message: `${$t('issuer.accountInfo.companyName')}` }]}]"
              />
            </a-form-item>
            <a-form-item :label="$t('issuer.accountInfo.country')">
              <a-select
                @change="countryBtn"
                v-decorator="['countryName',{rules: [{ required: true, message: `${$t('issuer.accountInfo.country')}` }]}]"
              >
                <a-select-option v-for="(item, index) in city" :key="index" :value="item.label">{{item.value}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('issuer.accountInfo.ProvinceCity')">
              <div class="">
                <a-select
                  
                  :placeholder="$t('issuer.hdgl.pleaseChoose')"
                  v-decorator="['addressName',{rules: [{ required: true, message: `${$t('issuer.accountInfo.ProvinceCity')}` }]}]"
                >
                  <a-select-option
                    v-for="(item, index) in activeityPlace"
                    :key="index"
                    :value="item.label"
                  >{{item.value}}</a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item :label="$t('issuer.accountInfo.StreetAddress')">
              <a-input
                :placeholder="$t('issuer.accountInfo.StreetAddress')"
                :autosize="{ minRows: 6 }"
                v-decorator="['placeName',{rules: [{ required: true, message: `${$t('issuer.accountInfo.StreetAddress')}` }]}]"
              />
            </a-form-item>
            <a-form-item :label="$t('issuer.accountInfo.contact')">
              <a-input
                :placeholder="$t('issuer.accountInfo.contact')"
                :autosize="{ minRows: 6 }"
                v-decorator="['contactName',{rules: [{ required: true, message: `${$t('issuer.accountInfo.contact')}` }]}]"
              />
            </a-form-item>
            <a-input-group compact>
              <a-form-item :label="$t('issuer.accountInfo.telphone')">
                <div class="">
                  <a-input
                    :placeholder="$t('issuer.accountInfo.telphone')"
                    v-decorator="['phoneName',{rules: [{pattern: new RegExp(/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/), required: true, message: `${$t('issuer.accountInfo.telphone')}` }]}]"
                  />
                </div>
              </a-form-item>
            </a-input-group>
            <a-button type="primary" @click="submitPerson">{{$t('issuer.accountInfo.updateInfo')}}</a-button>
            <a-button type="primary" @click="$router.go(-1)" style="margin-left: 20px;">{{$t('issuer.accountInfo.back')}}</a-button>
          </a-form>
        </div>
      </a-col>
      <a-col :lg="6">
        <div class="upload">
          <div class="top">
            <p>{{$t('issuer.accountInfo.companyLogo')}}</p>
            <img
              v-if="imgurl"
              :src="imgurl"
              width="130"
              height="130"
              style="border-radius:50%;background:#808080;margin-bottom: 10px;"
            >
            <a-avatar v-else style="backgroundColor:#23C6C8" :size="130">Sponsor Cube</a-avatar>
            <template>
              <a-upload name="avatar" :showUploadList="false" :beforeUpload="beforeUpload">
                <a-button>
                  <a-icon type="upload"/>{{$t('issuer.accountInfo.avtarLogo')}}
                </a-button>
              </a-upload>
            </template>
          </div>
          <div class="top">
            <p>{{$t('issuer.accountInfo.business')}}</p>
            <img
              v-if="imgurl1"
              :src="imgurl1"
              width="130"
              height="130"
              style="border-radius:50%;background:#808080;margin-bottom: 10px;"
            >
            <a-avatar v-else style="backgroundColor:#23C6C8" :size="130">Sponsor Cube</a-avatar>
            <template>
              <a-upload name="avatar" :showUploadList="false" :beforeUpload="beforeUpload1">
                <a-button>
                  <a-icon type="upload"/>{{$t('issuer.accountInfo.changeBusiness')}}
                </a-button>
              </a-upload>
            </template>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

import { getChangeInformation, getPlace, getUpload, getUserInformation, getBooleanPlace } from '@api/hand'
import { mixinsTitle } from '@/utils/mixin.js'
export default {
  data() {
    return {
      city: [{label: '0', value: this.$t('login.zgs')}, {label: '1', value: this.$t('login.xgs')}],
      personInfo: {},
      places: '',
      companyName: '',
      companyWeb: '',
      companyDesc: '',
      address: '',
      contact: '',
      phoneFirst: '',
      phoneLast: '',
      activeityPlace: [],
      areaId: '',
      country: '',
      fileUrl: '',
      fileUrl1: '',
      imgurl: '',
      imgurl1: '',
      flag: '1'
    }
  },
  mixins: [mixinsTitle],
  

  mounted() {
      this._getUserInformation()
  },
  methods: {
    /*checkedTel(rule, value, callback) {
      console.log(value)
      const reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
      if (!reg.test(value)) {
        callback(new Error('请输入正确电话号'))
      }
    },*/
    _getUserInformation() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getUserInformation(params).then(res => {
        console.log(res)
        this.personInfo = res.data
        this.form.setFieldsValue({
          companyName: res.data.name,
          webName: res.data.web,
          email: res.data.email,
          textName: res.data.intro,
          countryName: res.data.flag,
          addressName: res.data.area,
          placeName: res.data.comp_addr,
          contactName: res.data.contact,
          phoneName: res.data.phone
        })
        this.flag = res.data.flag
        console.log(this.flag)
        this.imgurl = res.data.logo ? res.data.logo : ''
        this.fileUrl = res.data.logo
        console.log(this.imgurl)
        this.imgurl1 = res.data.business_img ? res.data.business_img : ''
        this.fileUrl1 = res.data.business_img
        console.log(this.imgurl1)
        const params1 = {
        flag: res.data.flag,
        internationalization: localStorage.lang
      }
      console.log(params1)
      getBooleanPlace(params1).then(res => {
        console.log(res)
        this.activeityPlace = res.data
      })
      })
    },
    // 更新
    submitPerson() {
      console.log(111)
      const token = this.$ls.get('Access-Token')
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values.countryName)
          const params = {
            token: token,
            email: values.email,
            name: values.companyName,
            web: values.webName,
            intro: values.textName,
            country: values.countryName,
            area: values.addressName,
            compAddr: values.placeName,
            contact: values.contactName,
            phone: values.phoneName,
            logo: this.fileUrl,
            business_img: this.fileUrl1,
          }
          console.log(params)
          getChangeInformation(params).then(res => {
            console.log(res)
            if (res.code == 1000) {
              this.$notification.success({
                message: this.$t('issuer.hdgl.successNmae'),
                description: this.$t('issuer.accountInfo.updateCompleted'),
                duration: 4
              })
              this.$router.push({
                path: '/zhxx'
              })
            }
          })
        }
      })
    },
    countryBtn(value) {
      console.log(value)
      this.form.setFieldsValue({
        addressName: ''
      })
      this.flag = value
      const params = {
        flag: value,
        internationalization: localStorage.lang
      }
      getBooleanPlace(params).then(res => {
        console.log(res)
        this.activeityPlace = res.data
      })
      //this.personInfo.country = value
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error(this.$t('issuer.accountInfo.onlyImage'))
        return isJPG
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error(this.$t('issuer.accountInfo.onlyM'))
        return isLt2M
      }
      getBase64(file, imageUrl => {
        this.imgurl = imageUrl
      })
      const formData = new FormData()
      formData.append('file', file)
      console.log(formData)
      getUpload(formData).then(res => {
        console.log(res)
        this.fileUrl = res.location
      })
    },
    beforeUpload1(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error(this.$t('issuer.accountInfo.onlyImage'))
        return isJPG
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error(this.$t('issuer.accountInfo.onlyM'))
        return isLt2M
      }
      getBase64(file, imageUrl => {
        this.imgurl1 = imageUrl
      })
      const formData = new FormData()
      formData.append('file', file)
      console.log(formData)
      getUpload(formData).then(res => {
        console.log(res)
        this.fileUrl1 = res.location
      })
    },
    onChange(value) {
      console.log(value)
    }
  },
  computed: {},
  beforeCreate() {
    this.form = this.$form.createForm(this)
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  }
}
</script>
<style lang="less" scoped>
#accountSet {
  background-color: #fff;

  .ant-form-item {
    width: 100%;
  }
  .input-group {
    display: flex;
    justify-content: space-between;
  }
  .select-box {
    display: flex;
    justify-content: space-between;
    .ant-select {
      width: 49%;
    }
  }
  .upload {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .ant-avatar {
        margin: 20px 0;
      }
      p {
        color: #333;
      }
    }
    .top {
      margin-bottom: 40px;
    }
  }
}
</style>