<template>
  <section class="output">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="中国风" value="中国风"></el-option>
          <el-option label="日语" value="日语"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否展示">
        <el-select v-model="form.showable" placeholder="是否展示">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="classify">
        <el-input v-model="form.classify"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="close">取消</el-button>
        <el-button type="success" @click="output">
          导出
        </el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  export default {
    name: 'OutputFile',
    mixins: [mixin],
    data() {
      return {
        form: {
          type: '中国风',
          word: '',
          classify: '默认',
          showable: true,
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
          classify: [
            {
              required: true,
              message: '请填写分类',
            },
          ],
        },
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      output() {
        this.$refs.form.validate(async valid => {
          if (valid) {
            if (this.selectedItem) {
              const res = await this.$put(
                `${this.API.word}/${this.form._id}`,
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
