<template>
  <div class="w-[100%] h-screen">
    <!-- Navbar -->
    <div class="flex flex-col flex-1 overflow-y-auto" id="navbar">
      <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
        <div class="flex items-center px-4">
          <input class="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
        </div>
        <div class="font-mono text-[18px]">
          Đọc giả
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
<div class=" bg-white rounded-md shadow-md mt-4">

  <table id="customerTable" class="table table-striped table-bordered" style="width:100%; margin: 6px;">
    <thead>
      <tr>
        <th>Mã Độc Giả</th>
        <th>Họ Lót</th>
        <th>Tên</th>
        <th>Ngày Sinh</th>
        <th>Giới Tính</th>
        <th>Địa Chỉ</th>
        <th>Điện Thoại</th>
      </tr>
    </thead>
  </table>
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
      customerData: [],
    };
  },
  mounted() {
    this.initializeDataTable();
  },
  methods: {
    initializeDataTable() {
      const vm = this;
      api.get('/customer/getAll')
        .then((response) => {
          vm.customerData = response.data.data;
          $('#customerTable').DataTable({
            data: vm.customerData,
            columns: [
              { data: 'MaDocGia' },
              { data: 'HoLot' },
              { data: 'Ten' },
              { data: 'NgaySinh' },
              { data: 'GioiTinh' },
              { data: 'DiaChi' },
              { data: 'DienThoai' },
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
          console.error('DataTables warning: table id=customerTable - Ajax error. For more information about this error, please see https://datatables.net/tn/7');
          console.error(error);
        });
    },
  },
};
</script>

<style>
/* Add any custom styles here */
</style>