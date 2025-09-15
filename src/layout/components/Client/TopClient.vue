<template>
    <header ref="headerRef" :class="[
        'header top-0 left-0 right-0 m-0 justify-between px-4 z-40 lg:mt-[25px] lg:mx-[6%] bg-[var(--bgColor2)] lg:rounded-[16px] flex lg:justify-center items-center h-[var(--headerHeight)] lg:px-[40px] lg:py-[16px]',
        isFixed ? 'fixed' : 'lg:relative'
    ]">
        <RouterLink to="/" class="flex items-end gap-[6px] absolute lg:left-[40px] left-4">
            <img src="../../../assets/img/logo.svg" alt="">
            <span class="text-[18px] font-bold text-[var(--textColor)]">Soi scam</span>
        </RouterLink>
        <span v-if="!isOpenHeader" @click="isOpenHeader = true"
            class="lg:hidden flex absolute right-4 h-[30px] w-[30px] justify-center items-center bg-[var(--bgColor5)] rounded-full">
            <img src="../../../assets/img/open-menu-icon.svg" alt="">
        </span>
        <ul :class="['lg:hidden pt-[var(--headerHeight)] fixed inset-0 h-screen flex-col bg-[rgba(18,22,39,0.1)] z-[9999] backdrop-blur-[70px] px-4 transition-all duration-200 ease-linear flex items-center gap-10',
            isOpenHeader ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0']">
            <span @click="isOpenHeader = false"
                class="lg:hidden flex absolute right-4 h-[30px] w-[30px] justify-center items-center bg-[var(--bgColor5)] rounded-full top-[24px]">
                <img src="../../../assets/img/close-icon.svg" alt="">
            </span>
            <li>
                <RouterLink to="/" @click="isOpenHeader = false"
                    :class="['font-medium transition-all duration-200 ease-linear', menuHeaderActive('/') ? 'text-[var(--textColor)]' : 'text-[var(--subTextColor)] hover:text-[var(--textColor)] hover:font-semibold']">
                    Trang Chủ</RouterLink>
            </li>
            <li>
                <RouterLink to="/scammer" @click="isOpenHeader = false"
                    :class="['font-medium transition-all duration-200 ease-linear', menuHeaderActive('/scammer') ? 'text-[var(--textColor)]' : 'text-[var(--subTextColor)] hover:text-[var(--textColor)] hover:font-semibold']">
                    Scammer</RouterLink>
            </li>
            <li>
                <RouterLink to="/gioi-thieu" @click="isOpenHeader = false"
                    :class="['font-medium transition-all duration-200 ease-linear', menuHeaderActive('/gioi-thieu') ? 'text-[var(--textColor)]' : 'text-[var(--subTextColor)] hover:text-[var(--textColor)] hover:font-semibold']">
                    Giới Thiệu</RouterLink>
            </li>
            <RouterLink to="/gui-to-cao" @click="isOpenHeader = false" class="static w-1/2 text-center right-10 btn">Gửi
                Tố Cáo</RouterLink>
        </ul>
        <ul class="hidden lg:flex items-center gap-10">
            <li>
                <RouterLink to="/"
                    :class="['font-medium transition-all duration-200 ease-linear', menuHeaderActive('/') ? 'text-[var(--textColor)]' : 'text-[var(--subTextColor)] hover:text-[var(--textColor)] hover:font-semibold']">
                    Trang Chủ</RouterLink>
            </li>
            <li>
                <RouterLink to="/scammer"
                    :class="['font-medium transition-all duration-200 ease-linear', menuHeaderActive('/scammer') ? 'text-[var(--textColor)]' : 'text-[var(--subTextColor)] hover:text-[var(--textColor)] hover:font-semibold']">
                    Scammer</RouterLink>
            </li>
            <li>
                <RouterLink to="/gioi-thieu"
                    :class="['font-medium transition-all duration-200 ease-linear', menuHeaderActive('/gioi-thieu') ? 'text-[var(--textColor)]' : 'text-[var(--subTextColor)] hover:text-[var(--textColor)] hover:font-semibold']">
                    Giới Thiệu</RouterLink>
            </li>
            <RouterLink to="/gui-to-cao" class="absolute right-10 btn">Gửi Tố Cáo</RouterLink>
        </ul>
    </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const menuHeaderActive = (path) => route.path === path;
const isOpenHeader = ref(false);
const isFixed = ref(false);
const headerRef = ref(null);

const handleScroll = () => {
    if (!headerRef.value) return;
    const headerHeight = headerRef.value.offsetHeight;
    const marginTopHeader = parseFloat(getComputedStyle(headerRef.value).marginTop);
    const totalHeaderHeight = headerHeight + marginTopHeader;
    if (window.scrollY > totalHeaderHeight) {
        isFixed.value = true;
        document.body.classList.add("active");
    } else {
        isFixed.value = false;
        document.body.classList.remove("active");
    }
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>
<style></style>