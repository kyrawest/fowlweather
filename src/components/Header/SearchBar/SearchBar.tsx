import { useState, useEffect } from "react";

//Components
import { Input } from "@headlessui/react";

//Types
import type { Location } from "types/Location.ts";

interface SearchBarProps {
  selectionHandler: (selection: Location) => void; //When used only to pick a new location, selectionhandler is expected to be the state setter for the weather location.
}

export const SearchBar = ({ selectionHandler }: SearchBarProps) => {
  const [text, setText] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationNames, setLocationNames] = useState<string[]>([]);

  useEffect(() => {
    const getLocations = async (search: string) => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=4&language=en&format=json`
        );

        if (!res.ok) throw new Error("Failed to get location data");

        const { results } = await res.json();
        setLocations(results);
        const newLocationNames = results.map(
          (result: Location) => `${result.name}, ${result.country}`
        );
        setLocationNames(newLocationNames);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    if (text.length > 2) {
      getLocations(text);
    }
  }, [text]);

  return (
    <>
      <div className="relative transition-width duration-300 ease-in w-50 md:w-150">
        <Input
          name="Location search"
          as="input" //Cretaes a controlled input when working with headless UI
          type="text"
          value={text}
          aria-description="Input location"
          className="w-50 md:w-150 transition-width duration-300 ease-in bg-gray-300/50 rounded-full indent-3 h-10 relative z-11"
          placeholder="Enter a location"
          onChange={(e) => setText(e.target.value)}
        />
        <ul className="absolute inset-y-0 z-10 bg-gray-50/99 h-fit transition-width duration-300 ease-in w-50 md:w-150 pt-10 indent-3 rounded-3xl">
          {locationNames.map((name, index) => (
            <li
              key={index}
              onClick={() => {
                // When a location is clicked, change the location state, then clear the input and results.
                selectionHandler(locations[index]);
                setLocationNames([]);
                setText("");
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
