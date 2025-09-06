// aplikasi pemesanan makanan
// self service
// restonya salah satu terkenal
// spesifikasi
// terminal web
// 1. Menu
// - pencarian makanan
// - melihat keranjang
// - history pemesanan
// - kalkulasi harga setiap item dan total item
// selalu ada menu exit

// clue agar bisa berulang gunakan perulangan

// koda-b4-homework1 || upload
// index.js
// flowchart-pesenMakan.md
// flowchart-keranjang.md
// README.md

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const searchFood = [
  { menu: "1. Ayam dada", harga: 30000 },
  {
    menu: "2. Ayam sayap",
    harga: 21000,
  },
  {
    menu: "3. Ayam paha",
    harga: 28000,
  },
  {
    menu: "4. perkedel",
    harga: 17000,
  },
  {
    menu: "5. Rice",
    harga: 11000,
  },
  {
    menu: "6. french fries",
    harga: 20000,
  },
  {
    menu: "7 . Mineral Water",
    harga: 8000,
  },
  {
    menu: "8. Fanta",
    harga: 14000,
  },
  {
    menu: "9. Coca-Cola",
    harga: 15000,
  },
  {
    menu: "10. Mango Float",
    harga: 1000,
  },
];

function menuUtama() {
  // Pesan Pembuka
  console.log("\n<---------Selamat datang di KFC------------>\n");
  console.log("1. Pilih Menu");
  console.log("2. Keranjang");
  console.log("3. History");
  console.log("4. Exit");
}

let totalMenu = 10;

function menuMakan() {
  for (let i = 0; i < totalMenu; i++) {
    // simpan menu ke varibel
    let menu = searchFood[i].menu;
    // simpan harga ke varibel
    let harga = searchFood[i].harga;
    // variabel baru untuk digabung
    let gabung = menu + ": " + harga;

    console.log(gabung);
  }
}

function pilihMenu(menu) {
  switch (menu) {
    case 1:
      console.log(searchFood[0]);
      break;
    case 2:
      console.log(searchFood[1]);
      break;
    case 3:
      console.log(searchFood[2]);
      break;
    case 4:
      console.log(searchFood[3]);
      break;
    case 5:
      console.log(searchFood[4]);
      break;
    case 6:
      console.log(searchFood[5]);
      break;
    case 7:
      console.log(searchFood[6]);
      break;
    case 8:
      console.log(searchFood[7]);
      break;
    case 9:
      console.log(searchFood[8]);
      break;
    case 10:
      console.log(searchFood[9]);
      break;
  }
}
//

const menuPertanyaan = () => {
  menuUtama();
  readline.question("silahkan pilih : ", (question) => {
    console.clear();
    let ubahQuestion = parseInt(question);
    if (ubahQuestion === 1) {
      menuMakan();
      kumpulanPertanyaan();
    } else if (ubahQuestion === 2) {
      console.clear();
      keranjang();
    } else if (ubahQuestion === 3) {
      console.clear();
      isiHistory();
    } else if (ubahQuestion === 4) {
      console.clear();
      exit();
    }
  });
};
menuPertanyaan();

let keranjangJawabanMenu = [];
let simpanKeKeranjang = [];

//

const pertanyaanPertama = () => {
  readline.question(
    "Silahkan pilih menu atau mau kembali(B) : ",
    (jawaban1) => {
      console.clear();
      let ubahJawaban1 = parseInt(jawaban1);
      if (ubahJawaban1 === "B" || ubahJawaban1 === "b") {
        menuUtama();
      }
      pilihMenu(ubahJawaban1);

      keranjangJawabanMenu = [
        ...keranjangJawabanMenu,
        searchFood[ubahJawaban1 - 1],
      ];

      simpanKeKeranjang = [...simpanKeKeranjang, searchFood[ubahJawaban1 - 1]];

      //
      readline.question("Mau pilih menu lagi (Y/N) ? ", (jawaban2) => {
        console.clear();
        if (jawaban2 === "y" || jawaban2 === "Y") {
          menuMakan();
          pertanyaanPertama();
        } else if (jawaban2 === "n" || jawaban2 === "N") {
          menuPertanyaan();
        }
      });
    }
  );
};
//

// const pertanyaanPertamaPilihLagi = () => {};

//

const kumpulanPertanyaan = () => {
  pertanyaanPertama();
};

//

const keranjang = () => {
  console.log(simpanKeKeranjang);
  console.log("ini keranjang nya");
  readline.question("mau kembali atau keluar(Y/N)?", (keranjangOut) => {
    if (keranjangOut === "Y" || keranjangOut === "y") {
      console.clear();
      menuPertanyaan();
    } else if (keranjangOut === "N" || keranjangOut === "n") {
      exit();
    }
  });
};

//

let sumHarga = [];
const isiHistory = () => {
  console.log("ini history\n");
  sumHarga = console.log(keranjangJawabanMenu);

  readline.question("mau kembali atau keluar (y/n)", (history) => {
    // let ubahHistory = parseInt(history);
    if (history === "y" || history === "Y") {
      console.clear();
      menuUtama();
    } else if (history === "N" || history === "n") {
      exit();
    }
    console.clear();
    menuPertanyaan();
  });
};

//

const exit = () => {
  setTimeout(() => {
    readline.close();
  }, 500);
};
