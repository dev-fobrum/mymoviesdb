// CustomCheckbox.js
import { FC } from "react";

import "./styles.css";

interface CustomCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => {};
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="custom-checkbox">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      {/* <span className="checkmark">{label}</span> */}
      <label className="checkmark" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
