<template>
  <section class="output">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="中国风" value="中国风"></el-option>
          <el-option label="日语" value="日语"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否展示">
        <el-select v-model="form.showable" placeholder="是否展示">
          <el-option label="全部" value="all"></el-option>
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.classify">
          <el-option label="全部" value="all"></el-option>
          <el-option
            v-for="(item, index) in classifyList"
            :key="index"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字数">
        <el-select v-model="form.length" placeholder="请选择字数">
          <el-option label="全部" value="all"></el-option>
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in 9"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="close">取消</el-button>
        <el-button type="success" @click="output">导出</el-button>
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
          classify: 'all',
          showable: 'all',
          length: 'all',
        },
      }
    },
    props: {
      classifyList: {
        type: Array,
        default() {
          return []
        },
      },
    },
    methods: {
      close() {
        this.$emit('close')
      },
      createElementA(name, href) {
        var a = document.createElement('a')
        a.download = name
        a.href = this.serverUrl + href
        document.body.appendChild(a)
        a.click()
        a.remove()
      },
      async output() {
        const res = await this.$post(this.API.wordOutput, this.form)
        if (res.data.code == '1000') {
          this.createElementA(
            `${this.form.type}-${this.form.classify}-${this.form.showable}-${this.form.length}`,
            res.data.downloadUrl,
          )
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success',
          })
          this.$emit('close')
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
