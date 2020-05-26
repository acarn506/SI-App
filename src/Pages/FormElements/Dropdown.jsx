import React, { useState } from "react";

const Dropdown = ({ title, items = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => {
    setOpen(!open);
  };

  function handleClick(item) {
    if (!selection.some(current => current === item)) {
      setSelection([item]);
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(current => {
        return current !== item;
      });
      setSelection([...selectionAfterRemoval]);
    }

    onSelect(item);
  }

  function isItemInSelection(item) {
    if (
      selection.find(current => {
        return current === item;
      })
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="dd-wrapper">
      <div
        className="dd-header"
        tabIndex={0}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{open ? "Close" : ""}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item, i) => {
            return (
              <li className="dd-list-item" key={i}>
                <button type="button" onClick={() => handleClick(item)}>
                  <span>{item}</span>
                  <span>{isItemInSelection(item) && "Selected"}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
