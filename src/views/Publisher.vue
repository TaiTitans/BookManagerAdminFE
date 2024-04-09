<template>
  
  <div class="w-[100%] h-[100%]">
    <!-- Navbar -->
    <div class="flex flex-col flex-1 overflow-y-auto" id="navbar">
      <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
        <div class="flex items-center px-4">
          <input class="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
        </div>
        <div class="font-mono text-[18px]">
         Nhà xuất bản
        </div>
        <div class="flex items-center pr-4">
          <button class="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      <router-view />
    </div>

    <div class="ml-4 mr-4 bg-white rounded-md shadow-md mt-4">
      <h2 class="text-xl font-bold mb-4 ml-4">Danh sách Nhà xuất bản</h2>
      <table id="publisherTable" class="table table-striped table-bordered" style="width:100%;">
        <thead>
          <tr>
            <th>Mã NXB</th>
            <th>Tên NXB</th>
            <th>Địa Chỉ</th>
          </tr>
        </thead>
      </table>
      <h2 class="text-xl font-bold mb-4 mt-4 ml-4">Thêm Nhà xuất bản</h2>
      <div class="p-4">
        <div class="mb-4">
          <label for="MaNXB" class="block font-bold mb-2">Mã NXB:</label>
          <input type="text" id="MaNXB" v-model="newPublisher.MaNXB" class="border rounded-md px-4 py-2 w-full" />
        </div>
        <div class="mb-4">
          <label for="TenNXB" class="block font-bold mb-2">Tên NXB:</label>
          <input type="text" id="TenNXB" v-model="newPublisher.TenNXB" class="border rounded-md px-4 py-2 w-full" />
        </div>
        <div class="mb-4">
          <label for="DiaChi" class="block font-bold mb-2">Địa Chỉ:</label>
          <input type="text" id="DiaChi" v-model="newPublisher.DiaChi" class="border rounded-md px-4 py-2 w-full" />
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="createPublisher">
          Thêm Nhà xuất bản
        </button>
        <div v-if="showSuccessMessage" class="bg-green-500 text-white p-4 rounded-md mt-4">
          Thêm nhà xuất bản thành công!
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import 'datatables.net'; // Import DataTable.js
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import api from '../services/api.services'

export default {
  data() {
    return {
      publisherData: [],
      newPublisher: {
        MaNXB: '',
        TenNXB: '',
        DiaChi: '',
      },
      showSuccessMessage: false,
      showErrorMessage: false,
    };
  },
  mounted() {
    this.initializeDataTable();
  },
  methods: {
    initializeDataTable() {
      const vm = this;
      api.get('/publisher/getAll')
        .then((response) => {
          vm.publisherData = response.data.data;
          $('#publisherTable').DataTable({
            data: vm.publisherData,
            columns: [
              { data: 'MaNXB' },
              { data: 'TenNXB' },
              { data: 'DiaChi' },
            ],
            language: {
              processing: 'Đang tải...',
              lengthMenu: 'Hiển thị _MENU_ dòng',
              zeroRecords: 'Không tìm thấy dữ liệu',
              info: 'Hiển thị _START_ đến _END_ của _TOTAL_ dòng',
              infoEmpty: 'Hiển thị 0 đến 0 của 0 dòng',
              infoFiltered: '(Lọc từ _MAX_ dòng)',
              search: 'Tìm kiếm:',
              paginate: {
                first: 'Đầu',
                last: 'Cuối',
                next: 'Tiếp',
                previous: 'Trước',
              },
            },
          });
        })
        .catch((error) => {
          console.error('DataTables warning: table id=publisherTable - Ajax error. For more information about this error, please see https://datatables.net/tn/7');
          console.error(error);
        });
    },
    createPublisher() {
      const vm = this;
      api.post('/publisher/create', vm.newPublisher)
        .then((response) => {
          // Clear the form
          vm.newPublisher = {
            MaNXB: '',
            TenNXB: '',
            DiaChi: '',
          };
          // Show success message
          vm.showSuccessMessage = true;
          setTimeout(() => {
            vm.showSuccessMessage = false;
          }, 3000);
        })
        .catch((error) => {
          console.error('Error creating publisher:', error);
        });
    },
  },
};
</script>
<style>

</style>