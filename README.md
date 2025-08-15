# 🪿 Fowl Weather

Honk! **Fowl Weather** is a goose-centric weather forecast website who not only gives you the latest weather — but also tells you what to wear. Built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, it integrates both **Open-Meteo** (for weather and location data) and **OpenAI** (for clothing advice).  

Try it out, get your forecast, and let the goose guide your fashion choices. 

---

## ✨ Features

- **Weather Search** – Enter a city name or use geolocation to get up-to-date forecasts.
- **Clothing Advice Goose** – Click a button to ask the goose for wardrobe tips tailored to the current weather. He will also change his outfit based on the current weather code.
- **Unit Toggle** – Switch between Celsius and Fahrenheit.
- **Personalized advice** - Set if you run hot, cold, or neither in the settings panel. The goose will take this into account when giving clothing advice.
- **Responsive UI** – Works smoothly across desktop and mobile with animated transitions between different widths.
- **Forecast View** – See today’s conditions, an hourly and 7-day forecast.
- **Error Handling** – Frontend display of API fetching errors from OpenMeteo and OpenAI. Placeholder components for current weather and forecast if weather data not available at load.
- **Secure API Calls** – Uses Netlify Functions so API keys stay private.

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript  
- **Styling:** Tailwind CSS  + Headless UI
- **Weather Data:** [Open-Meteo API](https://open-meteo.com/)  
- **AI Advice:** [OpenAI API](https://platform.openai.com/)  
- **Deployment:** [Netlify](https://www.netlify.com/) (with Netlify Functions)  
- **Animated Weather Icons:** [Bybas Weather Icons](https://bybas.github.io/weather-icons/) 
- **Testing & UI Demos:** Storybook (with a sprinkle of component testing)  

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/fowlweather.git
cd fowlweather
```

 ### 2. Install dependencies
```
npm install
```

### Set up environment variables
Create a .env file at project root
```
OPENAI_API_KEY=your_openai_api_key_here
```

### Run the app locally
```
npm run dev
```

### Build for production
```
npm run build
```

---

## AI Clothing Advice – Prompt Challenges

It turns out that it’s easier said than done to get an AI goose to give accurate, useful clothing advice on the first try. Please note that when talking about OpenAI in this section, I may simply refer to it as “the goose”. You can find my OpenAI call in `netlify/functions/clothingAdvice.mts`. My final prompt (with some example data here to make this easier to read for humans) was:

```
 `
	Weather summary:
     Today's weather:
     - Max temp: 27°C
     - Min temp: 24°C
     - Conditions: Sunny
                     
    Give advice specifically for what they should wear today in 1 or 2 sentences without repeating information from the summary,
    speaking like a goose. Do not use emojis. The user tends to feel slightly colder than other people by about 2°C,
    but make sure the clothing advice matches the actual weather summary.
    Don't give innapropriate suggestions for the temperature like a scarf in warm weather,
    or use innapropriate colloquialisms for cold weather like "stay cool".`
```

**The main challenges:**
- Getting the goose to **factor in user preferences** (e.g., “runs hot” or “runs cold”) without overcompensating (“wear a scarf in 27°C”), or saying “stay cool” to a user who runs a little cold at an Antarctic research station. I had to be more explicit than simply saying “the user runs hot”, as the goose seemed to think this meant the user holds the fires of mordor inside of them, and thus could survive sub-zero tempertures with no shoes on.
- **Constraint composition and order** - Many models, especially the earlier one I am using here, have limited capacity to follow a large number of constraints consistently. It helps to make your your main instruction is very clear and near the beginning of your prompt, group related constraints int he same sentence, and don’t include constraints that don’t absolutely need to be there.
- **Keeping token use economical** - I acheived this through the use of an older model and efficient word choice. At this point, it’s well-known that even a simple “please” or “thank you” can rack up more tokens, as does any additional context or constraints. When adding a new constraint to address an issue with responses, it was important to look back on previous constraints. Did this new one overlap with something I had said previously? When adding new context, could I take away from somewhere else?

**What was surprisingly easy:**
- Asking it to speak like a goose - at least for the standards of this project. LLMs are pretty good at simple creative writing.

---

## Storybook

A small selection of components were tested in isolation using [Storybook](https://storybook.js.org/). While not exhaustive, this was useful for refining UI details without running the full app.

Run Storybook locally:

```bash
npm run storybook
```

***
## Scripts

| Command                | Description |
|------------------------|-------------|
| `npm run dev`          | Start dev server with Netlify Functions |
| `npm run build`        | Build the app for production |
| `npm run preview`      | Preview production build locally |
| `npm run storybook`    | Run Storybook for UI component previews |
| `npm run build-storybook` | Build static Storybook site |
| `npm run deploy`       | Deploy to Netlify production |
