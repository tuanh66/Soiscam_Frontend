import axios from "axios";

export default function (to, from, next) {
  var token = localStorage.getItem("token");
  axios
    .get(`${import.meta.env.VITE_API_URL}/admin/check-token`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.data.status) {
        localStorage.setItem("ho_ten", res.data.ho_ten);
        next();
      } else {
        FuiToast.error(res.data.message);
        next("/admin/dang-nhap");
      }
    });
}
