<template>
    <!-- IMAGES FIXED-->
    <div class="fixed top-[35%] lg:top-[573px] left-1/2 right-0 transform -translate-x-1/2 flex justify-center items-center -z-1">
        <img src="../../../assets/img/shield.svg" alt="" class="img-shied">
        <img src="../../../assets/img/start.svg" alt="" class="absolute left-1/2 transform -translate-x-1/2">
    </div>
    <div class="hidden lg:block w-[530px] h-[530px] rounded-full blur-[250px] bg-[#1B1D30] fixed top-1 left-[-57px] -z-1 opacity-60"></div>
    <div class="hidden lg:block w-[530px] h-[530px] rounded-full blur-[250px] bg-[#1B1D30] fixed bottom-1 right-[-57px] -z-1 opacity-60"></div>
    <!--end  IMAGES FIXED-->
    <TopClient></TopClient>
    <div v-if="!isHideContainer" class="mt-[var(--headerHeight)] px-4 max-w-full pt-[26px] lg:mt-0 lg:px-0 lg:pt-0 lg:max-w-[1100px] lg:w-full lg:mx-auto pb-25">
        <router-view />
    </div>
    <router-view v-else />
</template>
<script setup>
import TopClient from '../../components/Client/TopClient.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// Danh sách các route muốn ẩn container
const hideContainerRoutes = ['/gui-to-cao', '/gioi-thieu'];

const isHideContainer = computed(() => hideContainerRoutes.includes(route.path));
</script>
<style></style>