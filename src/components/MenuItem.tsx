

import { type FC, type ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const MenuItem: FC<Props> = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={`menu-item ${active ? "menu-item-active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default MenuItem;