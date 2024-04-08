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
                MaSach: "",
                TenSach: "",
                SoQuyen: 0,
                NamXuatBan: "",
                MaNXB: "",
                TacGia: "",
                HinhAnh: "",
                DonGia: 0
            },
            isDataTableInitialized: false,

        };
    },
    mounted() {
        this.fetchBooks();
    //     $('#bookTable').on('click', '.delete-button', (event) => {
    //     const id = $(event.currentTarget).data('id');
    //     this.deleteBook(id);
    // });
    },

    methods: {
        fetchBooks() {
            api.get('/books/getAll')
                .then(response => {
                    const booksData = response.data;
                    console.log(response.data);
                    this.populateTable(booksData);
                })
                .catch(error => {
                    console.error('Error fetching books:', error);
                });
        },
        populateTable(data) {
            if (!this.isDataTableInitialized) {
                this.bookTable = $('#bookTable').DataTable({
                    responsive: true,
                    data: data.data,
                    columns: [
                        { data: 'MaSach' },
                        { data: 'TenSach' },
                        { data: 'SoQuyen' },
                        { data: 'NamXuatBan' },
                        { data: 'MaNXB' },
                        { data: 'DonGia' },
                        { data: 'TacGia' },
                        {
                            data: '_id',
                            render: function (data, type, row) {
                                return `<button
    class="bg-red-500 text-white rounded-md mr-1 p-2 hover:bg-blue-500 delete-button edit-button"
    v-bind:data-id="${data}"
    @click="deleteBook(${data})"
>Xoá</button>`;
                            }
                        }
                    ],
                    createdRow: (row, data, dataIndex) => {
        $(row).find('.edit-button').on('click', () => {
          this.deleteBook(data._id);
        });
      }
                });
                this.isDataTableInitialized = true;
            }
        },
        addBook() {
            api.post('/books/create', this.formData)
                .then(response => {
                    // Handle success message and refresh DataTable
                    this.successMessage = "Thêm sách thành công!";
                    this.fetchBooks();
                    this.formData = {
                        MaSach: "",
                        TenSach: "",
                        SoQuyen: 0,
                        NamXuatBan: "",
                        MaNXB: "",
                        TacGia: "",
                        HinhAnh: "",
                        DonGia: 0
                    };
                    if (this.isDataTableInitialized) {
                        this.bookTable.clear().rows.add(response.data.data).draw();
                    }
                })
                .catch(error => {
                    // Handle error message
                    this.errorMessage = "Lỗi khi thêm sách: " + error.message;
                });
        },
        deleteBook(_id) {
            console.log(_id);
            if (!_id) {
                console.error('ID không hợp lệ.');
                return;
            }

            console.log(_id);
            // Gửi yêu cầu xóa đến API với _id của sách cần xóa trong params
            api.delete(`/books/delete/${_id}`)
                .then(response => {
                    // Xử lý khi xóa thành công
                    console.log('Sách đã được xóa:', response.data);
                    this.fetchBooks();
                    // Sau khi xóa thành công, làm mới DataTable để cập nhật danh sách sách
                    if (this.isDataTableInitialized) {
                        this.bookTable.clear().rows.add(response.data.data).draw();
                    }
                })
                .catch(error => {
                    // Xử lý khi xóa không thành công
                    console.error('Lỗi khi xóa sách:', error);
                    this.errorMessage = "Lỗi khi xóa sách: " + error.message;
                });
        },

        updateBook() {
            api.put(`/books/update`, this.formData)
                .then(response => {
                    // Xử lý khi cập nhật thành công
                    this.successMessage = "Cập nhật sách thành công!";
                    this.fetchBooks(); // Làm mới danh sách sách sau khi cập nhật
                    this.formData = {
                        MaSach: "",
                        TenSach: "",
                        SoQuyen: 0,
                        NamXuatBan: "",
                        MaNXB: "",
                        TacGia: "",
                        HinhAnh: "",
                        DonGia: 0
                    };
                })
                .catch(error => {
                    // Xử lý khi cập nhật không thành công
                    this.errorMessage = "Lỗi khi cập nhật sách: " + error.message;
                });
        },
    }
}
</script>
<template>
    <div class="w-[100%]">
        <!---Navbar-->

        <div class="flex flex-col flex-1 overflow-y-auto" id="navbar">
            <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                <div class="flex items-center px-4">
                    <input class="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search">
                </div>
                <div class="font-mono text-[18px]">
                    Books Manage
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
            <router-view />
        </div>
        <div class="mt-2 ml-2 mb-4 text-[20px] font-mono font-bold">
            Danh sách sách
        </div>
        <div class="ml-4 mr-4 bg-white rounded-md shadow-md">

            <table id="bookTable" class="display">
                <thead>
                    <tr>
                        <th>Mã sách</th>
                        <th>Tên sách</th>
                        <th>Số quyển</th>
                        <th>Năm xuất bản</th>
                        <th>Mã NXB</th>
                        <th>Tác giả</th>
                        <th>Đơn giá</th>
                        <th>Lựa chọn</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data will be populated here -->
                </tbody>
            </table>

        </div>

        <div class="mt-6 ml-2 mb-4 text-[20px] font-mono font-bold">
            Chức năng
        </div>

        <div class="bg-white rounded-lg shadow relative m-10">

            <div class="flex items-start justify-between p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold">
                    Thêm sách / Chỉnh sửa sách
                </h3>
                <div v-if="errorMessage" class="text-red-600 font-semibold">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="text-green-600 font-semibold">
                    {{ successMessage }}
                </div>
            </div>

            <div class="p-6 space-y-6">
                <form @submit.prevent="addBook">
                    <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="product-name" class="text-sm font-medium text-gray-900 block mb-2">Mã
                                sách</label>
                            <input v-model="formData.MaSach" type="text" name="product-name" id="product-name"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Tên sách</label>
                            <input v-model="formData.TenSach" type="text" name="category" id="category"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="price" class="text-sm font-medium text-gray-900 block mb-2">Số quyển</label>
                            <input v-model="formData.SoQuyen" type="number" name="price" id="price"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Năm xuất
                                bản</label>
                            <input v-model="formData.NamXuatBan" type="text" name="category" id="category"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Mã NXB</label>
                            <input v-model="formData.MaNXB" type="text" name="category" id="category"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Tác giả</label>
                            <input v-model="formData.TacGia" type="text" name="category" id="category"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Hình ảnh</label>
                            <input v-model="formData.HinhAnh" type="text" name="category" id="category"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required="">
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                            <label for="category" class="text-sm font-medium text-gray-900 block mb-2">Đơn giá</label>
                            <input v-model="formData.DonGia" type="text" name="category" id="category"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                required="">
                        </div>
                    </div>

                    <div class="p-6 border-t border-gray-200 rounded-b">
                        <button
                            class="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            type="submit">Thêm</button>
                    </div>

                </form>
                <div class="p-6 border-t border-gray-200 rounded-b">
                    <button
                        class="text-white bg-green-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        @click="updateBook">Chỉnh sửa</button>
                </div>
            </div>

        </div>

    </div>
</template>



<style></style>