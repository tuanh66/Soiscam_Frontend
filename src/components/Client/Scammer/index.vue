<template>
    <form @submit.prevent="handleSearch"
        class="max-w-[500px] w-full rounded-[16px] bg-[var(--bgColor3)] border border-[rgba(255,255,255,0.1)] mt-[34px] lg:mt-15 flex items-center p-[5px] mx-auto">
        <input type="text" placeholder="Kiểm tra số tài khoản ngân hàng..." v-model="keyword"
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
                <span>
                    {{ isSearching && !loadData.length ? 'Không có dữ liệu bạn cần tìm' : 'Không có dữ liệu' }}
                </span>
            </div>
        </div>
    </section>
    <!-- end SCAMMER -->
    <baseModal ref="modalRef" />
</template>
<script setup>
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import debounce from 'lodash/debounce';
import baseModal from '../../Modal/index.vue'

const getData = `${import.meta.env.VITE_API_URL}/client/data-report-all`;
const getSearchData = `${import.meta.env.VITE_API_URL}/client/search-data`;
const route = useRoute();
const router = useRouter();
const keyword = ref(route.query.search || '');
const isSearching = ref(!!keyword.value);
const isLoading = ref();
const loadData = ref([]);
const countData = ref(0);
const modalRef = ref(null);

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function openModal(item) {
    modalRef.value.open(item);
}

async function getDataAll() {
    try {
        isLoading.value = true;
        const res = await axios.get(getData);
        loadData.value = res.data.data;
        countData.value = loadData.value.length;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}

// Tìm kiếm
async function searchData(keywordValue) {
    try {
        isLoading.value = true;
        const trimmed = keywordValue.trim();
        isSearching.value = !!trimmed;
        if (!trimmed) {
            await getDataAll();
            isSearching.value = false;
            return;
        }
        isSearching.value = true;
        const res = await axios.get(`${getSearchData}?search=${encodeURIComponent(trimmed)}`);
        loadData.value = res.data.data;
        countData.value = loadData.value.length;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}

const debouncedSearch = debounce((val) => {
    searchData(val);
}, 400);

watch(keyword, (newVal) => {
    debouncedSearch(newVal);
});

watch(() => route.query.search,
    (newSearch) => {
        keyword.value = newSearch || '';
        searchData(keyword.value);
    },
    { immediate: true }
);

async function handleSearch() {
    const query = keyword.value.trim() ? { search: keyword.value.trim() } : {};
    await router.push({ path: '/scammer', query });
}
</script>
<style></style>