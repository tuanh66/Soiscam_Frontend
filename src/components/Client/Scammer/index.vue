<template>
    <form
        class="max-w-[500px] w-full rounded-[16px] bg-[var(--bgColor3)] border border-[rgba(255,255,255,0.1)] mt-15 flex items-center p-[5px] mx-auto">
        <input type="text" placeholder="Kiểm tra số tài khoản ngân hàng..."
            class="flex-1 bg-transparent border-none outline-none pl-[19px] text-[var(--textColor)]">
        <button class="btn">
            <img src="../../../assets/img/search-icon.svg" alt="" class="block lg:hidden">
            <span class="hidden lg:block">Tìm Kiếm</span>
        </button>
    </form>

    <!-- SCAMMER -->
    <section class="mt-[60px] bg-[var(--bgColor4)] rounded-[16px] border border-[rgba(255,255,255,0.1)]">
        <div class="p-[16px] border-b border-white/10 text-center">
            <h2 class="title">Danh Sách Scam</h2>
            <p class="text-[var(--subTextColor)] mt-2">CÓ {{ countData }} CẢNH BÁO</p>
        </div>
        <div class="p-4 lg:py-[50px] lg:px-[30px]">
            <div class="fui-loading-ring loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul v-if="loadData.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                <li v-for="value in loadData" :key="value.id" @click="openModal(value)"
                    class="bg-[var(--bgColor3)] rounded-[16px] p-4 flex items-center gap-2 cursor-pointer select-none relative isolate overflow-hidden children:pointer-events-none hover:before:left-auto hover:before:right-0 hover:before:w-full before:content-[''] before:absolute before:top-0 before:left-0 before:right-auto before:h-full before:w-0 before:bg-white before:opacity-10 before:-z-10 before:transition-all before:duration-[400ms] before:ease-[cubic-bezier(0.165,0.84,0.44,1)]">
                    <img src="../../../assets/img/avatar-1.svg" alt="avatar" class="">
                    <div>
                        <h3 class="font-semibold text-single">{{ value.nameScammer }}</h3>
                        <div class=" text-[var(--subTextColor)]">#{{ value.id }} - {{ formatDate(value.created_at) }}
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else class="not-found">
                <img src="../../../assets/img/not-found.svg">
                <span>Hôm nay không có đơn nào</span>
            </div>
        </div>
    </section>
    <!-- end SCAMMER -->
    <section v-if="isModalOpen"
        class="fixed top-0 right-0 left-0 bottom-0 h-[100vh] flex justify-center items-center isolate z-50 animate-fadeIn">
        <div @click="closeModal" class="absolute top-0 right-0 left-0 bottom-0 bg-black/60 cursor-pointer z-[-1]"></div>
        <div
            class="h-[100vh] rounded-0 md:h-[800px] w-[623px] bg-[var(--bgColor2)] md:rounded-[16px] backdrop-blur-[70px] animate-fadeDown">
            <div class="flex justify-between items-center h-[54px] py-[12px] px-[16px] border-b border-[#FFFFFF1A]">
                <div class="text-[20px] font-semibold">Chi tiết tố cáo</div>
                <div @click="closeModal"
                    class="w-[30px] h-[30px] rounded-full bg-[var(--bgColor3)] flex justify-center items-center cursor-pointer transition-all duration-200 ease-linear hover:opacity-50">
                    <img src="../../../assets/img/close-icon.svg" alt="close icon" class="pointer-events-none" />
                </div>
            </div>
            <div class="h-[calc(100vh-54px)] py-[8px] px-[16px] md:h-[calc(800px-54px)] overflow-auto modal__body">
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
                        <div ref="galleryRef" class="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
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
import { ref, nextTick, onMounted } from 'vue';

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const getDataToday = `${import.meta.env.VITE_API_URL}/client/data-report-all`;
const loadData = ref([]);
const countData = ref(0);
const isModalOpen = ref(false);
const galleryRef = ref(null);
const itemData = ref({
    images: [],
});

function openModal(item) {
    itemData.value = {
        ...item,
        images: item.imagesProof || [],
    }
    isModalOpen.value = true;

    nextTick(() => {
        if (galleryRef.value) {
            lightGallery(galleryRef.value, {
                plugins: [lgThumbnail],
                thumbnail: true,
                download: false
            });
        }
    });
}

function closeModal() {
    isModalOpen.value = false;
};

onMounted(async () => {
    try {
        const res = await axios.get(getDataToday);
        loadData.value = res.data.data;
        countData.value = loadData.value.length;
    } catch (error) {
        console.error(error);
    }
});
</script>
<style></style>