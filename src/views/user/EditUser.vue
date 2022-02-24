<template>
  <section class="edit-page">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :headers="API.headers"
          :action="url + API.upload"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
        >
          <img
            v-if="form.avatar"
            :src="serverUrl + form.avatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input type="number" v-model="form.tel" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="是否VIP" prop="vip">
        <el-select v-model="form.vip" placeholder="请选择是否VIP">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="VIP开始时间">
        <el-date-picker
          v-model="form.vipStartTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="VIP过期时间">
        <el-date-picker
          :disabled="permanent"
          v-model="form.vipEndTime"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="timestamp"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="永久会员">
        <el-checkbox v-model="permanent"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="save" type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  import cryptoRandomString from 'crypto-random-string'
  import mixin from '@/mixin/mixin'
  export default {
    name: 'EditUser',
    mixins: [mixin],
    data() {
      return {
        form: {
          avatar: '/avatar/avatar.png',
          tel: '',
          username: '彼岸自在',
          password: cryptoRandomString({ length: 10 }),
          vip: false,
          vipStartTime: 0,
          vipEndTime: 0,
        },
        vipStartTime: 0,
        vipEndTime: 0,
        permanent: false,
        rules: {
          tel: [
            {
              required: true,
              message: '请填写手机号',
            },
          ],
          username: [
            {
              required: true,
              message: '请填写用户名',
            },
          ],
          password: [
            {
              required: true,
              message: '请填写密码',
            },
          ],
          vip: [
            {
              required: true,
              message: '请选择是否是vip',
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
        if (!file.type.includes('image')) {
          return false
        }
      },
      uploadSuccess(res) {
        if (res.code == '1000') {
          this.form.avatar = res.data.path
        }
      },
      save() {
        if (this.permanent) {
          this.form.vipEndTime = -1
        }
        this.$refs.form.validate(async valid => {
          if (valid) {
            if (this.selectedItem) {
              const res = await this.$put(
                `${this.API.user}/${this.selectedItem._id}`,
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
              const res = await this.$post(this.API.user, this.form)
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
      if (this.selectedItem) {
        this.form = this.selectedItem
        if (this.form.vipEndTime == -1) {
          this.permanent = true
        }
      }
    },
  }
</script>
<style lang="less">
  .avatar-uploader {
    width: 180px;
    height: 180px;

    img {
      width: 100%;
      height: 100%;
    }

    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;

      &:hover {
        border-color: #409eff;
      }
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
</style>
