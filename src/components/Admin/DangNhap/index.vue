<template>
    <div id="fui-toast"></div> 
    <form id="form-login" action="" class="flex flex-col justify-center text-center mx-auto pt-30 px-4 w-90">
        <!-- <input type="hidden" name="_token" value=""> -->
        <div class="flex items-end justify-center gap-[6px] mt-[40px] mb-4">
            <img src="../../../assets/img/logo.svg" alt="" class="h-[40px] lg:h-[50px]">
            <span
                class="text-[16px] lg:text-[20px] leading-[16px] lg:leading-[20px] font-bold text-[var(--textColor)]">Soi
                scam</span>
        </div>
        <div class="form__group w-full mt-4 mb-4 flex flex-wrap">
            <input v-model="login" id="username" type="text" placeholder="Nhập tên tài khoản"
                class="w-full bg-[var(--bgColor3)] border border-[var(--subTextColor)] rounded-[8px] py-[10px] px-[12px] h-10 outline-none transition-colors duration-150 ease-linear appearance-none">
            <p class="form-message mt-1 text-[14px] text-[var(--redColor)]"></p>
        </div>
        <div class="form__group w-full mb-4 flex flex-col">
            <div class="relative">
                <input v-model="password" id="password" :type="showPassword ? 'text' : 'password'"
                    placeholder="Nhập mật khẩu"
                    class="w-full bg-[var(--bgColor3)] border border-[var(--subTextColor)] rounded-[8px] py-[10px] px-[12px] pr-9 h-10 outline-none transition-colors duration-150 ease-linear appearance-none">
                <Eye v-if="!showPassword" @click="showPassword = true"
                    class="w-[24px] h-[24px] absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-[#434657] select-none" />
                <EyeOff v-else @click="showPassword = false"
                    class="w-[24px] h-[24px] absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 text-[#434657] select-none" />
            </div>
            <p class="form-message mt-1 text-left text-[14px] text-[var(--redColor)]"></p>
        </div>
        <button type="submit" class="mt-4 btn">Đăng Nhập</button>
    </form>
</template>
<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

const router = useRouter();
const showPassword = ref(false);
const login = ref('');
const password = ref('');

onMounted(() => {
    // Kiểm tra token khi load trang login
    const token = localStorage.getItem("token");
    if (token) {
        router.push("/admin/danh-sach-scammer");
        return; // không cho chạy tiếp form nữa
    }

    Validator({
        form: "#form-login",
        formGroupSelector: ".form__group",
        errorSelector: ".form-message",
        rules: [
            Validator.isRequired("#username", "Bạn chưa nhập tên tài khoản"),
            Validator.isRequired("#password", "Bạn chưa nhập mật khẩu"),
        ],
        resetOnSubmit: false,
        onSubmit: async () => {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, {
                user: login.value,
                password: password.value,
            });
            if (res.data.status) {
                localStorage.setItem('token', res.data.token);
                FuiToast.success(res.data.message);
                router.push('/admin/danh-sach-scammer');
            } else {
                FuiToast.error(res.data.message);
            }
        }
    });
});
</script>
<style></style>