0<template>
  <div id="cjhd">
    <page-header :title="pageTitle"></page-header>
    <div class="cjhd-header">
      <a-card title="活动进度">
        <div class="secetion">
          <a-steps :current="current">
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
        <a-button type="primary" @click="handleSubmit">提交审批</a-button>
      </div>
      <a-alert v-if="alertVisible" banner :description="alertText" showIcon/>
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
        <a-form layout="horizontal" :form="form">
          <div class="info-item" v-if="formShow == 0">
            <div class="left">
              <a-form-item
                label="中文名称"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input
                  placeholder="chinese"
                  class="my-input"
                  v-decorator="['chineseName',{rules: [{ required: true, message: '请输入中文名称' }]}]"
                />
              </a-form-item>
              <a-form-item
                label="英文名称"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input
                  placeholder="english"
                  class="my-input"
                  autocomplete="false"
                  v-decorator="['englishName',{rules: [{ required: true, message: '请输入英文' }]}]"
                />
              </a-form-item>
              <a-form-item label="选择日期" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                <a-range-picker
                  style="width: 100%;"
                  @change="onChangeDate"
                  v-decorator="['range-picker', {rules: [{ required: true, message: '请选择日期' }]}]"
                />
              </a-form-item>
              <a-form-item label="选择时间" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
                <a-time-picker
                  @change="onChangeTime"
                  v-decorator="['time-picker', {rules: [{ required: true, message: '请选择时间' }]}]"
                />
              </a-form-item>
              <a-form-item
                label="选择地点"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
                :required="true"
              >
                <a-input-group compact style="width: 93%; margin-right: 8px">
                  <a-select
                    :defaultValue="{key: '请选择'}"
                    labelInValue
                    v-decorator="['placeName',{rules: [{ required: true, message: '请输入地址' }]}]"
                  >
                    <a-select-option
                      v-for="(item, index) in cityPlace"
                      :key="index"
                      :value="item.label"
                    >{{item.value}}</a-select-option>
                  </a-select>
                  <a-input
                    style="width: 68%"
                    placeholder="北京市"
                    v-decorator="['addressName',{rules: [{ required: true, message: '请输入地址' }]}]"
                  />
                </a-input-group>
              </a-form-item>
              <a-form-item>
                <a-list itemLayout="horizontal" :dataSource="areaList">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="detelList(index)">删除</a>
                    <a-list-item-meta>
                      <a slot="title">{{item.area_name}}</a>
                      <a
                        slot="title"
                        class="addressPaading"
                        v-decorator="['addressName',{rules: [{ required: true, message: '请输入地址' }]}]"
                      >{{item.addr}}</a>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </a-form-item>
              <!--<a-form-item
                v-for="(k, index) in form.getFieldValue('keys')"
                :key="k"
                v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
                label="请选择"
                :required="false"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
              >
                <a-input-group compact style="width: 93%; margin-right: 8px"
                  v-decorator="[
                    `names[${k}]`
                    ]"  
                >
                  <a-select labelInValue :defaultValue="{key: '请选择'}" v-decorator="['addressName',{rules: [{ required: true, message: '请输入地址' }]}]">
                    <a-select-option
                      v-for="(item, index) in cityPlace"
                      :key="index"
                      :value="item.value"
                    >{{item.value}}</a-select-option>
                  </a-select>
                  <a-input style="width: 70%" defaultValue="北京市" v-decorator="['placeName',{rules: [{ required: true, message: '请输入地址' }]}]"/>
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
                  placeholder="email"
                  class="my-input"
                  type="email"
                  v-decorator="['emailName',{rules: [{ required: true, message: '请输入电子邮箱' }]}]"
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
                  v-decorator="['HuoDongName',{rules: [{ required: true, message: '请填写活动' }]}]"
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
                <a-input
                  placeholder="1"
                  type="number"
                  class="my-input"
                  :min="1"
                  v-decorator="['testNum',{rules: [{ required: true, message: '请输入数字' }]}]"
                />
              </a-form-item>
              <a-form-item
                label="联系人"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input
                  placeholder="contact"
                  class="my-input"
                  v-decorator="['testName',{rules: [{ required: true, message: '请输入名字' }]}]"
                />
              </a-form-item>
              <a-form-item
                label="联系电话"
                class="my-form-item"
                :wrapperCol="{span: 18, offset: 1}"
                :labelCol="{span: 4}"
              >
                <a-input-group>
                  <!--<a-col :span="8">
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
                  </a-col>-->
                  <a-col :span="18">
                    <a-input
                      placeholder="phone"
                      v-decorator="['phoneName',{rules: [{ required: true, message: '请输入电话号' }]}]"
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
                  <img v-if="fileUrl" :src="fileUrl" alt="avatar">
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'"/>
                    <div class="ant-upload-text">上传</div>
                  </div>
                </a-upload>
                <span>建议尺寸 200 * 300</span>
              </a-form-item>
            </div>
          </div>
        </a-form>
        <a-form layout="horizontal" :form="form1">
          <!--活动详情-->
          <div class="info-item-column" v-if="formShow == 1">
            <a-form-item
              label="活动内容"
              class="my-form-item"
              :wrapperCol="{span: 18, offset: 1}"
              :labelCol="{span: 4}"
            >
              <a-textarea
                placeholder="activityContent"
                class="my-input"
                maxlength="300"
                v-decorator="['textName',{rules: [{ required: true, message: '请输入公司名称' }]}]"
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
                <video v-if="videoUrls" height="180" width="180" :src="videoUrls" controls></video>
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
                <img alt="example" style="width: 100%" :src="detailImgs">
              </a-modal>
            </a-form-item>
          </div>
        </a-form>
        <a-form layout="horizontal" :form="form2">
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
                  <a-select labelInValue @change="companyBtn">
                    <a-select-option
                      v-for="(item, index) in organizerTypeList"
                      :key="index"
                      :value="item.id"
                    >{{item.name}}</a-select-option>
                  </a-select>
                  <a-input
                    style="width: 66%"
                    v-decorator="['companyName',{rules: [{ required: true, message: '请输入公司名称' }]}]"
                  />
                </a-input-group>
              </a-form-item>
              <a-form-item>
                <a-list itemLayout="horizontal" :dataSource="companyList1">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="detelCompany(index)">删除</a>
                    <a-list-item-meta>
                      <a slot="title">{{item.workType}}</a>
                      <a slot="title" class="addressPaading">{{item.name}}</a>
                    </a-list-item-meta>
                  </a-list-item>
                </a-list>
              </a-form-item>
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
                <a-input
                  placeholder="请输入播放平台"
                  class="my-input"
                  v-model="palyPlatfrom"
                  v-decorator="['pingName',{rules: [{ required: true, message: '请输入播放平台' }]}]"
                />
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
                      v-for=" (tag, index) in tags"
                      :key="index"
                      :checked="selectedTags.indexOf(tag.id) > -1"
                      @change="(checked) => handleChangeT(tag.id, tag.pid, checked)"
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
                      @change="(checked) => handleChangeT(tag.id, tag.pid, checked)"
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
                      @change="(checked) => handleChangeT(tag.id, tag.pid, checked)"
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
                      @change="(checked) => handleChangeT(tag.id, tag.pid, checked)"
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
                      @change="(checked) => handleChangeT(tag.id, tag.pid, checked)"
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
                      @change="(checked) => handleChangeT(tag.id, tag.pid, checked)"
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
                      @change="(checked) => handleChangeT(tag.id, tag.pid, checked)"
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
                      @change="(checked) => handleChangeT(tag.id, tag.pid, checked)"
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
        </a-form>
        <a-form layout="horizontal" :form="form3">
          <div class="info-item-column" v-if="formShow == 3">
            <a-form-item
              label="招商截止日期"
              class="my-form-item"
              :wrapperCol="{span: 20, offset: 1}"
              :labelCol="{span: 3}"
            >
              <a-date-picker
                placeholder="closingDate"
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
                  v-for="(col, i) in ['tgWay', 'zzWay', 'zzPrice','zzNum','remarks']"
                  :slot="col"
                  slot-scope="text, record"
                >
                  <a-input
                    :key="col"
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    placeholder="columns[i].title"
                    v-decorator="['requireName',{rules: [{ required: true, message: '请输入时间' }]}]"
                    @change="e => handleChange2(e.target.value, record.key, col)"
                  />
                  <template v-else>{{ text }}</template>
                </template>
                <template slot="operation" slot-scope="text, record">
                  <template v-if="record.editable">
                    <span v-if="record.isNew">
                      <a @click="saveRow(record)">确定</a>
                      <a-divider type="vertical"/>
                      <a-popconfirm title="是否要删除此行？" @confirm="remove1(record.key)">
                        <a>取消</a>
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
                      <a>取消</a>
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
                placeholder="requirdContent"
                class="my-input"
                :autosize="{ minRows: 4, maxRows: 6 }"
                v-decorator="['textYao',{rules: [{ required: true, message: '请输入公司名称' }]}]"
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
//数组去重
function uniq(array) {
  var temp = [] //一个新的临时数组
  for (var i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) == -1) {
      temp.push(array[i])
    }
  }
  return temp
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
  getSubmitAudit,
  getCheckInformation,
  getPress
} from '@/api/hand'
import { mapGetters } from 'vuex'
export default {
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
      areaKeys: '',
      addressArry: [],
      code: '',
      phone: '',
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
      companyList1: [],
      companyKey: '',
      companyJson: {},
      addressJson: {},
      palyPlatfrom: '', //播放平台
      characteristic: '', // 活动特点
      closingDate: '', // 招商截止时间
      alertText: '',
      current: 0, //进度
      pids: '',
      pidsArrty: [],
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
      organizerTypeList: [],
      fileList: [],
      data: [
        { title: '活动基本信息', description: '活动详细内容编辑', value: '', actions: { title: '' } },
        { title: '活动详情', description: '设置活动详细信息以及推广内容设置', value: '', actions: { title: '' } },
        {
          title: '活动推广',
          description: '把自己的活动推广到社交平台以及微媒平台上',
          value: '',
          actions: { title: '' }
        },
        { title: '活动赞助', description: '把自己的活动赞助情况设置', value: '', actions: { title: '' } }
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
        /*{
          title: '是否议价',
          dataIndex: 'isPrice',
          key: 'isPrice',
          width: '15%',
          scopedSlots: { customRender: 'isPrice' }
        },*/
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
  mounted() {},
  created() {
    this._getActivityTest()
    this.dataTitle()
    //this._getPress()
  },
  methods: {
    ...mapGetters(['token']),
    //进度
    _getPress() {
      const token = this.$ls.get('Access-Token')
      const params = {
        token: token
      }
      getPress(params).then(res => {
        console.log(res)
        this.current = res.data.schedule
      })
    },
    dataTitle() {
      if (this.$route.params.campId) {
        this.findIndex = 1
      } else {
        this.findIndex = 0
      }
      for (let i = 0; i < this.data.length; i++) {
        console.log(this.$route.params.campId)
        if (this.$route.params.campId) {
          this.data[i].actions.title = '修改'
        } else {
          this.data[i].actions.title = '新增'
        }
      }
    },

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

    handleSubmit(e) {
      this.dataTitle()
      console.log(223)
      e.preventDefault()
      const {
        form: { validateFields }
      } = this
      console.log(validateFields)
      //const validateFieldsKey = ['chineseName', 'englishName', 'startName', 'changetimer', 'changetimer', 'placeName', 'emailName', 'testNum', 'testName', 'phoneName', 'textName', 'companyName', 'pingName', 'closingDate', 'requireName', 'textYao']
      validateFields((error, values) => {
        console.log(error)
        console.log(values)
        const params = { ...values }
        let campId = this.$route.params.campId ? this.$route.params.campId : ''
        console.log(this.findIndex)
        if (!error) {
          const params = {
            token: this.$ls.get('Access-Token'),
            campId: campId
          }
          console.log(params)
          getSubmitAudit(params).then(res => {
            console.log(res)
            if (res.data.code == '1') {
              this.alertVisible = true
              this.alertText = '提交成功'
              setTimeout(() => {
                this.alertVisible = false
              }, 1000)
            }
          })
        }
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
      this.phone = value
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
    // 赞助要求
    handYao(rule, value, callback) {
      this.requirdContent = value
    },
    showModal(index, item) {
      const token = this.$ls.get('Access-Token')
      const campId = this.$route.params.campId ? this.$route.params.campId : ''
      const params = {
        token: token,
        campId: campId
      }
      if (index == 0) {
        getPlace().then(res => {
          console.log(res)
          this.cityPlace = res.data
        })
        getClassify().then(res => {
          this.classify = res.data
          console.log(res)
        })
        // 活动基本信息
        getActivityInformation(params).then(res => {
          console.log(res)
          this.form.setFieldsValue({
            chineseName: res.data[0].name,
            englishName: res.data[0].enName,
            emailName: res.data[0].email,
            HuoDongName: res.data[0].capName,
            testNum: res.data[0].campNum,
            testName: res.data[0].contact,
            phoneName: res.data[0].phone,
            placeName: res.data[0].name,
            addressName: res.data[0].name,
            rangePicker: res.data[0].name,
            rtimePicker: res.data[0].concreteTime
          })
          if (!this.$route.params.campId) {
            this.activeityDetail = ''
          }
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
          this.phone = this.activeityDetail.phone
          /*this.phoneFirst = this.activeityDetail.phone.split('-')[0]
        this.phoneLast = this.activeityDetail.phone.split('-')[1]*/
          console.log(this.phoneFirst)
          this.times.push(this.activeityDetail.publishTime, this.activeityDetail.endTime)
          this.publishTime = this.times[0]
          this.endTime = this.times[1]
          console.log(this.times)
          console.log(this.areaList)
        })
      }
      if (index == 1) {
        // 活动详情
        getCheckActivitiesDetail(params).then(res => {
          console.log(res)
          this.activeityInfo = res.data[0]
          this.activityContent = res.data[0].content
          console.log(this.activityContent)
          this.videoUrls = res.data[0].video
          this.detailImgs = res.data[0].imgs
        })
      }
      if (index == 2) {
        // 查询推广
        getCheckInformation(params).then(res => {
          console.log(res)
          //this.palyPlatfrom = res.platform
          console.log(res.data.campLevel)
          this.tags = res.data.campLevel
          this.tags1 = res.data.industryCategory
          this.tags2 = res.data.coverScope
          this.tags3 = res.data.campFeaturel
          this.tags4 = res.data.ageGroup
          this.tags5 = res.data.socialAttr
          this.tags6 = res.data.consumeAttr
          this.tags7 = res.data.jobAttr
          this.organizerTypeList = res.data.organizerTypeList
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
        getExtension(params).then(res => {
          console.log(res)
          this.palyPlatfrom = res.platform
          console.log(res.campFeature.split(','))
          const selectArry = res.campFeature.split(',')
          const companyArry = res.data
          for (let i = 0; i < selectArry.length; i++) {
            this.selectedTags.push(parseInt(selectArry[i]))
          }
          for (let i = 0; i < companyArry.length; i++) {
            this.companyList.push({
              name: companyArry[i].name,
              workType: companyArry[i].work_type
            })
            this.companyList1.push({
              name: companyArry[i].name,
              workType: companyArry[i].work_name
            })
          }
          console.log(this.companyList)
          this.companyJson.data = this.companyList
          console.log(this.companyJson)
        })
      }
      if (index == 3) {
        // 活动赞助
        getSponsor(params).then(res => {
          console.log(res)
          this.activeitySponsor = res
          this.closingDate = res.endTime
          this.requirdContent = res.demand
          const dataArrty = res.data
          for (let i = 0; i < dataArrty.length; i++) {
            this.supportAyyty.push({
              ssKind: dataArrty[i].ss_kind,
              sponsorship: dataArrty[i].sponsorship,
              money: dataArrty[i].money,
              num: dataArrty[i].num,
              //bargain: isPrice,
              bz: dataArrty[i].bz
            })
            const length = this.dataTable.length
            this.dataTable.push({
              key: length === 0 ? '1' : (parseInt(this.dataTable[length - 1].key) + 1).toString(),
              tgWay: dataArrty[i].sponsorship,
              zzWay: dataArrty[i].ss_kind,
              zzPrice: dataArrty[i].money,
              zzNum: dataArrty[i].num,
              remarks: dataArrty[i].bz,
              editable: false,
              isNew: false
            })
          }
          console.log(this.dataTable)
          console.log(this.supportAyyty)
          this.supportJson.data = this.supportAyyty

          console.log(this.supportJson)
        })
      }

      console.log(index)
      this.title = item.title
      console.log(this.$route.params.campId, this.$ls.get('code') == '1000')
      if (this.$route.params.campId) {
        this.findIndex = 1
      } else {
        this.findIndex = 0
      }
      if (index == 0) {
        this.visible = true
      } else {
        this.alertVisible = true
        this.alertText = '请先填写活动基本信息'
        setTimeout(() => {
          this.alertVisible = false
        }, 1000)
      }
      if (this.findIndex == 1) {
        this.formShow = index
        this.visible = true
        this.alertVisible = false
      } else if (this.findIndex == 0) {
        this.formShow = 0
      }

      console.log(this.findIndex)
    },
    // 公司
    companyBtn(value) {
      console.log(value)
      this.companyKey = value.key
      this.companyName = value.label
    },
    handCompany(rule, value, callback) {
      console.log(value)
      this.companyPlace = value
    },
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
      if (this.companyPlace && this.companyKey) {
        this.companyList.push({
          name: this.companyPlace,
          workType: this.companyKey
        })
        this.companyList1.push({
          name: this.companyPlace,
          workType: this.companyName
        })
        this.companyJson.data = this.companyList
        console.log(this.companyJson)
      }
    },
    //地点添加
    addList() {
      // can use data-binding to get
      /*console.log(this.form.getFieldValue('keys'))
      const keys = this.form.getFieldValue('keys')
      console.log(keys)
      console.log(++id)
      const nextKeys = keys.concat(++id)
      console.log(nextKeys)
      // can use data-binding to set
      // important! notify form to detect changes
      this.form.setFieldsValue({
        keys: nextKeys
      })*/
      console.log(this.form.getFieldValue('placeName'))
      this.areaValue = this.form.getFieldValue('placeName').key
      this.address = this.form.getFieldValue('addressName')
      this.areaKeys = this.form.getFieldValue('placeName').label
      
      if (this.areaValue && this.address) {
        this.areaList.push({
          area_cd: this.areaValue,
          area_name: this.areaKeys,
          addr: this.address
        })
      }
      this.addressJson.data = this.areaList
    },
    detelCompany(index) {
      this.companyList.splice(index, 1)
      this.companyList1.splice(index, 1)
    },
    //删除
    detelList(index) {
      console.log(index)
      this.areaList.splice(index, 1)
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
      let campId = this.$route.params.campId ? this.$route.params.campId : ''
      console.log(this.form.validateFields)
      //活动基本信息
      if (this.formShow == 0) {
        this.form.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log(11)
            const dateList = values['range-picker']
            const dateValue = {
              'range-picker': [dateList[0].format('YYYY-MM-DD'), dateList[1].format('YYYY-MM-DD')],
              'time-picker': values['time-picker'].format('HH:mm:ss')
            }
            console.log(values)
            this.chinese = values.chineseName
            this.english = values.englishName
            this.email = values.emailName
            this.campCatalog = values.HuoDongName
            this.campNum = values.testNum
            this.contact = values.testName
            this.phone = values.phoneName
            this.fileUrl = values.chineseName
            this.address = values.placeName
            this.areaValue = values.addressName
            this.endTime = dateValue.range - picker[1]
            this.concreteTime = dateValue.rtime - picker
            this.publishTime = dateValue.range - picker[0]
          }
        })
        const params = {
          campId: campId,
          token: token,
          name: this.chinese,
          enName: this.english,
          publishTime: this.publishTime,
          endTime: this.endTime,
          concreteTime: this.concreteTime,

          /*area: this.area.join(','),
          address: this.addressArry.join(','),*/
          email: this.email,
          campCatalog: this.campCatalog,
          campNum: this.campNum,
          contact: this.contact,
          phone: this.phone,
          coverImg: this.fileUrl,
          jsonDataAddress: JSON.stringify(this.addressJson)
        }
        console.log(params)
        getActivityModification(params).then(res => {
          console.log(res)
          this.$ls.set('code', res.data.code)
          this.code = res.data.code
          if (this.code == '1000' || this.code == '1001') {
            setTimeout(() => {
              this.visible = false
              this.confirmLoading = false
            }, 2000)
          }
        })
      }
      if (this.code == '1000' || this.code == '1001') {
        this.findIndex = 1
        console.log(this.findIndex)
      } else {
        this.findIndex = 0
      }
      // 活动详情
      if (this.formShow == 1) {
        this.form1.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log(11)
            const dateList = values['range-picker']
            const dateValue = {
              'range-picker': [dateList[0].format('YYYY-MM-DD'), dateList[1].format('YYYY-MM-DD')],
              'time-picker': values['time-picker'].format('HH:mm:ss')
            }
            console.log(values)
            this.activityContent = values.chineseName
            this.videoUrls = values.englishName
            this.detailImgs = dateValue.range - picker[1]
          }
        })
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
        this.form2.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log(11)
            const dateList = values['range-picker']
            const dateValue = {
              'range-picker': [dateList[0].format('YYYY-MM-DD'), dateList[1].format('YYYY-MM-DD')],
              'time-picker': values['time-picker'].format('HH:mm:ss')
            }
            console.log(values)
            this.palyPlatfrom = values.chineseName
            this.characteristic = values.englishName
            this.pids = dateValue.range - picker[1]
          }
        })
        const params = {
          token: token,
          campId: campId,
          jsonData: JSON.stringify(this.companyJson),
          platform: this.palyPlatfrom,
          campFeature: this.characteristic,
          pid: this.pids
        }
        console.log(params)
        getActivityPromotion(params).then(res => {
          console.log(res)
        })
      }
      // 活动赞助
      if (this.formShow == 3) {
        this.form3.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log(11)
            const dateList = values['range-picker']
            const dateValue = {
              'range-picker': [dateList[0].format('YYYY-MM-DD'), dateList[1].format('YYYY-MM-DD')],
              'time-picker': values['time-picker'].format('HH:mm:ss')
            }
            console.log(values)
            this.chinese = values.chineseName
            this.english = values.englishName
            this.endTime = dateValue.range - picker[1]
            this.concreteTime = dateValue.rtime - picker
            this.publishTime = dateValue.range - picker[0]
            this.email = values.emailName
            this.campCatalog = alues.HuoDongName
            this.campNum = values.testNum
            this.contact = values.testName
            this.phone = values.phoneName
            this.fileUrl = values.chineseName
            this.address = values.placeName
            this.areaValue = values.addressName
          }
        })
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
    handleChangeT(tag, pid, checked) {
      this.pidsArrty.push(pid)
      this.pids = uniq(this.pidsArrty).join(',')
      console.log(this.pids)
      const { selectedTags } = this
      console.log(selectedTags)
      const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)
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
      console.log(this.dataTable)
    },
    saveRow(record) {
      console.log(record)
      this.memberLoading = true
      const { key, tgWay, zzWay, zzPrice, zzNum, remarks } = record
      if (!tgWay || !zzWay || !zzPrice || !zzNum) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      } else {
        this.supportAyyty.push({
          ssKind: tgWay,
          sponsorship: zzWay,
          money: zzPrice,
          num: zzNum,
          //bargain: isPrice,
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
      this.dataTable.splice(key - 1, 1)
      this.supportJson.data = this.supportAyyty
      const newData = this.dataTable.filter(item => item.key !== key)
      this.dataTable = newData
    },
    toggle(key) {
      const target = this.dataTable.filter(item => item.key === key)[0]
      target.editable = !target.editable
    },
    handleChange2(value, key, column) {
      console.log(value, key, column)
      if (column == 'tgWay') {
        if (/^[0-9]*$/.test(value)) {
          console.log('请输入文字')
          value = ''
        }
      } else if (column == 'zzWay') {
        if (/^[0-9]*$/.test(value)) {
          console.log('请输入文字')
          value = ''
        }
      } else if (column == 'zzPrice') {
        console.log(/^\d+(\.\d{0,2})?$/.test(value))
        if (!/^\d+(\.\d{0,2})?$/.test(value)) {
          value = ''
        }
      } else if (column == 'zzNum') {
        if (!/^[0-9]+(.[0-9]{2})?$/.test(value)) {
          console.log('请输入文字')
          value = ''
        }
      }
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
    this.form1 = this.$form.createForm(this)
    this.form2 =this.$form.createForm(this)
    this.form3=this.$form.createForm(this)
    console.log(this.form)
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    this.form1.getFieldDecorator('keys', { initialValue: [], preserve: true })
    this.form2.getFieldDecorator('keys', { initialValue: [], preserve: true })
    this.form3.getFieldDecorator('keys', { initialValue: [], preserve: true })
    
  }
}
</script>
