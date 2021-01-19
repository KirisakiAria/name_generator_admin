<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="激活码" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="激活期限" prop="planId">
        <el-select v-model="form.planId" placeholder="请选择激活码是否已被激活">
          <el-option
            v-for="(item, index) in planList"
            :key="index"
            :label="item.title"
            :value="item.planId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.userTel"></el-input>
      </el-form-item>
      <el-form-item label="激活时间" prop="activatedTime">
        <el-date-picker
          v-model="form.activatedTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="timestamp"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="是否激活" prop="userTel">
        <el-select
          v-model="form.activated"
          placeholder="请选择激活码是否已被激活"
        >
          <el-option label="已激活" :value="true"></el-option>
          <el-option label="未激活" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="save" type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  export default {
    name: 'EditKey',
    mixins: [mixin],
    data() {
      return {
        form: {
          code: '',
          planId: '',
          userTel: '',
          activated: false,
          activatedTime: '',
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date())
              },
            },
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              },
            },
            {
              text: '一周前',
              onClick(picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              },
            },
          ],
        },
        rules: {
          code: [
            {
              required: true,
              message: '请填写激活码',
            },
          ],
          planId: [
            {
              required: true,
              message: '请选择期限',
            },
          ],
        },
      }
    },
    props: {
      selectedItem: {
        type: Object,
        default: null,
      },
      planList: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      save() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            if (this.selectedItem) {
              const res = await this.$put(
                `${this.API.key}/${this.selectedItem._id}`,
                Object.assign(this.form),
              )
              if (res.data.code == '1000') {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'success',
                })
                this.$emit('close')
              }
            } else {
              const res = await this.$post(
                this.API.key,
                Object.assign(this.form),
              )
              if (res.data.code == '1000') {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'success',
                })
                this.$emit('close')
              }
            }
          } else {
            return false
          }
        })
      },
    },
    created() {
      if (this.selectedItem) {
        this.form = this.selectedItem
      }
    },
  }
</script>
