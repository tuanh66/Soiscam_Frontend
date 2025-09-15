<template>
    <section class="pt-4 mx-4 lg:mx-[6%] lg:mt-4 flex items-center gap-[4px]">
        <RouterLink to="/"
            class="hover:text-[var(--textColor)] text-[var(--subTextColor)] text-[14px] transition duration-200 ease-linear">
            Trang Chủ
        </RouterLink>
        <img src="../../../assets/img/arrow-right-2.svg" alt="">
        <RouterLink to="/gui-to-cao"
            class="text-[var(--textColor)] text-[14px] transition duration-200 ease-linear pointer-events-none">Gửi Tố
            Cáo</RouterLink>
    </section>
    <form id="form-report" class="max-w-full mt-4 px-4 pb-10 lg:max-w-[830px] mx-auto lg:mt-1 lg:pb-[80px]">
        <h2 class="form__heading text-center mb-[16px] title">Thông tin kẻ lừa đảo</h2>
        <div class="flex-wrap gap-[24px] flex items-center lg:gap-[16px] mb-[24px]">
            <div class="form__group flex flex-col gap-[8px] flex-1 relative">
                <label for="nameScammer" class="font-medium w-max">Tên Chủ Tài Khoản <span
                        class="text-[var(--redColor)]">*</span></label>
                <input type="text" placeholder="Nhập tên chủ tài khoản..." name="nameScammer" id="nameScammer"
                    class="py-[10px] px-[12px] h-10 rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)]">
                <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
            </div>
            <div class="form__group flex flex-col gap-[8px] flex-1 relative">
                <label for="phoneScammer" class="font-medium w-max">Số điện thoại <span
                        class="text-[var(--redColor)]">*</span></label>
                <input type="text" placeholder="Nhập số điện thoại..." name="phoneScammer" id="phoneScammer"
                    class="py-[10px] px-[12px] h-10 rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)]">
                <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
            </div>
        </div>
        <div class="flex-wrap gap-[24px] flex items-center lg:gap-[16px] mb-[24px]">
            <div class="form__group flex flex-col gap-[8px] flex-1 relative">
                <label for="bankNumber" class="font-medium w-max">Số Tài Khoản <span
                        class="text-[var(--redColor)]">*</span></label>
                <input type="text" placeholder="Nhập số tài khoản..." name="bankNumber" id="bankNumber"
                    class="py-[10px] px-[12px] h-10 rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)]">
                <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
            </div>
            <div class="form__group flex flex-col gap-[8px] flex-1 relative">
                <label for="bankName" class="font-medium w-max">Ngân Hàng <span
                        class="text-[var(--redColor)]">*</span></label>
                <input type="text" placeholder="Nhập tên ngân hàng..." name="bankName" id="bankName"
                    class="py-[10px] px-[12px] h-10 rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)]">
                <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
            </div>
        </div>
        <div class="form__group flex flex-col gap-[8px] flex-1 relative">
            <textarea placeholder="Nhập nội dung tố cáo..." name="contentReport" id="contentReport"
                class="py-[10px] px-[12px] rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)] resize-none h-16 overflow-hidden mb-6"></textarea>
            <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
        </div>
        <div class="grid grid-cols-2 lg:flex gap-[12px] flex-wrap mb-[40px]">
            <div v-for="(img, index) in uploadedImages" :key="index"
                class="form__image-preview w-[128px] h-[114px] rounded-[8px] overflow-hidden relative">
                <div class="form__preview-remove w-[32px] h-[32px] rounded-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center absolute cursor-pointer top-[4px] right-[4px]"
                    @click="removeImage(img)">
                    <img src="../../../assets/img/close-icon.svg" alt="close" />
                </div>
                <img :src="img.preview" alt="" class="form__preview-img w-full h-full object-cover" />
            </div>
            <div
                class="form__group form__upload-group flex flex-col gap-[8px] flex-1 relative max-w-[128px] w-full h-[114px] rounded-[8px] bg-[var(--bgColor3)]">
                <label for="uploadImage"
                    class="form__upload absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center gap-[8px]">
                    <input type="file" id="uploadImage" class="form__upload-input" accept="image/*" multiple hidden
                        @change="handleUpload" />
                    <img src="../../../assets/img/image-upload.svg" alt="" class="form__upload-icon" />
                    <span class="text-[#94A3B8] text-[14px]">Chọn ảnh</span>
                </label>
                <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
            </div>
        </div>
        <h2 class="form__heading text-center mb-[16px] title">Xác thực người gởi tố cáo</h2>
        <div class="flex-wrap gap-[24px] flex items-center lg:gap-[16px] mb-[24px]">
            <div class="form__group flex flex-col gap-[8px] flex-1 relative">
                <label for="nameSender" class="font-medium w-max">Họ Và Tên <span
                        class="text-[var(--redColor)]">*</span></label>
                <input type="text" placeholder="Nhập họ và tên..." name="nameSender" id="nameSender"
                    class="py-[10px] px-[12px] h-10 rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)]">
                <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
            </div>
            <div class="form__group flex flex-col gap-[8px] flex-1 relative">
                <label for="phoneSender" class="font-medium w-max">Liên hệ (Zalo - Sđt) <span
                        class="text-[var(--redColor)]">*</span></label>
                <input type="text" placeholder="Nhập số điện thoại..." name="phoneSender" id="phoneSender"
                    class="py-[10px] px-[12px] h-10 rounded-[8px] bg-[var(--bgColor3)] border-none outline-none text-[var(--textColor)]">
                <p class="form-message text-[14px] text-[var(--redColor)] absolute top-0 right-0"></p>
            </div>
        </div>
        <div class="flex items-center gap-[30px]">
            <div class="flex items-center gap-[8px]">
                <input type="radio" name="option" id="option-1" value="Tôi là nạn nhân" class="w-[24px] h-[24px]"
                    checked>
                <label for="option-1" class="font-medium text-[#cccccc]">Tôi là nạn nhân</label>
            </div>
            <div class="flex items-center gap-[8px]">
                <input type="radio" name="option" id="option-2" value="Tôi chỉ đăng hộ" class="w-[24px] h-[24px]">
                <label for="option-2" class="font-medium text-[#cccccc]">Tôi chỉ đăng hộ</label>
            </div>
        </div>
        <button type="submit" class="block mt-[40px] mx-auto btn">Gửi Tố Cáo</button>
    </form>
