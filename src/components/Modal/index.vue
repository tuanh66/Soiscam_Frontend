<template>
    <section v-if="isModalOpen"
        class="fixed top-0 right-0 left-0 bottom-0 h-[100vh] flex justify-center items-center isolate z-50 animate-fadeIn">
        <div @click="closeModal" class="absolute top-0 right-0 left-0 bottom-0 bg-black/60 cursor-pointer z-[-1]"></div>
        <div
            class="h-[100vh] rounded-0 md:h-[800px] w-[623px] bg-[var(--bgColor2)] md:rounded-[16px] backdrop-blur-[70px] animate-fadeDown">
            <div class="flex justify-between items-center h-[54px] py-[12px] px-[16px] border-b border-[#FFFFFF1A]">
                <div class="text-[20px] font-semibold">Chi tiết tố cáo</div>
                <div @click="closeModal"
                    class="w-[30px] h-[30px] rounded-full bg-[var(--bgColor3)] flex justify-center items-center cursor-pointer transition-all duration-200 ease-linear hover:opacity-50">
                    <img src="../../assets/img/close-icon.svg" alt="close icon" class="pointer-events-none" />
                </div>
            </div>
            <div class="h-[calc(100vh-54px)] py-[8px] px-[16px] md:h-[calc(800px-54px)] overflow-auto modal__body">
                <div class="pb-2 border-b border-[#FFFFFF1A] last:border-b-0">
                    <div class="flex items-center gap-[8px] mb-[16px]">
                        <div class="modal__profile-image">
                            <img src="../../assets/img/avatar-1.svg" alt="avatar" />
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
                        <span class="modal__detail-text text-single">{{ getBankName(itemData.bankName) }}</span>
                    </div>
                </div>
                <div class="mt-2 pb-2 border-b border-[#FFFFFF1A] last:border-b-0">
                    <div class="flex items-center gap-[8px] mb-[16px]">
                        <div class="modal__profile-image">
                            <img src="../../assets/img/avatar-2.svg" alt="avatar" />
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
import { ref, reactive, defineExpose, nextTick } from "vue";
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
const isModalOpen = ref(false);
const galleryRef = ref(null);
const itemData = reactive({ images: [] });
const banks = [
    { value: "PVCOM", text: "PVcomBank" },
    { value: "VDT", text: "Ví điện tử (ViettelPay, ZaloPay...)" },
    { value: "BANK", text: "Ngân hàng khác..." },
    { value: "COIN", text: "Tiền số (USDT, BTC, ETH...)" },
    { value: "ECUR", text: "Thanh toán quốc tế (PayPal, PM...)" },
    { value: "VCB", text: "Vietcombank (VCB)" },
    { value: "VTB", text: "VietinBank (VTB)" },
    { value: "BIDV", text: "BIDV" },
    { value: "AGR", text: "Agribank" },
    { value: "TCB", text: "Techcombank (TCB)" },
    { value: "MB", text: "MB Bank" },
    { value: "VPBANK", text: "VPBank" },
    { value: "TPBANK", text: "TPBank" },
    { value: "ACB", text: "ACB Bank" },
    { value: "SAC", text: "Sacombank" },
    { value: "DAB", text: "DongA Bank" },
    { value: "OCB", text: "OCB Bank" },
    { value: "VIB", text: "VIB Bank" },
    { value: "MSB", text: "MSB Bank" },
    { value: "BVB", text: "Bản Việt Bank (BVB)" },
    { value: "NASB", text: "Bắc Á Bank (NASB)" },
    { value: "NCB", text: "NCB Bank" },
    { value: "NAMA", text: "Nam Á Bank" },
    { value: "MHB", text: "MHB Bank" },
    { value: "GPB", text: "GPBank" },
    { value: "OCEAN", text: "OceanBank" },
    { value: "Momo", text: "MoMo" },
];
let galleryInstance = null;

function getBankName(value) {
    const bank = banks.find(b => b.value === value);
    return bank ? bank.text : value;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function openModal(data) {
    Object.assign(itemData, data);
    isModalOpen.value = true;

    nextTick(() => {
        if (galleryRef.value) {
            if (galleryInstance) {
                galleryInstance.destroy(true);
            }
            galleryInstance = lightGallery(galleryRef.value, {
                plugins: [lgThumbnail],
                thumbnail: true,
                download: false,
            });
        }
    });
}

function closeModal() {
    isModalOpen.value = false;
}

defineExpose({
    open: openModal,
    close: closeModal
});
</script>
<style></style>