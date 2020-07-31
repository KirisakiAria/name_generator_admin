<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="50px">
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="中国风" value="中国风"></el-option>
          <el-option label="日语" value="日语"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字数" prop="number">
        <el-select v-model="form.number" placeholder="请选择字数">
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in 4"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="词语" prop="word">
        <el-input v-model="form.word"></el-input>
      </el-form-item>
      <el-form-item label="导入">
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
          type: '',
          number: '',
          word: '',
        },
        rules: {
          type: [
            {
              required: true,
              message: '请选择类型',
            },
          ],
          number: [
            {
              required: true,
              message: '请选择字数',
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
        const typeCheckedResult = this.$refs.form.validateField('type')
        const numberCheckedResult = this.$refs.form.validateField('number')
        // if (!this.form.type || !this.form.number) {
        //   return false
        // }
      },
      async uploadSuccess(uploadRes) {
        if (uploadRes.code == '1000') {
          const res = await this.$post(this.API.uploadWordList, {
            path: uploadRes.data.path,
          })
          if (res.code == '1000') {
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
            const res = await this.$post(this.API.addWord, this.form)
            if (res.data.code == '1000') {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'success',
              })
            }
          } else {
            return false
          }
        })
      },
    },
    created() {
      const type = this.$route.query.type
      const number = this.$route.query.number
      if (type && number) {
        this.form.type = type
        this.form.number = number
      }
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
</style>
