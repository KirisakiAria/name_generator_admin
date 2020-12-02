<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="id" prop="planId">
        <el-input v-model="form.planId"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="原价" prop="originalPrice">
        <el-input v-model="form.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="现价" prop="currentPrice">
        <el-input v-model="form.currentPrice"></el-input>
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
    name: 'EditPlan',
    mixins: [mixin],
    data() {
      return {
        form: {
          planId: '',
          title: '',
          originalPrice: '',
          currentPrice: '',
        },
        rules: {
          planId: [
            {
              required: true,
              message: '请填写id',
            },
          ],
          title: [
            {
              required: true,
              message: '请填写标题',
            },
          ],
          originalPrice: [
            {
              required: true,
              message: '请填写原价',
            },
          ],
          currentPrice: [
            {
              required: true,
              message: '请填写现价',
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
                `${this.API.plan}/${this.selectedItem._id}`,
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
                this.API.plan,
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
