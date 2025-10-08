import Classes from "./SearchColumn.module.css";
import { API_SOURCES } from "./SearchColumn.constants";
import { Button } from "@shared/ui/Button";
import { FilterIcon } from "../Preferences/assets/FilterIcon";

export const SearchColumn = ({
  onChange,
  searchFilters,
  onSearch,
  isSearchDisabled,
}: {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  searchFilters: {
    searchParam?: string;
    from?: string;
    to?: string;
    source?: (typeof API_SOURCES)[keyof typeof API_SOURCES]["id"];
  };
  onSearch: () => void;
  isSearchDisabled?: boolean;
}) => {
  return (
    <div className={Classes.search_column_container}>
      <div className={Classes.search_column}>
        <div className="flex">
          <FilterIcon />
          <div className={Classes.title}>Search for articles</div>
        </div>
        <div className={Classes.input_container}>
          <div className={Classes.input_group}>
            <label className={Classes.label} htmlFor="source">
              Select your source
            </label>
            <select
              name="source"
              onChange={onChange}
              value={searchFilters?.source || "none"}
            >
              <option value="none" disabled>
                Select your source
              </option>
              {Object.keys(API_SOURCES).map((key) => (
                <option
                  key={API_SOURCES[key as keyof typeof API_SOURCES].id}
                  value={API_SOURCES[key as keyof typeof API_SOURCES].id}
                >
                  {API_SOURCES[key as keyof typeof API_SOURCES].name}
                </option>
              ))}
            </select>
          </div>
          <div className={Classes.input_group}>
            <label className={Classes.label} htmlFor="searchParam">
              search param:
            </label>
            <input
              onChange={onChange}
              name="searchParam"
              id="searchParam"
              value={searchFilters?.searchParam ?? ""}
              type="text"
            />
          </div>
          <div className={Classes.input_group}>
            <label className={Classes.label} htmlFor="from">
              From
            </label>
            <input
              type="date"
              name="from"
              id="from"
              value={searchFilters.from ?? ""}
              onChange={onChange}
            />
          </div>
          <div className={Classes.input_group}>
            <label className={Classes.label} htmlFor="to">
              To
            </label>
            <input
              type="date"
              name="to"
              id="to"
              value={searchFilters.to ?? ""}
              onChange={onChange}
            />
          </div>
        </div>

        <Button onClick={onSearch} text="Search" disabled={isSearchDisabled} />
      </div>
    </div>
  );
};
