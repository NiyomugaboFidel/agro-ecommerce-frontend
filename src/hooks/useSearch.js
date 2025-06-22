import { useState, useEffect } from "react";

const useSearch = (datas) => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const filteredData = datas.filter((data) =>
    `${data.firstname} ${data.lastname} ${data.email}`.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearching(true); 
  };
  useEffect(() => {
    setSearching(false);
  }, [query]);

  return { query, handleSearch, filteredData, searching };
};

export default useSearch;