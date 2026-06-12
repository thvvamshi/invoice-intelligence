# AI-Powered Invoice Data Extraction System

An intelligent document processing application that automatically extracts structured business data from invoices, receipts, and financial documents using OCR and Google Gemini AI.

The system transforms unstructured PDF and image-based invoices into normalized business entities including invoices, products, and customers, enabling efficient document digitization and data management.

---

# Overview

Organizations process large volumes of invoices and business documents daily. Manual data entry is time-consuming, error-prone, and difficult to scale.

This application automates the extraction process by leveraging OCR and Large Language Models (LLMs) to identify and structure key business information from uploaded documents.

The extracted data is normalized, validated, deduplicated, and presented in an organized format for further processing and analysis.

---

# Features

## Document Upload

* Upload PDF invoices
* Upload image-based invoices
* Support for multiple file uploads
* Multi-page document processing

## AI-Powered Extraction

* OCR-based text extraction
* Google Gemini 2.5 Flash integration
* Structured JSON generation
* Intelligent field recognition
* Entity relationship mapping

## Invoice Processing

Extracts:

* Invoice Number
* Invoice Date
* Customer Reference
* Total Amount
* Tax Amount
* Invoice Items

## Product Processing

Extracts:

* Product ID
* Product Name
* Quantity
* Unit Price
* Tax Percentage

## Customer Processing

Extracts:

* Customer ID
* Customer Name
* GSTIN
* Phone Number

## Data Management

* Multi-document merging
* Duplicate record prevention
* Normalized data structure
* Redux-based state management

## Error Handling

* Invalid file validation
* Gemini API retry mechanism
* Graceful failure handling
* User-friendly error messages

---

# System Architecture

```text
┌───────────────────┐
│ Document Upload   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ File Processing   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ OCR Extraction    │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Google Gemini AI  │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Structured JSON   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Data Validation   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Deduplication     │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Redux Store       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ UI Data Tables    │
└───────────────────┘
```

---

# Technology Stack

## Frontend

* React
* Vite
* Redux Toolkit
* Tailwind CSS

## AI & OCR

* Google Gemini 2.5 Flash
* OCR-based document parsing

## State Management

* Redux Toolkit

## Development Tools

* ESLint
* Prettier
* Git

---

# Project Structure

```bash
src
├── components
│   ├── layout
│   ├── tables
│   └── uploader
│
├── hooks
│   └── useFileUpload.js
│
├── layouts
│   └── MainLayout.jsx
│
├── pages
│   └── Dashboard.jsx
│
├── redux
│   ├── invoiceSlice.js
│   ├── productSlice.js
│   ├── customerSlice.js
│   └── store.js
│
├── services
│   ├── aiExtraction.service.js
│   ├── fileExtraction.service.js
│   ├── gemini.service.js
│   ├── pdfExtraction.service.js
│   ├── imageExtraction.service.js
│   └── excelExtraction.service.js
│
├── utils
│   ├── deduplicate.js
│   └── normalizeData.js
│
└── lib
    └── gemini.js
```

---

# Data Extraction Workflow

## Step 1: Upload Documents

Users upload one or more PDF or image-based invoices through the dashboard interface.

## Step 2: File Processing

The application identifies the file type and extracts raw document content.

Supported formats:

* PDF
* JPG
* JPEG
* PNG

## Step 3: OCR Extraction

Text content is extracted from the uploaded document.

## Step 4: AI Processing

Extracted content is sent to Google Gemini AI with a structured extraction prompt.

The AI identifies:

* Invoice information
* Product information
* Customer information

## Step 5: Data Normalization

All extracted information is converted into a standardized JSON schema.

## Step 6: Deduplication

Duplicate invoices, products, and customers are removed.

## Step 7: State Management

Processed records are stored in Redux for centralized application state management.

## Step 8: Visualization

Structured data is displayed in dedicated Invoice, Product, and Customer tables.

---

# AI Output Structure

