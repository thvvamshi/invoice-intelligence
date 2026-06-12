import { ai } from "../lib/gemini";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PROMPT = `
You are an invoice OCR and data extraction engine.

Extract invoice, customer and product information ONLY from the provided document.

IMPORTANT:
- NEVER invent values.
- NEVER create placeholder IDs.
- Use only values visible in the document.
- If a field is missing use:
  - "" for strings
  - 0 for numbers
  - [] for arrays

Invoice Number may appear as:
- BILL NO
- INVOICE NO
- INVOICE NUMBER

Customer Name may appear as:
- NAME
- CUSTOMER
- BILL TO

Product Names may appear as:
- ITEM NAME
- PRODUCT
- DESCRIPTION

Total Amount may appear as:
- TOTAL AMOUNT
- GRAND TOTAL
- NET AMOUNT

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
