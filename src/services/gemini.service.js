import { ai } from "../lib/gemini";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PROMPT = `
You are an expert OCR and invoice data extraction engine.

Extract structured business data ONLY from the provided invoice, receipt, bill, purchase order, or document.

STRICT RULES:

1. NEVER invent values.
2. NEVER hallucinate information.
3. Extract ONLY values explicitly visible in the document.
4. Return ONLY valid JSON.
5. Do NOT return markdown.
6. Do NOT return explanations.
7. Do NOT return comments.
8. Do NOT wrap the response in \`\`\`json blocks.

MISSING VALUES:

If a value is not present:
- Use "" for strings
- Use 0 for numbers
- Use [] for arrays

FIELD IDENTIFICATION:

Invoice Number may appear as:
- Invoice No
- Invoice Number
- Bill No
- Bill Number
- Voucher No
- Reference No

Customer Name may appear as:
- Customer
- Customer Name
- Bill To
- Buyer
- Party Name
- Name

Product Name may appear as:
- Product
- Product Name
- Item
- Item Name
- Description
- Particulars

Total Amount may appear as:
- Grand Total
- Total Amount
- Invoice Total
- Net Amount
- Amount Payable

Tax Amount may appear as:
- GST Amount
- Tax Amount
- Total Tax
- CGST
- SGST
- IGST

ID RULES:

Invoice:
- Use invoice number as invoice id.
- Never leave invoice id empty if invoice number exists.

Customer:
- Use GSTIN as customer id if available.
- Otherwise use customer name.
- Otherwise use phone number.
- Otherwise use "".

Product:
- Use product code if available.
- Otherwise use SKU.
- Otherwise use barcode.
- Otherwise use product name.
- Otherwise use "".

RELATIONSHIP RULES:

- invoice.customer_id MUST match the extracted customer id.
- invoice.items.product_id MUST match the corresponding product id.
- Every invoice item should be linked to a product whenever possible.

PRODUCT RULES:

Extract every visible product row.

For each product extract:
- id
- name
- quantity
- unit_price
- tax_percentage

If quantity is missing:
- use 1

If tax percentage is missing:
- use 0

CUSTOMER RULES:

Extract:
- id
- name
- phone
- gstin

INVOICE RULES:

Extract:
- id
- customer_id
- invoice_date
- total_amount
- tax_amount

For each invoice item extract:
- product_id
- quantity
- line_amount

OUTPUT SCHEMA:

{
  "invoices": [
    {
      "id": "",
      "customer_id": "",
      "invoice_date": "",
      "total_amount": 0,
      "tax_amount": 0,
      "items": [
        {
          "product_id": "",
          "quantity": 0,
          "line_amount": 0
        }
      ]
    }
  ],
  "products": [
    {
      "id": "",
      "name": "",
      "quantity": 0,
      "unit_price": 0,
      "tax_percentage": 0
    }
  ],
  "customers": [
    {
      "id": "",
      "name": "",
      "phone": "",
      "gstin": ""
    }
  ]
}

Return ONLY valid JSON matching the schema above.
`;

export const extractBusinessData = async (content) => {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      let response;

      // IMAGE FLOW
      if (typeof content === "object" && content?.data) {
        console.log("IMAGE SIZE:", content.data.length);

        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",

          contents: [
            {
              role: "user",
              parts: [
                {
                  text: PROMPT,
                },
                {
                  inlineData: {
                    mimeType: content.mimeType,
                    data: content.data,
                  },
                },
              ],
            },
          ],
        });
      } else {
        // PDF / EXCEL FLOW

        const textContent =
          typeof content === "string"
            ? content
            : JSON.stringify(content, null, 2);

        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",

          contents: `
${PROMPT}

Content:

${textContent}
`,
        });
      }

      const text = response.text || "";

      console.log("RAW GEMINI RESPONSE:", text);

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanedText);
    } catch (error) {
      const message = error?.message || "";

      const isRetryable =
        message.includes("429") ||
        message.includes("503") ||
        message.includes("RESOURCE_EXHAUSTED") ||
        message.includes("UNAVAILABLE");

      if (isRetryable && attempt < MAX_RETRIES) {
        console.log(`Gemini retry ${attempt}/${MAX_RETRIES}`);

        await sleep(3000);

        continue;
      }

      console.error("Gemini extraction error:", error);

      if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
        throw new Error(
          "⚠️ Gemini API quota exceeded. Please try again later.",
        );
      }

      if (message.includes("403") || message.includes("PERMISSION_DENIED")) {
        throw new Error(
          "⚠️ Gemini API access denied. Check your Gemini project or API key permissions.",
        );
      }

      if (message.includes("503") || message.includes("UNAVAILABLE")) {
        throw new Error("⚠️ Gemini service is temporarily unavailable.");
      }

      throw new Error("⚠️ AI extraction failed. Please try again.");
    }
  }
};
