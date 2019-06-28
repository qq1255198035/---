<template>
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
            <a slot="actions" :class="{'selected': item.actions.checked}" @click="showModal(index,item)">{{ item.actions.title }}</a>
          </template>
        </a-list-item>
      </a-list>
      <div class="btn-bottom">
        <a-button @click="goHome">取消</a-button>
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
                  placeholder="中文名称"
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
                  placeholder="英文名称"
                  class="my-input"
                  autocomplete="false"
                  v-decorator="['englishName',{rules: [{ required: true, message: '请输入英文' }]}]"
                />
              </a-form-item>
              <a-form-item label="活动日期" :wrapperCol="{span: 18, offset: 1}" :labelCol="{span: 4}">
                <a-range-picker
                  style="width: 100%;"
                  @change="onChangeDate"
                  v-decorator="['rangePicker', {rules: [{ type: 'array', required: true, message: '请选择日期' }]}]"
                />
              </a-form-item>
              <a-form-item label="活动时间" :labelCol="{span: 4}" :wrapperCol="{span: 18, offset: 1}">
                <a-time-picker
                  @change="onChangeTime"
                  v-decorator="['timePicker', {rules: [{ type: 'object', required: true, message: '请选择时间' }]}]"
                />
              </a-form-item>
              <a-form-item
                label="活动地点"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 1}"
                :required="true"
              >
                <a-input-group compact style="width: 93%; margin-right: 8px">
                  <a-select
                    defaultValue="请选择"
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
                  v-decorator="['emailName',{rules: [{type: 'email', required: true, message: '请输入电子邮箱' }]}]"
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
                  placeholder="请选择"
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
                placeholder="活动内容"
                class="my-input"
                maxlength="300"
                v-decorator="['textName',{rules: [{ required: true, message: '活动内容' }]}]"
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
              <div class="imgFile">
                <div class="imgsFileBox" v-for="(item, index) in detailsImgs" :key="index">
                  <img :src="item" alt width="102" height="102">
                  <span class="close_img" @click="closeImg(index)">x</span>
                </div>
              </div>
              <a-upload
                listType="picture-card"
                :beforeUpload="beforeUploadImgs"
                name="avatar"
                class="avatar-uploader"
                :showUploadList="false"
              >
                <div v-if="detailsImgs.length < 9">
                  <a-icon type="plus"/>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelImg(item)">
                <img alt="example" style="width: 100%" :src="previewImage">
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
                  <a-select
                    labelInValue
                    defaultValue="请选择"
                    v-decorator="['companyTitle',{rules: [{ required: true, message: '请输入公司名称' }]}]"
                  >
                    <a-select-option
                      v-for="(item, index) in organizerTypeList"
                      :key="index"
                      :value="item.id"
                    >{{item.name}}</a-select-option>
                  </a-select>
                  <a-input
                    style="width: 66%"
                    v-decorator="['companyName',{rules: [{ required: true, message: '公司地址' }]}]"
                  />
                </a-input-group>
              </a-form-item>
              <a-form-item>
                <a-list itemLayout="horizontal" :dataSource="companyList">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a slot="actions" @click="detelCompany(index)">删除</a>
                    <a-list-item-meta>
                      <a slot="title">{{item.work_name}}</a>
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
                  v-decorator="['pingName',{rules: [{ required: false, message: '请输入播放平台' }]}]"
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
                      v-for=" tag in tags"
                      :key="tag.id"
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
                @change="onClosingDate"
                v-decorator="['closingDate',{rules: [{ type: 'object', required: true, message: '请输入时间' }]}]"
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
                  <template v-if="record.editable">
                    <a-input
                      :key="col"
                      v-if="col!='zzWay'"
                      style="margin: -5px 0"
                      :value="text"
                      :placeholder="columns[i].title"
                      v-decorator="['requireName',{rules: [{ required: true, message: '请输入' }]}]"
                      @change="e => handleChange2(e.target.value, record.key, col)"
                    />
                    <a-select
                      :key="col"
                      v-else
                      :defaultValue="{ key: '请选择' }"
                      @change="vlues"
                      labelInValue
                      v-decorator="['xingShi2',{rules: [{ required: true, message: '请填写活动' }]}]"
                    >
                      <a-select-option
                        v-for="(item, index) in zanZah"
                        :key="index"
                        :value="item.label"
                      >{{item.value}}</a-select-option>
                    </a-select>
                  </template>
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
              >新增赞助</a-button>
            </a-form-item>
            <a-form-item
              label="合作要求"
              class="my-form-item"
              :wrapperCol="{span: 20, offset: 1}"
              :labelCol="{span: 3}"
            >
              <a-textarea
                placeholder="合作要求"
                class="my-input"
                :autosize="{ minRows: 4, maxRows: 6 }"
                v-decorator="['textYao',{rules: [{ required: false, message: '合作要求' }]}]"
              />
            </a-form-item>
          </div>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<style lang="less" scoped>
