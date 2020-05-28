import React from "react";

const Filter = ({handleFilter, filter}) => {

  return (
    <div>
      find countries <input onChange={handleFilter} value={filter} />
    </div>
  );
};

export default Filter;
