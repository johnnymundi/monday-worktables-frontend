/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Search } from "monday-ui-react-core/next";
import "./App.css";

import mondaySdk from "monday-sdk-js";
import { Box, Flex, Loader } from "monday-ui-react-core";
const monday = mondaySdk();

function App() {
  const [boardData, setBoardData] = useState<any>(null); // Explicit any type
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para armazenar o termo de pesquisa
  const [resultData, setResultData] = useState<any[]>([]); // Explicit any array type
  const [columns, setColumns] = useState<any[]>([]);

  const main = `query {
    boards(ids: 6756792083) {
      columns {
        id
        title
      }
      items_page (limit: 50){
        items {
          id
          name
          column_values {
                id
                type
                value
              }
        }
          
      }
    }
  }`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const columnsRes = await monday.api(main, {
          apiVersion: "2023-10",
        });
        setBoardData(columnsRes.data.boards[0]);
        setColumns(
          columnsRes.data.boards[0].columns
            .filter(
              (item: { id: string; title: string }) => item.id !== "location" // if location column is included, it returns status 500 in filter queries
            )
            .map((item: { id: string }) => {
              return item.id;
            })
        );
        console.log("columnsRes", columnsRes);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("searchTerm", searchTerm);
    console.log("columns", columns);
    const handleSearch = async () => {
      if (searchTerm) {
        // dynamic rules for searching the term in every column (except location)
        const rules = columns
          .map(
            (column) =>
              `{ column_id: "${column}", compare_value: "${searchTerm}" }`
          )
          .join(", ");
        console.log("rules", rules);

        const searchQuery = `query {
          boards(ids: 6756792083) {
            items_page(query_params: {rules: [${rules}], operator: or}) {
              items {
                id 
                name
                column_values {
                  id
                  type
                  value
                }
              }
            }
          }    
        }`;
        console.log("searchQuery", searchQuery);

        try {
          const searchRes = await monday.api(searchQuery, {
            apiVersion: "2023-10",
          });
          console.log("searchRes", searchRes);
          console.log("searchRes", searchRes.data.boards[0].items_page.items);

          setResultData(searchRes.data.boards[0].items_page.items);
        } catch (error: any) {
          console.error("Error searching data:", error);
        }
      } else {
        setResultData([]); // Limpa os resultados da pesquisa se o campo de pesquisa estiver vazio
      }
    };

    handleSearch();
  }, [searchTerm]);

  if (!boardData) {
    return (
      <Flex align="center" justify="center" className="loading-box">
        <Loader color="var(--primary-color)" size={40} />
      </Flex>
    );
  }

  return (
    <div className="main">
      <div className="search-box">
        <Search
          placeholder="Busque informações do país"
          onChange={(e) => setSearchTerm(e)}
        />
      </div>
      <Box textColor="Box-module_textPrimaryTextColor" className="result-box">
        {resultData.length > 0 ? (
          resultData.map((item: any) => (
            <Box key={item.id}>
              <h3>{item.name}</h3>
              {/* {item.column_values.map((column: any) => (
                <Text type={Text.types.TEXT1} key={column.id}>
                  {column.type}: {column.value ? column.value : "N/A"}
                </Text>
              ))} */}
            </Box>
          ))
        ) : (
          <p>No results</p>
        )}
      </Box>
    </div>
  );
}

export default App;
