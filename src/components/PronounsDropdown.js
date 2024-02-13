import React from "react";

const PronounsDropdown = ({ pronouns, setPronouns }) => {
  return (
    <select
      className="w-full p-2 mt-2 border rounded"
      value={pronouns}
      onChange={(e) => setPronouns(e.target.value)}
    >
      <option value="" disabled hidden>Select Pronouns</option>
      <option value="He/Him">He/Him</option>
      <option value="She/Her">She/Her</option>
      <option value="They/Them">They/Them</option>
    </select>
  );
};

export default PronounsDropdown;
