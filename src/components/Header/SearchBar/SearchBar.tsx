import { useState, useEffect } from "react";

//Context
import { useError } from "context/ErrorContext";

//Components
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

//Types
import type { Location } from "types/Location.ts";

interface SearchBarProps {
  selectionHandler: (selection: Location) => void; //When used only to pick a new location, selectionhandler is expected to be the state setter for the weather location.
}

export const SearchBar = ({ selectionHandler }: SearchBarProps) => {
  const [text, setText] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);

  //Function for globally setting errors
  const { setError } = useError();

  useEffect(() => {
    const getLocations = async (search: string) => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=4&language=en&format=json`
        );

        if (!res.ok) throw new Error("Failed to get location data");

        const { results } = await res.json();
        setLocations(results);
      } catch (err: any) {
        console.log(err.message);
        setError("We couldn't fetch location data, try again later.");
      }
    };

    if (text.length > 2) {
      getLocations(text);
    } else {
      setLocations([]);
    }
  }, [text]);

  return (
    <>
      <Combobox
        onChange={(location: Location) => {
          if (location !== null) {
            selectionHandler(location);
          }
        }}
        onClose={() => setText("")}
      >
        <span className="relative z-10">
          <ComboboxInput
            aria-label="Location"
            displayValue={(loc: Location | null | undefined) => loc?.name ?? ""}
            onChange={(event) => setText(event.target.value)}
            className="w-50 md:w-150 transition-width duration-300 ease-in bg-gray-300/50 rounded-full indent-3 h-10 relative z-200"
            type="text"
            autoComplete="off"
            name="location-search"
            placeholder="Search new location"
          />
          <ComboboxOptions
            // anchor={{ to: "bottom", gap: "-40px" }}
            className="absolute left-0 top-full -mt-10 bg-gray-50/99 h-fit  pt-10 z-198 w-50 md:w-150 indent-3 rounded-3xl empty:invisible"
          >
            {locations?.map((location: Location) => (
              <ComboboxOption
                key={location.id}
                value={location}
                className="data-focus:text-shadow-stone-600/20 text-shadow-sm"
              >
                <span>
                  {location.name}, {location.country}
                </span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </span>
      </Combobox>
    </>
  );
};
