# P0005 Student ID Generator V2

Project nay duoc phat trien tu nen `P0004` va da duoc toi uu de chay local on dinh, de bao tri.

## Cau truc module JS

- `assets/main.js`: entrypoint, quan ly state va binding su kien.
- `assets/modules/constants.js`: danh sach ten mau, theme mau, map domain truong.
- `assets/modules/utils.js`: helper random, format date, copy clipboard.
- `assets/modules/renderer.js`: render card tren canvas + barcode.

## Cac diem toi uu chinh

- Khong con script obfuscated kho debug.
- Nut bam phan hoi on dinh (random, copy, upload anh, download).
- Render card tach rieng theo module, de mo rong them logic sau nay.
- Chay local an toan, core flow khong phu thuoc extension ben ngoai.

## Chay nhanh

```bash
cd projects/P0005-student-id-generator-v2
npx serve .
```

Hoac mo qua dashboard WebApps.
