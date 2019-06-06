<template>
      <div id="register">
            <div class="step-box">
                  <a-steps :current="current | String2Num">
                        <a-step title="选择用户"/>
                        <a-step title="填写信息"/>
                        <a-step title="注册完成"/>
                  </a-steps>
            </div>
            <div class="register-box">
                  <a-tabs :activeKey="current">
                        <a-tab-pane tab="" key="0">
                              <div class="my-tab-content">
                                    <ul>
                                          <li :class="{'active': activeIndex == 1}" @click="activeIndex = 1">
                                                <a-icon type="property-safety"></a-icon>
                                                赞助商
                                          </li>
                                          <li :class="{'active': activeIndex == 2}" @click="activeIndex = 2">
                                                <a-icon type="code-sandbox"></a-icon>
                                                搞手
                                          </li>
                                          <li :class="{'active': activeIndex == 3}" @click="activeIndex = 3">
                                                <a-icon type="usergroup-add"></a-icon>
                                                经纪人
                                          </li>
                                    </ul>
                                    <div class="bottom">
                                          <a-button type="primary" @click="goRegister" class="my-btn">
                                                注册
                                          </a-button>
                                          <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
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
                                    placeholder="邮箱"
                                    v-decorator="['email', {rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }], validateTrigger: ['change', 'blur']}]"
                                    ></a-input>
                                    </a-form-item>

                                    <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
                                    <template slot="content">
                                    <div :style="{ width: '240px' }" >
                                          <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
                                          <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
                                          <div style="margin-top: 10px;">
                                          <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                                          </div>
                                    </div>
                                    </template>
                                    <a-form-item>
                                    <a-input
                                          size="large"
                                          type="password"
                                          @click="handlePasswordInputClick"
                                          autocomplete="false"
                                          placeholder="至少6位密码，区分大小写"
                                          v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
                                    ></a-input>
                                    </a-form-item>
                                    </a-popover>

                                    <a-form-item>
                                    <a-input
                                    size="large"
                                    type="password"
                                    autocomplete="false"
                                    placeholder="确认密码"
                                    v-decorator="['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
                                    ></a-input>
                                    </a-form-item>

                                    <!-- <a-form-item>
                                    <a-input size="large" placeholder="11 位手机号" v-decorator="['mobile', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]">
                                    <a-select slot="addonBefore" size="large" defaultValue="+86">
                                          <a-select-option value="+86">+86</a-select-option>
                                          <a-select-option value="+87">+87</a-select-option>
                                    </a-select>
                                    </a-input>
                                    </a-form-item> -->
                                    <a-row :gutter="16">
                                    <a-col class="gutter-row" :span="16">
                                    <a-form-item>
                                          <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                                          <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                                          </a-input>
                                    </a-form-item>
                                    </a-col>
                                    <a-col class="gutter-row" :span="8">
                                    <a-button
                                          class="getCaptcha"
                                          size="large"
                                          :disabled="state.smsSendBtn"
                                          @click.stop.prevent="getCaptcha"
                                          v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"></a-button>
                                    </a-col>
                                    </a-row>

                                    <a-form-item>
                                          <a-button
                                                size="large"
                                                type="primary"
                                                class="register-button"
                                                @click.stop.prevent="current = '0'"
                                                :disabled="registerBtn">上一步
                                          </a-button>
                                          <a-button
                                                size="large"
                                                type="primary"
                                                htmlType="submit"
                                                class="register-button"
                                                :loading="registerBtn"
                                                @click.stop.prevent="handleSubmit"
                                                :disabled="registerBtn">注册
                                          </a-button>
                                          <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
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
                              border-color: aqua;
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
const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
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
                  callback(new Error('密码强度不够'))
                  }
            },
            handlePasswordCheck (rule, value, callback) {
                  const password = this.form.getFieldValue('password')
                  if (value === undefined) {
                  callback(new Error('请输入密码'))
                  }
                  if (value && password && value.trim() !== password.trim()) {
                  callback(new Error('两次密码不一致'))
                  }
                  callback()
            },
            handlePasswordInputClick () {
                  if (!this.isMobile()) {
                  this.state.passwordLevelChecked = true
                  return
                  }
                  this.state.passwordLevelChecked = false
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
                        this.$message.error('请选择要注册的角色！');
                        console.log(this.current)
                  }else{
                        this.current = '1'
                  }
            },
            registerActor(api){
                  const { form: { validateFields }, $router, $notification } = this
                  validateFields((err, values) => {
                  if (!err) {
                        register(api,{username: values.email,password: values.password,code: values.captcha}).then(res =>{          
                        if(res.status == 200){
                              $router.push({ name: 'registerResult', params: { ...values } })
                        }else{
                              $notification['error']({
                              message: '错误',
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
                        const hide = $message.loading('验证码发送中..', 0)
                        getSmsCaptcha({ username: values.email }).then(res => {
                              if(res.status == 200){
                                    setTimeout(hide, 2500)
                                    $notification['success']({
                                          message: '提示',
                                          description: '验证码获取成功，请查收！',
                                          duration: 8
                                    })
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
                        message: '错误',
                        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
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
