import { useEffect, useRef, useState } from "react";
import styles from "./NameSearchBox.module.css";
import type { NameSearchBoxProps } from "./types/nameSearchBoxTypes.ts";
import { Search } from "lucide-react";

export default function NameSearchBox({
  onSearch,
  initialValue = "",
}: NameSearchBoxProps) {
  const [query, setQuery] = useState(initialValue);
  const previousQuery = useRef(query);

  useEffect(() => {
    if (previousQuery.current === query) return;
    previousQuery.current = query;

    const timeout = setTimeout(() => {
      if (query.length >= 3 || query === "") {
        onSearch(query);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <div className={styles.searchContainer}>
      <Search className={styles.searchIcon} />
      <input
        type="text"
        className={styles.searchBox}
        placeholder="Search Movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