</template>
<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const endpointPost = `${import.meta.env.VITE_API_URL}/client/create-report-approve-0`;
const uploadedImages = ref([]);

// handle auto resize contentReport
onMounted(() => {
    const contentReportInput = document.getElementById("contentReport");
    contentReportInput?.addEventListener("input", (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    });

    // chỉ cho nhập số ở 3 input
    const onlyNumberFields = ["phoneScammer", "bankNumber", "phoneSender"];
    onlyNumberFields.forEach((id) => {
        const el = document.getElementById(id);
        el?.addEventListener("keypress", (e) => {
            if (e.charCode < 48 || e.charCode > 57) {
                e.preventDefault();
            }
        });
    });

    // gắn validate
    Validator({
        form: "#form-report",
        formGroupSelector: ".form__group",
        errorSelector: ".form-message",
        rules: [
            Validator.isRequired("#nameScammer", "Nhập tên chủ tài khoản"),
            Validator.minLength("#nameScammer", 6, "Nhập tối thiểu 6 kí tự"),
            Validator.isRequired("#phoneScammer", "Nhập số điện thoại đối tượng"),
            Validator.isPhoneNumber("#phoneScammer"),
            Validator.isRequired("#bankNumber", "Nhập số tài khoản"),
            Validator.isNumber("#bankNumber"),
            Validator.minLength("#bankNumber", 8, "Nhập tối thiểu 8 số"),
            Validator.isRequired("#bankName", "Nhập tên ngân hàng"),
            Validator.minLength("#bankName", 3, "Nhập tối thiểu 3 kí tự"),
            Validator.isRequired("#contentReport", "Nhập nội dung tố cáo"),
            Validator.minLength("#contentReport", 20, "Nhập ít nhất 20 kí tự"),
            {
                selector: "#uploadImage",
                test: () => {
                    return uploadedImages.value.length > 0 ? undefined : "Upload hình ảnh";
                }
            },
            Validator.isRequired("#nameSender", "Nhập tên của bạn"),
            Validator.minLength("#nameSender", 6, "Nhập tối thiểu 6 kí tự"),
            Validator.isRequired("#phoneSender", "Nhập số điện thoại của bạn"),
            Validator.isPhoneNumber("#phoneSender"),
        ],
        resetOnSubmit: true,
        onSubmit: async ({ images, ...rest }) => {
            try {
                const formData = new FormData();

                // append các field text
                Object.entries(rest).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                // append file ảnh
                uploadedImages.value.forEach((img) => {
                    formData.append("imagesProof[]", img.file);
                });

                // gửi request
                await axios.post(endpointPost, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                uploadedImages.value = [];
                FuiToast.success("Gửi đơn thành công!");
            } catch (error) {
                console.error(error);
                FuiToast.error("Lỗi đơn!");
            }
        },
    });
});

function handleUpload(event) {
    const files = event.target.files;
    if (!files.length) return;

    for (let file of files) {
        if (file.type.startsWith("image/")) {
            uploadedImages.value.push({
                file,
                preview: URL.createObjectURL(file) // ✅ preview tạm
            });
        }
    }

    event.target.value = ""; // reset input
}

function removeImage(img) {
    uploadedImages.value = uploadedImages.value.filter((item) => item.preview !== img.preview);
    URL.revokeObjectURL(img.preview); // ✅ giải phóng bộ nhớ
}
</script>
<style></style>