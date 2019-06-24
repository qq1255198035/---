<template>
  <div id="accountSet">
    <page-header :title="pageTitle"></page-header>
    <a-row :gutter="200" type="flex" justify="center" style="padding: 20px 0">
      <a-col :lg="9">
        <div>
          <a-form layout="vertical">
            <a-form-item label="邮箱">
              <a-input placeholder="input placeholder" :disabled="true" v-model="personInfo.email"/>
            </a-form-item>
            <a-form-item label="公司名称">
              <a-input placeholder="input placeholder" v-model="personInfo.name"/>
            </a-form-item>
            <a-form-item label="公司网址">
              <a-input placeholder="input placeholder" v-model="personInfo.web"/>
            </a-form-item>
            <a-form-item label="公司简介">
              <a-textarea
                placeholder="input placeholder"
                :autosize="{ minRows: 6 }"
                v-model="personInfo.intro"
              />
            </a-form-item>
            <a-form-item label="国家地区">
              <a-select
                :defaultValue="personInfo.country"
                @change="countryBtn"
                v-model="personInfo.country"
              >
                <a-select-option value="中国">中国</a-select-option>
                <a-select-option value="香港">香港</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="所在省市">
              <div class="select-box">
                <a-cascader
                  :fieldNames="{ label: 'value', value: 'label', children: 'children' }"
                  :options="activeityPlace"
                  @change="onChange"
                  :placeholder="places"
                  :showSearch="true"
                />
              </div>
            </a-form-item>
            <a-form-item label="街道地址">
              <a-textarea
                placeholder="input placeholder"
                :autosize="{ minRows: 6 }"
                v-model="personInfo.compAddr"
              />
            </a-form-item>
            <a-form-item label="联系人">
              <a-input
                placeholder="input placeholder"
                :autosize="{ minRows: 6 }"
                v-model="personInfo.contact"
              />
            </a-form-item>
            <a-input-group compact>
              <a-form-item label="联系电话">
                <div class="input-group">
                  <a-input style="width: 30%" defaultValue="0571" v-model="phoneFirst"/>
                  <a-input style="width: 68%" defaultValue="26888888" v-model="phoneLast"/>
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
            <a-avatar :src="personInfo.logo" :size="130"/>
            <template>
              <a-upload name="avatar" action :showUploadList="false" :beforeUpload="beforeUpload">
                <a-button>
                  <a-icon type="upload"/>更换LOGO
                </a-button>
              </a-upload>
            </template>
          </div>
          <div class="top">
            <p>营业执照</p>
            <a-avatar :src="personInfo.businessImg" :size="130"/>
            <template>
              <a-upload name="avatar" action :showUploadList="false" :beforeUpload="beforeUpload1">
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
import imgUrl from '@/assets/a1.jpg'
import imgUrl1 from '@/assets/a1.jpg'
import { getChangeInformation, getPlace, getUpload, getUserInformation } from '@api/hand'
import { mixinsTitle } from '@/utils/mixin.js'
export default {
  data() {
    return {
      personInfo: {},
      places: '',
      imgUrl,
      imgUrl1,
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
      fileUrl1: ''
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
        this.personInfo = res.data;
        this.phoneFirst = res.data.phone.split(',')[0] || '';
        this.phoneLast = res.data.phone.split(',')[1] || '';
      })
    },
    _getPlace() {
      getPlace().then(res => {
        console.log(res)
        this.activeityPlace = res.data
        console.log(this.placeName)
        this.places = this.placeName[0].value
        console.log(this.places)
      })
    },

    submitPerson() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token,
        email: this.personInfo.email,
        name: this.personInfo.name,
        web: this.personInfo.web,
        intro: this.personInfo.intro,
        country: this.personInfo.country,
        area: this.personInfo.area,
        compAddr: this.personInfo.compAddr,
        contact: this.personInfo.contact,
        phone: this.phoneFirst + ',' + this.phoneLast,
        logo: this.fileUrl,
        businessImg: this.fileUrl1
      }
      console.log(params)
      getChangeInformation(params).then(res => {
        console.log(res)
      })
    },
    countryBtn(value) {
      console.log(value)
      this.personInfo.country = value
    },
    beforeUpload(file) {
      getBase64(file, imageUrl => {
        this.imgUrl = imgUrl
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
      getBase64(file, imageUrl, imgUrl => {
        this.imgUrl1 = imgUrl
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
      this.personInfo.area = value['0']
    }
  },
  computed: {
    placeName() {
      setTimeout(() => {
        return this.activeityPlace.filter(item => {
        console.log(this.personInfo)
        return item.label == this.personInfo.area
      })
      },1000)
      
    }
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
