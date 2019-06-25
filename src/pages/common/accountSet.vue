<template>
  <div id="accountSet">
    <page-header :title="pageTitle"></page-header>
    <a-row :gutter="200" type="flex" justify="center" style="padding: 20px 0">
      <a-col :lg="9">
        <div>
          <a-form layout="vertical" :form="form">
            <a-form-item label="邮箱">
              <a-input placeholder="input placeholder" :disabled="true" v-decorator="['email',{rules: [{ required: true, message: '公司名称' }]}]"/>
            </a-form-item>
            <a-form-item label="公司名称">
              <a-input placeholder="input placeholder"
                v-decorator="['companyName',{rules: [{ required: true, message: '公司名称' }]}]"
              />
            </a-form-item>
            <a-form-item label="公司网址">
              <a-input placeholder="input placeholder"
                v-decorator="['webName',{rules: [{ required: true, message: '公司网址' }]}]"
              />
            </a-form-item>
            <a-form-item label="公司简介">
              <a-textarea
                placeholder="input placeholder"
                :autosize="{ minRows: 6 }"
                v-decorator="['textName',{rules: [{ required: true, message: '公司简介' }]}]"
              />
            </a-form-item>
            <a-form-item label="国家地区">
              <a-select
                @change="countryBtn"
                v-decorator="['countryName',{rules: [{ required: true, message: '公司简介' }]}]"
              >
                <a-select-option value="中国">中国</a-select-option>
                <a-select-option value="香港">香港</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="所在省市">
              <div class="select-box">
                
                <a-select
                style="width:100%"
                  placeholder="请选择"
                  v-decorator="['addressName',{rules: [{ required: true, message: '公司简介' }]}]"
                >
                  <a-select-option
                    v-for="(item, index) in activeityPlace"
                    :key="index"
                    :value="item.label"
                  >{{item.value}}</a-select-option>
                </a-select>
              </div>
            </a-form-item>
            <a-form-item label="街道地址">
              <a-textarea
                placeholder="input placeholder"
                :autosize="{ minRows: 6 }"
                v-decorator="['placeName',{rules: [{ required: true, message: '公司简介' }]}]"
              />
            </a-form-item>
            <a-form-item label="联系人">
              <a-input
                placeholder="input placeholder"
                :autosize="{ minRows: 6 }"
                v-decorator="['contactName',{rules: [{ required: true, message: '公司简介' }]}]"
              />
            </a-form-item>
            <a-input-group compact>
              <a-form-item label="联系电话">
                <div class="input-group">
                  <a-input style="width: 100%" placeholder="26888888"
                    v-decorator="['phoneName',{rules: [{ required: true, message: '公司简介' }]}]"/>
                </div>
              </a-form-item>
            </a-input-group>
            <a-button type="primary" @click="submitPerson">更新信息</a-button>
          </a-form>
        </div>
      </a-col>
      <a-col :lg="6">
        <div class="upload">
          <div class="top">
            <p>公司LOGO</p>
            <img v-if="imgurl" :src="imgurl"  width="130" height="130" style="border-radius:50%;background:#808080"/>
            <template>
              <a-upload name="avatar" :showUploadList="false" :beforeUpload="beforeUpload">
                <a-button>
                  <a-icon type="upload"/>更换LOGO
                </a-button>
              </a-upload>
            </template>
          </div>
          <div class="top">
            <p>营业执照</p>
            <img v-if="imgurl1" :src="imgurl1"  width="130" height="130" style="border-radius:50%;background:#808080"/>
            <template>
              <a-upload name="avatar" :showUploadList="false" :beforeUpload="beforeUpload1">
                <a-button>
                  <a-icon type="upload"/>更换营业执照
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

import { getChangeInformation, getPlace, getUpload, getUserInformation } from '@api/hand'
import { mixinsTitle } from '@/utils/mixin.js'
export default {
  data() {
    return {
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
      imgurl:'',
      imgurl1:''
    }
  },
  mixins: [mixinsTitle],
  created() {
    this._getPlace()
    this._getUserInformation()
  },
  
  mounted() {},
  methods: {
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
              countryName: res.data.country,
              addressName: res.data.area,
              placeName: res.data.compAddr,
              contactName: res.data.contact,
              phoneName: res.data.phone,
            })
            this.imgurl = this.$host + res.data.logo
            this.fileUrl = res.data.logo
            console.log(this.imgurl)
            this.imgurl1 = this.$host + res.data.businessImg
            this.fileUrl1 = res.data.businessImg
            console.log(this.imgurl1)
           
      })
    },
    _getPlace() {
      getPlace().then(res => {
        console.log(res)
        this.activeityPlace = res.data
        console.log(this.placeName)
        
        console.log(this.places)
      })
    },
 
    submitPerson() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token,
        email: this.form.getFieldValue('email'),
        name: this.form.getFieldValue('companyName'),
        web: this.form.getFieldValue('webName'),
        intro: this.form.getFieldValue('textName'),
        country: this.form.getFieldValue('countryName'),
        area: this.form.getFieldValue('addressName'),
        compAddr: this.form.getFieldValue('placeName'),
        contact: this.form.getFieldValue('contactName'),
        phone: this.form.getFieldValue('phoneName'),
        logo: this.fileUrl,
        businessImg: this.fileUrl1
      }
      console.log(params)
      getChangeInformation(params).then(res => {
        console.log(res)
        if(res.code == 1000) {
          this.$notification.success({
              message: '成功',
              description: '更新成功',
              duration: 4
            })
          this.$router.push({
            path: '/zhxx'
          })
        }
      })
    },
    countryBtn(value) {
      console.log(value)
      this.personInfo.country = value
    },
    beforeUpload(file) {
      getBase64(file, (imageUrl) => {
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
  computed: {
    
  },
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