import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { faker } from "@faker-js/faker";
import { CategoryProps } from "../interfaces/app.interface";

const CategoryPage = () => {
  const { category } = useParams();
  const fetchPeople = async () => {
    if (category !== "people") return;
    const response = await fetch(`https://swapi.dev/api/people`);
    const data = await response.json();
    return data;
  };

  const { data, error, isLoading, isError } = useQuery(
    [category],
    fetchPeople,
    {
      staleTime: Infinity,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Category {category}</div>
      {data && data?.results.length !== 0 ? (
        <CategoryResults data={data.results} />
      ) : (
        <span>No Data</span>
      )}
    </div>
  );
};

const CategoryResults: React.FC<CategoryProps> = ({ data }) => {
  const [tableData, setTableData] = useState([...data]);
  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Hair color", field: "hair_color" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: { data: RowData }) => (
        <div>
          <button
            onClick={() => handleEdit(params.data)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.data)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (rowData: RowData) => {
    const newTableData = tableData.map((row, index) => {
      if (row.name === rowData.name) {
        return {
          ...row,
          name: faker.person.fullName(),
        };
      }
      return row;
    });

    setTableData(newTableData);
  };

  const handleDelete = (rowData: RowData) => {
    setTableData((prevData) => prevData.filter((row) => row !== rowData));
  };

  const handleCreate = () => {
    const newItem = {
      name: faker.person.fullName(),
      gender: faker.person.gender(),
      hair_color: "green",
    };
    tableData.unshift(newItem);
    setTableData([...tableData]);
  };

  return (
    <div>
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded my-4"
      >
        Create
      </button>
      <div
        className="ag-theme-alpine"
        style={{ height: "500px", width: "800px" }}
      >
        <AgGridReact rowData={tableData} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default CategoryPage;
