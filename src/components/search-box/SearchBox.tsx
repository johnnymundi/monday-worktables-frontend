import { Search } from "monday-ui-react-core";
import React, { useEffect, useState } from "react";

const SeachBox = ({ searchTerm, onSearchTermChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleChange = (e) => {
    console.log("e", e);
    setLocalSearchTerm(e);
    onSearchTermChange(e);
  };

  return (
    <div className="search-box">
      <Search
        placeholder="Busque informações do país"
        value={localSearchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SeachBox;
