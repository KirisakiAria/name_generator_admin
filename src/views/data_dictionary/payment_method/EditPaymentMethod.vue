<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="支付方式" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="支付方式ID" prop="paymentId">
        <el-input v-model="form.paymentId"></el-input>
      </el-form-item>
      <el-form-item label="是否可用" prop="available">
        <el-checkbox v-model="form.available"></el-checkbox>
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
    name: 'EditPaymentMethod',
    mixins: [mixin],
    data() {
      return {
        form: {
          name: '',
          paymentId: '',
          available: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: '请填写分类名称',
            },
          ],
          paymentId: [
            {
              required: true,
              message: '请填写值',
            },
          ],
          available: [
            {
              required: true,
              message: '请选择是否可用',
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
    },
    methods: {
      save() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            if (this.selectedItem) {
              const res = await this.$put(
                `${this.API.paymentMethod}/${this.form._id}`,
                this.form,
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
              const res = await this.$post(this.API.paymentMethod, this.form)
              if (res.data.code == '1000') {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'success',
                })
                this.$emit('success')
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
        this.form = Object.assign(this.selectedItem)
      }
    },
  }
</script>
