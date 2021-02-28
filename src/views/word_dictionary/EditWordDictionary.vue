<template>
  <section class="edit-page" @keyup.enter="save">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type">
          <el-option
            :key="index"
            v-for="(item, index) in wordType"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="词语" prop="word">
        <el-input v-model="form.word"></el-input>
      </el-form-item>
      <el-form-item label="旧字">
        <el-input v-model="form.oldword"></el-input>
      </el-form-item>
      <el-form-item label="拼音">
        <el-input v-model="form.pinyin"></el-input>
      </el-form-item>
      <el-form-item label="解释" prop="explanation">
        <el-input v-model="form.explanation" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="部首">
        <el-input v-model="form.radicals"></el-input>
      </el-form-item>
      <el-form-item label="笔划">
        <el-input v-model="form.strokes"></el-input>
      </el-form-item>
      <el-form-item label="更多">
        <el-input v-model="form.more" type="textarea"></el-input>
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
    name: 'EditWordDictionary',
    mixins: [mixin],
    data() {
      return {
        form: {
          type: '日式',
          word: '',
          oldword: '',
          pinyin: '',
          explanation: '',
          radicals: '',
          strokes: '',
          more: '',
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
          explanation: [
            {
              required: true,
              message: '请填写解释',
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
    },
    methods: {
      beforeUpload(file) {
        if (file.type !== 'application/json') {
          this.$message({
            showClose: true,
            message: '只能上传json文件',
            type: 'error',
          })
          return false
        }
      },
      async uploadSuccess(uploadRes) {
        if (uploadRes.code == '1000') {
          const res = await this.$post(this.API.uploadWordDictionary, {
            path: uploadRes.data.path,
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
            this.form.word = this.form.word.trim()
            if (this.selectedItem) {
              const res = await this.$put(
                `${this.API.wordDictionary}/${this.form._id}`,
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
              const res = await this.$post(this.API.wordDictionary, this.form)
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
        this.form = this.selectedItem
      }
    },
  }
</script>
