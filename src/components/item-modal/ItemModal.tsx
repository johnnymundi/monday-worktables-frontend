/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  ModalContent,
  Box,
  TabsContext,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "monday-ui-react-core";
import ModalChart from "../ModalChart/ModalChart"; // Importe o componente ModalChart
import DataService from "../../services/dataService";
import "./ItemModal.css";
import { Heading } from "monday-ui-react-core/next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";

// types
import {
  ItemType,
  RegionType,
  SubRegionType,
} from "../../definitions/interfaces";

interface Props {
  item: ItemType; // Substitua ItemType pelo tipo correto do seu item
  regions: RegionType[]; // Substitua RegionType pelo tipo correto das regiões
  subRegions: SubRegionType[]; // Substitua SubRegionType pelo tipo correto das sub-regiões
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal: React.FC<Props> = ({
  item,
  regions,
  subRegions,
  isOpen,
  onClose,
}) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [area, setArea] = useState(null);
  const [population, setPopulation] = useState(null);
  const [currentRegion, setCurrentRegion] = useState("");
  const [currentSubRegion, setCurrentSubRegion] = useState("");

  useEffect(() => {
    console.log("item", item);
    console.log("regions", regions);
    setCurrentRegion(JSON.parse(item.column_values[0].value).index);
    setCurrentSubRegion(JSON.parse(item.column_values[1].value).index);
    setArea(item.column_values[14].value.replace(/"/g, ""));
    setPopulation(item.column_values[13].value.replace(/"/g, ""));

    const getWeather = async (country: any) => {
      try {
        const response = await DataService.get(`/forecast/${country}`);

        // Setando os estados com os dados recebidos
        setWeather(response.weather);
        console.log("");
        setForecast(response.forecast);
        setLocation(response.location);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Chamando a função para buscar dados se o modal estiver aberto e o item existir
    if (isOpen && item && item.name) {
      getWeather(item.name);
    }
  }, [item, isOpen, subRegions, regions]); // Dependências do useEffect para garantir que ele seja chamado quando necessário

  if (!isOpen || !weather || !forecast || !location) return null; // Verificação inicial para garantir que todos os dados necessários estão carregados

  const getRegionLabel = (index) => {
    return regions.labels[index] || "Unknown region";
  };

  const getSubRegionLabel = (index) => {
    return subRegions.labels[index] || "Unknown region";
  };

  return (
    <Modal
      contentSpacing
      id="story-book-modal"
      onClose={onClose}
      title={item.name}
      triggerElement={undefined}
      show={isOpen}
      width={"720px"}
    >
      <ModalContent>
        <TabsContext>
          <TabList>
            <Tab>Temperature</Tab>
            <Tab>Geografia</Tab>
            <Tab>Demografia</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="temperatura-info">
              <Box className="temperature">
                <Box className="temperature-current">
                  <Box className="temperature-icon">
                    <FontAwesomeIcon icon={faTemperatureHigh} />
                    <Heading type="h2" className="modal-heading">
                      {weather.tempC}°C
                    </Heading>
                  </Box>

                  <img
                    src={weather.condition.icon}
                    alt={weather.condition.text}
                  />
                </Box>
                <Box className="temperature-levels">
                  <Text type={Text.types.TEXT1}>
                    Máxima: {forecast.day.maxTempC}°C
                  </Text>
                  <Text type={Text.types.TEXT1}>
                    Mínima: {forecast.day.minTempC}°C
                  </Text>
                  <Text type={Text.types.TEXT1}>
                    Umidade: {weather.humidity}%
                  </Text>
                </Box>
              </Box>
              <Box className="chart-box">
                <ModalChart forecast={forecast.hour} />
              </Box>
            </TabPanel>
            <TabPanel className="geo">
              <Box className="geo-wrapper">
                <Box className="geo-card">
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Region</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {getRegionLabel(currentRegion)}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Subregion</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {getSubRegionLabel(currentSubRegion)}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Capital</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {item.column_values[2].value.replace(/"/g, "")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Currency</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {item.column_values[8].value.replace(/"/g, "")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Area</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {parseInt(area).toLocaleString()}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel className="geo">
              <Box className="geo-wrapper">
                <Box className="geo-card">
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Population</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {parseInt(population).toLocaleString()}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Population Density</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {item.column_values[15].value.replace(/"/g, "")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Birthrate</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {item.column_values[18].value.replace(/"/g, "")}
                      </Text>
                    </Box>
                  </Box>
                  <Box className="geo-cell">
                    <Box className="cell-title">
                      <Text type={Text.types.TEXT1}>Deathrate</Text>
                    </Box>
                    <Box className="cell-info" border="black">
                      <Text type={Text.types.TEXT1}>
                        {item.column_values[19].value.replace(/"/g, "")}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </TabsContext>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
