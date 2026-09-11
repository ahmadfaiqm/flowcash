# Flowchart Sistem Akuntansi UMKM

Dokumen flowchart berdasarkan DBML `akuntansi_umkm`.

## 1. Flowchart Utama

```mermaid
flowchart TD
    A([Start]) --> B[Login]
    B --> C[Input Email & Password]
    C --> D{User Terdaftar?}
    D -->|Tidak| E[Register User]
    E --> F[Create User]
    F --> G[Register Business]
    G --> H[Create Business Profile]
    H --> I[Create Business Member - Owner]
    I --> J[Generate Default COA]
    J --> K[Dashboard]
    D -->|Ya| L[Validasi Password]
    L --> M{Password Benar?}
    M -->|Tidak| N[Error]
    N --> B
    M -->|Ya| O[Cek Business Membership]
    O --> P{Punya Business?}
    P -->|Tidak| G
    P -->|Ya| Q[Ambil Business + Role]
    Q --> K
    K --> R{Pilih Modul}
    R -->|Penjualan| S[Sales & Receivable]
    R -->|Pembelian| T[Purchase & Payable]
    R -->|Stok| U[Inventory]
    R -->|Kas & Bank| V[Cash & Bank]
    R -->|Akuntansi| W[Accounting]
    R -->|Aset| X[Fixed Assets]
    R -->|Laporan| Y[Reports]
    S --> K
    T --> K
    U --> K
    V --> K
    W --> K
    X --> K
    Y --> K
```

## 2. Authentication & Business Onboarding

```mermaid
flowchart TD
    A([Start]) --> B[Login]
    B --> C[Email + Password]
    C --> D{Email Terdaftar?}
    D -->|Tidak| E[Register User]
    E --> F[Create User]
    F --> G[Register Business]
    D -->|Ya| H[Validate Password]
    H --> I{Password Valid?}
    I -->|Tidak| J[Login Error]
    J --> B
    I -->|Ya| K[Find Business Membership]
    K --> L{Membership Exists?}
    L -->|Tidak| G
    L -->|Ya| M[Get Business + Role]
    M --> N[Dashboard]
    G --> O[Input Business Data]
    O --> P[Create Business Profile]
    P --> Q[Create Business Member]
    Q --> R[Role = Owner]
    R --> S[Generate Default COA]
    S --> T[Initial Business Setup]
    T --> N
```

## 3. Penjualan

```mermaid
flowchart TD
    A([Start]) --> B[Pilih Penjualan]
    B --> C[Pilih / Input Customer]
    C --> D[Pilih Product]
    D --> E[Input Quantity]
    E --> F[Ambil Selling Price]
    F --> G[Hitung Subtotal]
    G --> H[Hitung Discount]
    H --> I[Hitung Tax]
    I --> J[Hitung Total]
    J --> K{Stock Cukup?}
    K -->|Tidak| L[Stock Tidak Cukup]
    L --> D
    K -->|Ya| M[Create Sales Invoice]
    M --> N[Create Invoice Lines]
    N --> O[Kurangi Stock]
    O --> P[Create Stock Movement]
    P --> Q{Pembayaran?}
    Q -->|Belum| R[Invoice Posted]
    Q -->|Sudah| S[Create Receipt]
    S --> T[Update Paid Amount]
    T --> U[Update Invoice Status]
    R --> V[Create Journal]
    U --> V
    V --> W[Debit Cash / Bank / AR]
    W --> X[Credit Sales Revenue]
    X --> Y[Record COGS]
    Y --> Z[Update Inventory]
    Z --> AA([Selesai])
```

## 4. Pembelian

```mermaid
flowchart TD
    A([Start]) --> B[Pilih Pembelian]
    B --> C[Pilih / Input Supplier]
    C --> D[Pilih Product]
    D --> E[Input Quantity]
    E --> F[Input Purchase Price]
    F --> G[Hitung Subtotal]
    G --> H[Hitung Discount]
    H --> I[Hitung Tax]
    I --> J[Hitung Total]
    J --> K[Create Purchase Invoice]
    K --> L[Create Invoice Lines]
    L --> M[Tambah Stock]
    M --> N[Create Stock Movement]
    N --> O{Pembayaran?}
    O -->|Belum| P[Invoice Posted]
    O -->|Sudah| Q[Create Purchase Payment]
    Q --> R[Update Paid Amount]
    R --> S[Update Invoice Status]
    P --> T[Create Journal]
    S --> T
    T --> U[Debit Inventory / Expense]
    U --> V[Credit Cash / Bank / AP]
    V --> W([Selesai])
```

## 5. Inventory / Stock

```mermaid
flowchart TD
    A([Stock Module]) --> B{Jenis Movement?}
    B -->|Purchase| C[Stock In]
    B -->|Sales| D[Stock Out]
    B -->|Adjustment| E[Stock Adjustment]
    C --> F[Tambah Quantity]
    D --> G[Kurangi Quantity]
    E --> H[Sesuaikan Quantity]
    F --> I[Create Stock Movement]
    G --> I
    H --> I
    I --> J[Update Product Stock]
    J --> K{Stock <= Minimum Stock?}
    K -->|Ya| L[Stock Alert]
    K -->|Tidak| M[Stock Normal]
    L --> N([Selesai])
    M --> N
```

