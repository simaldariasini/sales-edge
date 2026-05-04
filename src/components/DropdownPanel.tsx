import { useState, type FC, type MouseEvent } from "react";
import { menuData } from "../data/menu";
import "./sidebar.css";

interface DropdownPanelProps {
  menuTitle: string;
  onOpenView: (view: string) => void;
}

const DropdownPanel: FC<DropdownPanelProps> = ({ menuTitle, onOpenView }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const menuItem = menuData.find((item) => item.title === menuTitle);
  const children = menuItem?.children || [];

  if (children.length === 0) return null;

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="dropdown-panel">
      {/* Panel Header */}
      <div className="dropdown-panel-header">
        <span className="dropdown-panel-title">{menuTitle}</span>
      </div>

      {/* Children list */}
      <div className="dropdown-children">
        {children.map((child) => {
          const nestedItems = child.nested ?? [];
          const hasNestedItems = nestedItems.length > 0;
          const isExpanded = expandedGroups[child.title] || false;

          const handleParentClick = () => {
            if (!hasNestedItems) {
              onOpenView(child.title);
            }
          };

          const handleToggleClick = (event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            toggleGroup(child.title);
          };

          return (
            <div key={child.title} className="dropdown-child-wrapper">
              <div
                className={`dropdown-child-item ${isExpanded ? "expanded" : ""}`}
                onClick={handleParentClick}
              >
                <span className="dropdown-child-label">{child.title}</span>
                {hasNestedItems && (
                  <button
                    type="button"
                    className={isExpanded ? "dropdown-child-minus" : "dropdown-child-plus"}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${child.title}`}
                    onClick={handleToggleClick}
                  >
                    {isExpanded ? "-" : "+"}
                  </button>
                )}
              </div>

              {/* Nested items */}
              {hasNestedItems && isExpanded && (
                <div className="dropdown-nested-list">
                  {nestedItems.map((nestedItem) => (
                    <div
                      key={nestedItem.title}
                      className="dropdown-nested-item"
                      onClick={() => onOpenView(nestedItem.title)}
                    >
                      {nestedItem.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownPanel;
