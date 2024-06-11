/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Search } from "monday-ui-react-core/next";
import "./App.css";

import mondaySdk from "monday-sdk-js";
import { Box, Flex, Loader } from "monday-ui-react-core";
const monday = mondaySdk();

function App() {
  //const [count, setCount] = useState(0)
  const [boardData, setBoardData] = useState(null);
  //const [error, setError] = useState(null);

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
    // Função para buscar dados do board
    const fetchData = async () => {
      try {
        const columnsRes = await monday.api(main, {
          apiVersion: "2023-10",
        });
        setBoardData(columnsRes.data.boards[0]);
        console.log("comunsRes", columnsRes);
      } catch (error: any) {
        //setError(error);
      }
    };

    fetchData();
  }, []);

  if (!boardData) {
    return (
      <Flex align="Center" justify="Center" className="loading-box">
        <Loader color="var(--primary-color)" size={40} />
      </Flex>
    );
  }

  return (
    <Box backgroundColor="Box-module_bgPrimaryBackgroundColor">
      <Search placeholder="Placeholder text here" />
      {/*  <h1>Board Data</h1>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            {boardData.columns.map((column) => (
              <th key={column.id}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {boardData.items_page.items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              {item.column_values.map((value) => (
                <td>{value.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </Box>
  );
}

export default App;
