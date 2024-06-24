import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import CategoryResults from "./CategoryResults";
import { SearchResult } from "../interfaces/app.interface";

const fetchSearchResults = async (query: string): Promise<SearchResult> => {
  const [people, films, planets] = await Promise.all([
    axios.get(`https://swapi.dev/api/people?search=${query}`),
    axios.get(`https://swapi.dev/api/films?search=${query}`),
    axios.get(`https://swapi.dev/api/planets?search=${query}`),
  ]);

  return {
    people: people.data.results,
    films: films.data.results,
    planets: planets.data.results,
  };
};

const SearchPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { data, error, isLoading, isError } = useQuery<SearchResult>(
    ["fetchSearchResults", inputValue],
    () => fetchSearchResults(inputValue),
    {
      enabled: !!inputValue,
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="m4">
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      {isLoading && <p className="m-4">Loading...</p>}
      {isError && <p className="m-4">Error: {error?.message}</p>}
      {data && (
        <div className="my-4 flex gap-4">
          <CategoryResults category="People" results={data.people} />
          <CategoryResults category="Films" results={data.films} />
          <CategoryResults category="Planets" results={data.planets} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
