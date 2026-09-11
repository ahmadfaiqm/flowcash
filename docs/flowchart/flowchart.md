# Flowchart Sistem Akuntansi UMKM

## Gambaran Umum

Aplikasi ini merupakan sistem akuntansi UMKM dengan konsep **double-entry accounting**.

Semua transaksi bisnis seperti:

- Penjualan
- Pembelian
- Penerimaan kas/bank
- Pembayaran kas/bank
- Pergerakan stok
- Penyusutan aset
- Jurnal manual

akan diproses dan diposting ke:

- `journals`
- `journal_lines`

Kedua tabel tersebut menjadi pusat pencatatan akuntansi dan sumber utama untuk menghasilkan laporan.

---

## 1. Flowchart Utama Sistem

```mermaid
flowchart TD
    A([Start]) --> B[Login]
    B --> C{Login berhasil?}

    C -- Tidak --> B
    C -- Ya --> D[Dashboard]

    D --> E{Pilih Modul}

    E --> F[Penjualan]
    E --> G[Pembelian]
    E --> H[Kas / Bank]
    E --> I[Stok]
    E --> J[Aset Tetap]
    E --> K[Akuntansi / Jurnal]
    E --> L[Laporan]

    F --> F1[Input Sales Invoice]
    F1 --> F2[Input Customer]
    F2 --> F3[Input Produk]
    F3 --> F4[Hitung Subtotal + Pajak]
    F4 --> F5[Post Invoice]
    F5 --> F6[Update Piutang]
    F5 --> F7[Update Stok]
    F5 --> F8[Buat Jurnal Penjualan]
    F8 --> F9[Debit Piutang / Kas]
    F9 --> F10[Credit Penjualan]
    F10 --> F11[Debit HPP]
    F11 --> F12[Credit Persediaan]

    F --> F13{Invoice sudah dibayar?}
    F13 -- Ya --> F14[Input Receipt]
    F14 --> F15[Update Paid Total]
    F15 --> F16[Buat Jurnal Penerimaan]
    F16 --> F17[Debit Kas / Bank]
    F17 --> F18[Credit Piutang]

    G --> G1[Input Purchase Invoice]
    G1 --> G2[Input Supplier]
    G2 --> G3[Input Produk]
    G3 --> G4[Hitung Subtotal + Pajak]
    G4 --> G5[Post Invoice]
    G5 --> G6[Update Hutang]
    G5 --> G7[Update Stok]
    G5 --> G8[Buat Jurnal Pembelian]
    G8 --> G9[Debit Persediaan]
    G9 --> G10[Credit Hutang]

    G --> G11{Pembelian dibayar?}
    G11 -- Ya --> G12[Input Purchase Payment]
    G12 --> G13[Update Paid Total]
    G13 --> G14[Buat Jurnal Pembayaran]
    G14 --> G15[Debit Hutang]
    G15 --> G16[Credit Kas / Bank]

    H --> H1[Pilih Kas / Bank]
    H1 --> H2[Input Transaksi]
    H2 --> H3[Post Jurnal]
    H3 --> H4[Update Saldo Kas / Bank]

    I --> I1[Stock Movement]
    I1 --> I2{Jenis Movement}
    I2 --> I3[Stock In]
    I2 --> I4[Stock Out]
    I2 --> I5[Adjustment]
    I3 --> I6[Update Stock Qty + Average Cost]
    I4 --> I6
    I5 --> I6

    J --> J1[Input Fixed Asset]
    J1 --> J2[Hitung Penyusutan]
    J2 --> J3[Generate Depreciation]
    J3 --> J4[Buat Jurnal Penyusutan]
    J4 --> J5[Debit Beban Penyusutan]
    J5 --> J6[Credit Akumulasi Penyusutan]

    K --> K1[Chart of Accounts]
    K1 --> K2[Create / Edit Journal]
    K2 --> K3[Input Journal Lines]
    K3 --> K4{Debit = Credit?}
    K4 -- Tidak --> K3
    K4 -- Ya --> K5[Post Journal]

    L --> L1[Ambil Data Journal Lines]
    L1 --> L2[Generate Laporan]
    L2 --> L3[Neraca]
    L2 --> L4[Laba Rugi]
    L2 --> L5[Arus Kas]
    L2 --> L6[Piutang]
    L2 --> L7[Hutang]
    L2 --> L8[Persediaan]

    F12 --> M[(Journals + Journal Lines)]
    F18 --> M
    G10 --> M
    G16 --> M
    H4 --> M
    J6 --> M
    K5 --> M

    M --> L1
```

---

## 2. Flowchart Sederhana Arsitektur Sistem

