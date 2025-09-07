## flowchart mau ke daftar menu

```mermaid

flowchart TB

start((start))
stop(((stop)))

simpanKeranjang@{shape: lean-r, label: " simpanKeranjang = []"}
jumlahKeranjang@{shape: lean-r, label: jumlahKeranjang = 0}
totalHargaKeranjang@{shape: lean-r, label: totalHargaKeranjang = 0}
historyPesanan@{shape: lean-r, label: "historyPesanan = []"}

utama@{shape: diamond, label: menuPertanyaan()}
tanya@{shape: rect, label: menuUtama()}
pertanyaan1@{shape: rect, label: silahkan pilih menu}
cekPertanyaan1@{shape: diamond, label: if(ubahPertanyaan === 1)}


menu1True@{shape: rect, label: menuMakan()}
menu1TruePertanyaan@{shape: rect, label: pertanyaanPertama()}
menu1False@{shape: rect, label: pilih 2}

silahkanPilih@{shape: rect, label: "silahkan pilih nomor menu , (callback = jawaban1)" }
clear@{shape: rect, label: console.clear()}
clear2@{shape: rect, label: console.clear()}
ubahParse@{shape: rect, label: ubahJawaban1 = parseInt(jawaban1)}
cekUbahJawaban1@{shape: diamond, label: ubahJawaban1 > 0 && ubahJawaban1 <= 10}
pilihMenu@{shape: rect, label: pilihMenu(ubahJawaban1)}
labelFalse@{shape: lean-r, label: Nomor menu tidak valid}

siker@{shape: rect, label: "simpanKeranjang[jumlahKeranjang] = {
    menu: searchFood[ubahJawaban1 - 1].menu,
    harga:searchFood[ubahJawaban1 - 1].harga
}"}
toHaKer@{shape: rect, label: "totalHargaKeranjang = totalHargaKeranjang + searchFood[ubahJawaban1 - 1].harga" }
juKer@{shape: rect, label: "jumlahKeranjang = jumlahKeranjang - 1"}
histoPes@{shape:lean-r, label: "historyPesanan[jumlahHistory] ={
    menu: serchFood[ubahJawaban1 -1].menu,
    harga: searchFood[ubahJawaban1 - 1].harga
}"}
totalHargaHisto@{shape: rect, label: "totalHargaHistory = totalHargaHistory + searchFood[ubahJawaban1 - 1].harga"}
jumlahHisto@{shape: rect, label: "jumlahHistory = jumlahHistory + 1"}


consoleLog1@{shape: lean-r, label: "Item ditambahkan ke keranjang"}



pilihMenuLagi@{shape: rect, label: "mau pilih menu lagi (Y/N), (jawaban2)"}

ifKedua@{shape: diamond, label: if(jawaban2 === "Y" || jawaban2 === "y")}


start--->simpanKeranjang--->totalHargaKeranjang
totalHargaKeranjang--->jumlahKeranjang--->historyPesanan


historyPesanan--->utama--true--->tanya
tanya--->pertanyaan1--->cekPertanyaan1

cekPertanyaan1--true--->menu1True--->menu1TruePertanyaan
cekPertanyaan1--false--->menu1False


menu1TruePertanyaan--->silahkanPilih--->clear
clear--->ubahParse--->cekUbahJawaban1
cekUbahJawaban1--true--->pilihMenu--->siker
cekUbahJawaban1--false--->labelFalse

siker--->toHaKer--->juKer
juKer---> histoPes--->totalHargaHisto
totalHargaHisto--->jumlahHisto

jumlahHisto--->consoleLog1--->pilihMenuLagi
pilihMenuLagi--->clear2--->ifKedua
ifKedua--true-->menu1True
ifKedua--false-->utama



utama--false--->stop
```
