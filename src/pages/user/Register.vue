<template>
      <div id="register">
            <div class="step-box">
                  <a-steps :current="current | String2Num">
                        <a-step :title="$t('login.xzyh')"/>
                        <a-step :title="$t('login.txxx')"/>
                        <a-step :title="$t('login.zccg')"/>
                  </a-steps>
            </div>
            <div class="register-box">
                  <a-tabs :activeKey="current">
                        <a-tab-pane tab="" key="0">
                              <div class="my-tab-content">
                                    <ul>
                                          <li :class="{'active': activeIndex == 1}" @click="activeIndex = 1">
                                                <a-icon type="property-safety"></a-icon>
                                                {{$t('login.zzs')}}
                                          </li>
                                          <li :class="{'active': activeIndex == 2}" @click="activeIndex = 2">
                                                <a-icon type="code-sandbox"></a-icon>
                                                {{$t('login.gs')}}
                                          </li>
                                          <li :class="{'active': activeIndex == 3}" @click="activeIndex = 3">
                                                <a-icon type="usergroup-add"></a-icon>
                                                {{$t('login.jjr')}}
                                          </li>
                                    </ul>
                                    <div class="bottom">
                                          <a-button type="primary" @click="goRegister" class="my-btn">
                                                {{$t('login.xyb')}}
                                          </a-button>
                                          <router-link class="login" :to="{ name: 'login' }">{{$t('login.yyzh')}}</router-link>
                                    </div>
                              </div>
                        </a-tab-pane>
                        <a-tab-pane tab="" key="1" forceRender>
                              <div class="main user-layout-register">
                                    <a-form ref="formRegister" :form="form" id="formRegister">
                                    <a-form-item>
                                    <a-input
                                    size="large"
                                    type="text"
                                    :placeholder="$t('login.yx')"
                                    v-decorator="['email', {rules: [{ required: true, type: 'email', message: `${$t('login.qsryx')}` }], validateTrigger: ['change', 'blur']}]"
                                    ></a-input>
                                    </a-form-item>

                                    <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
                                    <template slot="content">
                                    <div :style="{ width: '240px' }" >
                                          <div :class="['user-register', passwordLevelClass]">{{$t('login.qds')}}<span>{{ passwordLevelName }}</span></div>
                                          <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
                                          <div style="margin-top: 10px;">
                                          <span>{{$t('login.zs')}}</span>
                                          </div>
                                    </div>
                                    </template>
                                    <a-form-item>
                                    <a-input
                                          size="large"
                                          type="password"
                                          @keydown="insertDown"
                                          @keyup="insertUp"
                                          autocomplete="false"
                                          :placeholder="$t('login.qf')"
                                          v-decorator="['password', {rules: [{ required: true, message: `${$t('login.qf')}`}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
                                    ></a-input>
                                    </a-form-item>
                                    </a-popover>

                                    <a-form-item>
                                    <a-input
                                    size="large"
                                    type="password"
                                    autocomplete="false"
                                    :placeholder="$t('login.qrmm')"
                                    v-decorator="['password2', {rules: [{ required: true, message:  `${$t('login.qf')}` }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
                                    ></a-input>
                                    </a-form-item>
                                    <a-row :gutter="16">
                                    <a-col class="gutter-row" :span="16">
                                    <a-form-item>
                                          <a-input size="large" type="text" :placeholder="$t('login.yzm')" v-decorator="['captcha', {rules: [{ required: true, message: `${$t('login.qsryzm')}` }], validateTrigger: 'blur'}]">
                                          <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                                          </a-input>
                                    </a-form-item>
                                    </a-col>
                                    <a-col class="gutter-row" :span="8">
                                    <a-button
                                          v-if="state.smsSendBtn"
                                          class="getCaptcha"
                                          size="large"
                                          :disabled="state.smsSendBtn"
                                          @click.stop.prevent="getCaptcha"
                                          v-text="(state.time+' s')"></a-button>
                                    <a-button
                                          v-if="!state.smsSendBtn"
                                          class="getCaptcha"
                                          size="large"
                                          :disabled="state.smsSendBtn"
                                          @click.stop.prevent="getCaptcha"
                                          v-text="getCode"></a-button>
                                    </a-col>
                                    </a-row>

                                    <a-form-item>
                                          <a-button
                                                size="large"
                                                type="primary"
                                                class="register-button"
                                                @click.stop.prevent="current = '0'"
                                                :disabled="registerBtn">{{$t('login.syb')}}
                                          </a-button>
                                          <a-button
                                                size="large"
                                                type="primary"
                                                htmlType="submit"
                                                class="register-button"
                                                :loading="registerBtn"
                                                @click.stop.prevent="handleSubmit"
                                                :disabled="registerBtn">{{$t('login.zc')}}
                                          </a-button>
                                          <router-link class="login" :to="{ name: 'login' }">{{$t('login.yyzh')}}</router-link>
                                    </a-form-item>

                              </a-form>
                              </div>
                        </a-tab-pane>
                  </a-tabs>
            </div>
      </div>