## 6. Kas & Bank

```mermaid
flowchart TD
    A([Kas & Bank]) --> B{Jenis Transaksi?}
    B -->|Pemasukan| C[Cash In]
    B -->|Pengeluaran| D[Cash Out]
    B -->|Transfer| E[Transfer Antar Akun]
    C --> F[Input Amount]
    D --> G[Input Amount]
    E --> H[Pilih Source Account]
    H --> I[Pilih Destination Account]
    I --> J[Input Amount]
    F --> K[Create Journal]
    G --> K
    J --> K
    K --> L[Update Cash / Bank Balance]
    L --> M[Create Journal Lines]
    M --> N([Selesai])
```

## 7. Accounting / Jurnal

```mermaid
flowchart TD
    A([Accounting]) --> B{Sumber Transaksi?}
    B -->|Penjualan| C[Sales Journal]
    B -->|Pembelian| D[Purchase Journal]
    B -->|Penerimaan| E[Receipt Journal]
    B -->|Pembayaran| F[Payment Journal]
    B -->|Penyusutan| G[Depreciation Journal]
    B -->|Manual| H[Manual Journal]
    C --> I[Create Journal]
    D --> I
    E --> I
    F --> I
    G --> I
    H --> I
    I --> J[Create Journal Lines]
    J --> K{Debit = Credit?}
    K -->|Tidak| L[Journal Error]
    L --> M[Edit Journal]
    M --> J
    K -->|Ya| N[Post Journal]
    N --> O([Selesai])
```

## 8. Piutang / Receivable

```mermaid
flowchart TD
    A([Sales Invoice]) --> B{Payment Received?}
    B -->|Tidak| C[Outstanding Receivable]
    B -->|Ya| D[Create Receipt]
    D --> E[Input Payment Amount]
    E --> F[Select Payment Method]
    F --> G[Select Cash / Bank Account]
    G --> H[Update Paid Amount]
    H --> I{Fully Paid?}
    I -->|Tidak| J[Partially Paid]
    I -->|Ya| K[Paid]
    C --> L([Monitoring AR])
    J --> L
    K --> L
```

## 9. Hutang / Payable

```mermaid
flowchart TD
    A([Purchase Invoice]) --> B{Payment Made?}
    B -->|Tidak| C[Outstanding Payable]
    B -->|Ya| D[Create Purchase Payment]
    D --> E[Input Payment Amount]
    E --> F[Select Payment Method]
    F --> G[Select Cash / Bank Account]
    G --> H[Update Paid Amount]
    H --> I{Fully Paid?}
    I -->|Tidak| J[Partially Paid]
    I -->|Ya| K[Paid]
    C --> L([Monitoring AP])
    J --> L
    K --> L
```

## 10. Fixed Asset & Depreciation

```mermaid
flowchart TD
    A([Fixed Asset]) --> B[Input Asset]
    B --> C[Asset Name]
    C --> D[Acquisition Cost]
    D --> E[Acquisition Date]
    E --> F[Useful Life]
    F --> G[Residual Value]
    G --> H[Create Fixed Asset]
    H --> I[Calculate Monthly Depreciation]
    I --> J[Period End]
    J --> K[Create Asset Depreciation]
    K --> L[Update Accumulated Depreciation]
    L --> M[Update Book Value]
    M --> N[Create Depreciation Journal]
    N --> O[Debit Depreciation Expense]
    O --> P[Credit Accumulated Depreciation]
    P --> Q([Selesai])
```

Rumus penyusutan garis lurus:

```text
Depreciation = (Acquisition Cost - Residual Value) / Useful Life
```

## 11. Chart of Accounts

```mermaid
flowchart TD
    A([Chart of Accounts]) --> B[Create Account]
    B --> C[Input Code]
    C --> D[Input Name]
    D --> E[Select Account Type]
    E --> F{Parent Account?}
    F -->|Ya| G[Select Parent Account]
    F -->|Tidak| H[Root Account]
    G --> I[Save Account]
    H --> I
    I --> J[Account Active]
    J --> K([Selesai])
```

## 12. Tax

```mermaid
flowchart TD
    A([Tax Management]) --> B[Create Tax]
    B --> C[Input Tax Code]
    C --> D[Input Tax Name]
    D --> E[Input Tax Rate]
    E --> F[Set Active]
    F --> G[Save Tax]
    G --> H([Selesai])
```

## 13. Dashboard

```mermaid
flowchart TD
    A([Dashboard]) --> B[Select Period]
    B --> C[Load Business Data]
    C --> D[Calculate Omzet]
    C --> E[Calculate Revenue]
    C --> F[Calculate Expense]
    C --> G[Calculate Profit / Loss]
    C --> H[Calculate Cash & Bank]
    C --> I[Calculate Receivable]
    C --> J[Calculate Payable]
    C --> K[Calculate Stock]
    D --> L[Display Dashboard]
    E --> L
    F --> L
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    L --> M([Selesai])
```