```mermaid
flowchart LR
    A[User] --> B[Dashboard]

    B --> C[Penjualan]
    B --> D[Pembelian]
    B --> E[Kas / Bank]
    B --> F[Stok]
    B --> G[Aset]
    B --> H[Akuntansi]
    B --> I[Laporan]

    C --> J[Transaksi]
    D --> J
    E --> J
    F --> J
    G --> J
    H --> J

    J --> K[Posting]
    K --> L[(Journals)]
    L --> M[(Journal Lines)]

    M --> I
```

### Konsep utama

```text
Transaksi Bisnis
       │
       ▼
   Diproses
       │
       ▼
    Posting
       │
       ▼
  ┌───────────────┐
  │   Journals    │
  │       +       │
  │ Journal Lines │
  └───────┬───────┘
          │
          ▼
       Laporan
```

---

## 3. Flowchart Penjualan

```mermaid
flowchart TD
    A([Mulai]) --> B[Pilih Customer]
    B --> C[Pilih Produk]
    C --> D[Input Qty & Harga]
    D --> E[Hitung Subtotal]
    E --> F[Hitung Pajak]
    F --> G[Hitung Grand Total]
    G --> H[Simpan Sales Invoice]

    H --> I{Posting?}

    I -- Tidak --> J[Status Draft]
    J --> Z([Selesai])

    I -- Ya --> K[Post Sales Invoice]

    K --> L[Update Stock]
    L --> M[Hitung HPP]
    M --> N[Update Piutang]

    N --> O[Buat Journal]
    O --> P[Debit Piutang / Kas]
    P --> Q[Credit Penjualan]
    Q --> R[Debit HPP]
    R --> S[Credit Persediaan]

    S --> T{Pembayaran langsung?}

    T -- Ya --> U[Create Receipt]
    U --> V[Update Paid Total]
    V --> W[Status Paid]

    T -- Tidak --> X[Status Unpaid]

    X --> Z
    W --> Z
```

### Tabel yang terlibat

- `customers`
- `sales_invoices`
- `sales_invoice_lines`
- `products`
- `stock_movements`
- `receipts`
- `cash_bank_accounts`
- `journals`
- `journal_lines`
- `chart_of_accounts`
- `taxes`

---

## 4. Flowchart Pembelian

```mermaid
flowchart TD
    A([Mulai]) --> B[Pilih Supplier]
    B --> C[Pilih Produk]
    C --> D[Input Qty & Harga]
    D --> E[Hitung Subtotal]
    E --> F[Hitung Pajak]
    F --> G[Hitung Grand Total]
    G --> H[Simpan Purchase Invoice]

    H --> I{Posting?}

    I -- Tidak --> J[Status Draft]
    J --> Z([Selesai])

    I -- Ya --> K[Post Purchase Invoice]

    K --> L[Update Stock]
    L --> M[Update Average Cost]
    M --> N[Update Hutang]

    N --> O[Buat Journal]
    O --> P[Debit Persediaan]
    P --> Q[Credit Hutang]

    Q --> R{Pembayaran?}

    R -- Ya --> S[Create Purchase Payment]
    S --> T[Update Paid Total]
    T --> U[Buat Journal Pembayaran]
    U --> V[Debit Hutang]
    V --> W[Credit Kas / Bank]

    R -- Tidak --> X[Status Unpaid]

    W --> Z([Selesai])
    X --> Z
```

### Tabel yang terlibat

- `suppliers`
- `purchase_invoices`
- `purchase_invoice_lines`
- `products`
- `stock_movements`
- `purchase_payments`
- `cash_bank_accounts`
- `journals`
- `journal_lines`
- `chart_of_accounts`
- `taxes`

---

## 5. Flowchart Stok

Sistem menggunakan metode **Average Cost** untuk menghitung HPP.

```mermaid
flowchart TD
    A([Transaksi Stok]) --> B{Jenis Movement}

    B -->|Purchase| C[Stock In]
    B -->|Sales| D[Stock Out]
    B -->|Adjustment| E[Adjustment]

    C --> F[Tambah Stock Qty]
    F --> G[Hitung Average Cost]
    G --> H[Update Product]

    D --> I[Kurangi Stock Qty]
    I --> J[Ambil Avg Cost]
    J --> K[Hitung HPP]
    K --> H

    E --> L[Sesuaikan Stock Qty]
    L --> H

    H --> M[(Products)]
    H --> N[(Stock Movements)]

    K --> O[Buat Jurnal HPP]
```

### Tabel yang terlibat

- `products`
- `stock_movements`
- `sales_invoice_lines`
- `purchase_invoice_lines`
- `journals`
- `journal_lines`

---

## 6. Flowchart Aset Tetap

