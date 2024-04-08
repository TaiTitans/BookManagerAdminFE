<template>
  <div class="w-[100%]">
<!---Navbar-->

       <div class="flex flex-col flex-1 overflow-y-auto" id="navbar">
        <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
            <div class="flex items-center px-4">
                <input class="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search">
            </div>
            <div class="font-mono text-[18px]">
                Staff Manage
               </div>
            <div class="flex items-center pr-4">

                <button
                    class="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
                    </svg>
                </button>
            </div>
        </div>
        <router-view/>
    </div>
    <div class="mt-2 ml-2 mb-4 text-[20px] font-mono font-bold">
    Danh sách nhân viên
</div>

<div class="ml-4 mr-4 bg-white rounded-md shadow-md">

    <table id="staffTable" class="display">
            <thead>
              <tr>
                <th>MSNV</th>
                <th>Họ tên</th>
                <th>Chức vụ</th>
                <th>Địa chỉ</th>
                <th>SĐT</th>
              </tr>
            </thead>
            <tbody>
              <!-- Data will be populated here -->
            </tbody>
          </table>

</div>
<div class="mt-6 ml-2 mb-4 text-[20px] font-mono font-bold">
    Chức năng (Admin)
</div>

<div class="bg-white rounded-lg shadow relative m-10">

<div class="flex items-start justify-between p-5 border-b rounded-t">
    <h3 class="text-xl font-semibold">
       Thêm nhân viên
    </h3>
    <div v-if="errorMessage" class="text-red-600 font-semibold">
                  {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="text-green-600 font-semibold">
                  {{ successMessage }}
                </div>
</div>

<div class="p-6 space-y-6">
    <form @submit.prevent="addStaff">
        <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
                <label for="product-name" class="text-sm font-medium text-gray-900 block mb-2">MSNV</label>
                <input v-model="formData.MSNV" type="text" name="product-name" id="product-name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"  required="">
            </div>
            <div class="col-span-6 sm:col-span-3">
                <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Họ Tên</label>
                <input v-model="formData.HoTenNV" type="text" name="category" id="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"  required="">
            </div>
            <div class="col-span-6 sm:col-span-3">
    <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Chức vụ</label>
    <input v-if="formData.ChucVu === 'Staff'" v-model="formData.ChucVu" type="text" name="price" id="price" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required>
    <select v-else v-model="formData.ChucVu" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" required>
        <option value="Staff">Staff</option>
    </select>
</div>
            <div class="col-span-6 sm:col-span-3">
                <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Địa chỉ</label>
                <input v-model="formData.DiaChi" type="text" name="category" id="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"  required="">
            </div>
            <div class="col-span-6 sm:col-span-3">
                <label for="category" class="text-sm font-medium text-gray-900 block mb-2">SDT</label>
                <input v-model="formData.SDT" type="number" name="category" id="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"  required="">
            </div>
            <div class="col-span-6 sm:col-span-3">
                <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Mật khẩu</label>
                <input v-model="formData.Password" type="password" name="category" id="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"  required="">
            </div>
        </div>

     <div class="p-6 border-t border-gray-200 rounded-b">
         <button class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Thêm</button>
     </div>
     
    </form>
</div>

</div>


  </div>
</template>

<script>
import $ from 'jquery';
import 'datatables.net'; // Import DataTable.js
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import api from "../services/api.services";
export default {
    data() {
      return {
        errorMessage: null,
        successMessage: null,
        formData: {
        MSNV:"",
        HoTenNV:"",
        ChucVu:"",
        DiaChi:"",
        Password:"",
        SDT:0,
      },
      isDataTableInitialized: false,
      bookTable: null,
      };
    },
    mounted() {
    this.fetchStaffs(); // Fetch books data when component is mounted
  },
  methods:{
    fetchStaffs() {
      api.get('/staff/getAll')
        .then(response => {
          const staffData = response.data;
          console.log(response.data);
          this.populateTable(staffData);
        })
        .catch(error => {
          console.error('Error fetching staff:', error);
        });
    },
    populateTable(data) {
  if (!this.isDataTableInitialized) {
    this.staffTable = $('#staffTable').DataTable({
      data: data.data,
      columns: [
        { data: 'MSNV' },
        { data: 'HoTenNV' },
        { data: 'ChucVu' },
        { data: 'DiaChi' },
        { data: 'SDT' },
        {
          data: null,
          render: function(data, type, row) {
            console.log('Data in render function:', data);
            return `<button v-if="formData.ChucVu === 'Staff'" class="bg-red-500 text-white rounded-md mr-1 p-2" @click="deleteBook('${data.MSNV}')">Xoá</button>`;
          }
        }
      ]
    });
    this.isDataTableInitialized = true;
  } else {
    this.staffTable.clear().rows.add(data.data).draw();
  }
},
addStaff() {
        if (this.formData.ChucVu === 'Staff') {
            api.post('/staff/create', this.formData)
                .then(response => {
                    // Handle success message and refresh DataTable
                    this.successMessage = "Thêm nhân viên thành công!";
                    this.fetchStaffs();
                    this.formData = {
                        MSNV: "",
                        HoTenNV: "",
                        ChucVu: "",
                        DiaChi: "",
                        SDT: 0,
                        Password:""
                    };
                })
                .catch(error => {
                    // Handle error message
                    this.errorMessage = "Lỗi khi thêm nhân viên: " + error.message;
                });
        } else {
            this.errorMessage = "Chỉ được phép thêm nhân viên có chức vụ là 'Staff'";
        }
    }
  }
}
</script>

<style>

</style>