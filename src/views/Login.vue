<template>
    <div>
      <body class="bg-gray-100 h-screen flex items-center justify-center">
        <!-- component -->
        <div
          class="h-screen bg-gradient-to-br from-blue-600 to-cyan-300 flex justify-center items-center w-full"
        >
          <form @submit.prevent="dangnhap">
            <div
              class="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm"
            >
              <div class="space-y-4">
                <h1 class="text-center text-2xl font-semibold text-gray-600">
                  Đăng nhập
                </h1>
                <div v-if="errorMessage" class="text-red-600 font-semibold">
                  {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="text-green-600 font-semibold">
                  {{ successMessage }}
                </div>
                <hr />
                <div class="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    aria-hidden="true"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
  
                  <input
                    class="pl-2 outline-none border-none w-full"
                    type="name"
                    name="name"
                    value=""
                    v-model="MSNV"
                    placeholder="Tên đăng nhập"
                    required
                  />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-md">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    class="pl-2 outline-none border-none w-full"
                    type="password"
                    name="password"
                    v-model="Password"
                    placeholder="Mật khẩu"
                    required
                  />
                </div>
              </div>
              <!-- Remember Me checkbox -->
              <div class="flex justify-center items-center mt-4">
                <p
                  class="inline-flex items-center text-gray-700 font-medium text-xs text-center"
                >
                  <input
                    type="checkbox"
                    id="rememberMeCheckbox"
                    name="rememberMe"
                    class="mr-2"
                  />
                  <span class="text-xs font-semibold">Ghi nhớ?</span>
                </p>
              </div>
  
              <button
                type="submit"
                value="login"
                id="login"
                class="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-600 to-red-400 hover:to-red-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
              >
                Đăng nhập
              </button>
              <hr />
            </div>
          </form>
        </div>
      </body>
    </div>
  </template>
  
  <script>
  import api from "../services/api.services";
  import router from "../router/index";
  export default {
    data() {
      return {
        MSNV: "",
        Password: "",
        errorMessage: null,
        successMessage: null,
      };
    },
    methods: {
   dangnhap() {
        if (!this.MSNV || !this.Password) {
          this.errorMessage = "Vui lòng nhập tên đăng nhập và mật khẩu";
          return;
        }
        const formData = {
          MSNV: this.MSNV,
          Password: this.Password,
        };
  
        api
          .post("/staff/dangnhap", formData)
          .then((response) => {
            console.log(response);
            const accessToken = response.data.accessToken;
            document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; secure;`;
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("MSNV", response.data.data.customer);
            this.successMessage = "Đăng nhập thành công !!";
             router.push({name: 'Books'});
          })
          .catch((error) => {
            console.error(error);
            this.errorMessage = "Lỗi đăng nhập!";
          });
      },
    },
  };
  </script>
  
  <style></style>