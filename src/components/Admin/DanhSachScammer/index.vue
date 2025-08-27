<template>
    <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
            <h2 class="font-bold text-[24px]">Danh sách scammer</h2>
            <p class="text-[16px] text-[var(--subTextColor)] font-semibold">(Có {{ countData }} đơn tố cáo)</p>
        </div>
        <form
            class="max-w-[500px] w-full mr-0 mt-0 rounded-[16px] bg-[var(--bgColor3)] border border-[rgba(255,255,255,0.1)] flex items-center p-[5px] mx-auto">
            <input type="text" placeholder="Kiểm tra số tài khoản ngân hàng..."
                class="flex-1 bg-transparent border-none outline-none pl-[19px] text-[var(--textColor)]">
            <button class="btn">
                <img src="../../../assets/img/search-icon.svg" alt="" class="block md:hidden">
                <span class="hidden md:block">Tìm Kiếm</span>
            </button>
        </form>
    </div>
    <div class="mt-[50px] text-[14px]">
        <table class="w-full overflow-hidden rounded-[16px] border-spacing-0">
            <thead class="bg-[var(--bgColor3)]">
                <tr>
                    <th class="p-[16px] text-left">id</th>
                    <th class="p-[16px] text-left">Chủ tài khoản</th>
                    <th class="p-[16px] text-left">Số tài khoản</th>
                    <th class="p-[16px] text-left">Ngân hàng</th>
                    <th class="p-[16px] text-left">Sđt đối tượng</th>
                    <th class="p-[16px] text-left">Người gửi đơn</th>
                    <th class="p-[16px] text-left">Ngày gửi</th>
                    <th class="p-[16px] text-left"></th>
                </tr>
            </thead>
            <tbody v-if="loadData.length > 0">
                <tr v-for="value in loadData" :key="value.id" class="dashboard__table-bodyItem">
                    <td class="align-middle p-[16px]">#{{ value.id }}</td>
                    <td class="align-middle p-[16px]">{{ value.nameScammer }}</td>
                    <td class="align-middle p-[16px]">{{ value.bankNumber }}</td>
                    <td class="align-middle p-[16px]">{{ value.bankName }}</td>
                    <td class="align-middle p-[16px]">{{ value.phoneScammer }}</td>
                    <td class="align-middle p-[16px]">{{ value.nameSender }}</td>
                    <td class="align-middle p-[16px]">{{ formatDate(value.created_at) }}</td>
                    <td class="align-middle p-[16px] flex items-center gap-[12px]">
                        <span @click="openModal(value)" class="cursor-pointer text-[18px]">
                            <i class="fa-solid fa-eye"></i>
                        </span>
                        <span @click="deleteReport(value.id)" class="cursor-pointer text-[18px] text-[var(--redColor)]">
                            <i class="fa-solid fa-trash"></i>
                        </span>
                    </td>
                </tr>

            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="8" class="relative h-[590px]">
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 text-center">
                            <img src="../../../assets/img/not-found.svg" class="h-[200px]" />
                            <span class="text-center">Không có dữ liệu</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <section v-if="isModalOpen"
        class="fixed top-0 right-0 left-0 bottom-0 h-[100vh] flex justify-center items-center isolate z-50 animate-fadeIn">
        <div @click="closeModal" class="absolute top-0 right-0 left-0 bottom-0 bg-black/60 cursor-pointer z-[-1]"></div>
        <div class="h-[800px] w-[623px] bg-[var(--bgColor2)] rounded-[16px] backdrop-blur-[70px] animate-fadeDown">
            <div class="flex justify-between items-center h-[54px] py-[12px] px-[16px] border-b border-[#FFFFFF1A]">
                <div class="text-[20px] font-semibold">Chi tiết tố cáo</div>
                <div @click="closeModal"
                    class="w-[30px] h-[30px] rounded-full bg-[var(--bgColor3)] flex justify-center items-center cursor-pointer transition-all duration-200 ease-linear hover:opacity-50">
                    <img src="../../../assets/img/close-icon.svg" alt="close icon" class="pointer-events-none" />
                </div>
            </div>
            <div class="py-[8px] px-[16px] h-[calc(800px-54px)] overflow-auto modal__body">
                <div class="pb-2 border-b border-[#FFFFFF1A] last:border-b-0">
                    <div class="flex items-center gap-[8px] mb-[16px]">
                        <div class="modal__profile-image">
                            <img src="../../../assets/img/avatar-1.svg" alt="avatar" />
                        </div>
                        <div class="modal__info">
                            <h4 class="font-semibold">{{ itemData.nameScammer }}</h4>
                            <p class="text-[var(--subTextColor)]">#{{ itemData.id }} - Tố vào ngày {{
                                formatDate(itemData.created_at) }}</p>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mb-[10px] gap-[20px]">
                        <span class="text-[--subTextColor] flex-shrink-0">Số điện thoại</span>
                        <span class="modal__detail-text text-single">{{ itemData.phoneScammer }}</span>
                    </div>
                    <div class="flex justify-between items-center mb-[10px] gap-[20px]">
                        <span class="text-[--subTextColor] flex-shrink-0">Số tài khoản</span>
                        <span class="modal__detail-text text-single">{{ itemData.bankNumber }}</span>
                    </div>
                    <div class="flex justify-between items-center mb-[10px] gap-[20px]">
                        <span class="text-[--subTextColor] flex-shrink-0">Ngân Hàng</span>
                        <span class="modal__detail-text text-single">{{ itemData.bankName }}</span>
                    </div>
                </div>
                <div class="mt-2 pb-2 border-b border-[#FFFFFF1A] last:border-b-0">
                    <div class="flex items-center gap-[8px] mb-[16px]">
                        <div class="modal__profile-image">
                            <img src="../../../assets/img/avatar-2.svg" alt="avatar" />
                        </div>
                        <div class="modal__info">
                            <h4 class="font-semibold">{{ itemData.nameSender }}</h4>
                            <p class="text-[var(--subTextColor)]">Người tố cáo</p>
                        </div>
                    </div>
                    <div class="flex justify-between items-center mb-[10px] gap-[20px]">
                        <span class="text-[var(--subTextColor)] flex-shrink-0">Trạng Thái</span>
                        <span class="modal__detail-text text-single">{{ itemData.option }}</span>
                    </div>
                    <div class="flex justify-between items-center mb-[10px] gap-[20px]">
                        <span class="text-[var(--subTextColor)] flex-shrink-0">Liên hệ</span>
                        <span class="modal__detail-text text-single">{{ itemData.phoneSender }}</span>
                    </div>
                    <div class="modal__textarea">
                        <span class="text-[var(--subTextColor)] flex-shrink-0">Nội dung tố cáo</span>
                        <p class="font-medium mt-1">{{ itemData.contentReport }}</p>
                    </div>
                    <div class="mt-[10px]">
                        <span class="text-[var(--subTextColor)] flex-shrink-0">Hình ảnh liên quan</span>
                        <div ref="galleryRef" class="grid grid-cols-3 gap-2 mt-2">
                            <a v-for="(value, index) in itemData.imagesProof" :key="index" :href="value">
                                <img :src="value" :alt="`Ảnh bằng chứng ${itemData.nameScammer} ${index + 1}`"
                                    class="h-[237px] w-full object-cover rounded-[8px] cursor-pointer transition duration-200 hover:opacity-50" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import axios from 'axios';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { ref, onMounted, nextTick } from 'vue';
