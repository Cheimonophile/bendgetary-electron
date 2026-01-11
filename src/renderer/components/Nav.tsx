import { FC } from "react";
import { NavButton } from "./NavButton";


export const Nav: FC = () => {
  return (
    <nav className="w-24 flex flex-col bg-ball-grey">
      <NavButton page="battles" />
      <NavButton page="species" />
      <NavButton page="locations" />
      <NavButton page="playthroughs" />
      <div className="flex-1" />
      <NavButton page="settings" />
    </nav>
  )
}