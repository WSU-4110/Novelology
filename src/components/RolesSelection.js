import React from "react";

const RolesSelection = ({ selectedRoles, setSelectedRoles }) => {
  return (
    <select
      multiple
      className="w-full p-2 mt-2 border rounded"
      value={selectedRoles}
      onChange={(e) => setSelectedRoles(Array.from(e.target.selectedOptions, option => option.value))}
    >
      <option value="Reader">Reader</option>
      <option value="Reviewer">Reviewer</option>
      <option value="Author">Author</option>
    </select>
  );
};

export default RolesSelection;
