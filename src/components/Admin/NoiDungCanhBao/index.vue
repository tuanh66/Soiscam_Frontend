<template>
    <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
            <h2 class="font-bold text-[24px]">Danh sách cảnh báo</h2>
            <p class="text-[16px] text-[var(--subTextColor)] font-semibold">(Có {{ countData }} cảnh báo)</p>
        </div>
        <button @click="openModal" class="btn ml-[20px]" type="submit">
            <span><i class="fa soloid fa-plus"></i></span>
            <span> Thêm cảnh báo</span>
        </button>
        <form @submit.prevent="handleSearch"
            class="max-w-[500px] w-full mr-0 mt-0 rounded-[16px] bg-[var(--bgColor3)] border border-[rgba(255,255,255,0.1)] flex items-center p-[5px] mx-auto">
            <input type="text" placeholder="Kiểm tra số tài khoản ngân hàng..." v-model="keyword"
                class="flex-1 bg-transparent border-none outline-none pl-[19px] text-[var(--textColor)]">
            <button class="btn">
                <img src="../../../assets/img/search-icon.svg" alt="" class="block md:hidden">
                <span class="hidden md:block">Tìm Kiếm</span>
            </button>
        </form>
    </div>
    <div class="mt-[50px] text-[14px]">
        <table class="w-full overflow-hidden rounded-t-[16px] border-spacing-0 table-fixed">
            <colgroup>
                <col style="width: 5%">
                <col style="width: 20%">
                <col style="width: 60%">
                <col style="width: 10%">
            </colgroup>
            <thead class="bg-[var(--bgColor3)]">
                <tr>
                    <th class="p-[16px] text-left">id</th>
                    <th class="p-[16px] text-left">Tiêu đề cảnh báo</th>
                    <th class="p-[16px] text-left">Nội dung cảnh báo</th>
                    <th class="p-[16px] text-left"></th>
                </tr>
            </thead>
        </table>
        <div class="max-h-[calc(100vh-312px)] overflow-y-auto">
            <table class="w-full border-spacing-0 table-fixed">
                <colgroup>
                    <col style="width: 5%">
                    <col style="width: 20%">
                    <col style="width: 60%">
                    <col style="width: 10%">
                </colgroup>
                <tbody v-if="isLoading">
                    <tr>
                        <td colspan="8" class="relative h-[calc(100vh-327px)]">
                            <div
                                class="fui-loading-ring loading absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else-if="loadData.length">
                    <tr v-for="value in loadData" :key="value.id" class="dashboard__table-bodyItem">
                        <td class="align-middle p-[16px]"># {{ value.id }}</td>
                        <td class="align-middle p-[16px]">{{ value.warningTitle }}</td>
                        <td class="align-middle p-[16px]">{{ value.warningContent }}</td>
                        <td class="align-middle p-[16px] flex items-center gap-[12px]">
                            <span @click="deleteWarning(value.id)"
                                class="cursor-pointer text-[18px] text-[var(--redColor)]">
                                <i class="fa-solid fa-trash"></i>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8" class="relative h-[calc(100vh-327px)]">
                            <div
                                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 text-center">
                                <img src="../../../assets/img/not-found.svg" class="h-[200px]" />
                                <span class="text-center">
                                    {{ isSearching && !loadData.length ? 'Không có dữ liệu bạn cần tìm' : 'Không có dữ liệu' }}
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <section v-if="isModalOpen"
        class="fixed top-0 right-0 left-0 bottom-0 h-[100vh] flex justify-center items-center isolate z-50 animate-fadeIn">
        <div @click="closeModal" class="absolute top-0 right-0 left-0 bottom-0 bg-black/60 cursor-pointer z-[-1]"></div>
        <div
            class="h-[100vh] rounded-0 md:h-[380px] w-[623px] bg-[var(--bgColor2)] md:rounded-[16px] backdrop-blur-[70px] animate-fadeDown">
            <div class="flex justify-between items-center h-[54px] py-[12px] px-[16px] border-b border-[#FFFFFF1A]">
                <div class="text-[20px] font-semibold">Tạo nội dung cảnh báo</div>
                <div @click="closeModal"
                    class="w-[30px] h-[30px] rounded-full bg-[var(--bgColor3)] flex justify-center items-center cursor-pointer transition-all duration-200 ease-linear hover:opacity-50">
                    <img src="../../../assets/img/close-icon.svg" alt="close icon" class="pointer-events-none" />
                </div>
            </div>
            <form id="form-warning" class="h-[calc(100vh-54px)] py-[8px] px-[16px] md:h-[calc(380px-54px)] overflow-auto modal__body">
                <div class="form__group flex flex-col flex-1 relative">
                    <label for="warningTitle" class="font-medium w-max">Tiêu đề cảnh báo <span
                            class="text-[var(--redColor)]">*</span></label>
                    <textarea placeholder="Nhập tiêu đề cảnh báo" name="warningTitle" id="warningTitle"  @input="autoResize"
                        class="py-[10px] px-[12px] rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)] resize-none h-16 overflow-hidden mb-6"></textarea>
                    <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
                </div>
                <div class="form__group flex flex-col flex-1 relative">
                    <label for="warningContent" class="font-medium w-max">Nội dung cảnh báo cảnh báo <span
                            class="text-[var(--redColor)]">*</span></label>
                    <textarea placeholder="Nhập nội dung cảnh báo" name="warningContent" id="warningContent" @input="autoResize"
                        class="py-[10px] px-[12px] rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)] resize-none h-16 overflow-hidden mb-6"></textarea>
                    <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
                </div>
                <button type="submit" class="block mx-auto btn">Thêm mới</button>
            </form>
        </div>
    </section>
