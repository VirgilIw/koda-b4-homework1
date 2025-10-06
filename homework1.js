import readline from "readline";
import process from "process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tanya = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
};

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

let simpanKeKeranjang = [];
let totalHargaKeranjang = 0;

let historyPesanan = [];
let totalHargaHistory = 0;

const menuUtama = () => {
  console.clear();
  console.log("\n<--------- Selamat datang di KFC ----------->\n");
  console.log("1. Pilih Menu");
  console.log("2. Keranjang");
  console.log("3. History");
  console.log("4. Exit");
};

const menuPertanyaan = async () => {
  while (true) {
    try {
      menuUtama();
      const pilih = await tanya("Silahkan pilih (1-4): ");
      const pilihan = parseInt(pilih.trim());

      switch (pilihan) {
        case 1:
          await pertanyaanPertama();
          break;
        case 2:
          await keranjang();
          break;
        case 3:
          await isiHistory();
          break;
        case 4:
          exitApp(); // Memanggil fungsi exitApp untuk keluar
          return;
        default:
          console.log(" Pilihan tidak valid!");
      }
    } catch (err) {
      console.log(" Terjadi error:", err.message);
    }
  }
};

const menuMakan = () => {
  console.clear();
  console.log("\n=== Menu Makanan ===");
  searchFood.forEach((item, i) => {
    console.log(`${i + 1}. ${item.menu} - Rp${item.harga}`);
  });
  console.log("0. Kembali ke Menu Utama");
};

const pilihMenu = (nomor) => {
  const index = nomor - 1;
  if (index >= 0 && index < searchFood.length) {
    const item = searchFood[index];
    console.log(`\n✅ ${item.menu} = Rp${item.harga}`);
    simpanKeKeranjang.push(item);
    totalHargaKeranjang += item.harga;

    historyPesanan.push(item);
    totalHargaHistory += item.harga;
  } else {
    console.log("❌ Menu tidak tersedia!");
  }
};

const pertanyaanPertama = async () => {
  let lagi = true;
  while (lagi) {
    menuMakan();
    try {
      const jawaban = await tanya(
        "\nSilahkan pilih menu (1-10) atau 0 untuk kembali: "
      );
      const ubahJawaban = parseInt(jawaban.trim());

      if (ubahJawaban === 0) {
        lagi = false;
        continue;
      }

      if (isNaN(ubahJawaban) || ubahJawaban < 1 || ubahJawaban > 10) {
        console.log("❌ Nomor menu tidak valid!");
        continue;
      }

      pilihMenu(ubahJawaban);
      console.log("\nItem ditambahkan ke keranjang!\n");

      const lagiJawab = await tanya("Mau pilih menu lagi? (Y/N): ");
      if (lagiJawab.trim().toLowerCase() !== "y") {
        lagi = false;
      }
    } catch (err) {
      console.log("❌ Terjadi error:", err.message);
    }
  }
};

const keranjang = async () => {
  console.clear();
  console.log("\n=== Isi Keranjang ===");
  if (simpanKeKeranjang.length === 0) {
    console.log("Keranjang kosong!");
  } else {
    simpanKeKeranjang.forEach((item, i) => {
      console.log(`${i + 1}. ${item.menu} - Rp${item.harga}`);
    });
    console.log(`\nTotal harga: Rp${totalHargaKeranjang}`);
  }

  try {
    const hapus = await tanya("Mau hapus keranjang? (Y/N): ");
    if (hapus.trim().toLowerCase() === "y") {
      simpanKeKeranjang = [];
      totalHargaKeranjang = 0;
      console.log("\nKeranjang berhasil dikosongkan!\n");
    }

    const lanjut = await tanya("Kembali ke menu utama? (Y/N): ");
    if (lanjut.trim().toLowerCase() !== "y") {
      menuUtama();
      return;
    }
  } catch (err) {
    console.log("❌ Terjadi error:", err.message);
  }
};

const isiHistory = async () => {
  console.clear();
  console.log("\n=== History Pesanan ===");
  if (historyPesanan.length === 0) {
    console.log("Belum ada history!");
  } else {
    historyPesanan.forEach((item, i) => {
      console.log(`${i + 1}. ${item.menu} - Rp${item.harga}`);
    });
    console.log(`\nTotal harga: Rp${totalHargaHistory}`);
  }

  try {
    const lanjut = await tanya("Kembali ke menu utama? (Y/N): ");
    if (lanjut.trim().toLowerCase() !== "y") {
      return;
    }
  } catch (err) {
    console.log("❌ Terjadi error:", err.message);
  }
};

const exitApp = () => {
  console.clear();
  console.log("\nTerima kasih sudah memesan di KFC!");
  setTimeout(() => {
    console.log("♥️ ♥️ ♥️\n");
    rl.close();
    process.exit(0);
  }, 1000);
};

menuPertanyaan();
