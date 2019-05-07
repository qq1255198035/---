<template>
      <div id="accountSet">
            <page-header :title="pageTitle"></page-header>
            <a-row :gutter="200" type="flex" justify="center">
                  <a-col :lg="9">
                        <div>
                              <a-form layout="vertical">
                                    <a-form-item label="邮箱">
                                                <a-input placeholder="input placeholder" />
                                    </a-form-item>
                                    <a-form-item label="公司名称">
                                                <a-input placeholder="input placeholder" />
                                    </a-form-item>
                                    <a-form-item label="公司网址">
                                                <a-input placeholder="input placeholder" />
                                    </a-form-item>
                                    <a-form-item label="公司简介">
                                                <a-textarea placeholder="input placeholder" :autosize="{ minRows: 6 }"/>
                                    </a-form-item>
                                    <a-form-item label="国家地区">
                                          <a-select defaultValue="中国">
                                                <a-select-option value="china">中国</a-select-option>
                                                <a-select-option value="hongkong">香港</a-select-option>
                                          </a-select>
                                    </a-form-item>
                                    <a-form-item label="所在省市">
                                          <div class="select-box">
                                                <a-select defaultValue="浙江省">
                                                      <a-select-option value="china">浙江省</a-select-option>
                                                      <a-select-option value="hongkong">吉林省</a-select-option>
                                                </a-select>
                                                <a-select defaultValue="中国">
                                                      <a-select-option value="china">杭州市</a-select-option>
                                                      <a-select-option value="hongkong">长春</a-select-option>
                                                </a-select>
                                          </div>
                                          
                                    </a-form-item>
                                    <a-form-item label="街道地址">
                                                <a-textarea placeholder="input placeholder" :autosize="{ minRows: 6 }"/>
                                    </a-form-item>
                                    <a-form-item label="联系人">
                                                <a-input placeholder="input placeholder" :autosize="{ minRows: 6 }"/>
                                    </a-form-item>
                                    <a-input-group compact>
                                          <a-form-item label="联系电话">
                                                <div class="input-group">
                                                      <a-input style="width: 30%" defaultValue="0571" />
                                                      <a-input style="width: 68%" defaultValue="26888888" />
                                                </div>
                                          </a-form-item>
                                    </a-input-group>
                                    <a-button type="primary">更新信息</a-button>
                              </a-form>
                        </div>
                  </a-col>
                  <a-col :lg="6">
                        <div class="upload">
                              <div class="top">
                                    <p>公司LOGO</p>
                                    <a-avatar :src="imgUrl" :size="130"/>
                                    <template>
                                          <a-upload name="avatar" action="" @change="handleChange" :showUploadList="false">
                                                <a-button>
                                                      <a-icon type="upload" /> 更换LOGO
                                                </a-button>
                                          </a-upload>
                                    </template>
                              </div>
                              <div class="top">
                                    <p>营业执照</p>
                                    <a-avatar :src="imgUrl" :size="130"/>
                                    <template>
                                          <a-upload name="avatar" action="" @change="handleChange" :showUploadList="false">
                                                <a-button>
                                                      <a-icon type="upload" /> 更换营业执照
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
function getBase64 (img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
}
import imgUrl from "@/assets/a1.jpg"
import { mixinsTitle } from "@/utils/mixin.js";
export default {
      data(){
            return{
                  imgUrl
            }
      },
      mixins:[mixinsTitle],
      methods: {
            handleChange (info) {
                  getBase64(info.file.originFileObj, (imgUrl) => {
                        this.imgUrl = imgUrl      
                  })
                  console.log(info)
            }
    },
}
</script>
<style lang="less" scoped>
#accountSet{
      background-color: #fff;
      
      .ant-form-item{
            width: 100%;
      }
      .input-group{
            display: flex;
            justify-content: space-between;
      }
      .select-box{
            display: flex;
            justify-content: space-between;
            .ant-select{
                  width: 49%;
            }
      }
      .upload{
            display: flex;
            flex-direction: column;
            div{
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  .ant-avatar{
                        margin: 20px 0;
                  }
                  p{
                        color: #333;
                  }
            }
            .top{
                  margin-bottom: 40px;
            }
      }
}
</style>
