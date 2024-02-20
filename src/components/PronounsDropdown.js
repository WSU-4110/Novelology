import React, { useState } from "react";

const PronounsDropdown = ({ pronouns, setPronouns }) => {
  const [customPronouns, setCustomPronouns] = useState("");

  const handleSelectChange = (e) => {
    const selectedPronouns = e.target.value;
    if (selectedPronouns === "Other") {
      setPronouns(customPronouns); // Set pronouns to custom pronouns
    } else {
      setPronouns(selectedPronouns);
    }
  };

  const handleCustomPronounsChange = (e) => {
    setCustomPronouns(e.target.value);
    setPronouns(e.target.value); // Update pronouns when custom pronouns are entered
  };

  return (
    <div>
      <select
        className="w-full p-2 mt-2 border rounded"
        value={pronouns}
        onChange={handleSelectChange}
      >
        <option value="" disabled hidden>Select Pronouns</option>
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
