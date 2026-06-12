import { ai } from "../lib/gemini";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const extractBusinessData = async (content) => {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
Extract invoice, product and customer information.

Return ONLY valid JSON.

Schema:

{
  "invoices": [
    {
      "id": "",
      "customer_id": "",
      "invoice_date": "",
      "total_amount": 0,
      "tax_amount": 0,
      "items": []
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

Rules:

1. Always use EXACT field names.
2. Never use invoice_no, invoiceNumber, product_name, customer_name.
3. Invoice number must always be stored in "id".
4. Product name must always be stored in "name".
5. Customer identifier must always be stored in "id".
6. Return ONLY valid JSON.
7. Missing values should be empty string "" or 0.

Content:

${content}
`,
      });

      const text = response.text;

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      return JSON.parse(cleanedText);
    } catch (error) {
      const isRetryable =
        error?.message?.includes("429") ||
        error?.message?.includes("503") ||
        error?.message?.includes("RESOURCE_EXHAUSTED") ||
        error?.message?.includes("UNAVAILABLE");

      if (isRetryable && attempt < MAX_RETRIES) {
        console.log(`Gemini retry ${attempt}/${MAX_RETRIES}`);

        await sleep(3000);

        continue;
      }

      console.error("Gemini extraction error:", error);

      return null;
    }
  }
};
