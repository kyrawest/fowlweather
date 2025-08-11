import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";

//Components
import { SearchBar } from "./SearchBar/SearchBar.tsx";

//Types
import type { Location } from "types/Location.ts";

interface HeaderProps {
  setLocation: (location: Location) => void;
}

export const Header = ({ setLocation }: HeaderProps) => {
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
              <a className="block data-focus:bg-blue-100" href="/settings">
                Settings
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-focus:bg-blue-100" href="/support">
                Support
              </a>
            </MenuItem>
            <MenuItem>
              <a className="block data-focus:bg-blue-100" href="/license">
                License
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </nav>
    </header>
  );
};
