export interface SearchResult {
  people: Array<object>;
  films: Array<object>;
  planets: Array<object>;
}

export interface ResultItem {
  name?: string;
  title?: string;
  url: string;
}

export interface CategoryResultsProps {
  category: string;
  results: ResultItem[];
}

export interface RowData {
  name: string;
  gender: string;
  hair_color: string;
}

export interface CategoryProps {
  data: RowData[];
}
