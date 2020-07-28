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
          drag
          :headers="API.headers"
          :action="url + API.upload"
          multiple
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
  import API from '../request/API'
  export default {
    name: 'editWord',
    data() {
      return {
        API: API,
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
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 1 个文件，本次选择了 ${
            files.length
          } 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        )
      },
      submit() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            const res = await this.$post(API.addWord, this.form)
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
