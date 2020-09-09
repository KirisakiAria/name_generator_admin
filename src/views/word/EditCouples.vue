<template>
  <section class="edit-page" @keyup.enter="save">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="类型" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择类型"
          :disabled="!!selectedItem"
        >
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
      <el-form-item label="词语1">
        <el-input v-model="form.words[0]"></el-input>
      </el-form-item>
      <el-form-item label="词语2">
        <el-input v-model="form.words[1]"></el-input>
      </el-form-item>
      <el-button class="save" type="primary" @click="save">保存</el-button>
    </el-form>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  export default {
    name: 'EditCouples',
    mixins: [mixin],
    data() {
      return {
        form: {
          type: '中国风',
          words: ['', ''],
          classify: '默认',
          showable: true,
        },
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
    },
    methods: {
      async save() {
        this.form.words[0] = this.form.words[0].trim()
        this.form.words[1] = this.form.words[1].trim()
        if (this.form.words[0].length < 1) {
          return this.$message({
            showClose: true,
            message: '词语最小长度为1',
            type: 'error',
          })
        }
        if (this.form.words[0].length !== this.form.words[1].length) {
          return this.$message({
            showClose: true,
            message: '两个词语长度必须一致',
            type: 'error',
          })
        }
        if (this.selectedItem) {
          const res = await this.$put(
            `${this.API.couples}/${this.form._id}`,
            Object.assign(this.form, { checked: false }),
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
          const res = await this.$post(this.API.couples, this.form)
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
