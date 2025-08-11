import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

//Components
import { SearchBar } from "./SearchBar/SearchBar.tsx";

//Types
import type { Location } from "types/Location.ts";
import { TempUnit } from "types/TempUnit.ts";

interface HeaderProps {
  setLocation: (location: Location) => void;
  setTempUnit: (tempUnit: TempUnit) => void;
  tempUnit: TempUnit;
}

export const Header = ({ setLocation, setTempUnit, tempUnit }: HeaderProps) => {
  let enabled = false;

  let otherUnit;

  if (tempUnit == TempUnit.celsius) {
    otherUnit = TempUnit.fahrenheit;
  } else {
    enabled = true;
    otherUnit = TempUnit.celsius;
  }

  return (
    <header className="z-100 sticky top-0 ">
      <nav className="flex flex-row justify-between rounded-lg border shadow-lg  p-2 bg-white border-slate-200 shadow-slate-950/5 mx-auto w-full">
        <img src="/fw-logo-sm.svg" className="h-10" />
        <SearchBar selectionHandler={setLocation} />
        <Menu>
          <MenuButton className="inline-flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Bars3Icon className="h-6 w-6"></Bars3Icon>
          </MenuButton>
          <MenuItems anchor="bottom">
            <MenuItem>
              <div>
                <Switch
                  checked={enabled}
                  onChange={() => {
                    setTempUnit(otherUnit);
                  }}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>
              </div>
            </MenuItem>
            <MenuItem>
              <a className="block data-focus:bg-blue-100" href="/support">
                Support
              </a>
            </MenuItem>
            <MenuItem>
              <Switch
                checked={enabled}
                onChange={() => {
                  setTempUnit(otherUnit);
                }}
              >
                <span className="size-1 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
              </Switch>
            </MenuItem>
          </MenuItems>
        </Menu>
      </nav>
    </header>
  );
};
