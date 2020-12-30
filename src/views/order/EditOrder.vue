<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="订单Id">
        <el-input v-model="form.orderNo" readonly></el-input>
      </el-form-item>
      <el-form-item label="订单描述" prop="body">
        <el-input v-model="form.body"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）" prop="price">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker
          v-model="form.time"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="timestamp"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="支付方式" prop="paymentMethod">
        <el-select v-model="form.paymentMethod" placeholder="请选择支付方式">
          <el-option
            :key="index"
            v-for="(item, index) in paymentMethodList"
            :label="item.name"
            :value="item.paymentId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式" prop="status">
        <el-select v-model="form.status" placeholder="请选择订单状态">
          <el-option label="已完成" :value="true"></el-option>
          <el-option label="未完成" :value="false"></el-option>
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
    name: 'EditOrder',
    mixins: [mixin],
    data() {
      return {
        form: {
          orderNo: '',
          body: '',
          userId: '',
          price: '',
          time: '',
          paymentMethod: '',
          status: '',
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
          body: [
            {
              required: true,
              message: '请填写订单描述',
            },
          ],
          tel: [
            {
              required: true,
              message: '请填写用户手机号',
            },
          ],
          price: [
            {
              required: true,
              message: '请填写价格',
            },
          ],
          time: [
            {
              required: true,
              message: '请填写时间',
            },
          ],
          paymentMethod: [
            {
              required: true,
              message: '请选择支付方式',
            },
          ],
          status: [
            {
              required: true,
              message: '请选择订单状态',
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
      paymentMethodList: {
        type: Array,
        default: null,
      },
    },
    methods: {
      createOrderNo() {
        this.form.orderNo =
          Date.now() + this.form.tel + Math.round(Math.random() * 10000)
      },
      save() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            if (this.selectedItem) {
              const res = await this.$put(
                `${this.API.order}/${this.selectedItem._id}`,
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
              this.createOrderNo()
              const res = await this.$post(
                this.API.order,
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
