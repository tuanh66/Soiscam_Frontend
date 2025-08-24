<template>
    <!-- CONTENT -->
    <section class="max-w-full md:max-w-[500px] lg:max-w-166 w-full mx-auto lg:pt-24">
        <h1
            class="text-[26px] md:text-[35px] font-black lg:text-[50px] lg:font-extrabold text-center text-transparent bg-gradient-to-r from-[#FFFFFF] to-[#D9C4AF] bg-clip-text">
            KIỂM TRA & TỐ CÁO SCAMMER
        </h1>
        <p class="text-[var(--subTextColor)] text-[14px] mt-2 lg:text-[16px] lg:mt-[20px] text-center">
            Website lưu trữ dữ liệu lừa đảo trên mxh mà không chịu bất kỳ hạn chế
            seach của một thuật toán nào trên Facebook
        </p>
        <form
            class="max-w-[500px] w-full rounded-[16px] bg-[var(--bgColor3)] border border-[rgba(255,255,255,0.1)] mt-[48px] flex items-center p-[5px] mx-auto">
            <input type="text" placeholder="Kiểm tra số tài khoản ngân hàng..."
                class="flex-1 bg-transparent border-none outline-none pl-[19px] text-[var(--textColor)]">
            <button class="flex-shrink-0 btn">
                <img src="../../../assets/img/search-icon.svg" alt="" class="block md:hidden">
                <span class="hidden md:block">Tìm Kiếm</span>
            </button>
        </form>
    </section>
    <!-- end CONTENT -->

    <!-- SCAMMER -->
    <section class=" mt-10 lg:mt-[138px] bg-[var(--bgColor4)] rounded-[16px] border border-[rgba(255,255,255,0.1)]">
        <div class="p-[16px] border-b border-white/10 text-center">
            <h2 class="title">Hôm nay {{ today }}</h2>
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

    <!-- WARNING -->
    <section class="mt-[56px] lg:mt-15">
        <h2 class="text-center title">Một số kiểu lừa đảo online thường gặp</h2>
        <ul class="mt-[30px] flex flex-col gap-5">
            <li v-for="(item, index) in warningList" :key="index" @click="toggleWarning(index)"
                class="bg-[var(--bgColor3)] rounded-[16px] p-4 backdrop-blur-[70px]">
                <div class="flex items-center cursor-pointer gap-2 children:pointer-events-none">
                    <span class="w-6 h-6 flex-shrink-0 transition-transition duration-200 ease-linear"
                        :class="{ 'rotate-90': activeWarningIndex === index }">
                        <img src="../../../assets/img/arrow-right.svg" alt="">
                    </span>
                    <h4 class="font-normal">{{ item.title }}</h4>
                </div>
                <div v-if="activeWarningIndex === index" :class="'mt-2 h-auto'"
                    class="ml-[32px] text-[var(--subTextColor)] h-0 overflow-hidden transition duration-200 ease-linear">
                    {{ item.description }}
                </div>
            </li>
        </ul>
    </section>
    <!-- end WARNING -->
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
import { ref, onMounted, nextTick } from 'vue';

const today = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
})

function formatDate(dateStr) {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

const getDataToday = import.meta.env.VITE_API_URL + "/client/data-report-today";
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
    };
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
};

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

const activeWarningIndex = ref(null)

const warningList = [
    {
        title: 'Giả mạo tên miền, website',
        description: 'Bọn lừa đảo mua 1 tên miền gần giống (chỉ lệch 1 vài ký tự) sau đó gắn vào web fake có giao diện giống hệt để lừa đảo'
    },
    {
        title: 'Lừa đảo đầu tư tiền ảo',
        description: 'Chúng tạo ra các sàn giao dịch ảo...'
    },
    {
        title: 'Mạo danh người nổi tiếng',
        description: 'Giả danh người nổi tiếng để bán hàng...'
    }
]

function toggleWarning(index) {
    activeWarningIndex.value = activeWarningIndex.value === index ? null : index
}
</script>
<style></style>
