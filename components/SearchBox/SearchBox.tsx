import React, { useState, useEffect } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  // Дададзены тып для `initialQuery`
  initialQuery?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);

  // Сінхранізуем унутраны стан з знешнімі параметрамі
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className={css.search}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Пошук нататак..."
          value={query}
          onChange={handleInputChange}
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Пошук
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