```mermaid
flowchart TD
    A([Mulai]) --> B[Input Fixed Asset]
    B --> C[Input Purchase Cost]
    C --> D[Input Useful Life]
    D --> E[Input Salvage Value]

    E --> F[Simpan Fixed Asset]
    F --> G[Hitung Penyusutan Bulanan]

    G --> H{Sudah ada penyusutan periode ini?}

    H -- Ya --> I[Skip]
    I --> Z([Selesai])

    H -- Tidak --> J[Create Asset Depreciation]
    J --> K[Buat Journal]
    K --> L[Debit Beban Penyusutan]
    L --> M[Credit Akumulasi Penyusutan]
    M --> Z
```

### Rumus penyusutan

```text
Penyusutan per bulan =
(Purchase Cost - Salvage Value)
÷ Useful Life dalam bulan
```

### Tabel yang terlibat

- `fixed_assets`
- `asset_depreciations`
- `journals`
- `journal_lines`
- `chart_of_accounts`

---

## 7. Flowchart Akuntansi / Double-Entry

Ini merupakan inti dari sistem.

```mermaid
flowchart TD
    A[Transaksi Bisnis] --> B{Sumber Transaksi}

    B --> C[Penjualan]
    B --> D[Pembelian]
    B --> E[Penerimaan]
    B --> F[Pembayaran]
    B --> G[Stok]
    B --> H[Penyusutan]
    B --> I[Jurnal Manual]

    C --> J[Generate Journal]
    D --> J
    E --> J
    F --> J
    G --> J
    H --> J
    I --> J

    J --> K[Journal Header]
    K --> L[Journal Lines]

    L --> M{Debit = Credit?}

    M -- Tidak --> N[Validation Error]
    N --> L

    M -- Ya --> O[Post Journal]

    O --> P[(Journals)]
    O --> Q[(Journal Lines)]

    P --> R[Laporan]
    Q --> R

    R --> S[Neraca]
    R --> T[Laba Rugi]
    R --> U[Arus Kas]
    R --> V[General Ledger]
```

---

## 8. Flowchart Penerimaan Piutang

```mermaid
flowchart TD
    A([Mulai]) --> B[Pilih Sales Invoice]
    B --> C[Input Amount]
    C --> D[Pilih Payment Method]
    D --> E[Pilih Cash / Bank Account]

    E --> F[Simpan Receipt]
    F --> G[Update Paid Total]

    G --> H{Paid Total >= Grand Total?}

    H -- Ya --> I[Status Paid]
    H -- Tidak --> J[Status Partial]

    I --> K[Buat Journal]
    J --> K

    K --> L[Debit Kas / Bank]
    L --> M[Credit Piutang]
    M --> N[(Journals + Journal Lines)]

    N --> Z([Selesai])
```

---

## 9. Flowchart Pembayaran Hutang

```mermaid
flowchart TD
    A([Mulai]) --> B[Pilih Purchase Invoice]
    B --> C[Input Amount]
    C --> D[Pilih Payment Method]
    D --> E[Pilih Cash / Bank Account]

    E --> F[Simpan Purchase Payment]
    F --> G[Update Paid Total]

    G --> H{Paid Total >= Grand Total?}

    H -- Ya --> I[Status Paid]
    H -- Tidak --> J[Status Partial]

    I --> K[Buat Journal]
    J --> K

    K --> L[Debit Hutang]
    L --> M[Credit Kas / Bank]
    M --> N[(Journals + Journal Lines)]

    N --> Z([Selesai])
```

---

## 10. Flowchart Jurnal Manual

```mermaid
flowchart TD
    A([Mulai]) --> B[Pilih Chart of Accounts]
    B --> C[Create Journal]
    C --> D[Input Journal Lines]

    D --> E[Input Debit / Credit]
    E --> F{Debit = Credit?}

    F -- Tidak --> G[Validation Error]
    G --> D

    F -- Ya --> H[Simpan Journal sebagai Draft]
    H --> I{Post Journal?}

    I -- Tidak --> J[Tetap Draft]
    I -- Ya --> K[Post Journal]

    K --> L[Status Posted]
    L --> M[(Journals + Journal Lines)]

    J --> Z([Selesai])
    M --> Z
```

---

## 11. Flowchart Laporan

```mermaid
flowchart TD
    A([User Membuka Laporan]) --> B[Pilih Periode]
    B --> C[Ambil Journals]
    C --> D[Ambil Journal Lines]
    D --> E[Filter berdasarkan COA dan Periode]

    E --> F{Jenis Laporan}

    F --> G[Neraca]
    F --> H[Laba Rugi]
    F --> I[Arus Kas]
    F --> J[General Ledger]
    F --> K[Laporan Piutang]
    F --> L[Laporan Hutang]
    F --> M[Laporan Persediaan]

    G --> N[Tampilkan Laporan]
    H --> N
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N

    N --> Z([Selesai])
```

