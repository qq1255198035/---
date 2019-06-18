0<template>
  <div id="cjhd">
    <page-header :title="pageTitle"></page-header>
    <div class="cjhd-header">
      <a-card title="活动进度">
        <div class="secetion">
          <a-steps :current="0">
            <a-popover slot="progressDot" slot-scope="{index, status, prefixCls}">
              <template slot="content">
                <span>step {{index}} status: {{status}}</span>
              </template>
              <span :class="`${prefixCls}-icon-dot`"></span>
            </a-popover>
            <a-step title="创建活动"/>
            <a-step title="平台审核"/>
            <a-step title="活动进行中"/>
            <a-step title="完成"/>
          </a-steps>
        </div>
      </a-card>
    </div>
    <div class="cjhd-content">
      <a-list itemLayout="horizontal" :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <a-list-item-meta>
            <a slot="title">{{ item.title }}</a>
            <span slot="description">
              <span class="security-list-description">{{ item.description }}</span>
              <span v-if="item.value">:</span>
              <span class="security-list-value">{{ item.value }}</span>
            </span>
          </a-list-item-meta>
          <template v-if="item.actions">
            <a slot="actions" @click="showModal(index,item)">{{ item.actions.title }}</a>
          </template>
        </a-list-item>
      </a-list>
      <div class="btn-bottom">
        <a-button>取消</a-button>
        <a-button type="primary" @click="sunmitBtn">提交审批</a-button>
      </div>
      <a-alert v-if="alertVisible" banner description="必须先填写活动基本信息" showIcon/>
      <a-modal
        :title="title"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
        :width="1040"
        wrapClassName="info-box"
        :getContainer="getContainer"
      >
        <a-form layout="horizontal" :form="form" @submit="handleSubmit">
          <div class="info-item" v-if="formShow == 0">
            <div class="left">
              <a-form-item
                label="中文名称"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input
                  :placeholder="chinese"
                  class="my-input"
                  autocomplete="false"
                  v-decorator="['chineseName',{rules: [{ required: true, message: '请输入中文名称' }, { validator: this.testChinese }], validateTrigger: ['change', 'blur']}]"
                />
              </a-form-item>
              <a-form-item
                label="英文名称"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input
                  :placeholder="english"
                  class="my-input"
                  autocomplete="false"
                  v-decorator="['englishName',{rules: [{ required: true, message: '请输入英文' }, { validator: this.testEnglish }], validateTrigger: ['change', 'blur']}]"
                />
              </a-form-item>
              <a-form-item label="选择日期" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                <a-range-picker
                  style="width: 100%;"
                  @change="onChangeDate"
                  :placeholder="times"
                  v-decorator="['startName',{rules: [{ required: true, message: '请输入时间' }]}]"
                />
              </a-form-item>
              <a-form-item label="选择时间" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
                <a-time-picker
                  @change="onChangeTime"
                  :placeholder="concreteTime"
                  v-decorator="['changetimer',{rules: [{ required: true, message: '请输入时间' }]}]"
                />
              </a-form-item>
              <a-form-item
                label="选择地点"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
                :required="true"
              >
                <a-input-group compact style="width: 93%; margin-right: 8px">
                  <a-select labelInValue :defaultValue="{key: '请选择'}" @change="onChangepro">
                    <a-select-option
                      v-for="(item, index) in cityPlace"
                      :key="index"
                      :value="item.label"
                    >{{item.value}}</a-select-option>
                  </a-select>
                  <a-input
                    style="width: 68%"
                    placeholder="北京市"
                    v-decorator="['placeName',{rules: [{ required: true, message: '请输入地址' }, { validator: this.handPlace }], validateTrigger: ['change', 'blur']}]"
                  />
                </a-input-group>
              </a-form-item>
              <a-form-item>
                <a-list itemLayout="horizontal" :dataSource="areaList">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="detelList(index)">删除</a>
                    <a-list-item-meta>
                      <a slot="title">{{item.titleValue}}</a>
                      <a slot="title" class="addressPaading">{{item.address}}</a>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </a-form-item>
              <!--<a-form-item
                v-for="(k, index) in form.getFieldValue('keys')"
                :key="k"
                v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
                :required="false"
              >
                <a-input-group compact style="width: 93%; margin-right: 8px">
                  <a-select labelInValue :defaultValue="{key: '请选择'}" @change="onChangepro1">
                    <a-select-option v-for="(item, index) in cityPlace" :key="index" :value="item.value">{{item.value}}</a-select-option>
                  </a-select>
                  <a-input style="width: 70%" defaultValue="北京市"/>
                </a-input-group>
                <a-icon
                  v-if="form.getFieldValue('keys').length >= 0 "
                  class="dynamic-delete-button"
                  type="minus-circle-o"
                  :disabled="form.getFieldValue('keys').length === 0"
                  @click="() => remove(k)"
                />
              </a-form-item>-->
              <a-form-item v-bind="formItemLayoutWithOutLabel">
                <a-button type="dashed" style="width: 100%" @click="addList">
                  <a-icon type="plus"/>添加
                </a-button>
              </a-form-item>
              <a-form-item
                label="电子邮件"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input
                  :placeholder="email"
                  class="my-input"
                  type="email"
                  v-decorator="['emailName',{rules: [{ required: true, message: '请输入电子邮箱' }, { validator: this.testEmail }], validateTrigger: ['change', 'blur']}]"
                />
              </a-form-item>
            </div>
            <div class="right">
              <a-form-item
                label="活动分类"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-select
                  labelInValue
                  :defaultValue="{key: `${campName}`}"
                  @change="onChangeClassify"
                >
                  <a-select-option
                    v-for="(item, index) in classify"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item
                label="参赛人数"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input-number v-model="campNum" class="my-input" :min="1" @change="handCampNum"/>
              </a-form-item>
              <a-form-item
                label="联系人"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input
                  :placeholder="contact"
                  class="my-input"
                  v-decorator="['testName',{rules: [{ required: true, message: '请输入名字' }, { validator: this.handName }], validateTrigger: ['change', 'blur']}]"
                />
              </a-form-item>
              <a-form-item
                label="联系电话"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input-group>
                  <a-col :span="8">
                    <a-input
                      defaultValue="0571"
                      :placeholder="phoneFirst"
                      v-decorator="['phoneFirst',{rules: [{ required: true, message: '请输入电话号' }, { validator: this.handPhoneFirst }], validateTrigger: ['change', 'blur']}]"
                    />
                  </a-col>
                  <a-col :span="16">
                    <a-input
                      :placeholder="phoneLast"
                      defaultValue="26888888"
                      v-decorator="['phoneLast',{rules: [{ required: true, message: '请输入电话号' }, { validator: this.handPhoneLast }], validateTrigger: ['change', 'blur']}]"
                    />
                  </a-col>
                </a-input-group>
              </a-form-item>
              <a-form-item
                label="上传封面"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-upload
                  name="avatar"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  :beforeUpload="beforeUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar">
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">上传</div>
                  </div>
                </a-upload>
                <span>建议尺寸 200 * 300</span>
              </a-form-item>
            </div>
          </div>
          <!--活动详情-->
          <div class="info-item-column" v-if="formShow == 1">
            <a-form-item
              label="活动内容"
              class="my-form-item"
              :wrapperCol="{span: 18, offset: 1}"
              :labelCol="{span: 4}"
            >
              <a-textarea
                :placeholder="activityContent"
                class="my-input"
                maxlength="300"
                v-decorator="['textName',{rules: [{ required: true, message: '请输入公司名称' }, { validator: this.handTextarea }], validateTrigger: ['change', 'blur']}]"
                :autosize="{ minRows: 4, maxRows: 6 }"
              />
            </a-form-item>
            <a-form-item
              label="上传视频"
              class="my-form-item"
              :wrapperCol="{span: 18, offset: 1}"
              :labelCol="{span: 4}"
            >
              <a-upload
                name="avatar"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                :beforeUpload="beforeUploadVideo"
              >
                <video v-if="videoUrl" height="180" width="180" :src="videoUrl" controls></video>
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'"/>
                  <div class="ant-upload-text">上传</div>
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item label="上传多张图片" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
              <a-upload
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="beforeChangeMore"
              >
                <div v-if="fileList.length < 9">
                  <a-icon type="plus"/>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg">
                <img alt="example" style="width: 100%" :src="previewImage">
              </a-modal>
            </a-form-item>
          </div>
          <!---->
          <div class="info-item" v-if="formShow == 2">
            <div class="left">
              <a-form-item
                label="主承办方"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
                class="my-form-item"
              >
                <a-input-group compact style="width: 93%; margin-right: 8px">
                  <a-select labelInValue :defaultValue="{key: '请选择'}" @change="companyBtn">
                    <a-select-option value="主办方">主办方</a-select-option>
                    <a-select-option value="承办方">承办方</a-select-option>
                    <a-select-option value="协办方">协办方</a-select-option>
                  </a-select>
                  <a-input
                    style="width: 66%"
                    defaultValue="公司名称"
                    v-decorator="['companyName',{rules: [{ required: true, message: '请输入公司名称' }, { validator: this.handCompany }], validateTrigger: ['change', 'blur']}]"
                  />
                </a-input-group>
              </a-form-item>
              <a-form-item>
                <a-list itemLayout="horizontal" :dataSource="companyList">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="detelCompany(index)">删除</a>
                    <a-list-item-meta>
                      <a slot="title">{{item.workType}}</a>
                      <a slot="title" class="addressPaading">{{item.name}}</a>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </a-form-item>
              <!--<a-form-item
                v-for="(k, index) in form.getFieldValue('keys')"
                :key="k"
                v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
                :required="false"
                class="my-form-item"
              >
                <a-input-group compact style="width: 93%; margin-right: 8px">
                  <a-select defaultValue="主办方">
                    <a-select-option value="主办方">主办方</a-select-option>
                    <a-select-option value="承办方">承办方</a-select-option>
                    <a-select-option value="协办方">协办方</a-select-option>
                  </a-select>
                  <a-input style="width: 70%" defaultValue="公司名称"/>
                </a-input-group>
                <a-icon
                  v-if="form.getFieldValue('keys').length > 1"
                  class="dynamic-delete-button"
                  type="minus-circle-o"
                  :disabled="form.getFieldValue('keys').length === 1"
                  @click="() => remove(k)"
                />
              </a-form-item>-->
              <a-form-item v-bind="formItemLayoutWithOutLabel">
                <a-button type="dashed" style="width: 100%" @click="addCompany">
                  <a-icon type="plus"/>添加
                </a-button>
              </a-form-item>
              <a-form-item
                label="播放平台"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input placeholder="请输入播放平台" class="my-input" v-model="palyPlatfrom"/>
              </a-form-item>
              <a-form-item
                label="活动特点"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
                class="my-form-item"
              >
                <div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">活动级别</span>
                  <div>
                    <a-checkable-tag
                      v-for=" tag in tags"
                      :key="tag.id"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>
                <div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">适合企业</span>
                  <div>
                    <a-checkable-tag
                      v-for=" tag in tags1"
                      :key="tag.id"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag.id, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>
                <div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">覆盖范围</span>
                  <div>
                    <a-checkable-tag
                      :key="tag.id"
                      v-for=" tag in tags2"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag.id, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>
                <div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">活动特点</span>
                  <div>
                    <a-checkable-tag
                      v-for=" tag in tags3"
                      :key="tag.id"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag.id, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>
              </a-form-item>
            </div>
            <div class="right">
              <a-form-item
                label="受众群众"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
                class="my-form-item"
              >
                <div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">年龄段</span>
                  <div>
                    <a-checkable-tag
                      v-for=" tag in tags4"
                      :key="tag.id"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag.id, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>
                <div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">社会属性</span>
                  <div>
                    <a-checkable-tag
                      v-for=" tag in tags5"
                      :key="tag.id"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag.id, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>
                <div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">消费特征</span>
                  <div>
                    <a-checkable-tag
                      :key="tag.id"
                      v-for=" tag in tags6"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag.id, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>
                <div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">职业特征</span>
                  <div>
                    <a-checkable-tag
                      v-for=" tag in tags7"
                      :key="tag.id"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag.id, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>
                <!--<div class="my-tag-box">
                  <span :style="{ marginRight: 8 }">地域</span>
                  <div>
                    <a-checkable-tag
                      v-for=" tag in tags8"
                      :key="tag.id"
                      :checked="selectedTags.indexOf(tag) > -1"
                      @change="(checked) => handleChangeT(tag, checked)"
                      class="my-tag"
                    >{{tag.name}}</a-checkable-tag>
                  </div>
                </div>-->
              </a-form-item>
            </div>
          </div>
          <!---->
          <div class="info-item-column" v-if="formShow == 3">
            <a-form-item
              label="招商截止日期"
              class="my-form-item"
              :wrapperCol="{span: 20, offset: 1}"
              :labelCol="{span: 3}"
            >
              <a-date-picker
                @change="onClosingDate"
                v-decorator="['closingDate',{rules: [{ required: true, message: '请输入时间' }]}]"
              />
            </a-form-item>
            <a-form-item
              label="赞助要求"
              class="my-form-item"
              :wrapperCol="{span: 20, offset: 1}"
              :labelCol="{span: 3}"
            >
              <a-table
                :columns="columns"
                :dataSource="dataTable"
                :pagination="false"
                :loading="memberLoading"
              >
                <template
                  v-for="(col, i) in ['tgWay', 'zzWay', 'zzPrice','zzNum','isPrice','remarks']"
                  :slot="col"
                  slot-scope="text, record"
                >
                  <a-input
                    :key="col"
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    :placeholder="columns[i].title"
                    @change="e => handleChange2(e.target.value, record.key, col)"
                  />
                  <template v-else>{{ text }}</template>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <template v-if="record.editable">
                    <span v-if="record.isNew">
                      <a @click="saveRow(record)">添加</a>
                      <a-divider type="vertical"/>
                      <a-popconfirm title="是否要删除此行？" @confirm="remove1(record.key)">
                        <a>删除</a>
                      </a-popconfirm>
                    </span>
                    <span v-else>
                      <a @click="saveRow(record)">保存</a>
                      <a-divider type="vertical"/>
                      <a @click="cancel(record.key)">取消</a>
                    </span>
                  </template>
                  <span v-else>
                    <a @click="toggle(record.key)">编辑</a>
                    <a-divider type="vertical"/>
                    <a-popconfirm title="是否要删除此行？" @confirm="remove1(record.key)">
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                </template>
              </a-table>
              <a-button
                style="width: 100%; margin-top: 16px; margin-bottom: 8px"
                type="dashed"
                icon="plus"
                @click="newMember"
              >新增成员</a-button>
            </a-form-item>
            <a-form-item
              label="合作要求"
              class="my-form-item"
              :wrapperCol="{span: 20, offset: 1}"
              :labelCol="{span: 3}"
            >
              <a-textarea
                placeholder="请输入备注"
                class="my-input"
                :autosize="{ minRows: 4, maxRows: 6 }"
                v-model="requirdContent"
              />
            </a-form-item>
          </div>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<style lang="less" scoped>
