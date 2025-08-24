import axios from "axios";

export default function (to, from, next) {
  var token = localStorage.getItem("token");
  axios
    .get("http://127.0.0.1:8000/api/admin/check-token", {
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
