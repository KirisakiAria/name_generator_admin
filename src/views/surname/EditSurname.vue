<template>
  <section class="edit-page" @keyup.enter="save">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓氏" prop="surname">
        <el-input v-model="form.surname" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="导入" v-if="!this.selectedItem">
        <el-upload
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
          <div class="el-upload__tip" slot="tip">只能上传txt文件</div>
        </el-upload>
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
    name: 'EditSurname',
    mixins: [mixin],
    data() {
      return {
        form: {
          surname: '',
        },
        rules: {
          surname: [
            {
              required: true,
              message: '请填写姓氏',
            },
          ],
        },
        fileList: [],
      }
    },
    props: {
      selectedItem: {
        type: Object,
        default: null,
      },
      type: {
        type: String,
        default: '',
      },
      classifyList: {
        type: Array,
        default() {
          return []
        },
      },
    },
    methods: {
      beforeUpload(file) {
        if (file.type !== 'text/plain') {
          this.$message({
            showClose: true,
            message: '只能上传txt文件',
            type: 'error',
          })
          return false
        }
        this.$refs.form.validateField('type')
        if (!this.form.type) {
          return false
        }
      },
      async uploadSuccess(uploadRes) {
        if (uploadRes.code == '1000') {
          const res = await this.$post(this.API.uploadSurname, {
            surname: this.form.surname,
          })
          if (res.data.code == '1000') {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success',
            })
            this.$emit('success')
          }
        }
      },
      save() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            this.form.surname = this.form.surname.trim()
            if (this.selectedItem) {
              const res = await this.$put(
                `${this.API.surname}/${this.form._id}`,
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
              const res = await this.$post(this.API.surname, this.form)
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
        this.form = Object.assign(this.selectedItem, {
          type: this.type,
        })
      }
    },
  }
</script>
