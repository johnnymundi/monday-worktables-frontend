import { Search } from "monday-ui-react-core";
import React, { useEffect, useState } from "react";

interface Props {
  searchTerm: string;
  onSearchTermChange: React.Dispatch<React.SetStateAction<string>>;
}

const SeachBox: React.FC<Props> = ({ searchTerm, onSearchTermChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: string) => {
    setLocalSearchTerm(e);
    onSearchTermChange(e);
  };

  return (
    <div className="search-box">
      <Search
        placeholder="Search information about a country"
        value={localSearchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SeachBox;
