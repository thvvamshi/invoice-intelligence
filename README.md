# AI-Powered Invoice Data Extraction System

An intelligent document processing application that automatically extracts structured business data from invoices, receipts, PDFs, images, and spreadsheets using OCR and Google Gemini AI.

The system transforms unstructured business documents into normalized Invoice, Product, and Customer entities for validation, analytics, and business reporting.

---

# Live Demo

Frontend:[ live ](https://invoice-intelligence-lui2.onrender.com)

GitHub Repository: https://github.com/your-username/invoice-intelligence

---

# Overview

Organizations process large volumes of invoices and business documents daily. Manual data entry is time-consuming, error-prone, and difficult to scale.

This application automates extraction using OCR and Google Gemini AI, converting raw business documents into structured data that can be searched, validated, edited, analyzed, and exported.

---

# Features

## Document Processing

* PDF Upload Support
* Image Upload Support
* Excel Upload Support
* Multiple File Upload
* Mixed File Upload Processing
* Multi-Page Document Processing

## AI Extraction

* OCR-Based Text Extraction
* Google Gemini 2.5 Flash Integration
* Structured JSON Generation
* Entity Recognition
* Customer Extraction
* Product Extraction
* Invoice Extraction

## Invoice Management

* Search Invoices
* Sort Invoices
* Edit Missing Fields
* CSV Export
* Missing Field Highlighting

## Product Management

* Search Products
* Sort Products
* Inline Editing
* Price With Tax Calculation
* CSV Export

## Customer Management

* Search Customers
* Sort Customers
* Inline Editing
* Total Purchase Amount Calculation
* CSV Export

## Analytics Dashboard

* Total Revenue
* Total Tax Collected
* Average Invoice Value
* Total Invoices
* Total Products
* Total Customers
* Top Customer
* Top Product
* Recent Activity Summary
* Validation Summary

## Data Validation

* Missing Field Detection
* Missing Field Highlighting
* User Corrections
* Redux State Synchronization

## Data Management

* Multi-Document Merging
* Deduplication
* Normalized Data Models
* Redux Toolkit State Management

## Error Handling

* Invalid File Validation
* Unsupported File Detection
* Gemini API Retry Logic
* Graceful Failure Handling
* User-Friendly Error Messages

---

# Technology Stack

## Frontend

* React
* Vite
* Redux Toolkit
* Tailwind CSS

## AI & OCR

* Google Gemini 2.5 Flash

## State Management

* Redux Toolkit

## Development Tools

* ESLint
* Prettier
* Git

---

# System Architecture

Document Upload
↓
File Processing
↓
OCR Extraction
↓
Google Gemini AI
↓
Structured JSON
↓
Validation
↓
Deduplication
↓
Redux Store
↓
Analytics + Tables

---

# Data Extraction Workflow

### Step 1

Upload PDF, Image, or Excel documents.

### Step 2

Raw content extraction.

### Step 3

OCR processing.

### Step 4

Google Gemini AI extraction.

### Step 5

JSON normalization.

### Step 6

Deduplication.

### Step 7

Redux state management.

### Step 8

Visualization and analytics.

---

# AI Output Structure

```json
{
  "invoices": [],
  "products": [],
  "customers": []
}
```

---

# Entity Relationships

## Invoice → Customer

```json
{
  "customer_id": "ABC Pvt Ltd"
}
```

## Invoice Item → Product

```json
{
  "product_id": "IPHONE16"
}
```

---

# Deduplication Strategy

## Invoice

Priority:

* Invoice ID

## Product

Priority:

* Product ID

Fallback:

* Product Name

## Customer

Priority:

* GSTIN
* Phone Number
* Customer Name

---

# Validation Features

The system automatically detects:

* Missing Customer Name
* Missing Phone Number
* Missing GSTIN
* Missing Product Name
* Missing Invoice Date

Users can edit records directly from the UI.

---

# Test Cases Covered

## Case-1: Invoice PDFs

Objective:
Process PDF invoices and extract structured business entities.

Result:

* Invoice Extraction Successful
* Product Extraction Successful
* Customer Extraction Successful

Status: ✅ Passed

---

## Case-2: Invoice PDFs + Images

Objective:
Process PDF and Image documents together.

Result:

* Multi-Format Processing Successful
* Data Merging Successful

Status: ✅ Passed

---

## Case-3: Single Excel File

Objective:
Extract records from Excel documents.

Result:

* Structured Data Extracted Successfully

Status: ✅ Passed

---

## Case-4: Multiple Excel Files

Objective:
Merge data from multiple Excel files.

Result:

* Multi-File Processing Successful
* Deduplication Successful

Status: ✅ Passed

---

## Case-5: Mixed File Types

Objective:
Process PDFs, Images, and Excel files together.

Result:

* Unified Extraction Pipeline Successful
* Validation Successful
* Analytics Generated Successfully

Status: ✅ Passed

---

# Screenshots & Evidence

All screenshots and testing evidence are included in:

```text
screenshots.zip
```

The screenshot archive contains:

* Case-1 Results
* Case-2 Results
* Case-3 Results
* Case-4 Results
* Case-5 Results
* Analytics Dashboard
* Validation Summary
* Customer Management
* Product Management
* Invoice Management

---

# Setup Instructions

## Clone Repository

```bash
git clone <repository-url>
cd invoice-intelligence
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

```env
VITE_GEMINI_API_KEY=your_api_key
```

## Start Development Server

```bash
npm run dev
```

---

# Future Enhancements

* Authentication
* Database Integration
* Excel Export
* Cloud Storage
* Approval Workflow
* Batch Processing
* Role-Based Access Control

---

# Author

Boda Vamshi Kumar

AI-powered document intelligence platform for invoice processing, business entity extraction, validation, analytics, and reporting.
