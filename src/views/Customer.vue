<template>
    <div class="w-[100%]">
      <!-- Navbar -->
      <div class="flex flex-col flex-1 overflow-y-auto" id="navbar">
        <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div class="flex items-center px-4">
            <input class="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
          </div>
          <div class="font-mono text-[18px]">
            Customer Manage
          </div>
          <div class="flex items-center pr-4">
            <button class="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        <router-view />
      </div>
  
      <div class="mt-2 ml-2 mb-4 text-[20px] font-mono font-bold">
        Danh sách người dùng
      </div>
      <vue-good-table
      :columns="columns"
      :rows="customers"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 10,
        position: 'bottom',
        perPageDropdown: [10, 20, 50],
        dropdownAllowAll: false,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All'
      }"
    />
    
    </div>
  </template>
  
  <script>
import { VueGoodTable } from 'vue-good-table';

export default {
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        { label: 'MaDocGia', field: 'MaDocGia' },
        { label: 'HoLot', field: 'HoLot' },
        { label: 'Ten', field: 'Ten' },
        { label: 'NgaySinh', field: 'NgaySinh' },
        { label: 'GioiTinh', field: 'GioiTinh' },
        { label: 'DiaChi', field: 'DiaChi' },
        { label: 'DienThoai', field: 'DienThoai' }
      ],
      customers: []
    };
  },
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await api.get('/customer/getAll');
        this.customers = response.data;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }
  }
};
</script>
  
  <style>
  /* Add any custom styles here */
  </style>