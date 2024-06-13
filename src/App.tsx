/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Loader } from "monday-ui-react-core";
import "./App.css";

import { ThemeProvider } from "monday-ui-react-core";
import mondaySdk from "monday-sdk-js";

import SeachBox from "./components/search-box/SearchBox";
import ResultBox from "./components/resultBox/ResultBox";
import { ItemType, RegionType, SubRegionType } from "./definitions/interfaces";

const monday = mondaySdk();

const useGetContext = () => {
  const [context, setContext] = useState({});

  // Monday UI theme configuration
  useEffect(() => {
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);

  return context;
};

interface Props {
  resultData: ItemType[];
  regions: RegionType[];
  subRegions: SubRegionType[];
}

const App: React.FC<Props> = () => {
  const context = useGetContext();
  const [boardData, setBoardData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resultData, setResultData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [regions, setRegions] = useState<any[]>([]);
  const [subRegions, setSubRegions] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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

        setRegions(
          JSON.parse(columnsRes.data.boards[0].columns[1].settings_str)
        );

        setSubRegions(
          JSON.parse(columnsRes.data.boards[0].columns[2].settings_str)
        );

        setColumns(
          columnsRes.data.boards[0].columns
            .filter(
              (item: { id: string; title: string }) => item.id !== "location" // if location column is included, it returns status 500 in filter queries
            )
            .map((item: { id: string }) => {
              return item.id;
            })
        );
      } catch (error: any) {
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm) {
        // dynamic rules for searching the term in every column (except location, of course)
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
        setResultData([]);
      }
    };

    handleSearch();
  }, [searchTerm]);

  if (!boardData) {
    return (
      <Box className="loading-box">
        <Loader color="var(--primary-color)" size={40} />
      </Box>
    );
  }

  return (
    <ThemeProvider
      themeConfig={context.themeConfig}
      systemTheme={context.theme}
    >
      <Box className="main">
        <Box className="wrapper">
          <SeachBox
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          />
          <ResultBox
            resultData={resultData}
            regions={regions}
            subRegions={subRegions}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
