<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="50px">
      <el-form-item label="头像" v-if="!this.id">
        <el-upload
          ref="upload"
          drag
          :headers="API.headers"
          :action="url + API.upload"
          :on-success="uploadSuccess"
          multiple
          :before-upload="beforeUpload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            只能上传txt文件
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号" prop="word">
        <el-input v-model="form.word"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="word">
        <el-input v-model="form.word"></el-input>
      </el-form-item>
      <el-form-item label="是否VIP" prop="type">
        <el-select v-model="form.type" placeholder="请选择是否VIP">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="VIP开始时间" prop="word">
        <el-input v-model="form.word"></el-input>
      </el-form-item>
      <el-form-item label="VIP过期时间" prop="word">
        <el-input v-model="form.word"></el-input>
      </el-form-item>
      <el-button class="submit" type="primary" @click="submit">提交</el-button>
    </el-form>
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'
  export default {
    name: 'editWord',
    mixins: [mixin],
    data() {
      return {
        form: {
          type: '日语',
          word: '',
        },
        rules: {
          type: [
            {
              required: true,
              message: '请选择类型',
            },
          ],
          word: [
            {
              required: true,
              message: '请填写词语',
            },
          ],
        },
        fileList: [],
      }
    },
    props: {
      id: {
        type: String,
      },
      type: {
        type: String,
      },
      word: {
        type: String,
      },
    },
    computed: {
      url() {
        return process.env.VUE_APP_BASE_API
      },
    },
    methods: {
      beforeUpload(file) {
        if (file.type !== 'text/plain') {
          return false
        }
        this.$refs.form.validateField('type')
        if (!this.form.type) {
          return false
        }
      },
      async uploadSuccess(uploadRes) {
        if (uploadRes.code == '1000') {
          const res = await this.$post(this.API.uploadWordList, {
            path: uploadRes.data.path,
          })
          if (res.data.code == '1000') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success',
            })
          }
        }
      },
      submit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            if (this.id) {
              const res = await this.$put(
                `${this.API.word}/${this.id}`,
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
              const res = await this.$post(this.API.word, this.form)
              if (res.data.code == '1000') {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'success',
                })
              }
            }
          } else {
            return false
          }
        })
      },
    },
    created() {
      if (this.id) {
        this.form.type = this.type
        this.form.word = this.word
      } else {
        const type = this.$route.query.type
        if (type) {
          this.form.type = type
        }
      }
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
</style>
