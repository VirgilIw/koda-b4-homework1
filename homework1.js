// aplikasi pemesanan makanan
// self service
// spesifikasi
// terminal web
// 1. Menu
// - pencarian makanan
// - melihat keranjang
// - history pemesanan
// - kalkulasi harga setiap item dan total item
// selalu ada menu exit

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const searchFood = [
  { menu: "Ayam dada", harga: 30000 },
  { menu: "Ayam sayap", harga: 21000 },
  { menu: "Ayam paha", harga: 28000 },
  { menu: "Perkedel", harga: 17000 },
  { menu: "Rice", harga: 11000 },
  { menu: "French fries", harga: 20000 },
  { menu: "Mineral Water", harga: 8000 },
  { menu: "Fanta", harga: 14000 },
  { menu: "Coca-Cola", harga: 15000 },
  { menu: "Mango Float", harga: 1000 },
];

// data keranjang
let simpanKeKeranjang = [];
let jumlahKeranjang = 0; // index manual
let totalHargaKeranjang = 0;

// data history
let historyPesanan = [];
let jumlahHistory = 0; // index manual
let totalHargaHistory = 0;

function menuUtama() {
  console.log("\n<--------- Selamat datang di KFC ----------->\n");
  console.log("1. Pilih Menu");
  console.log("2. Keranjang");
  console.log("3. History");
  console.log("4. Exit");
}

function menuMakan() {
  let i = 0;
  while (i < 10) {
    console.log(
      i + 1 + ". " + searchFood[i].menu + " - Rp" + searchFood[i].harga
    );
    i = i + 1;
  }
}

function pilihMenu(menu) {
  if (menu > 0 && menu <= 10) {
    console.log(
      searchFood[menu - 1].menu + " = Rp" + searchFood[menu - 1].harga
    );
  } else {
    console.log("Menu tidak tersedia");
  }
}

const menuPertanyaan = () => {
  menuUtama();
  readline.question("Silahkan pilih : ", (question) => {
    console.clear();
    let ubahQuestion = parseInt(question);
    if (ubahQuestion === 1) {
      menuMakan();
      pertanyaanPertama();
    } else if (ubahQuestion === 2) {
      console.clear();
      keranjang();
    } else if (ubahQuestion === 3) {
      console.clear();
      isiHistory();
    } else if (ubahQuestion === 4) {
      console.clear();
      exit();
    } else {
      menuPertanyaan();
    }
  });
};

const pertanyaanPertama = () => {
  readline.question("Silahkan pilih nomor menu : ", (jawaban1) => {
    console.clear();
    let ubahJawaban1 = parseInt(jawaban1);

    if (ubahJawaban1 > 0 && ubahJawaban1 <= 10) {
      pilihMenu(ubahJawaban1);

      // masukkan ke keranjang
      simpanKeKeranjang[jumlahKeranjang] = {
        menu: searchFood[ubahJawaban1 - 1].menu,
        harga: searchFood[ubahJawaban1 - 1].harga,
      };

      totalHargaKeranjang =
        totalHargaKeranjang + searchFood[ubahJawaban1 - 1].harga;
      jumlahKeranjang = jumlahKeranjang + 1;

      // masukkan juga ke history
      historyPesanan[jumlahHistory] = {
        menu: searchFood[ubahJawaban1 - 1].menu,
        harga: searchFood[ubahJawaban1 - 1].harga,
      };

      totalHargaHistory =
        totalHargaHistory + searchFood[ubahJawaban1 - 1].harga;
      jumlahHistory = jumlahHistory + 1;

      console.log("\nItem ditambahkan ke keranjang!\n");
    } else {
      console.log("Nomor menu tidak valid!\n");
    }

    readline.question("Mau pilih menu lagi (Y/N)? ", (jawaban2) => {
      console.clear();
      if (jawaban2 === "Y" || jawaban2 === "y") {
        menuMakan();
        pertanyaanPertama();
      } else {
        menuPertanyaan();
      }
    });
  });
};

const keranjang = () => {
  console.log("\nIsi Keranjang:\n");

  let i = 0;
  while (i < jumlahKeranjang) {
    console.log(
      i +
        1 +
        ". " +
        simpanKeKeranjang[i].menu +
        " - Rp" +
        simpanKeKeranjang[i].harga
    );
    i = i + 1;
  }

  console.log("\nTotal harga keranjang: Rp" + totalHargaKeranjang);

  readline.question("\nMau kembali atau keluar (Y/N)? ", (keranjangOut) => {
    if (keranjangOut === "Y" || keranjangOut === "y") {
      console.clear();
      menuPertanyaan();
    } else {
      exit();
    }
  });
};

const isiHistory = () => {
  console.log("\nHistory Pesanan:\n");

  let i = 0;
  while (i < jumlahHistory) {
    console.log(
      i + 1 + ". " + historyPesanan[i].menu + " - Rp" + historyPesanan[i].harga
    );
    i = i + 1;
  }

  console.log("\nTotal harga history: Rp" + totalHargaHistory);

  readline.question("\nMau kembali atau keluar (Y/N)? ", (historyOut) => {
    if (historyOut === "Y" || historyOut === "y") {
      console.clear();
      menuPertanyaan();
    } else {
      exit();
    }
  });
};

const exit = () => {
  console.log("\nTerima kasih sudah memesan di KFC!\n");
  setTimeout(() => {
    readline.close();
  }, 500);
};

menuPertanyaan();
