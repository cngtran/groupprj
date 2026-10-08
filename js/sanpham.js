//1. Dữ liệu gốc
const products = [
  { id: 1, name: "Vinfast VF3", price: 300000000 },
  { id: 2, name: "Bàn phím cơ Logitech", price: 850000 },
  { id: 3, name: "Loa XDOBO X8 Max", price: 1500000 },
  { id: 4, name: "Sữa rửa mặt CeraVe", price: 350000 },
  { id: 5, name: "Bàn học IKEA", price: 1000000 },
];

// 2.Hàm hiển thị
function render(danhSach) {
  const vungHienThi = document.getElementById("hien-thi");
  document.getElementById("so-ket-qua").textContent =
    "Hiển thị " + danhSach.length + " / " + products.length + " sản phẩm";

  if (danhSach.length === 0) {
    vungHienThi.innerHTML =
      '<p class="khong-co">Không tìm thấy sản phẩm nào phù hợp.</p>';
    return;
  }

  const htmlArray = danhSach.map(
    (item) => `
    <div class="san-pham">
      <div class="anh-san-pham"><i class="fa-solid fa-box-open"></i></div>
      <div class="thong-tin-san-pham">
        <h3>${item.name}</h3>
        <p class="gia-tien">${item.price.toLocaleString("vi-VN")} đ</p>
        <a href="lienhe.html" class="nut-bao-gia-sp">YÊU CẦU BÁO GIÁ</a>
      </div>
    </div>
  `,
  );

  vungHienThi.innerHTML = htmlArray.join("");
}

let tuKhoaHienTai = "";
let giaToiDaHienTai = Infinity;
let kieuSapXepHienTai = "mac_dinh";

//3. Lọc + sắp xếp
function chayBoLocTongHop() {
  const ketQuaLoc = products.filter(function (item) {
    const thoaManTuKhoa = item.name.toLowerCase().includes(tuKhoaHienTai);
    const thoaManGia = item.price <= giaToiDaHienTai;
    return thoaManTuKhoa && thoaManGia;
  });

  if (kieuSapXepHienTai === "tang") {
    ketQuaLoc.sort((a, b) => a.price - b.price);
  } else if (kieuSapXepHienTai === "giam") {
    ketQuaLoc.sort((a, b) => b.price - a.price);
  }
  render(ketQuaLoc);
}

// đánh dấu nút đang được chọn trong cùng một nhóm
function chonNut(nutDuocChon, nhomNut) {
  nhomNut.forEach((nut) => nut.classList.remove("dang-chon"));
  if (nutDuocChon) nutDuocChon.classList.add("dang-chon");
}

render(products);

// 4.thêm sự kiện
const oTimKiem = document.getElementById("tim-kiem-sp");
oTimKiem.addEventListener("input", function (event) {
  tuKhoaHienTai = event.target.value.toLowerCase();
  chayBoLocTongHop();
});

const cacNutGia = document.querySelectorAll(".btn-loc-gia");
cacNutGia.forEach(function (nut) {
  nut.addEventListener("click", function (event) {
    giaToiDaHienTai = Number(event.target.dataset.gia);
    chonNut(nut, cacNutGia);
    chayBoLocTongHop();
  });
});

const nutTang = document.getElementById("btn-sap-xep-tang");
const nutGiam = document.getElementById("btn-sap-xep-giam");
const cacNutSapXep = [nutTang, nutGiam];

nutTang.addEventListener("click", function () {
  kieuSapXepHienTai = "tang";
  chonNut(nutTang, cacNutSapXep);
  chayBoLocTongHop();
});

nutGiam.addEventListener("click", function () {
  kieuSapXepHienTai = "giam";
  chonNut(nutGiam, cacNutSapXep);
  chayBoLocTongHop();
});

//Xóa lọc
document.getElementById("btn-xoa-loc").addEventListener("click", function () {
  tuKhoaHienTai = "";
  giaToiDaHienTai = Infinity;
  kieuSapXepHienTai = "mac_dinh";
  oTimKiem.value = "";
  chonNut(null, cacNutGia);
  chonNut(null, cacNutSapXep);
  chayBoLocTongHop();
});
