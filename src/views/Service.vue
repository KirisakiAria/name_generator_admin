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
    <el-button @click="save" class="save-btn" type="success">保存</el-button>
  </section>
</template>
<script>
  import Editor from '@tinymce/tinymce-vue'
  import mixin from '@/mixin/mixin'
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
          height: 1000,
          menubar: true,
          plugins: [
            'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          ],
          toolbar: [
            'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
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
      async save() {
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
  .editor-wrapper {
    margin-top: 20px;
  }
  .save-btn {
    display: block;
    width: 300px;
    margin: auto;
    margin-top: 20px;
  }
</style>
