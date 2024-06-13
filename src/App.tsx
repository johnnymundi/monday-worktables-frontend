/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Flex, Loader, Text } from "monday-ui-react-core";
import "./App.css";

import { ThemeProvider } from "monday-ui-react-core";
import mondaySdk from "monday-sdk-js";

import SeachBox from "./components/search-box/SearchBox";
import ResultBox from "./components/resultBox/ResultBox";

const monday = mondaySdk();

const useGetContext = () => {
  const [context, setContext] = useState({});

  useEffect(() => {
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  return context;
};

function App() {
  const context = useGetContext();
  const [boardData, setBoardData] = useState<any>(null); // Explicit any type
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para armazenar o termo de pesquisa
  const [resultData, setResultData] = useState<any[]>([]); // Explicit any array type
  const [columns, setColumns] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [subRegions, setSubRegions] = useState<any[]>([]);

  const main = `query {
    boards(ids: 6756792083) {
      columns {
        id
        title
        settings_str
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

        setRegions(columnsRes.data.boards[0].columns[1]);
        setSubRegions(columnsRes.data.boards[0].columns[2]);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm) {
        // dynamic rules for searching the term in every column (except location)
        const rules = columns
          .map(
            (column) =>
              `{ column_id: "${column}", compare_value: "${searchTerm}" }`
          )
          .join(", ");

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

        try {
          const searchRes = await monday.api(searchQuery, {
            apiVersion: "2023-10",
          });

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
    <ThemeProvider
      themeConfig={context.themeConfig}
      systemTheme={context.theme}
    >
      <div className="main">
        <SeachBox searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        <ResultBox resultData={resultData} />
      </div>
    </ThemeProvider>
  );
}

export default App;
