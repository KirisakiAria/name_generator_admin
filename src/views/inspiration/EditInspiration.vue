<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="中国风标题" prop="chinese.title">
        <el-input v-model="form.chinese.title"></el-input>
      </el-form-item>
      <el-form-item label="中国风作者" prop="chinese.author">
        <el-input v-model="form.chinese.author"></el-input>
      </el-form-item>
      <el-form-item label="中国风内容" prop="chinese.content">
        <el-input type="textarea" v-model="form.chinese.content"></el-input>
      </el-form-item>
      <el-form-item label="日式标题" prop="japanese.title">
        <el-input v-model="form.japanese.title"></el-input>
      </el-form-item>
      <el-form-item label="日式作者" prop="japanese.author">
        <el-input v-model="form.japanese.author"></el-input>
      </el-form-item>
      <el-form-item label="日式内容" prop="japanese.content">
        <el-input type="textarea" v-model="form.japanese.content"></el-input>
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
    name: 'EditInspiration',
    mixins: [mixin],
    data() {
      return {
        form: {
          chinese: {
            title: '',
            content: '',
          },
          japanese: {
            title: '',
            content: '',
          },
        },
        rules: {
          'chinese.title': [
            {
              required: true,
              message: '请填写中文标题',
            },
          ],
          'chinese.author': [
            {
              required: true,
              message: '请填写中文作者',
            },
          ],
          'chinese.content': [
            {
              required: true,
              message: '请填写中文内容',
            },
          ],
          'japanese.title': [
            {
              required: true,
              message: '请填写日文标题',
            },
          ],
          'japanese.author': [
            {
              required: true,
              message: '请填写日文作者',
            },
          ],
          'japanese.content': [
            {
              required: true,
              message: '请填写日文内容',
            },
          ],
        },
      }
    },
    props: {
      item: {
        type: Object,
        default: null,
      },
    },
    methods: {
      save() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            if (this.item) {
              const res = await this.$put(
                `${this.API.inspiration}/${this.item._id}`,
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
              const res = await this.$post(this.API.inspiration, this.form)
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
      if (this.item) {
        this.form = this.item
      }
    },
  }
</script>
