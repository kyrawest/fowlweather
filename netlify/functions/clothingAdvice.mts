import { Handler } from "@netlify/functions";
import { OpenAI } from "openai";
import * as dotenv from "dotenv";

import { TempUnit } from "../../src/types/TempUnit.ts";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // secret key stored securely in Netlify or .env in dev
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { weatherData, preference, tempUnit } = JSON.parse(
      event.body || "{}"
    );

    const {
      temperatureMin,
      temperatureMax,
      temperatureCurrent,
      apparentTemperature,
      weatherCodeString,
    } = weatherData;

    let unitString = "°C";
    let tempDif = "2°C";
    //extremes not necessary but left in for future prompt iterations
    // let lowExtreme = "0°C";
    // let highExtreme = "30°C";
    if (tempUnit == TempUnit.fahrenheit) {
      unitString = "°F";
      tempDif = "3.5°F";
      // lowExtreme = "32°C";
      // highExtreme = "86°F";
    }

    let preferencePrompt = "";
    if (preference == "Hot") {
      preferencePrompt = `The user tends to feel slightly warmer than other people by about ${tempDif}, but make sure the clothing advice matches the actual weather summary. Don't give innapropriate suggestions for the temperature like a tank top in very cold weather, or use innapropriate colloquialisms for warm weather like "stay cozy".`;
    } else if (preference == "Cold") {
      preferencePrompt = `The user tends to feel slightly colder than other people by about ${tempDif}, but make sure the clothing advice matches the actual weather summary. Don't give innapropriate suggestions for the temperature like a scarf in warm weather, or use innapropriate colloquialisms for cold weather like "stay cool".`;
    }

    const summary = `
                      Today's weather:
                      - Max temp: ${temperatureMin}${unitString}
                      - Min temp: ${temperatureMax}${unitString}
                      - Current temp: ${temperatureCurrent}${unitString}
                      - Currently feels like: ${apparentTemperature}${unitString}
                      - Conditions: ${weatherCodeString}
                      `;

    const prompt = `
    Weather summary:\n${summary}\n. 
    Give advice specifically for what they should wear today in 1 or 2 sentences without repeating information from the summary, speaking like a goose. Do not use emojis.
    ${preferencePrompt}
    `;

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
