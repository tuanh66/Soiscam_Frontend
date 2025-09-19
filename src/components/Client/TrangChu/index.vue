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
        <form @submit.prevent="handleSearch"
            class="max-w-[500px] w-full rounded-[16px] bg-[var(--bgColor3)] border border-[rgba(255,255,255,0.1)] mt-[48px] flex items-center p-[5px] mx-auto">
            <input type="text" placeholder="Kiểm tra số tài khoản ngân hàng..." v-model="keyword"
                @keyup.enter="handleSearch"
                class="flex-1 bg-transparent border-none outline-none pl-[19px] text-[var(--textColor)]">
            <button class="flex-shrink-0 btn" @click="handleSearch">
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
            <div v-if="isLoading" class="fui-loading-ring loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul v-else-if="loadData.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
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
    <baseModal ref="modalRef" />
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import baseModal from '../../Modal/index.vue'

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

const getDataToday = `${import.meta.env.VITE_API_URL}/client/data-report-today`;
const isLoading = ref();
const loadData = ref([]);
const countData = ref(0);
const modalRef = ref(null);

function openModal(item) {
    modalRef.value.open(item);
}

onMounted(async () => {
    try {
        isLoading.value = true;
        const res = await axios.get(getDataToday);
        loadData.value = res.data.data;
        countData.value = loadData.value.length;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
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

const router = useRouter();
const keyword = ref('');

function handleSearch() {
    const kw = keyword.value.trim();
    if (!kw) return;

    router.push({
        path: '/scammer',
        query: { search: kw }
    });
}
</script>
<style></style>
