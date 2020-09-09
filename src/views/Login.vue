<template>
  <section class="login" @keyup.enter="login">
    <section class="form">
      <h4>用户登录</h4>
      <el-form ref="form" label-width="65px" :model="formData" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="暗号" prop="authCode">
          <el-input type="password" v-model="formData.authCode"></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary" class="btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </section>
</template>
<script>
  import mixin from '@/mixin/mixin'
  export default {
    name: 'Login',
    mixins: [mixin],
    data() {
      return {
        formData: {
          username: '',
          password: '',
          authCode: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          authCode: [
            { required: true, message: '请输入暗号', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      login() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$post(this.API.login, {
              username: this.formData.username,
              password: this.formData.password,
              authCode: this.formData.authCode,
            }).then(res => {
              if (res.data.code == '1000') {
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('uid', res.data.data.uid)
                localStorage.setItem('avatar', res.data.data.avatar)
                localStorage.setItem('username', res.data.data.username)
                this.$axios.defaults.headers.common['Authorization'] =
                  res.data.data.token
                this.$store.commit('user/changeUserData', {
                  uid: res.data.data.uid,
                  avatar: res.data.data.avatar,
                  username: res.data.data.username,
                })
                this.$router.replace('/')
              }
            })
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="less" scoped>
  @import url('../assets/css/style.less');

  .login {
    height: 100vh;
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      ),
      url('../assets/img/login.jpg');
    background-size: cover;

    .form {
      width: 400px;
      padding: 25px 50px;
      position: fixed;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.15);
      background: #fff;
      .center;
      .br(8px);

      h4 {
        text-align: center;
        margin-bottom: 30px;
      }

      .btn {
        display: block;
        margin: auto;
      }
      .el-form-item:last-of-type {
        margin-bottom: 0;
      }
    }
  }
</style>