The extraction engine returns data in a standardized JSON format.

## Example Output

```json
{
  "invoices": [
    {
      "id": "INV-1001",
      "customer_id": "ABC Pvt Ltd",
      "invoice_date": "2024-11-12",
      "total_amount": 10000,
      "tax_amount": 1800,
      "items": [
        {
          "product_id": "IPHONE16",
          "quantity": 1,
          "line_amount": 79990
        }
      ]
    }
  ],
  "products": [
    {
      "id": "IPHONE16",
      "name": "iPhone 16",
      "quantity": 1,
      "unit_price": 79990,
      "tax_percentage": 18
    }
  ],
  "customers": [
    {
      "id": "29ABCDE1234F1Z5",
      "name": "ABC Pvt Ltd",
      "phone": "9876543210",
      "gstin": "29ABCDE1234F1Z5"
    }
  ]
}
```

---

# Entity Relationships

## Invoice → Customer

```json
{
  "id": "INV-1001",
  "customer_id": "ABC Pvt Ltd"
}
```

The `customer_id` field links an invoice to a customer record.

---

## Invoice Item → Product

```json
{
  "product_id": "IPHONE16",
  "quantity": 1,
  "line_amount": 79990
}
```

The `product_id` field links invoice items to product records.

---

# Data Schema

## Invoice

```json
{
  "id": "INV-1001",
  "customer_id": "ABC Pvt Ltd",
  "invoice_date": "2024-11-12",
  "total_amount": 10000,
  "tax_amount": 1800
}
```

## Product

```json
{
  "id": "IPHONE16",
  "name": "iPhone 16",
  "quantity": 1,
  "unit_price": 79990,
  "tax_percentage": 18
}
```

## Customer

```json
{
  "id": "29ABCDE1234F1Z5",
  "name": "ABC Pvt Ltd",
  "phone": "9876543210",
  "gstin": "29ABCDE1234F1Z5"
}
```

---

# Deduplication Strategy

The system prevents duplicate records during multi-file processing.

## Invoice Deduplication

```text
Invoice ID
```

## Product Deduplication

```text
Product ID
```

Fallback:

```text
Product Name
```

## Customer Deduplication

Priority:

```text
GSTIN
↓
Phone Number
↓
Customer Name
```

---

# Error Handling

The application includes robust error handling mechanisms.

## Supported Cases

* Invalid file uploads
* Unsupported file formats
* OCR failures
* Gemini API failures
* API rate limits
* Temporary service outages

## Retry Strategy

Automatic retries are performed for:

* 429 Rate Limit
* 503 Service Unavailable
* Resource Exhausted errors

---

# Test Cases Covered

## TC-1: Single Invoice Extraction

### Objective

Validate extraction from a single invoice document.

### Result

* Invoice extraction successful
* Product extraction successful
* Customer extraction successful

Status: ✅ Passed

---

## TC-2: Multi-File Processing

### Objective

Validate extraction from multiple uploaded documents.

### Result

* Multi-file processing successful
* Result merging successful
* Deduplication successful

Status: ✅ Passed

---

## TC-3: Multi-Invoice Document

### Objective

Validate extraction from a document containing multiple invoices.

### Result

* Multiple invoices extracted
* Customer mapping successful
* Product mapping successful
* Relationship mapping successful

Status: ✅ Passed

---

# Setup Instructions

## Clone Repository

```bash
git clone <repository-url>
cd ai-invoice-extraction-system
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
VITE_GEMINI_API_KEY=your_api_key
```

## Start Development Server

```bash
npm run dev
```

---

# Future Enhancements

* Database integration
* Authentication and authorization
* Export to CSV and Excel
* Search and filtering
* Analytics dashboard
* Cloud storage integration
* Batch processing pipeline
* Invoice approval workflows

---

# Author

**Boda Vamshi Kumar**

AI-powered document intelligence application for automated invoice processing, structured data extraction, and business record management.