.selected{
  color: #808080
}
.imgFile {
  padding-bottom: 10px;
}
.imgFile .imgsFileBox {
  display: inline-block;
  width: 102px;
  height: 102px;
  box-sizing: border-box;
  margin-right: 10px;
  position: relative;
}
.imgFile .imgsFileBox .close_img {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(128, 128, 128, 0.6);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #fff;
}
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
import moment from 'moment'
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
      zanZah: [{ label: '0', value: '现金' }, { label: '1', value: '现金+实物' }, { label: '2', value: '实物' }],
      xingShi: [{ label: '0', value: '形式' }, { label: '1', value: '形式' }, { label: '2', value: '形式' }],
      visible: false,
      confirmLoading: false,
      times: [],
      xingValue1: '',
      xingValue: '',
      xingName: '',
      xingName1: '',
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
      userid: '',
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
      imgsJson: {},
      fileImgs: '',
      detailsImgs: [], // 活动详情多张图片
      data: [
        { title: '活动基本信息', description: '活动详细内容编辑', value: '', actions: { title: '',checked: '' } },
        { title: '活动详情', description: '设置活动详细信息以及推广内容设置', value: '', actions: { title: '', checked: '' } },
        {
          title: '活动推广',
          description: '把自己的活动推广到社交平台以及微媒平台上',
          value: '',
          actions: { title: '',checked: '' }
        },
        { title: '活动赞助', description: '把自己的活动赞助情况设置', value: '', actions: { title: '',checked: '' } }
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
  activated() {
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
      console.log(this.$route.query.campId)
      if (this.$route.query.campId) {
        this.findIndex = 1
      } else {
        this.findIndex = 0
        this.code = ''
        this.userid = ''
      }
      console.log(this.findIndex)
      for (let i = 0; i < this.data.length; i++) {
        console.log(this.$route.query.campId)
        if (this.$route.query.campId) {
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
    goHome() {
      this.$router.push({
        path: '/issuerHdgl'
      })
    },
    handleSubmit(e) {
      console.log(223)
      e.preventDefault()
      console.log(this.code)
      if (this.code == '1000' || this.code == '1001' || this.$route.query.campId) {
        const campId = this.$route.query.campId ? this.$route.query.campId :this.userid
        const params = {
          token: this.$ls.get('Access-Token'),
          campId: campId
        }
        console.log(params)
        getSubmitAudit(params).then(res => {
          console.log(res)
          if (res.data.code == '1001') {
            this.$router.push({
              path: '/issuerHdgl'
            })
            this.$notification.success({
              message: '成功',
              description: '提交成功',
              duration: 4
            })
          }else if(res.data.code == '1002') {
            this.$message.error('活动详情没有数据')
          }
          else if(res.data.code == '1003') {
            this.$message.error('活动推广信没有填写')
          }else{
            this.$message.error('活动赞助信息没有填写')
          }
        })
      } else {
        this.$notification['error']({
          message: '失败',
          description: '提交失败，请先填写活动基本信息',
          duration: 4
        })
      }
      const {
        form: { validateFields }
      } = this
      console.log(validateFields)
      //const validateFieldsKey = ['chineseName', 'englishName', 'startName', 'changetimer', 'changetimer', 'placeName', 'emailName', 'testNum', 'testName', 'phoneName', 'textName', 'companyName', 'pingName', 'closingDate', 'requireName', 'textYao']
      validateFields((error, values) => {
        console.log(error)
        console.log(values)
        const params = { ...values }
        let campId = this.$route.query.campId ? this.$route.query.campId : ''
        console.log(this.findIndex)
        if (!error) {
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
      const campId = this.$route.query.campId ? this.$route.query.campId : ''
      
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
        const params = {
        token: token,
        campId: campId
      }
      console.log(params)
        getActivityInformation(params).then(res => {
          console.log(res)
          const that = this
          console.log(that.code == '1000')
          console.log(that.code)
          console.log(that.userid)
          console.log(that.code == '1000' && that.userid && campId)
          
          if (that.code == '1000' || that.userid || campId) {
            console.log(323)
            const dateList = res.data.list[0].publishTime
            const endTime = res.data.list[0].endTime
            const list = []
            if (dateList && endTime) {
              list.push(moment(dateList, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD'))
            }
            this.form.setFieldsValue({
              chineseName: res.data.list[0].name,
              englishName: res.data.list[0].enName,
              emailName: res.data.list[0].email,
              HuoDongName: res.data.list[0].campCatalog ? parseInt(res.data.list[0].campCatalog) : '',
              testNum: res.data.list[0].campNum,
              testName: res.data.list[0].contact,
              phoneName: res.data.list[0].phone,
              placeName: { key: '110000', label: '北京市' },
              addressName: '北京市',
              rangePicker: list,
              timePicker: moment(res.data.list[0].createTime, 'HH:mm:ss')
            })
            console.log(res.data.list[0].createTime)
            this.imageUrl = this.$host + res.data.list[0].cover_img
            this.fileUrl = res.data.list[0].cover_img
            console.log(this.imageUrl)
            this.areaList = res.data.listLoc
            this.addressJson.data = this.areaList
          } else {
            console.log(122)
            this.form.setFieldsValue({
              chineseName: '',
              englishName: '',
              emailName: '',
              HuoDongName: '',
              testNum: '',
              testName: '',
              phoneName: '',
              placeName: { key: '110000', label: '北京市' },
              rangePicker: [moment(), moment()],
              timePicker: moment()
            })
            this.areaList = []
            this.imageUrl = ''
          }
        })
      }
      if (index == 1) {
        // 活动详情
        const campId = this.$route.query.campId ? this.$route.query.campId :this.userid
        const params = {
        token: token,
        campId: campId
      }
      console.log(params)
        getCheckActivitiesDetail(params).then(res => {
          console.log(res)
          if (this.code == '1000' || campId) {
            this.form1.setFieldsValue({
              textName: res.data.list[0].content
            })
            this.videoUrl = res.data.list[0].video ? this.$host + res.data.list[0].video : ''
            this.videoUrls = res.data.list[0].video
            console.log(this.videoUrl)
            console.log(res.data.listCampAtt.length)
            const detailsArrty = []
            const fileArrty = []
            for (let i = 0; i < res.data.listCampAtt.length; i++) {
              if(!res.data.listCampAtt.length == 0) {
                detailsArrty.push(this.$host + res.data.listCampAtt[i].location)
              fileArrty.push({
                location: res.data.listCampAtt[i].location,
                file_name: res.data.listCampAtt[i].file_name,
                file_type: res.data.listCampAtt[i].file_type
              })
              }
            }
            this.detailsImgs = detailsArrty
            this.fileList = fileArrty
            console.log(this.fileList)
            this.imgsJson.data = this.fileList
            console.log(this.detailsImgs)
          } else {
            this.form1.setFieldsValue({
              textName: ''
            })
            this.videoUrl = ''
            this.detailsImgs = []
          }
        })
      }
      if (index == 2) {
        // 查询推广
        console.log(this.userid)
        const campId = this.$route.query.campId ? this.$route.query.campId : this.userid
        console.log(campId)
        const params = {
        token: token,
        campId: campId
      }
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
        })
        console.log(params)
        getExtension(params).then(res => {
          console.log(res)
          if (this.code == '1000' || campId) {
            this.form2.setFieldsValue({
              pingName: res.platform,
              companyTitle: { key: '133', label: '主办方' },
              companyName: ''
            })
            const selectArry = res.campFeature.split(',')
            const companyArry = res.data
            const companyList1 = []
            for (let i = 0; i < companyArry.length; i++) {
              companyList1.push({
                work_name: companyArry[i].work_name,
                name: companyArry[i].name,
                workType: companyArry[i].work_type
              })
            }
            this.companyList = companyList1
            for (let i = 0; i < selectArry.length; i++) {
              this.selectedTags.push(parseInt(selectArry[i]))
            }
          } else {
            this.form2.setFieldsValue({
              pingName: '',
              companyTitle: { key: '133', label: '主办方' }
            })
            console.log(this.companyList)
            this.companyList = []
            this.selectedTags = []
          }
          console.log(this.companyList)
          this.companyJson.data = this.companyList
          console.log(this.companyJson)
        })
      }
      if (index == 3) {
        // 活动赞助
        const campId = this.$route.query.campId ? this.$route.query.campId :this.userid
        const params = {
        token: token,
        campId: campId
      }
        getSponsor(params).then(res => {
          console.log(res)
          if (this.code == '1000' || campId) {
            this.form3.setFieldsValue({
              closingDate: res.endTime ? moment(res.endTime, 'YYYY-MM-DD') : {},
              textYao: res.demand
            })
            const dataArrty = res.data
            const tableList = []
            const tableList1 = []

            console.log(length)
            for (let i = 0; i < dataArrty.length; i++) {
              tableList.push({
                ssKind: dataArrty[i].ss_kind,
                sponsorship: dataArrty[i].sponsorship,
                money: dataArrty[i].money,
                num: dataArrty[i].num,
                //bargain: isPrice,
                bz: dataArrty[i].bz
              })
              const length = dataArrty.length
              tableList1.push({
                key: length === 0 ? '1' : (parseInt(i) + 1).toString(),
                tgWay: dataArrty[i].ss_kind,
                zzWay: dataArrty[i].sponsorship_name,
                zzPrice: dataArrty[i].money,
                zzNum: dataArrty[i].num,
                remarks: dataArrty[i].bz,
                editable: false,
                isNew: false
              })
            }
            this.supportAyyty = tableList
            this.dataTable = tableList1
          } else {
            this.form3.setFieldsValue({
              closingDate: moment(),
              textYao: ''
            })
            this.supportAyyty = []
            this.dataTable = []
          }

          console.log(this.dataTable)
          console.log(this.supportAyyty)
          this.supportJson.data = this.supportAyyty

          console.log(this.supportJson)
        })
      }

      console.log(index)
      this.title = item.title
      if (this.$route.query.campId || this.code) {
        this.formShow = index
        this.visible = true
        this.alertVisible = false
        
      } else {
        this.formShow = 0
        this.visible = false
        if(index == 0) {
          this.visible = true
        } else{
          this.alertVisible = true
        this.alertText = '请先填写活动基本信息'
        setTimeout(() => {
          this.alertVisible = false
        }, 1000)
        }
      }

      /*if (this.findIndex == 1) {
        this.formShow = index
        this.visible = true
        this.alertVisible = false
      } else if (this.findIndex == 0) {
        this.formShow = 0
         this.visible = false
      }*/
      /*if (index == 0) {
        this.visible = true
      } else {
        this.alertVisible = true
        this.alertText = '请先填写活动基本信息'
        setTimeout(() => {
          this.alertVisible = false
        }, 1000)
      }*/
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
      console.log(this.form2.getFieldValue('companyTitle'))
      this.companyKey = this.form2.getFieldValue('companyTitle').key
      this.companyPlace = this.form2.getFieldValue('companyName')
      this.companyName = this.form2.getFieldValue('companyTitle').label
      if (this.companyPlace && this.companyKey) {
        this.companyList.push({
          name: this.companyPlace,
          workType: this.companyKey,
          work_name: this.companyName
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
      let campId = this.userid ? this.userid : this.$route.query.campId
      console.log(this.form.validateFields)
      //活动基本信息
      if (this.formShow == 0) {
        this.confirmLoading = false
        if(this.areaList.length == 0) {
          this.$message.error('请添加活动地点')
        }
        this.form.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log(11)
            console.log(values.chineseName)
            this.chinese = values.chineseName
            this.english = values.englishName
            this.email = values.emailName
            this.campCatalog = values.HuoDongName
            this.campNum = values.testNum
            this.contact = values.testName
            this.phone = values.phoneName
            //this.fileUrl = values.fileUrl
            this.address = values.placeName
            this.areaValue = values.addressName
            
            const dateList = values['rangePicker']
            const dateValue = {
              rangePicker: [dateList[0].format('YYYY-MM-DD'), dateList[1].format('YYYY-MM-DD')],
              timePicker: values['timePicker'].format('HH:mm:ss')
            }
            console.log(values.englishName)
            this.endTime = dateValue.rangePicker[1]
            this.concreteTime = dateValue.timePicker
            this.publishTime = dateValue.rangePicker[0]
            
            const params = {
              campId: campId,
              token: token,
              name: this.chinese,
              enName: this.english,
              publishTime: this.publishTime,
              endTime: this.endTime,
              concreteTime: this.concreteTime,
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
              this.userid = res.data.campId
              this.code = res.data.code
              /*if(res.data.code == '1000') {
                this.data[0].actions.checked = true
              }*/
              if (res.data.code == '1000' || res.data.code == '1001') {
                this.data[this.formShow].actions.title = '修改'
                this.visible = false
                  this.confirmLoading = false
                this.findIndex = 1
                this.$message.success('成功');
              } else {
                this.findIndex = 0
                this.$message.error('失败');
              }
            })
          }
        })
      }

      // 活动详情
      if (this.formShow == 1) {
        this.confirmLoading = false
        this.form1.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log(11)
            console.log(values)
            this.activityContent = values.textName
            /*this.videoUrls = values.englishName
            this.detailImgs = dateValue.range - picker[1]*/
            const params = {
              token: token,
              campId: this.$route.query.campId ? this.$route.query.campId :this.userid,
              content: this.activityContent,
              video: this.videoUrls,
              jsonDataPic: this.fileList.length === 0 ? '' : JSON.stringify(this.imgsJson)
            }
            console.log(params)
            getDetailsActivity(params).then(res => {
              console.log(res)
              if (res.data.code == '1000' || res.data.code == '1001') {
                this.data[this.formShow].actions.title = '修改'
                this.visible = false
                  this.confirmLoading = false
                  this.$message.success('成功');
              }else {
                this.$message.error('失败');
              }
            })
          }
        })
      }
      // 活动推广
      if (this.formShow == 2) {
        this.confirmLoading = false
        if(this.companyList.length == 0) {
          this.$message.error('请添加主承办方')
        }
        this.form2.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log(11)
            console.log(values)
            this.companyPlace = values.companyName
            this.companyName = values.companyTitle
            this.palyPlatfrom = values.pingName
            const params = {
              token: token,
              campId: this.$route.query.campId ? this.$route.query.campId :this.userid,
              jsonData: JSON.stringify(this.companyJson),
              platform: this.palyPlatfrom,
              campFeature: this.characteristic,
              pid: this.pids
            }
            console.log(params)
            getActivityPromotion(params).then(res => {
              console.log(res)
              if (res.data.code == '1000' || res.data.code == '1001') {
                this.data[this.formShow].actions.title = '修改'
                this.visible = false
                this.confirmLoading = false
                this.$message.success('成功');
              }else {
                this.$message.error('失败');
              }
            })
          }
        })
      }
      // 活动赞助
      if (this.formShow == 3) {
        this.confirmLoading = false
        this.form3.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            console.log(11)
            const dateValue = {
              closingDate: values['closingDate'].format('YYYY-MM-DD')
            }
            console.log(values)
            this.closingDate = dateValue.closingDate
            this.requirdContent = values.textYao
            const params = {
              token: token,
              campId: this.$route.query.campId ? this.$route.query.campId :this.userid,
              jsonData: JSON.stringify(this.supportJson),
              endTime: this.closingDate,
              demand: this.requirdContent
            }
            console.log(params)
            getEventSponsorship(params).then(res => {
              
              console.log(res)
              if (res.data.code == 1000 || rea.data.code == 1001) {
                this.data[this.formShow].actions.title = '修改'
                this.visible = false
                  this.confirmLoading = false
                this.$message.success('成功');
              }else {
                this.$message.error('失败');
              }
            })
          }
        })
      }
    },
    handleCancel(e) {
      this.confirmLoading = false
      this.visible = false
    },
    handleCancelImg(e) {
      console.log(e)
      this.previewVisible = false
      //this.detailImgs.splice()
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
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error('You can only upload JPG file!')
        return isJPG
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
        return isLt2M
      }
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
      
    },
    beforeUploadVideo(file) {
      console.log(file)
      const isMP4 = file.type === 'video/mp4'
      console.log(file.type === 'video/mp4')
      const isRMVB = file.type === 'video/rmvb'
      const isAVI = file.type === 'video/avi'
      if (!isMP4 && !isRMVB && !isAVI) {
        this.$message.error('不是视频格式!')
        return false
      }
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
    handleCancel1() {
      this.previewVisible = false
    },
    beforeUploadImgs(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error('You can only upload JPG file!')
        return isJPG
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
        return isLt2M
      }
      getBase64(file, imageUrl => {
        this.fileImgs = imageUrl
        this.detailsImgs.push(this.fileImgs)
        this.loading = false
      })
      
      console.log(this.detailsImgs)
      const formData = new FormData()
      formData.append('file', file)
      console.log(formData)
      getUpload(formData).then(res => {
        console.log(res)
        if (res.location) {
          this.fileList.push({
            location: res.location,
            file_name: res.fileName,
            file_type: res.fileType
          })
        }
        this.imgsJson.data = this.fileList
        console.log(this.fileList)
        const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isLt2M
      })
    },
    closeImg(index) {
      console.log(index)
      this.detailsImgs.splice(index, 1)
      this.fileList.splice(index, 1)
      this.imgsJson.data = this.fileList
    },
    handlePreview(file) {
      console.log(file)
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
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
    vlues(value) {
      console.log(value)
      this.xingValue = value.key
      this.xingName = value.label
    },
    saveRow(record) {
      console.log(record)
      this.memberLoading = true
      record.zzWay = this.xingName
      const zzWay1 = this.xingValue
      console.log(this.xingValue1)
      const { key, tgWay, zzWay, zzPrice, zzNum, remarks } = record

      if (!tgWay || !zzWay || !zzPrice || !zzNum) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      } else {
        console.log(this.dataTable)
        const tableList = []
        for (let i = 0; i < this.dataTable.length; i++) {
          tableList.push({
            ssKind: this.dataTable[i].tgWay,
            sponsorship: zzWay1,
            money: this.dataTable[i].zzPrice,
            num: this.dataTable[i].zzNum,
            //bargain: isPrice,
            bz: this.dataTable[i].remarks
          })
        }

        this.supportAyyty = tableList
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
        console.log(this.dataTable)
        const target = this.dataTable.filter(item => item.key === key)[0]
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    remove1(key) {
      console.log(key)
      this.supportAyyty.splice(key - 1, 1)
      console.log(this.supportAyyty)
      this.dataTable.splice(key, 1)
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
      /*if (column == 'tgWay') {
        if (/^[0-9]*$/.test(value)) {
          console.log('请输入文字')
          value = ''
        }
      }
      if (column == 'zzWay') {
        if (/^[0-9]*$/.test(value)) {
          console.log('请输入文字')
          value = ''
        }
      }*/
      if (column == 'zzPrice') {
        console.log(/^\d+(\.\d{0,2})?$/.test(value))
        if (!/^\d+(\.\d{0,2})?$/.test(value)) {
          value = ''
        }
      } else if (column == 'zzNum') {
        if (!/^[0-9]+(.[0-9]{2})?$/.test(value)) {
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
    this.form2 = this.$form.createForm(this)
    this.form3 = this.$form.createForm(this)
    console.log(this.form)
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    this.form1.getFieldDecorator('keys', { initialValue: [], preserve: true })
    this.form2.getFieldDecorator('keys', { initialValue: [], preserve: true })
    this.form3.getFieldDecorator('keys', { initialValue: [], preserve: true })

  }
}
</script>
