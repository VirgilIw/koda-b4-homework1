import readline from "readline";
import process from "process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = [
  { nama: "Ayam dada", harga: 30000 },
  { nama: "Ayam sayap", harga: 21000 },
  { nama: "Ayam paha", harga: 28000 },
  { nama: "Perkedel", harga: 17000 },
  { nama: "Rice", harga: 11000 },
  { nama: "French fries", harga: 20000 },
  { nama: "Mineral Water", harga: 8000 },
  { nama: "Fanta", harga: 14000 },
  { nama: "Coca-Cola", harga: 15000 },
  { nama: "Mango Float", harga: 1000 },
];

let keranjang = [];
let history = [];

const tampilMenu = () => {
  console.clear();
  console.log("\n=== KFC MENU ===");
  menu.forEach((item, i) => {
    console.log(`${i + 1}. ${item.nama} - Rp${item.harga}`);
  });
  console.log("0. Kembali ke menu utama");
};

const tampilKeranjang = () => {
  console.clear();
  console.log("\n=== KERANJANG ===");
  if (keranjang.length === 0) {
    console.log("Keranjang kosong!");
    return 0;
  }

  let total = 0;
  keranjang.forEach((item, i) => {
    console.log(`${i + 1}. ${item.nama} - Rp${item.harga}`);
    total += item.harga;
  });
  console.log(`\nTotal: Rp${total}`);
  return total;
};

const tampilHistory = () => {
  console.clear();
  console.log("\n=== HISTORY ===");
  if (history.length === 0) {
    console.log("Belum ada history!");
    return;
  }

  let total = 0;
  history.forEach((item, i) => {
    console.log(`${i + 1}. ${item.nama} - Rp${item.harga}`);
    total += item.harga;
  });
  console.log(`\nTotal semua pembelian: Rp${total}`);
};

const pilihMenu = () => {
  tampilMenu();
  rl.question("Pilih menu (0 untuk kembali): ", (jawaban) => {
    const nomor = parseInt(jawaban);

    if (nomor === 0) {
      menuUtama();
      return;
    }

    if (nomor >= 1 && nomor <= menu.length) {
      const item = menu[nomor - 1];
      keranjang.push(item);
      history.push(item);
      console.log(`✅ ${item.nama} ditambahkan ke keranjang!`);

      rl.question("Pilih menu lagi? (y/n): ", (lagi) => {
        if (lagi.toLowerCase() === "y") {
          pilihMenu();
        } else {
          menuUtama();
        }
      });
    } else {
      console.log("❌ Pilihan tidak valid!");
      pilihMenu();
    }
  });
};

const lihatKeranjang = () => {
  tampilKeranjang();

  if (keranjang.length > 0) {
    rl.question("Kosongkan keranjang? (y/n): ", (hapus) => {
      if (hapus.toLowerCase() === "y") {
        keranjang = [];
        console.log("✅ Keranjang dikosongkan!");
      }

      rl.question("Kembali ke menu utama? (y/n): ", (kembali) => {
        if (kembali.toLowerCase() === "y") {
          menuUtama();
        } else {
          lihatKeranjang();
        }
      });
    });
  } else {
    rl.question("Kembali ke menu utama? (tekan enter): ", () => {
      menuUtama();
    });
  }
};

const buatInvoice = (items, total) => {
  const now = new Date();
  const tanggal = now.toLocaleDateString("id-ID");
  const waktu = now.toLocaleTimeString("id-ID");

  console.log("\n" + "=".repeat(30));
  console.log("      🍗 KFC INVOICE 🍗");
  console.log("=".repeat(30));
  console.log(`Tanggal: ${tanggal} ${waktu}`);
  console.log("-".repeat(30));

  items.forEach((item, i) => {
    console.log(`${i + 1}. ${item.nama} - Rp${item.harga.toLocaleString()}`);
  });

  console.log("-".repeat(30));
  console.log(`TOTAL: Rp${total.toLocaleString()}`);
  console.log("=".repeat(30));
  console.log("Terima kasih sudah berbelanja!");
  console.log("=".repeat(30));
};

const checkout = () => {
  if (keranjang.length === 0) {
    console.log("❌ Keranjang kosong!");
    setTimeout(() => menuUtama(), 1500);
    return;
  }

  const total = tampilKeranjang();
  console.log("\n=== CHECKOUT ===");

  rl.question("Konfirmasi pembayaran? (y/n): ", (konfirmasi) => {
    if (konfirmasi.toLowerCase() === "y") {
      console.log("\n✅ PEMBAYARAN BERHASIL!");
      buatInvoice(keranjang, total); // 👈 DIPANGGIL DISINI

      const pesanan = {
        tanggal: new Date().toLocaleDateString("id-ID"),
        items: [...keranjang],
        total: total,
      };
      history.push(pesanan);

      // Kosongkan keranjang
      keranjang = [];

      rl.question("\nTekan enter untuk kembali ke menu utama...", () => {
        menuUtama();
      });
    } else {
      console.log("❌ Checkout dibatalkan!");
      setTimeout(() => menuUtama(), 1000);
    }
  });
};

const lihatHistory = () => {
  tampilHistory();
  rl.question("Kembali ke menu utama? (tekan enter): ", () => {
    menuUtama();
  });
};

const keluar = () => {
  console.clear();
  console.log("\nTerima kasih sudah memesan di KFC! 🍗");
  console.log("Sampai jumpa lagi! 👋\n");
  rl.close();
  process.exit(0);
};

const menuUtama = () => {
  console.clear();
  console.log("\n🍗 === KFC ORDERING SYSTEM === 🍗");
  console.log("1. Pilih Menu");
  console.log("2. Lihat Keranjang");
  console.log("3. History Pesanan");
  console.log("4. Keluar");

  rl.question("Pilih opsi (1-4): ", (pilihan) => {
    switch (pilihan) {
      case "1":
        pilihMenu();
        break;
      case "2":
        lihatKeranjang();
        break;
      case "3":
        lihatHistory();
        break;
      case "4":
        keluar();
        break;
      default:
        console.log("❌ Pilihan tidak valid!");
        setTimeout(() => {
          menuUtama();
        }, 1000);
    }
  });
};

console.log("Selamat datang di KFC! 🍗");
setTimeout(() => {
  menuUtama();
}, 500);
