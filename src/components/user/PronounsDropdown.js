import React, { useState } from "react";

const PronounsDropdown = ({ pronouns, setPronouns, customPronouns, setCustomPronouns }) => {
  const handleSelectChange = (e) => {
    const selectedPronouns = e.target.value;
    if (selectedPronouns !== "Other") {
        setPronouns(selectedPronouns); // Update selected pronouns directly in parent component
    } else {
        setPronouns("Other"); // Set selected pronouns to "Other" if custom pronouns are selected
    }
};

const handleCustomPronounsChange = (e) => {
    const customValue = e.target.value;
    setCustomPronouns(customValue); // Update custom pronouns state in parent component
    setPronouns("Other"); // Set selected pronouns to "Other"
};


  return (
    <div>
      <label htmlFor="pronouns" className="block">
        Select your pronouns
      </label>
      <select
        id="pronouns"
        className="w-full p-2 mt-2 border rounded"
        value={pronouns}
        onChange={handleSelectChange}
      >
        <option value="" disabled hidden>
          Select Pronouns
        </option>
        <option value="He/Him">He/Him</option>
        <option value="She/Her">She/Her</option>
        <option value="They/Them">They/Them</option>
        <option value="Other">Other</option>
      </select>
      {pronouns === "Other" && (
        <input
          type="text"
          className="w-full p-2 mt-2 border rounded"
          placeholder="Enter your pronouns"
          value={customPronouns}
          onChange={handleCustomPronounsChange}
        />
      )}
    </div>
  );
};

export default PronounsDropdown;