</template>
<script setup>
import axios from 'axios';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const getData = `${import.meta.env.VITE_API_URL}/client/data-warning`;
const getSearchWarning = `${import.meta.env.VITE_API_URL}/admin/search-warning`;
const postCreateWarning = `${import.meta.env.VITE_API_URL}/admin/create-warning`;
const postDeleteWarning = `${import.meta.env.VITE_API_URL}/admin/delete-warning`;
const isLoading = ref(false);
const loadData = ref([]);
const countData = ref(0);
const route = useRoute();
const router = useRouter();
const keyword = ref(route.query.search || '');
const isSearching = ref(!!keyword.value);
const isModalOpen = ref(false);

async function getDataWarning() {
    try {
        isLoading.value = true;
        const res = await axios.get(getData);
        loadData.value = res.data.data;
        countData.value = res.data.data.length;
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
};

async function searchData(keywordValue) {
    try {
        isLoading.value = true;
        const trimmed = keywordValue.trim();
        isSearching.value = !!trimmed;
        if (!trimmed) {
            await getDataWarning();
            isSearching.value = false;
            return;
        }
        isSearching.value = true;
        const res = await axios.get(`${getSearchWarning}?search=${encodeURIComponent(trimmed)}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        });
        loadData.value = res.data.data;
        countData.value = res.data.data.length;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

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
    router.replace({ query });
};

async function deleteWarning(id) {
    const result = await Swal.fire({
        title: 'Bạn có chắc chắn muốn xoá?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#db2828',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'Xoá',
        cancelButtonText: 'Huỷ'
    });

    if (result.isConfirmed) {
        try {
            const res = await axios.post(postDeleteWarning, { id },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    }
                }
            );
            Swal.fire('Đã xoá thành công!', res.data.message, 'success')

            loadData.value = loadData.value.filter(item => item.id !== id)
            countData.value = loadData.value.length
        } catch (err) {
            Swal.fire('Lỗi!', err.response?.data?.message || 'Không thể xoá', 'error')
        }
    }
};

function openModal() {
    isModalOpen.value = true;
};

function closeModal() {
    isModalOpen.value = false;
};

function autoResize(e) {
  e.target.style.height = "auto";
  e.target.style.height = e.target.scrollHeight + "px";
}

onMounted(() => {
    Validator({
        form: "#form-warning",
        formGroupSelector: ".form__group",
        errorSelector: ".form-message",
        rules: [
            Validator.isRequired("#warningTitle", "Không được để trống"),
            Validator.isRequired("#warningContent", "Không được để trống"),
        ],
        resetOnSubmit: true,
    });
});
</script>
<style></style>