import Swal from 'sweetalert2';

function formatDate(dateStr) {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

const loadData = ref([]);
const countData = ref(0)
const isModalOpen = ref(false);
const galleryRef = ref(null);
const itemData = ref({
    images: [],
});

function openModal(item) {
    itemData.value = {
        ...item,
        images: item.imagesProof || [],
    };
    isModalOpen.value = true;

    nextTick(() => {
        if (galleryRef.value) {
            lightGallery(galleryRef.value, {
                plugins: [lgThumbnail],
                thumbnail: true,
                download: true
            });
        }
    });
};

function closeModal() {
    isModalOpen.value = false;
};

onMounted(async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://127.0.0.1:8000/api/admin/data-report-approve-1', {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        loadData.value = res.data.data;
        countData.value = loadData.value.length;
    } catch (error) {
        console.error(error)
    }
});

async function deleteReport(id) {
    const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn xoá?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#db2828',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Huỷ'
    })

    if (result.isConfirmed) {
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/admin/delete-report', { id },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                }
            )
            Swal.fire('Đã xoá thành công!', res.data.message, 'success')

            loadData.value = loadData.value.filter(item => item.id !== id)
            countData.value = loadData.value.length
        } catch (err) {
            Swal.fire('Lỗi!', err.response?.data?.message || 'Không thể xoá', 'error')
        }
    }
};
</script>
<style></style>