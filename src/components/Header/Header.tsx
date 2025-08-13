import { useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
  Field,
  Label,
  Radio,
  RadioGroup,
  Button,
} from "@headlessui/react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

//Components
import { SearchBar } from "./SearchBar/SearchBar.tsx";

//Types
import type { Location } from "types/Location.ts";
import { TempUnit } from "types/TempUnit.ts";

interface HeaderProps {
  setLocation: (location: Location) => void;
  setTempUnit: (tempUnit: TempUnit) => void;
  setTempPref: (preference: string) => void;
  tempUnit: TempUnit;
  tempPref: string;
}

const options = ["Hot", "Neither hot nor cold", "Cold"];

export const Header = ({
  setLocation,
  setTempUnit,
  tempUnit,
  setTempPref,
  tempPref,
}: HeaderProps) => {
  //Tells us if the settings dialog is open
  let [isOpen, setIsOpen] = useState<boolean>(false);

  //The selected TempPref for goose advice
  let [selected, setSelected] = useState<string>(tempPref);

  //TempUnit switch - false for TempUnit.celsius, true for TempUnit.farenheit
  let [enabled, setEnabled] = useState<boolean>(
    tempUnit == TempUnit.celsius ? false : true
  );

  return (
    <header className="z-100 sticky top-0 ">
      <nav className="flex flex-row justify-between rounded-lg border shadow-lg p-2 bg-white border-slate-200 shadow-slate-950/5 mx-auto w-full">
        <img src="/fw-logo-sm.svg" className="h-10" />
        <SearchBar selectionHandler={setLocation} />
        <button onClick={() => setIsOpen(true)} aria-label="Open settings">
          <Cog6ToothIcon className="h-6 w-6"></Cog6ToothIcon>
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-200 w-full"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="flex flex-col max-w-lg space-y-4 rounded-xl bg-stone-50 py-6 px-8">
              <DialogTitle className="font-bold text-2xl">Settings</DialogTitle>

              <div className="mt-5 inset-shadow-sm rounded-lg p-4 bg-stone-100">
                <p className="font-semibold text-xl">Set temperature unit</p>
                <div className="inline-flex gap-2 mt-3">
                  <span className={enabled ? "" : "font-bold"}>°C</span>
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-lime-600/50 transition data-checked:bg-lime-600/50"
                  >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                  </Switch>
                  <span className={enabled ? "font-bold" : ""}>°F</span>
                </div>
              </div>
              <div className="mt-5 inset-shadow-sm rounded-lg p-4  bg-stone-100">
                <p className="font-semibold text-xl">Advice</p>
                <p className="font-light mt-2">
                  Tell our goose if you tend to run hot, cold, or somewhere in
                  between. He'll tailor his advice to the down of your feathers.
                </p>
                <p className="mt-2 text-md font-medium">I run...</p>
                <RadioGroup
                  value={selected}
                  onChange={setSelected}
                  aria-label="User running hot or cold advice preference"
                >
                  {options.map((option) => (
                    <Field key={option} className="flex items-center gap-2">
                      <Radio
                        value={option}
                        className="group flex size-5 items-center justify-center rounded-full border-2 border-lime-600/50 bg-white data-checked:bg-lime-600/50"
                      >
                        <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
                      </Radio>
                      <Label>{option}</Label>
                    </Field>
                  ))}
                </RadioGroup>
              </div>

              <Button
                onClick={() => {
                  setTempUnit(enabled ? TempUnit.fahrenheit : TempUnit.celsius);
                  setTempPref(selected);
                  setIsOpen(false);
                }}
                className="rounded w-20 place-self-end font-semibold bg-yellow-400 px-4 py-2 data-hover:bg-yellow-300 data-hover:data-active:bg-yellow-500 drop-shadow-md"
              >
                Close
              </Button>
            </DialogPanel>
          </div>
        </Dialog>
      </nav>
    </header>
  );
};
