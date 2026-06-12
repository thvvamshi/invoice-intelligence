import { ai } from "../lib/gemini";

export const extractBusinessData = async (content) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Extract invoice, product and customer information.

Return ONLY valid JSON.

Schema:

{
  "invoices": [],
  "products": [],
  "customers": []
}

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
    if (error?.message?.includes("429")) {
      console.error("Gemini quota exceeded. Wait 1 minute and retry.");
    }

    console.error(error);

    return null;
  }
};
