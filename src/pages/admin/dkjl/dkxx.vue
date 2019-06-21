<template>
      <div id="dkxx">
            <page-header :title="pageTitle"></page-header>
            <div class="form-box">
                  <a-form :form="form" @submit="handleSubmit">
                        <a-form-item label="活动名称" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-select placeholder="请选择" @change="selectName" v-decorator="[
                                    'hdmc',{rules: [{ required: true, message: '请选择活动名称' }]}]">
                                    <a-select-option v-for="item in hdmc" :value="item.campId"  :key="item.name">{{ item.name }}</a-select-option>
                              </a-select>
                        </a-form-item>
                        <a-form-item label="汇款用途" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-select @change="selectWay" placeholder="请选择" v-decorator="[
                                    'hkyt',{rules: [{ required: true, message: '请选择活动名称' }]}]">
                                    <a-select-option v-for="(item,index) in hkfs" :value="item.type + ',' +item.recordId" :key="index">{{ item.details }}</a-select-option>
                              </a-select>
                        </a-form-item>
                        <a-form-item label="付款公司" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="请输入" v-decorator="['fkgs',{rules: [{ required: true, message: '请填写付款公司' }]}]"/>
                        </a-form-item>
                        <a-form-item label="付款账号" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="请输入" type="number" v-decorator="['fkzh',{rules: [{ required: true, message: '请填写付款账号' }]}]"/>
                        </a-form-item>
                        <a-form-item label="收款公司" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="请输入" v-decorator="['skgs',{rules: [{ required: true, message: '请填写收款公司' }]}]"/>
                        </a-form-item>
                        <a-form-item label="收款账号" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="请输入" type="number" v-decorator="['skzh',{rules: [{ required: true, message: '请填写收款账号' }]}]"/>
                        </a-form-item>
                        <a-form-item label="收款银行开户行" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="请输入" v-decorator="['khh',{rules: [{ required: true, message: '请填写开户行' }]}]"/>
                        </a-form-item>
                        <a-form-item label="预付金额" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="请输入" type="number" v-decorator="['ycje',{rules: [{ required: true, message: '请填写预存金额' }]}]"/>
                        </a-form-item>
                        <a-form-item label="手续费" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="请输入" type="number" v-decorator="['sxf',{rules: [{ required: true, message: '请填写手续费' }]}]"/>
                        </a-form-item>
                        <a-form-item label="尾款" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-input placeholder="请输入" type="number" v-decorator="['wk',{rules: [{ required: true, message: '请填写尾款金额' }]}]"/>
                        </a-form-item>
                        <a-form-item label="备注" class="my-form-item" :wrapperCol="{span: 14, offset: 1}" :labelCol="{span: 4}">
                              <a-textarea placeholder="请输入" v-decorator="['bz',{rules: [{ required: true, message: '请填写备注' }]}]"/>
                        </a-form-item>
                        <a-form-item style="margin-top:24px; display: flex; justify-content: center;">
                              <a-button type="primary" htmlType="submit" class="btn">提交</a-button>
                              <a-button class="btn" @click="$router.go(-1)">取消</a-button>
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
                              this.$message.success('操作成功');
                              this.$router.push({name:'dkjl'})
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
