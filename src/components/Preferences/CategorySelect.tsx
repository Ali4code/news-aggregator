import Classes from "./Preferences.module.css";
import { TSource } from "./Preferences.types";

export const CategorySelect = ({
  title,
  categories,
  onCategoryChange,
  selectedCategory,
  source,
}: {
  title: string;
  categories: Record<string, string>;
  onCategoryChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    source: TSource
  ) => void;
  selectedCategory?: string;
  source: TSource;
}) => {
  return (
    <div className={Classes.category}>
      {title} :
      <select
        name="category"
        onChange={(event) => onCategoryChange(event, source)}
        value={selectedCategory || "all"}
      >
        <option value="all">all</option>
        {Object.keys(categories).map((key) => (
          <option key={categories[key]} value={categories[key]}>
            {categories[key]}
          </option>
        ))}
      </select>
    </div>
  );
};