## 14. Reports

```mermaid
flowchart TD
    A([Reports]) --> B{Pilih Laporan}
    B -->|Laba Rugi| C[Profit & Loss]
    B -->|Neraca| D[Balance Sheet]
    B -->|Arus Kas| E[Cash Flow]
    B -->|Penjualan| F[Sales Report]
    B -->|Pembelian| G[Purchase Report]
    B -->|Stok| H[Inventory Report]
    B -->|Piutang| I[AR Report]
    B -->|Hutang| J[AP Report]
    B -->|Aset| K[Fixed Asset Report]
    C --> L[Filter Period]
    D --> L
    E --> L
    F --> L
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    L --> M[Query Business Data]
    M --> N[Generate Report]
    N --> O([Selesai])
```

## 15. Relasi Besar Antar Modul

```mermaid
flowchart LR
    A[Users] --> B[Business Profiles]
    B --> C[Business Members]
    B --> D[Chart of Accounts]
    B --> E[Taxes]
    B --> F[Products]
    B --> G[Customers]
    B --> H[Suppliers]
    B --> I[Cash & Bank Accounts]
    G --> J[Sales Invoices]
    F --> J
    J --> K[Receipts]
    J --> L[Stock Movements]
    J --> M[Journals]
    H --> N[Purchase Invoices]
    F --> N
    N --> O[Purchase Payments]
    N --> L
    N --> M
    I --> K
    I --> O
    M --> P[Journal Lines]
    D --> P
    B --> Q[Fixed Assets]
    Q --> R[Asset Depreciations]
    R --> M
    J --> S[Reports]
    N --> S
    L --> S
    K --> S
    O --> S
    M --> S
    Q --> S
```

## 16. Multi-Tenant / Business Isolation

```mermaid
flowchart TD
    A[Authenticated User] --> B[Get Active Business]
    B --> C[Get business_id]
    C --> D[Business-scoped Query]
    D --> E[Products]
    D --> F[Customers]
    D --> G[Suppliers]
    D --> H[Sales]
    D --> I[Purchases]
    D --> J[Stock]
    D --> K[Cash & Bank]
    D --> L[Accounting]
    D --> M[Assets]
    E --> N[Response]
    F --> N
    G --> N
    H --> N
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N
```

Aturan utama:

```text
User
  ↓
Business Membership
  ↓
business_id
  ↓
Business-scoped Query
  ↓
Business Data
```

## 17. Gambaran Arsitektur Keseluruhan

```mermaid
flowchart TB
    A[User] --> B[Authentication]
    B --> C[Business & Role]
    C --> D[Dashboard]
    D --> E[Sales]
    D --> F[Purchase]
    D --> G[Inventory]
    D --> H[Cash & Bank]
    D --> I[Accounting]
    D --> J[Fixed Asset]
    D --> K[Reports]
    E --> L[Customers]
    E --> M[Sales Invoice]
    E --> N[Receipts]
    F --> O[Suppliers]
    F --> P[Purchase Invoice]
    F --> Q[Purchase Payments]
    M --> G
    P --> G
    M --> I
    N --> I
    P --> I
    Q --> I
    H --> I
    J --> I
    I --> R[Journal]
    R --> S[Journal Lines]
    S --> T[Chart of Accounts]
    G --> U[Stock Movements]
    U --> V[Products]
    I --> K
    G --> K
    E --> K
    F --> K
    H --> K
    J --> K
```

## 18. Core Business Flow

```text
REGISTER / LOGIN
       ↓
BUSINESS
       ↓
DASHBOARD
       ↓
┌──────────────┬──────────────┬──────────────┐
│   PENJUALAN  │   PEMBELIAN  │     STOK     │
└──────┬───────┴──────┬───────┴──────┬───────┘
       ↓              ↓              ↓
   RECEIPT         PAYMENT       MOVEMENT
       │              │              │
       └──────────────┼──────────────┘
                      ↓
                  ACCOUNTING
                      ↓
              JOURNAL & LINES
                      ↓
                   REPORTS
                      ↓
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
     LABA RUGI      NERACA       ARUS KAS
```

## 19. Ringkasan Modul

| Modul | Tabel |
|---|---|
| Authentication | `users` |
| Business | `business_profiles`, `business_members` |
| COA | `chart_of_accounts` |
| Tax | `taxes` |
| Accounting | `journals`, `journal_lines` |
| Cash & Bank | `cash_bank_accounts` |
| Product | `products` |
| Inventory | `stock_movements` |
| Customer | `customers` |
| Sales | `sales_invoices`, `sales_invoice_lines` |
| Receivable | `receipts` |
| Supplier | `suppliers` |
| Purchase | `purchase_invoices`, `purchase_invoice_lines` |
| Payable | `purchase_payments` |
| Fixed Asset | `fixed_assets`, `asset_depreciations` |
| Reports | Data dari seluruh modul |
