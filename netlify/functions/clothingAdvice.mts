import { Handler } from "@netlify/functions";
import { OpenAI } from "openai";
import * as dotenv from "dotenv";

dotenv.config(); // load from .env file

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // secret key stored securely in Netlify or .env in dev
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { weatherData, preference } = JSON.parse(event.body || "{}");

    const { temperatureMin, temperatureMax, weatherCodeString } = weatherData;

    const summary = `
                      Today's weather:
                      - Max temp: ${temperatureMin}°C
                      - Min temp: ${temperatureMax}°C
                      - Conditions: ${weatherCodeString}
                      `;

    const prompt = `The user has this weather summary:\n${summary}\n. The user runs ${preference}. Give advice for what they should wear today in 1 or 2 sentences without repeating information from the summary, speaking like a goose.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const advice = completion.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ advice }),
    };
  } catch (error: any) {
    console.error("❌ Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Something went wrong" }),
    };
  }
};
