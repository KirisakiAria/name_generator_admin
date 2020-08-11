<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="密钥" prop="secret">
        <el-input v-model="form.secret"></el-input>
      </el-form-item>
      <el-form-item label="APP名" prop="appName">
        <el-input v-model="form.appName"></el-input>
      </el-form-item>
      <el-form-item label="包名" prop="packageName">
        <el-input v-model="form.packageName"></el-input>
      </el-form-item>
      <el-form-item label="构建版本" prop="buildNumber">
        <el-input v-model="form.buildNumber"></el-input>
      </el-form-item>
      <el-form-item label="APP版本" prop="version">
        <el-input v-model="form.version"></el-input>
      </el-form-item>
      <el-button class="submit" type="primary" @click="submit">提交</el-button>
    </el-form>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  export default {
    name: 'Application',
    mixins: [mixin],
    data() {
      return {
        form: {
          _id: '',
          secret: '',
          appName: '',
          packageName: '',
          buildNumber: '',
          apiVersion: '',
        },
        rules: {
          secret: [
            {
              required: true,
              message: '请填写密钥',
            },
          ],
          appName: [
            {
              required: true,
              message: '请填写APP名',
            },
          ],
          packageName: [
            {
              required: true,
              message: '请填写包名',
            },
          ],
          buildNumber: [
            {
              required: true,
              message: '请填写构建版本',
            },
          ],
          version: [
            {
              required: true,
              message: '请填写APP版本',
            },
          ],
        },
      }
    },
    methods: {
      async getData() {
        const res = await this.$get(this.API.app)
        if (res.data.code == '1000') {
          this.form = res.data.data.app
        }
      },
      submit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            const res = await this.$put(
              `${this.API.app}/${this.form._id}`,
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
            return false
          }
        })
      },
    },
    created() {
      this.getData()
    },
  }
</script>
