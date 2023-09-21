import React from "react";
import PropTypes from "prop-types";

/**
 * Dropdown component
 * @param name - name of the dropdown
 * @param onChangeDropdown - function to be called when the dropdown value changes
 * @param optionsList - list of options to be displayed in the dropdown
 * @returns {Element}
 * @constructor
 */
const Dropdown = ({ name, onChangeDropdown, optionsList }) => {
  return (
    <select
      defaultValue={optionsList[0].abbreviation}
      id={name}
      name={name}
      onChange={(e) => {
        onChangeDropdown(e.target.value);
      }}
    >
      {optionsList.map((option, index) => {
        return (
          <option key={index} value={option["abbreviation"]}>
            {option["name"]}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;

//props-types for the component
Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeDropdown: PropTypes.func.isRequired,
  optionsList: PropTypes.array.isRequired,
};
