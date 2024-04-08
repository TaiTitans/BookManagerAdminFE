<template>

<div>

    <div class="flex bg-gray-100 h-[100%]">

<!-- sidebar -->
<div class="hidden md:flex flex-col w-64 bg-gray-800">
    <div class="flex items-center justify-center h-16 bg-gray-900">
        <span class="text-white font-bold uppercase">Book Manager Admin</span>
    </div>
    <div class="flex flex-col flex-1 overflow-y-auto">
        <nav class="flex-1 px-2 py-4 bg-gray-800">
            <div  class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700" @click="goToBooks">
                <svg class="w-6 h-6 text-yellow-600 mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"/>
</svg>

                Books
</div>
            <div @click="goToStaff" class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                <svg class="w-6 h-6 text-yellow-600 mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
</svg>

                Staff
</div>
            <div @click="goToCustomer" class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                <svg class="w-6 h-6 text-yellow-600 mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

               Customer
</div>
            <div  @click="dangXuat" class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                <svg class="w-6 h-6 text-blue-600 mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
</svg>

               Logout
</div>
        </nav>
    </div>
</div>

</div>


  
  </div>

</template>

<script>
import router from "../router/index";
export default {
    name:'NavBar',
    data() {
    return {
      MSNV: localStorage.getItem("MSNV"),
      isLoggedIn : localStorage.getItem("isAuthenticated")
    };
  },
    methods:{
        goToCustomer() {
      this.$router.push({ name: 'Customer' });
    },
    goToStaff() {
      this.$router.push({ name: 'Staff' });
    },
    goToBooks() {
      this.$router.push({ name: 'Books' });
    },


    dangXuat() {
      console.log("logout");
      // localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem("MSNV");
      localStorage.removeItem("isAuthenticated");
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // this.checkAuthentication();
      router.push('/login');
    },


  },
  
    }

</script>

<style>

</style>