import { createRouter, createWebHistory } from "vue-router";
import checkAdminLogin from "./checkAdminLogin"

const routes = [
	// Client
	{
		path: "/",
		component: () => import("../components/Client/TrangChu/index.vue"),
		meta: { layout: "client" },
	},
	{
		path: "/scammer",
		component: () => import("../components/Client/Scammer/index.vue"),
		meta: { layout: "client" },
	},
	{
		path: "/gioi-thieu",
		component: () => import("../components/Client/GioiThieu/index.vue"),
		meta: { layout: "client" },
	},
	{
		path: "/gui-to-cao",
		component: () => import("../components/Client/GuiToCao/index.vue"),
		meta: { layout: "client" },
	},
	// Admin
	{
		path: "/admin/danh-sach-scammer",
		component: () => import("../components/Admin/DanhSachScammer/index.vue"),
		meta: { layout: "admin" },
		beforeEnter: checkAdminLogin,
	},
	{
		path: "/admin/doi-duyet",
		component: () => import("../components/Admin/DoiDuyet/index.vue"),
		meta: { layout: "admin" },
		beforeEnter: checkAdminLogin,
	},
	{
		path: "/admin/noi-dung-canh-bao",
		component: () => import("../components/Admin/NoiDungCanhBao/index.vue"),
		meta: { layout: "admin" },
		beforeEnter: checkAdminLogin,
	},
	{
		path: "/admin/dang-nhap",
		component: () => import("../components/Admin/DangNhap/index.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

export default router;