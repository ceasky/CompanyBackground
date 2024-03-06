<template>
  <div class="d-flex justify-content-center">
    <b-card style="width: 30rem; height: 15rem" class="mt-5">
      <form class="w-100" @submit.prevent.stop="handleSubmit">
        <div class="text-center mb-3">
          <h1 class="h3">Sign In</h1>
        </div>

        <div class="form-label-group d-flex align-items-center mb-3">
          <label for="email">account：</label>
          <input
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="account or email"
            autocomplete="username"
            v-model="email"
            required
            autofocus
          />
        </div>

        <div class="form-label-group d-flex align-items-center mb-3">
          <label for="password">Password：</label>
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
            placeholder="Password"
            autocomplete="current-password"
            v-model="password"
            required
          />
        </div>

        <button :disabled="isProcessing" class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </b-card>
  </div>
</template>

<script>
// import authorizationAPI from './../apis/authorization'
// import { Toast } from './../utils/helpers'

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    // async handleSubmit (e) {
    //   try {
    //     if (!this.email || !this.password) {
    //       Toast.fire({
    //         icon: 'warning',
    //         title: '請填入 email 和 password'
    //       })
    //       return
    //     }

    //     this.isProcessing = true

    //     // 使用 authorizationAPI 的 signIn 方法
    //     // 並且帶入使用者填寫的 email 和 password
    //     const response = await authorizationAPI.signIn({
    //       email: this.email,
    //       password: this.password
    //     })

    //     const { data } = response

    //     if (data.status !== 'success') {
    //       throw new Error(data.message)
    //     }

    //     // 將 token 存放在 localStorage 內
    //     localStorage.setItem('token', data.token)

    //     // 成功登入後轉址到餐聽首頁
    //     this.$router.push('/restaurants')
    //   } catch (error) {
    //     this.password = ''
    //     this.isProcessing = false

    //     Toast.fire({
    //       icon: 'warning',
    //       title: '請確認您輸入了正確的帳號密碼'
    //     })
    //   }
    // }

    handleSubmit() {
      let token = "test";
      localStorage.setItem("token", token);
      this.$router.push("/");
      this.$router.go(0);
    },
  },
  created() {
    //main view edit css
    this.$store.commit("setSidebarType", "0");
  },
};
</script>
<style scoped>
label {
  margin: 0;
  width: 7rem;
}
</style>