<template>
  <section class="edit-page">
    <el-tabs v-model="activeName">
      <el-tab-pane label="隐私协议" name="privacyPolicy">
        <section class="editor-wrapper">
          <Editor
            v-model="form.privacyPolicy"
            :apiKey="apiKey"
            :init="editorOptions"
          />
        </section>
      </el-tab-pane>
      <el-tab-pane label="服务条款" name="terms">
        <section class="editor-wrapper">
          <Editor v-model="form.terms" :apiKey="apiKey" :init="editorOptions" />
        </section>
      </el-tab-pane>
      <el-tab-pane label="使用方法" name="usage">
        <section class="editor-wrapper">
          <Editor v-model="form.usage" :apiKey="apiKey" :init="editorOptions" />
        </section>
      </el-tab-pane>
    </el-tabs>
    <el-button @click="submit" class="submit-btn" type="success">
      提交
    </el-button>
  </section>
</template>
<script>
  import Editor from '@tinymce/tinymce-vue'
  import mixin from '../mixin/mixin'
  export default {
    name: 'Service',
    mixins: [mixin],
    data() {
      return {
        apiKey: '5lanibo6fy9v1wcaxad3mebitewzf48pds2fohysianxw6as',
        form: {
          id: '',
          privacyPolicy: '',
          terms: '',
          usage: '',
        },
        activeName: 'privacyPolicy',
        editorOptions: {
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap',
            'searchreplace visualblocks code fullscreen',
            'print preview anchor insertdatetime media',
            'paste code help wordcount table',
          ],
          toolbar: [
            'undo redo | formatselect fontselect fontsizeselect | bold italic underline strikethrough | \
            blockquote | alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | cut copy paste | removeformat | ',
          ],
        },
      }
    },
    components: { Editor },
    methods: {
      async getData() {
        const res = await this.$get(this.API.service)
        if (res.data.code == '1000') {
          this.form = res.data.data
        }
      },
      async submit() {
        const res = await this.$put(
          `${this.API.service}/${this.form._id}`,
          this.form,
        )
        if (res.data.code == '1000') {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success',
          })
        }
      },
    },
    created() {
      this.getData()
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');
  .editor-wrapper {
    margin-top: 20px;
  }
  .submit-btn {
    display: block;
    width: 300px;
    margin: auto;
    margin-top: 20px;
  }
</style>
