<template>
      <div id="dkxx">
            <page-header :title="pageTitle"></page-header>
            <div class="form-box">
                  <a-form :form="form" @submit="handleSubmit">
                        <a-form-item :label="$t('admin.hdmc')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-select :placeholder="$t('issuer.hdgl.pleaseChoose')" @change="selectName" v-decorator="[
                                    'hdmc',{rules: [{ required: true, message: `${$t('admin.qxzhdmc')}` }]}]">
                                    <a-select-option v-for="item in hdmc" :value="item.campId"  :key="item.name">{{ item.name }}</a-select-option>
                              </a-select>
                        </a-form-item>
                        <a-form-item :label="$t('admin.hkyt')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-select @change="selectWay" :placeholder="$t('issuer.hdgl.pleaseChoose')" v-decorator="[
                                    'hkyt',{rules: [{ required: true, message: `${$t('admin.qxzhkyt')}` }]}]">
                                    <a-select-option v-for="(item,index) in hkfs" :value="item.type + ',' +item.recordId" :key="index">{{ item.details }}</a-select-option>
                              </a-select>
                        </a-form-item>
                        <a-form-item :label="$t('admin.fkgs')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('issuer.notices.pleaseEnter')" v-decorator="['fkgs',{rules: [{ required: true, message: `${$t('admin.qtxfkgs')}` }]}]"/>
                        </a-form-item>
                        <a-form-item :label="$t('admin.fkzh')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('issuer.notices.pleaseEnter')" type="number" v-decorator="['fkzh',{rules: [{ required: true, message: `${$t('admin.qtxfkzh')}` }]}]"/>
                        </a-form-item>
                        <a-form-item :label="$t('admin.fkgs')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('issuer.notices.pleaseEnter')" v-decorator="['skgs',{rules: [{ required: true, message: `${$t('admin.qtxskgs')}` }]}]"/>
                        </a-form-item>
                        <a-form-item :label="$t('admin.skzh')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('issuer.notices.pleaseEnter')" type="number" v-decorator="['skzh',{rules: [{ required: true, message: `${$t('admin.qtxskzh')}` }]}]"/>
                        </a-form-item>
                        <a-form-item :label="$t('admin.skyhkhh')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('issuer.notices.pleaseEnter')" v-decorator="['khh',{rules: [{ required: true, message: `${$t('admin.qtxkhh')}` }]}]"/>
                        </a-form-item>
                        <a-form-item :label="$t('admin.ycje')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('issuer.notices.pleaseEnter')" type="number" v-decorator="['ycje',{rules: [{ required: true, message: `${$t('admin.qtxycje')}` }]}]"/>
                        </a-form-item>
                        <a-form-item :label="$t('admin.sxf')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('issuer.notices.pleaseEnter')" type="number" v-decorator="['sxf',{rules: [{ required: true, message: `${$t('admin.qtxsxf')}`}]}]"/>
                        </a-form-item>
                        <a-form-item :label="$t('admin.wk')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input :placeholder="$t('issuer.notices.pleaseEnter')" type="number" v-decorator="['wk',{rules: [{ required: true, message: `${$t('admin.qtxwk')}` }]}]"/>
                        </a-form-item>
                        <a-form-item :label="$t('admin.bz')" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-textarea :placeholder="$t('issuer.notices.pleaseEnter')" v-decorator="['bz',{rules: [{ required: false, message:`${$t('admin.qtxbz')}` }]}]"/>
                        </a-form-item>
                        <a-form-item style="margin-top:24px; display: flex; justify-content: center;">
                              <a-button type="primary" htmlType="submit" class="btn">{{$t('admin.tj')}}</a-button>
                              <a-button class="btn" @click="$router.go(-1)">{{$t('admin.qx')}}</a-button>
                        </a-form-item>
                  </a-form>
            </div>
            
      </div>
</template>
<script>
import { mixinsTitle } from "@/utils/mixin.js";
import { allCamp,allCampway,addTransferMoney } from "@/api/admin";
export default {
      mixins:[mixinsTitle],
      data(){
            return{
                  pageTitle: null,
                  form: this.$form.createForm(this),
                  hdmc:[],
                  hkfs:[],
                  typyName: ''
            }
      },
      mounted(){
            this.getAllCamp();
      },
      methods:{
            getAllCamp(){
                  allCamp().then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.hdmc = res.data
                        }
                  })
            },
            getAllCampway(campId){
                  allCampway(campId).then(res=>{
                        if (res.code == 1000) {
                              console.log(res)
                              this.hkfs = res.data
                        }
                  })
            },
            selectName(value) {
                 
                  this.getAllCampway(value)
            },
            selectWay(value,key) {
                  
            },
            postAddTransferMoney(payCompany, receiveCompany, payment, balance, payAccount, bz, receiveAccount, receiveBank, serviceCharge, campId, type, recordId){
                  addTransferMoney(payCompany, receiveCompany, payment, balance, payAccount, bz, receiveAccount, receiveBank, serviceCharge, campId, type, recordId).then(res=>{
                        if (res.code == 1000) {
                              this.$message.success(this.$t('issuer.hdgl.czcg'));
                              this.$router.push({name:'dkjl'})
                              window.location.reload()
                        }    
                       
                  })
            },
            handleSubmit(e){
                  e.preventDefault();
                  this.form.validateFields((err,values) => {
                        if (!err) {
                              let type = values.hkyt.split(",")[0]
                              let recordId = values.hkyt.split(",")[1]
                              console.log(type)
                              console.log(recordId)
                              this.postAddTransferMoney(values.fkgs,values.skgs,values.ycje,values.wk,values.fkzh,values.skzh,values.bz,values.khh,values.sxf,values.hdmc,type,recordId)
                        }
                  },);
            }
      }
}
</script>
<style lang="less" scoped>
#dkxx{
      margin: -24px -24px 0px;
      background-color: #fff;
      .form-box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 0;
            form{
                  width: 50%;
                  .btn{
                        margin: 0 20px;
                  }
            }
      }

}
</style>
