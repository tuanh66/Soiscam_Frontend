<template>
    <div class="hidden lg:flex gap-[20px] p-[20px]">
        <section class="w-full max-w-[350px] bg-[var(--bgColor2)] rounded-[12px] p-[20px] h-[calc(100vh-40px)]">
            <RouterLink to="/"
                class="flex items-end gap-[8px] mb-[40px] text-[var(--textColor)] text-[18px] font-semibold">
                <img src="../../../assets/img/logo.svg" alt="" class="">
                Soiscam
            </RouterLink>
            <ul class="flex flex-col gap-[20px]">
                <li class="sidebar-item">
                    <RouterLink to="/admin/danh-sach-scammer"
                        :class="['text-[var(--subTextColor)] text-[18px] flex items-center gap-[12px] transition-all duration-200 ease-linear', menuHeaderActive('/admin/danh-sach-scammer') ? 'text-[var(--textColor)]' : 'hover:text-[var(--textColor)]']">
                        <span class="text-[18px] inline-block">
                            <i class="fa-solid fa-users"></i>
                        </span>
                        Danh sách scammer
                    </RouterLink>
                </li>
                <li class="sidebar-item">
                    <RouterLink to="/admin/doi-duyet"
                        :class="['text-[var(--subTextColor)] text-[18px] flex items-center gap-[12px] transition-all duration-200 ease-linear', menuHeaderActive('/admin/doi-duyet') ? 'text-[var(--textColor)]' : 'hover:text-[var(--textColor)]']">
                        <span class="text-[18px] inline-block">
                            <i class="fa-solid fa-hourglass-half"></i>
                        </span>
                        Đợi duyệt
                    </RouterLink>
                </li>
                <li class="sidebar-item">
                    <RouterLink to="/admin/noi-dung-canh-bao"
                        :class="['text-[var(--subTextColor)] text-[18px] flex items-center gap-[12px] transition-all duration-200 ease-linear', menuHeaderActive('/admin/noi-dung-canh-bao') ? 'text-[var(--textColor)]' : 'hover:text-[var(--textColor)]']">
                        <span class="text-[18px] inline-block">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </span>
                        Nội dung cảnh báo
                    </RouterLink>
                </li>
                <li class="sidebar-item">
                    <RouterLink to="/"
                        :class="['text-[var(--subTextColor)] text-[18px] flex items-center gap-[12px] transition-all duration-200 ease-linear', menuHeaderActive('/') ? 'text-[var(--textColor)]' : 'hover:text-[var(--textColor)]']">
                        <span class="text-[18px] inline-block">
                            <i class="fa-solid fa-globe"></i>
                        </span>
                        Vào website
                    </RouterLink>
                </li>
            </ul>
        </section>
        <section class="flex-1">
            <header class="p-4 rounded-[12px] bg-[var(--bgColor2)] flex justify-between items-center">
                <h2 class="font-semibold text-[20px]">{{ headerTitle }}</h2>
                <div class="flex items-center gap-[8px] cursor-pointer relative">
                    <img src="../../../assets/img/avatar-2.svg" alt="admin avatar">
                    <span class="headerAdmin__name">Admin</span>
                    <span class="headerAdmin__icon">
                        <i class="fa-solid fa-angle-down"></i>
                    </span>
                </div>
            </header>
            <div class="h-[calc(100vh-60px-72px)] bg-[var(--bgColor2)] mt-[20px] rounded-[12px] p-4">
                <router-view />
            </div>
        </section>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
// Active menu
const route = useRoute();
const menuHeaderActive = (path) => route.path === path;

// Tiêu đề theo route
const headerTitle = computed(() => {
    switch (route.path) {
        case '/admin/danh-sach-scammer': return 'Quản lý đơn tố cáo';
        case '/admin/doi-duyet': return 'Quản lý kiểm duyệt';
        case '/admin/noi-dung-canh-bao': return 'Quản lý cảnh báo';
        default: return 'Trang quản trị';
    }
});
</script>
<style></style>