#cjhd {
  padding: 20px 30px;
  .cjhd-header {
    .ant-card-bordered {
      border: 0;
    }
  }
  .cjhd-content {
    margin-top: 20px;
    background-color: #fff;
    padding: 30px 50px;
    .info-box {
      .info-item {
        display: flex;
        justify-content: space-between;
        > div {
          width: 49%;
          .my-form-item {
            width: 100%;
            display: flex;
            .my-tag-box {
              display: flex;
              > span {
                margin-right: 10px;
                min-width: 56px;
                text-align: right;
              }
              .my-tag {
                border: 1px solid #ccc;
              }
            }

            .ant-form-item-control-wrapper {
              width: 90%;
            }
            .avatar-uploader {
              img {
                width: 128px;
                height: 128px;
              }
            }
          }
        }
      }
    }
    .btn-bottom {
      padding-top: 20px;
      border-top: 1px solid #ccc;
      display: flex;
      justify-content: flex-end;
      button {
        margin: 0 10px;
      }
    }
    .addressPaading {
      padding-left: 20px;
    }
  }
}
</style>
<script>
let id = 0
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
import { mixinsTitle } from '@/utils/mixin.js'
import {
  getPlace,
  getActivityTest,
  getActivityInformation,
  getCheckActivitiesDetail,
  getExtension,
  getSponsor,
  getClassify,
  getActivityModification,
  getUpload,
  getDetailsActivity,
  getActivityPromotion,
  getEventSponsorship,
  getSubmitAudit
} from '@/api/hand'
import { mapGetters } from 'vuex'
export default {
<<<<<<< HEAD
      mixins:[mixinsTitle],
      data () {
            return {
                  visible: false,
                  confirmLoading: false,
                  city: "",
                  formShow: -1,
                  title:'',
                  pageTitle: null,
                  loading: false,
                  imageUrl: '',
                  previewVisible: false,
                  previewImage: '',
                  tags: ['业余赛', '职业赛', '顶级IP', '大众体育','校园赛','顶级联赛'],
                  tags1: ['传媒', '地产', '服装', '汽车','通讯','金融','快消', '零售', '运动装备', '广告公关','互联网IT'],
                  tags2: ['市级', '省级', '全国', '国内及国外'],
                  tags3: ['覆盖广', '奖金高', '历史悠久', '美女如云'],
                  tags4: ['0-10', '11-20'],
                  tags5: ['主妇', '外籍人士', '大学生', '公务员','精英','白领'],
                  tags6: ['追星', '夜生活', '发烧友', '个性'],
                  tags7: ['职业经理', '职员', '学生', '自由职业','老板'],
                  tags8: ['一线城市', '二线城市', '三线城市', '国际性都市'],
                  selectedTags: [],
                  fileList: [{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                  }],
                  data: [
                        { title: '活动基本信息', description: '活动详细内容编辑', value: '', actions: { title: '修改'}},
                        { title: '活动详情', description: '设置活动详细信息以及推广内容设置', value: '', actions: { title: '修改'} },
                        { title: '活动推广', description: '把自己的活动推广到社交平台以及微媒平台上', value: '', actions: { title: '修改'} },
                        { title: '活动赞助', description: '把自己的活动赞助情况设置', value: '', actions: { title: '修改'} },
                        { title: '报名', description: '设置报名信息，用户分组/售票等设置', value: '', actions: { title: '修改' } }
                  ],
                  formItemLayout: {
                        labelCol: {
                               span: 4
                              
                        },
                        wrapperCol: {
                              span: 18, offset: 5
                              
                        },
                  },
                  formItemLayoutWithOutLabel: {
                        wrapperCol: {
                               span: 18, offset: 5
                               }
                             
                  },
                  memberLoading: false,
                  columns: [
                        {
                              title: '推广形式',
                              dataIndex: 'tgWay',
                              key: 'tgWay',
                              width: '15%',
                              scopedSlots: { customRender: 'tgWay' }
                        },
                        {
                              title: '赞助形式',
                              dataIndex: 'zzWay',
                              key: 'zzWay',
                              width: '15%',
                              scopedSlots: { customRender: 'zzWay' }
                        },
                        {
                              title: '赞助金额',
                              dataIndex: 'zzPrice',
                              key: 'zzPrice',
                              width: '15%',
                              scopedSlots: { customRender: 'zzPrice' }
                        },
                        {
                              title: '赞助名额',
                              dataIndex: 'zzNum',
                              key: 'zzNum',
                              width: '15%',
                              scopedSlots: { customRender: 'zzNum' }
                        },
                        {
                              title: '是否议价',
                              dataIndex: 'isPrice',
                              key: 'isPrice',
                              width: '15%',
                              scopedSlots: { customRender: 'isPrice' }
                        },
                        {
                              title: '备注',
                              dataIndex: 'remarks',
                              key: 'remarks',
                              width: '12%',
                              scopedSlots: { customRender: 'remarks' }
                        },
                        {
                              title: '操作',
                              key: 'action',
                              scopedSlots: { customRender: 'operation' }
                        }
                  ],
                  dataTable: [
                        {
                              key: '1',
                              tgWay: '冠名赞助',
                              zzWay: '现金+实物',
                              editable: false,
                              zzPrice: '67890',
                              zzNum: '2',
                              isPrice: '否',
                              remarks: '无'
                        },
                        {
                              key: '2',
                              tgWay: '冠名赞助',
                              zzWay: '现金+实物',
                              editable: false,
                              zzPrice: '67890',
                              zzNum: '2',
                              isPrice: '否',
                              remarks: '无'
                        },
                        {
                              key: '3',
                              tgWay: '冠名赞助',
                              zzWay: '现金+实物',
                              editable: false,
                              zzPrice: '67890',
                              zzNum: '2',
                              isPrice: '否',
                              remarks: '无'
                        },
                  ],
            }
      },
      
      methods:{  
            showModal(index,item) {
                  this.visible = true
                  this.title = item.title
                  this.formShow = index;
                  console.log(index)
            },
            onChangepro(value){
                  console.log(value);
            },
            onChangeDate(date, dateString) {
                  //dateString 选择日期 Arr
                  console.log(dateString);
            },
             onChangeTime(date, dateString) {
                  //dateString 选择时间 Str
                  console.log(dateString);
            },
            handleOk(e) {
                  this.ModalText = 'The modal will be closed after two seconds';
                  this.confirmLoading = true;
                  setTimeout(() => {
                  this.visible = false;
                  this.confirmLoading = false;
                  }, 2000);
            },
            handleCancel(e) {
                  console.log('Clicked cancel button');
                  this.visible = false
                  
            },
            getContainer(){
                  return document.querySelector('.cjhd-content')
            },
             remove  (k) {
                  const { form } = this;
                  // can use data-binding to get
                  const keys = form.getFieldValue('keys');
                  // We need at least one passenger
                  if (keys.length === 1) {
                        return;
                  }
            // can use data-binding to set
                  form.setFieldsValue({
                        keys: keys.filter(key => key !== k),
                  });
            },
            add  () {
                  const { form } = this;
                  console.log(form)
                  // can use data-binding to get
                  const keys = form.getFieldValue('keys');
                  const nextKeys = keys.concat(++id);
                  // can use data-binding to set
                  // important! notify form to detect changes
                  form.setFieldsValue({
                  keys: nextKeys,
                  });
            },
            handleChange (info) {
                  if (info.file.status === 'uploading') {
                  this.loading = true
                  return
                  }
                  if (info.file.status === 'done') {
                  // Get this url from response in real world.
                  getBase64(info.file.originFileObj, (imageUrl) => {
                  this.imageUrl = imageUrl
                  this.loading = false
                  })
                  }
            },
            beforeUpload (file) {
                  const isJPG = file.type === 'image/jpeg'
                  if (!isJPG) {
                  this.$message.error('You can only upload JPG file!')
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2
                  if (!isLt2M) {
                  this.$message.error('Image must smaller than 2MB!')
                  }
                  return isJPG && isLt2M
            },
            handleCancel1 () {
                  this.previewVisible = false
            },
            handlePreview (file) {
                  this.previewImage = file.url || file.thumbUrl
                  this.previewVisible = true
            },
            handleChange1 ({ fileList }) {
                  this.fileList = fileList
            },
            //
            handleChangeT (tag, checked) {
                  const { selectedTags } = this
                  const nextSelectedTags = checked
                  ? [...selectedTags, tag]
                  : selectedTags.filter(t => t !== tag)
                  console.log('You are interested in: ', nextSelectedTags)
                  this.selectedTags = nextSelectedTags
            },
            newMember () {
                  const length = this.dataTable.length
                  this.dataTable.push({
                        key: length === 0 ? '1' : (parseInt(this.dataTable[length - 1].key) + 1).toString(),
                        tgWay: '',
                        zzWay: '',
                        zzPrice: '',
                        zzNum: '',
                        isPrice: '',
                        remarks: '',
                        editable: true,
                        isNew: true
                  })
            },
            saveRow (record) {
                  this.memberLoading = true
                  const { key, tgWay, zzWay, zzPrice, zzNum, isPrice,remarks} = record
                  if (!tgWay || !zzWay || !zzPrice || !zzNum || !isPrice) {
                  this.memberLoading = false
                  this.$message.error('请填写完整成员信息。')
                  return
                  }
                  // 模拟网络请求、卡顿 800ms
                  new Promise((resolve) => {
                  setTimeout(() => {
                  resolve({ loop: false })
                  }, 800)
                  }).then(() => {
                        const target = this.dataTable.filter(item => item.key === key)[0]
                        target.editable = false
                        target.isNew = false
                        this.memberLoading = false
                  })
            },
            remove1 (key) {
                  const newData = this.dataTable.filter(item => item.key !== key)
                  this.dataTable = newData
            },
            toggle (key) {
                  const target = this.dataTable.filter(item => item.key === key)[0]
                  target.editable = !target.editable
            },
            handleChange2 (value, key, column) {
                  const newData = [...this.dataTable]
                  const target = newData.filter(item => key === item.key)[0]
                  if (target) {
                  target[column] = value
                  this.dataTable = newData
                  }
            },
            getRowByKey (key, newData) {
                  const data = this.dataTable
                  return (newData || data).filter(item => item.key === key)[0]
            },
            cancel (key) {
                  const target = this.dataTable.filter(item => item.key === key)[0]
                  target.editable = false
            },
      },
      beforeCreate () {
            this.form = this.$form.createForm(this);
            console.log(this.form)
            this.form.getFieldDecorator('keys', { initialValue: [], preserve: true });
=======
  mixins: [mixinsTitle],
  data() {
    return {
      visible: false,
      confirmLoading: false,
      times: [],
      city: '',
      cityPlace: '', //活动地点
      cityList: [],
      campName: '',
      classify: '', //活动分类
      chinese: '', //中文
      english: '', //英文
      publishTime: '', //开始时间
      endTime: '', //结束时间
      concreteTime: '', //选择时间
      area1: '', //地点id
      areaList: [],
      areaKeys: [],
      addressArry: [],
      areaValue: '',
      area: [],
      fileUrl: '', //图片路径
      listKey: '',
      address: '', //地点详情
      email: '', //电子邮件
      campCatalog: '', //活动分类
      campNum: 1, //人数
      contact: '', //联系人
      phoneFirst: '',
      phoneLast: '',
      coverImg: '', //图片
      activityContent: '', // 活动内容
      detailImgs: '', // 活动详情多张图片
      videoUrl: '', // 视频
      videoUrls: '', // 视频路径
      companyList: [], // 公司
      companyJson: {},
      palyPlatfrom: '', //播放平台
      characteristic: '', // 活动特点
      closingDate: '', // 招商截止时间
      supportJson: {},
      supportAyyty: [],
      requirdContent: '',
      activeityDetail: '',
      activeityInfo: '',
      activeityExtension: '',
      activeitySponsor: '',
      formShow: -1,
      alertVisible: false,
      title: '',
      pageTitle: null,
      loading: false,
      imageUrl: '',
      previewVisible: false,
      findIndex: '',
      previewImage: '',
      selectedTags: [],
      tags: [],
      tags1: [],
      tags2: [],
      tags3: [],
      tags4: [],
      tags5: [],
      tags6: [],
      tags7: [],
      tags8: [],
      fileList: [],
      data: [
        { title: '活动基本信息', description: '活动详细内容编辑', value: '', actions: { title: '修改' } },
        { title: '活动详情', description: '设置活动详细信息以及推广内容设置', value: '', actions: { title: '修改' } },
        {
          title: '活动推广',
          description: '把自己的活动推广到社交平台以及微媒平台上',
          value: '',
          actions: { title: '修改' }
        },
        { title: '活动赞助', description: '把自己的活动赞助情况设置', value: '', actions: { title: '修改' } }
        //{ title: '报名', description: '设置报名信息，用户分组/售票等设置', value: '', actions: { title: '修改' } }
      ],
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 18,
          offset: 5
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          span: 18,
          offset: 5
        }
>>>>>>> 6.18
      },
      memberLoading: false,
      columns: [
        {
          title: '推广形式',
          dataIndex: 'tgWay',
          key: 'tgWay',
          width: '15%',
          scopedSlots: { customRender: 'tgWay' }
        },
        {
          title: '赞助形式',
          dataIndex: 'zzWay',
          key: 'zzWay',
          width: '15%',
          scopedSlots: { customRender: 'zzWay' }
        },
        {
          title: '赞助金额',
          dataIndex: 'zzPrice',
          key: 'zzPrice',
          width: '15%',
          scopedSlots: { customRender: 'zzPrice' }
        },
        {
          title: '赞助名额',
          dataIndex: 'zzNum',
          key: 'zzNum',
          width: '15%',
          scopedSlots: { customRender: 'zzNum' }
        },
        {
          title: '是否议价',
          dataIndex: 'isPrice',
          key: 'isPrice',
          width: '15%',
          scopedSlots: { customRender: 'isPrice' }
        },
        {
          title: '备注',
          dataIndex: 'remarks',
          key: 'remarks',
          width: '12%',
          scopedSlots: { customRender: 'remarks' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataTable: []
    }
  },
  mounted: {},
  created() {
    this._getPlace()
    this._getClassify()
    this._getActivityInformation()
    this._getActivityTest()
    this._getCheckActivitiesDetail()
    this._getExtension()
    this._getSponsor()
  },
  methods: {
    ...mapGetters(['token']),
    // 获取修改信息
    _getActivityTest() {
      const token = this.$ls.get('Access-Token')
      //const campId = this.$route.query.campId ? this.$route.query.campId : ''
      const params = {
        token: token
      }
      getActivityTest(params).then(res => {
        console.log(res)
      })
    },
    // 活动详情
    _getCheckActivitiesDetail() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId ? this.$route.query.campId : ''
      const params = {
        token: token,
        campId: campId
      }
      console.log(params)
      getCheckActivitiesDetail(params).then(res => {
        console.log(res)
        this.activeityInfo = res.data[0]
        this.activityContent = res.data[0].content
        console.log(this.activityContent)
        this.videoUrls = res.data[0].video
        this.detailImgs = res.data[0].imgs
      })
    },
    // 活动推广
    _getExtension() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId ? this.$route.query.campId : ''
      const params = {
        token: token,
        campId: campId
      }
      getExtension(params).then(res => {
        console.log(res)
        this.palyPlatfrom = res.platform
        console.log(res.tabInfo.campLevel)
        this.tags = res.tabInfo.campLevel
        this.tags1 = res.tabInfo.industryCategory
        this.tags2 = res.tabInfo.coverScope
        this.tags3 = res.tabInfo.campFeaturel
        this.tags4 = res.tabInfo.ageGroup
        this.tags5 = res.tabInfo.socialAttr
        this.tags6 = res.tabInfo.consumeAttr
        this.tags7 = res.tabInfo.jobAttr
        this.tags8 = res.tabInfo.jobAttr
        /*this.companyList = res.data
        console.log(this.companyList)
        this.selectedTags = res.tabInfo.campFeaturel
        this.characteristic = this.selectedTags.join(',')
        this.activeityExtension = res.tabInfo.campFeaturel
        for (let i = 0; i < res.data.length; i++) {
          if (res.data.length > 0) {
            this.companyList.push({
              name: res.data[i].anme,
              workType: res.data[i].workType
            })
          }

          this.companyJson.data = this.companyList
          console.log(this.companyJson)
        }*/
      })
    },
    // 活动赞助
    _getSponsor() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId ? this.$route.query.campId : ''
      const params = {
        token: token,
        campId: campId
      }
      getSponsor(params).then(res => {
        console.log(res)
        this.activeitySponsor = res
      })
    },
    // 活动基本信息
    _getActivityInformation() {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.query.campId ? this.$route.query.campId : ''
      const params = {
        token: token,
        campId: campId
      }
      console.log(params)
      getActivityInformation(params).then(res => {
        console.log(res)
        this.activeityDetail = res.data[0]
        if (this.activeityDetail.address && this.activeityDetail.area) {
          let address = this.activeityDetail.address.split(',')
          let titleValue = this.activeityDetail.area.split(',')
          console.log(titleValue)
          for (let i = 0; i < titleValue.length; i++) {
            if (address && titleValue) {
              this.areaList.push({
                titleValue: titleValue[i],
                address: address[i]
              })
              this.area.push(titleValue[i])
              this.addressArry.push(address[i])
            }
          }
        }
        this.campCatalog = parseInt(this.activeityDetail.campCatalog)
        this.campName = this.activeityDetail.capName
        console.log(this.campName)
        console.log(this.campCatalog)
        this.concreteTime = this.activeityDetail.concreteTime
        this.contact = this.activeityDetail.contact
        this.english = this.activeityDetail.enName
        this.chinese = this.activeityDetail.name
        this.email = this.activeityDetail.email
        this.campNum = this.activeityDetail.campNum
        this.phoneFirst = this.activeityDetail.phone.split('-')[0]
        this.phoneLast = this.activeityDetail.phone.split('-')[1]
        console.log(this.phoneFirst)
        this.times.push(this.activeityDetail.publishTime, this.activeityDetail.endTime)
        this.publishTime = this.times[0]
        this.endTime = this.times[1]
        console.log(this.times)
        console.log(this.areaList)
      })
    },
    _getPlace() {
      getPlace().then(res => {
        console.log(res)
        this.cityPlace = res.data
      })
    },
    _getClassify() {
      getClassify().then(res => {
        this.classify = res.data
        console.log(res)
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.from.validateFields((error, values) => {
        console.log(values)
        const params = { ...values }
        console.log(params)
      })
    },
    // 检验字段
    testLength(lengnum) {
      let stringLength = 0
      let num = lengnum.length
      let charCode = -1
      for (let i = 0; i < num; i++) {
        charCode = lengnum.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
          stringLength += 1
        } else {
          stringLength += 2
        }
      }
      return stringLength
    },
    //检验中文
    testChinese(rule, value, callback) {
      console.log(value)
      this.chinese = value
      if (!/[一-龥]/.test(value)) {
        callback(new Error('请输入中文'))
      }
      if (this.testLength(value) >= 1024) {
        callback(new Error('长度过长'))
      }
    },
    //检验英文
    testEnglish(rule, value, callback) {
      this.english = value
      if (!/^[a-zA-Z]+$/.test(value)) {
        callback(new Error('请输入英文'))
      }
      if (this.testLength(value) >= 1024) {
        callback(new Error('长度过长'))
        this.english = ''
      }
    },
    //检验邮箱
    testEmail(rule, value, callback) {
      this.email = value
      if (!/\w+([- +.]\w)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        callback(new Error('请输入邮箱'))
      }
      if (this.testLength(value) >= 256) {
        callback(new Error('长度过长'))
        this.email = ''
      }
    },
    //电话
    handPhoneFirst(rule, value, callback) {
      this.phoneFirst = value
      if (this.testLength(value) >= 20) {
        callback(new Error('长度过长'))
        this.phoneFirst = ''
      }
    },
    handPhoneLast(rule, value, callback) {
      this.phoneLast = value
    },
    //详细地址
    handPlace(rule, value, callback) {
      this.address = value
    },
    //人数
    handCampNum(value) {
      this.campNum = value
      if (this.testLength(value) >= 11) {
        callback(new Error('长度过长'))
      }
    },
    //联系人
    handName(rule, value, callback) {
      this.contact = value
      if (this.testLength(value) >= 256) {
        callback(new Error('长度过长'))
        this.contact = ''
      }
    },
    //活动内容
    handTextarea(rule, value, callback) {
      console.log(value)
      this.activityContent = value
      if (this.testLength(value) >= 2000) {
        callback(new Error('长度过长'))
      }
    },
    showModal(index, item) {
      this.title = item.title
      if (this.$route.query.campId) {
        this.findIndex = 1
      } else {
        this.findIndex = 0
      }
      if (index == 0) {
        this.visible = true
      } else {
        this.alertVisible = true
        setTimeout(() => {
          this.alertVisible = false
        }, 1000)
      }
      if (this.findIndex == 1) {
        this.formShow = index
        this.visible = true
      } else if (this.findIndex == 0) {
        this.formShow = 0
      }

      console.log(this.findIndex)
    },
    onChangepro(value) {
      console.log(value)
      this.areaValue = value.label
      this.areaKeys = value.key
    },
    // 公司
    companyBtn(value) {
      console.log(value)
      this.companyName = value.label
    },
    handCompany(rule, value, callback) {
      console.log(value)
      this.companyPlace = value
    },
    /*onChangepro1(value) {
      console.log(this.listKey.length+1)
      for(let i = 0; i < this.listKey.length+1; i++) {
        if(value.label) { 
          let areaList = []
          areaList.push(value.label)
          console.log(areaList)
        }
      }
    },*/
    onChangeClassify(value) {
      console.log(value)
      this.campCatalog = value.key
      console.log(this.campCatalog)
    },
    onChangeDate(date, dateString) {
      //dateString 选择日期 Arr
      this.publishTime = dateString[0]
      this.endTime = dateString[1]
      console.log(dateString)
    },
    onChangeTime(date, dateString) {
      //dateString 选择时间 Str
      this.concreteTime = dateString
      console.log(dateString)
    },
    addCompany() {
      if (this.companyPlace && this.companyName) {
        this.companyList.push({
          name: this.companyPlace,
          workType: this.companyName
        })
        this.companyJson.data = this.companyList
        console.log(this.companyJson)
      }
    },
    addList() {
      if (this.areaValue && this.address) {
        this.areaList.push({
          titleValue: this.areaValue,
          address: this.address
        })
        this.area.push(this.areaKeys)
        this.addressArry.push(this.address)
        console.log(this.areaList)
        console.log(this.area)
        console.log(this.addressArry)
      }
    },
    detelCompany(index) {
      this.companyList.splice(index, 1)
    },
    //删除
    detelList(index) {
      console.log(index)
      this.areaList.splice(index, 1)
      this.area.splice(index, 1)
      this.addressArry.splice(index, 1)
    },
    // 报名截止日期
    onClosingDate(date, dateString) {
      console.log(dateString)
      this.closingDate = dateString
    },
    //信息提交
    handleOk(e) {
      console.log(e)
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      const token = this.$ls.get('Access-Token')
      let campId = this.$route.query.campId ? this.$route.query.campId : ''
      //活动基本信息
      if (this.formShow == 0) {
        const params = {
          campId: campId,
          token: token,
          name: this.chinese,
          enName: this.english,
          publishTime: this.publishTime,
          endTime: this.endTime,
          concreteTime: this.concreteTime,
          area: this.area.join(','),
          address: this.addressArry.join(','),
          email: this.email,
          campCatalog: this.campCatalog,
          campNum: this.campNum,
          contact: this.contact,
          phone: this.phoneFirst + '-' + this.phoneLast,
          coverImg: this.fileUrl
        }
        console.log(params)
        if (this.chinese) {
        }
        getActivityModification(params).then(res => {
          console.log(res)
          this.$ls.set('code', res.data.code)
        })
      }
      console.log(this.$ls.get('code'))
      if (this.$ls.get('code') == 1000) {
        this.findIndex = 1
      } else {
        this.findIndex = 0
      }
      // 活动详情
      if (this.formShow == 1) {
        const params = {
          token: token,
          campId: campId,
          content: this.activityContent,
          video: this.videoUrls,
          imgs: this.detailImgs
        }
        console.log(params)
        getDetailsActivity(params).then(res => {
          console.log(res)
        })
      }
      // 活动推广
      if (this.formShow == 2) {
        const params = {
          token: token,
          campId: campId,
          jsonData: JSON.stringify(this.companyJson),
          platform: this.palyPlatfrom,
          campFeature: this.characteristic
        }
        console.log(params)
        getActivityPromotion(params).then(res => {
          console.log(res)
        })
      }
      // 活动赞助
      if (this.formShow == 3) {
        const params = {
          token: token,
          campId: campId,
          jsonData: JSON.stringify(this.supportJson),
          endTime: this.closingDate,
          demand: this.requirdContent
        }
        console.log(params)
        getEventSponsorship(params).then(res => {
          console.log(res)
        })
      }
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    // 提交审核
    sunmitBtn() {
      if (this.findIndex == 1) {
        const params = {
          token: this.$ls.get('Access-Token')
        }
        getSubmitAudit(params).then(res => {
          console.log(res)
        })
      }
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    handleCancelImg() {
      this.previewVisible = false
    },
    getContainer() {
      return document.querySelector('.cjhd-content')
    },
    handleChange(info) {
      console.log(info)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          console.log(imageUrl)
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      console.log(file)
      getBase64(file, imageUrl => {
        this.imageUrl = imageUrl
        this.loading = false
      })
      const formData = new FormData()
      formData.append('file', file)
      console.log(formData)
      getUpload(formData).then(res => {
        console.log(res)
        this.fileUrl = res.location
      })
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
    beforeUploadVideo(file) {
      console.log(file)
      getBase64(file, videoUrl => {
        this.videoUrl = videoUrl
        this.loading = false
      })
      const formData = new FormData()
      formData.append('file', file)
      console.log(formData)
      getUpload(formData).then(res => {
        console.log(res)
        this.videoUrls = res.location
      })
    },
    beforeChangeMore({ fileList }) {
      console.log(fileList)
      this.fileList = fileList
      const formData = new FormData()
      formData.append('file', fileList)
      getUpload(formData).then(res => {
        console.log(res)
        this.detailImgs = res.location
      })
    },
    handleCancel1() {
      this.previewVisible = false
    },
    handlePreview(file) {
      console.log(file)
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange1({ fileList }) {
      this.fileList = fileList
    },
    //
    handleChangeT(tag, checked) {
      const { selectedTags } = this
      console.log(selectedTags)
      const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)
      console.log('You are interested in: ', nextSelectedTags)
      this.selectedTags = nextSelectedTags
      this.characteristic = this.selectedTags.join(',')
    },
    newMember() {
      const length = this.dataTable.length
      this.dataTable.push({
        key: length === 0 ? '1' : (parseInt(this.dataTable[length - 1].key) + 1).toString(),
        tgWay: '',
        zzWay: '',
        zzPrice: '',
        zzNum: '',
        isPrice: '',
        remarks: '',
        editable: true,
        isNew: true
      })
    },
    saveRow(record) {
      console.log(record)
      this.memberLoading = true
      const { key, tgWay, zzWay, zzPrice, zzNum, isPrice, remarks } = record
      if (!tgWay || !zzWay || !zzPrice || !zzNum || !isPrice) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      } else {
        this.supportAyyty.push({
          ssKind: tgWay,
          sponsorship: zzWay,
          money: zzPrice,
          num: zzNum,
          bargain: isPrice,
          bz: remarks
        })
        console.log(this.supportAyyty)
        this.supportJson.data = this.supportAyyty

        console.log(this.supportJson)
      }
      // 模拟网络请求、卡顿 800ms
      new Promise(resolve => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.dataTable.filter(item => item.key === key)[0]
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    remove1(key) {
      console.log(key)
      this.supportAyyty.splice(key - 1, 1)
      this.supportJson.data = this.supportAyyty
      const newData = this.dataTable.filter(item => item.key !== key)
      this.dataTable = newData
    },
    toggle(key) {
      const target = this.dataTable.filter(item => item.key === key)[0]
      target.editable = !target.editable
    },
    handleChange2(value, key, column) {
      console.log(value)
      const newData = [...this.dataTable]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        console.log(value)
        this.dataTable = newData
      }
    },
    getRowByKey(key, newData) {
      const data = this.dataTable
      return (newData || data).filter(item => item.key === key)[0]
    },
    cancel(key) {
      const target = this.dataTable.filter(item => item.key === key)[0]
      target.editable = false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
    console.log(this.form)
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  }
}
</script>
