import { Link } from "react-router-dom";
import { CategoryResultsProps } from "../interfaces/app.interface";

const CategoryResults: React.FC<CategoryResultsProps> = ({
  category,
  results,
}) => {
  return (
    <div className="mb-4 border border-gray-300 rounded-md p-4 w-64">
      <h3 className="text-xl font-bold mb-2">{category}</h3>
      <ul>
        {results.slice(0, 3).map((result) => (
          <li key={result.url} className="mb-2">
            {result.name || result.title}
          </li>
        ))}
      </ul>
      <Link
        to={`/category/${category.toLowerCase()}`}
        className="text-blue-500 hover:underline"
      >
        View All
      </Link>
    </div>
  );
};

export default CategoryResults;
