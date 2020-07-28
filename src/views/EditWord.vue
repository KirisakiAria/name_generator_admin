<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="50px">
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型" prop="type">
          <el-option label="中国风" value="1"></el-option>
          <el-option label="日语" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字数">
        <el-select v-model="form.number" placeholder="请选择字数" prop="number">
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in 4"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="词语" prop="word">
        <el-input v-model="form.name"></el-input>
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
      }
    },
    methods: {
      async submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const res = this.$post(API.addWord, this.form)
            if (res.code == '1000') {
              console.log(res)
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
