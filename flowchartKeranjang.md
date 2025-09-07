# flowchart Keranjang

```mermaid
flowchart TB

start((start))

stop(((stop)))

log1@{shape: lean-r, label: isi keranjang}

letI@{shape: lean-r, label: let i = 0}
jumlahKeranjang@{shape: lean-r, label:jumlahKeranjang}

while@{shape: diamond, label: "while i < jumlahKeranjang"}

log2@{shape: lean-r, label: "i + 1 + .  + simpanKeKeranjang[i].menu +  - Rp + simpanKeKeranjang[i].harga"}

iTambah@{shape: rect, label: i = i + 1}

log3@{shape: lean-r, label: "total harga keranjang: RP + totalHargaKeranjang"}

 isiKeran@{shape: rect, label: ubahIsiKeranjang() }




start--->log1--->letI
letI--->while--true--->log2

log2--->isiKeran--->stop
while--false--->log3
log3--->stop


```