</template>
<style lang="less">
#register{
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 600px;
      margin: 0 auto;
      .register-box{
            .ant-tabs-bar{
                  border-bottom: none;
                  .ant-tabs-nav-wrap{
                        display: none;
                  }
            }
            .my-tab-content{
                  ul{
                        list-style: none;
                        margin: 0;
                        padding: 40px 0;
                        display: flex;
                        justify-content: space-around;
                        .active{
                              background-color: #21C5C7;
                              color: #fff;
                        }
                        li{
                              width: 24%;
                              border: 1px solid #ccc;
                              padding: 20px 0;
                              border-radius: 5px;
                              display: flex;
                              flex-direction: column;
                              font-size: 16px;
                              align-items: center;
                              background-color: #fff;
                              cursor: pointer;
                              i{
                                    font-size: 40px;
                                    margin-bottom: 20px;
                              }
                        }
                  }
                  .bottom{
                        padding: 40px 10px;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        .my-btn{
                              padding: 10px 70px;
                              height: 40px;
                        }
                  }
                  
            }
            .user-register {
                  &.error {
                        color: #ff0000;
                  }

                  &.warning {
                        color: #ff7e05;
                  }

                  &.success {
                        color: #52c41a;
                  }
            }

            .user-layout-register {
                  margin: 40px 100px 0;
                  & > h3 {
                        font-size: 16px;
                        margin-bottom: 20px;
                  }

                  .getCaptcha {
                        display: block;
                        width: 100%;
                        height: 40px;
                  }

                  .register-button {
                        width: 48%;
                        margin: 0 1%;
                  }

                  .login {
                        float: right;
                        line-height: 40px;
                  }
                  .ant-input-group-addon:first-child {
                        background-color: #fff;
                  }
            }
      }
}
</style>
<script>
import { mixinDevice } from '@/utils/mixin.js'
import { getSmsCaptcha,register } from '@/api/login'
import i18n from '@/lang/index'
const levelNames = {
  0: i18n.t('login.dd'),
  1: i18n.t('login.dd'),
  2: i18n.t('login.zh'),
  3: i18n.t('login.qi')
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default {
      name: 'Register',
      components: {
      },
      mixins: [mixinDevice],
      data(){
            return{
                  getCode: i18n.t('login.hqyzm'),
                  current: "0",
                  activeIndex: "",
                  form: this.$form.createForm(this),
                  state: {
                        time: 60,
                        smsSendBtn: false,
                        passwordLevel: 0,
                        passwordLevelChecked: false,
                        percent: 10,
                        progressColor: '#FF0000'
                  },
                  registerBtn: false
            }
      },
      filters:{
            String2Num(val){
                  return parseInt(val);
            }
      },
      computed: {
            passwordLevelClass () {
                  return levelClass[this.state.passwordLevel]
            },
            passwordLevelName () {
                  return levelNames[this.state.passwordLevel]
            },
            passwordLevelColor () {
                  return levelColor[this.state.passwordLevel]
            }
      },
      methods: {
            handlePasswordLevel (rule, value, callback) {
                  let level = 0
                  // 判断这个字符串中有没有数字
                  if (/[0-9]/.test(value)) {
                  level++
                  }
                  // 判断字符串中有没有字母
                  if (/[a-zA-Z]/.test(value)) {
                  level++
                  }
                  // 判断字符串中有没有特殊符号
                  if (/[^0-9a-zA-Z_]/.test(value)) {
                  level++
                  }
                  this.state.passwordLevel = level
                  this.state.percent = level * 30
                  if (level >= 2) {
                  if (level >= 3) {
                  this.state.percent = 100
                  }
                  callback()
                  } else {
                  if (level === 0) {
                  this.state.percent = 10
                  }
                  callback(new Error(this.$t('login.qdbg')))
                  }
            },
            handlePasswordCheck (rule, value, callback) {
                  const password = this.form.getFieldValue('password')
                  if (value === undefined) {
                  callback(new Error(this.$t('login.qsrmm')))
                  }
                  if (value && password && value.trim() !== password.trim()) {
                  callback(new Error(this.$t('login.byz')))
                  }
                  callback()
            },
            insertDown() {
                  this.state.passwordLevelChecked = true;
            },
            insertUp(){
                  setTimeout(() => {
                        this.state.passwordLevelChecked = false;
                  }, 1500);
            },
            handleSubmit () {
                        if(this.activeIndex == '1'){
                              this.registerActor('/vue/brand')
                        }else if(this.activeIndex == '2'){
                              this.registerActor('/vue/event')
                        }else if(this.activeIndex == '3'){
                              this.registerActor('/vue/agent')
                        }
            },
            goRegister(){
                  if(!this.activeIndex){
                        this.$message.error(this.$t('login.qxzjs'));
                        console.log(this.current)
                  }else{
                        this.current = '1'
                  }
            },
            registerActor(api){
                  const { form: { validateFields }, $router, $notification } = this
                  validateFields((err, values) => {
                  if (!err) {
                        register(api,{username: values.email,password: values.password,code: values.captcha, internationalization: localStorage.lang}).then(res =>{          
                        if(res.status == 200){
                              $router.push({ name: 'registerResult', params: { ...values } })
                        }else{
                              $notification['error']({
                              message: this.$t('login.error'),
                              description: res.info,
                              duration: 8
                        })
                        }
                  })
                  }
                  })
                  
            },
            getCaptcha (e) {
                  e.preventDefault()
                  const { form: { validateFields }, state, $message, $notification } = this
                  validateFields(['email'], { force: true },
                  (err, values) => {
                  if (!err) {
                        state.smsSendBtn = true
                        const interval = window.setInterval(() => {
                        if (state.time-- <= 0) {
                        state.time = 60
                        state.smsSendBtn = false
                        window.clearInterval(interval)
                        }
                        }, 1000)
                        const hide = $message.loading(this.$t('login.yzmfsz'),1)
                        getSmsCaptcha({ username: values.email, internationalization: localStorage.lang }).then(res => {
                              console.log(res)
                              if(res.status == 200){
                                    setTimeout(hide, 1)
                                    $notification['success']({
                                          message: this.$t('login.ts'),
                                          description: this.$t('login.cs'),
                                          duration: 8
                                    })
                              }else if(res.status == 201){
                                    this.$message.error(res.info)
                                    state.time = 60
                                    state.smsSendBtn = false
                              }
                        
                        }).catch(err => {
                              setTimeout(hide, 1)
                              clearInterval(interval)
                              state.time = 60
                              state.smsSendBtn = false
                              this.requestFailed(err)
                        })
                  }
                  }
                  )
            },
            requestFailed (err) {
                  this.$notification['error']({
                        message: this.$t('login.error'),
                        description: ((err.response || {}).data || {}).message || this.$t('login.shzs'),
                        duration: 4
                  })
                  this.registerBtn = false
            },
            
  },
  watch: {
    'state.passwordLevel' (val) {
      console.log(val)
    }
  }
}
</script>