---

# Arsitektur Utama Sistem

```text
                         ┌───────────────┐
                         │     USER      │
                         └───────┬───────┘
                                 │
                         ┌───────▼───────┐
                         │   DASHBOARD   │
                         └───────┬───────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │          │           │          │            │
          ▼          ▼           ▼          ▼            ▼
     Penjualan   Pembelian   Kas/Bank     Stok       Aset Tetap
          │          │           │          │            │
          └──────────┴───────────┴──────────┴────────────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │    POSTING    │
                         └───────┬───────┘
                                 │
                  ┌──────────────▼──────────────┐
                  │          JOURNALS            │
                  │              +               │
                  │        JOURNAL_LINES         │
                  └──────────────┬──────────────┘
                                 │
                         ┌───────▼───────┐
                         │    LAPORAN    │
                         └───────┬───────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ▼                   ▼                   ▼
          Neraca             Laba Rugi           Arus Kas
```

---

# Modul dan Tabel Utama

| Modul | Tabel Utama |
|---|---|
| User | `users` |
| Profil Bisnis | `business_profiles` |
| Akun | `chart_of_accounts` |
| Pajak | `taxes` |
| Jurnal | `journals`, `journal_lines` |
| Kas / Bank | `cash_bank_accounts` |
| Produk | `products` |
| Stok | `stock_movements` |
| Customer | `customers` |
| Penjualan | `sales_invoices`, `sales_invoice_lines` |
| Penerimaan | `receipts` |
| Supplier | `suppliers` |
| Pembelian | `purchase_invoices`, `purchase_invoice_lines` |
| Pembayaran | `purchase_payments` |
| Aset | `fixed_assets` |
| Penyusutan | `asset_depreciations` |

---

# Alur Data Utama

## Penjualan

```text
Customer
   ↓
Sales Invoice
   ↓
Sales Invoice Lines
   ↓
Post
   ├──→ Stock Movement (OUT)
   ├──→ Hitung HPP
   ├──→ Update Piutang
   └──→ Journal
            ├── Debit Piutang / Kas
            ├── Credit Penjualan
            ├── Debit HPP
            └── Credit Persediaan
```

## Pembelian

```text
Supplier
   ↓
Purchase Invoice
   ↓
Purchase Invoice Lines
   ↓
Post
   ├──→ Stock Movement (IN)
   ├──→ Update Average Cost
   ├──→ Update Hutang
   └──→ Journal
            ├── Debit Persediaan
            └── Credit Hutang
```

## Pembayaran / Penerimaan

```text
Receipt / Purchase Payment
          ↓
    Update Paid Total
          ↓
       Journal
          ↓
   Kas / Bank berubah
```

## Penyusutan

```text
Fixed Asset
     ↓
Hitung Depresiasi
     ↓
Asset Depreciation
     ↓
Journal
     ├── Debit Beban Penyusutan
     └── Credit Akumulasi Penyusutan
```

---

# Prinsip Utama Sistem

1. **Semua transaksi keuangan harus menghasilkan jurnal.**
2. Setiap jurnal harus memiliki minimal satu debit dan satu credit.
3. Total debit harus sama dengan total credit sebelum jurnal dapat diposting.
4. `journals` menyimpan informasi header jurnal.
5. `journal_lines` menyimpan detail akun debit dan credit.
6. Modul penjualan, pembelian, kas/bank, stok, dan aset terintegrasi dengan jurnal.
7. Laporan akuntansi mengambil data dari jurnal yang sudah berstatus `posted`.
8. Stok menggunakan metode **average cost**.
9. Invoice dapat memiliki status `draft`, `unpaid`, `partial`, `paid`, atau `void`.
10. Jurnal dapat memiliki status `draft`, `posted`, atau `void`.

---

# Ringkasan Arsitektur

```text
                    BUSINESS TRANSACTION
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
       Penjualan         Pembelian        Kas/Bank
          │                 │                 │
          ├─────────────────┼─────────────────┤
          │                 │                 │
          ▼                 ▼                 ▼
        Stok             Hutang             Kas
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                            ▼
                       ACCOUNTING
                            │
                            ▼
                    ┌───────────────┐
                    │    JOURNAL    │
                    │      +        │
                    │ JOURNAL LINES │
                    └───────┬───────┘
                            │
                            ▼
                         REPORTS
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
           Neraca       Laba Rugi       Arus Kas
```

**Kesimpulan:** `journals` dan `journal_lines` merupakan **central accounting engine** dari sistem. Modul lain menghasilkan transaksi, sedangkan jurnal menjadi sumber pencatatan double-entry dan laporan akuntansi.
