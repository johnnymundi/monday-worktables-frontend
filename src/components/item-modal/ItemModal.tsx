import React, { useEffect, useState } from "react";
import { Modal, Text, ModalContent, Box } from "monday-ui-react-core";
import ModalChart from "../ModalChart/ModalChart"; // Importe o componente ModalChart
import DataService from "../../services/dataService";
import "./ItemModal.css";
import { Heading } from "monday-ui-react-core/next";

const ItemModal = ({ item, isOpen, onClose }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getWeather = async (country) => {
      try {
        const response = await DataService.get(`/forecast/${country}`);
        console.log("response", response);

        // Setando os estados com os dados recebidos
        setWeather(response.weather);
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
  }, [item, isOpen]); // Dependências do useEffect para garantir que ele seja chamado quando necessário

  if (!isOpen || !weather || !forecast || !location) return null; // Verificação inicial para garantir que todos os dados necessários estão carregados

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
        <Box className="modal-subheading">
          <Box className="moda-subheading-current">
            <Heading type="h2">{weather.tempC}°C</Heading>
            <img src={weather.condition.icon} alt={weather.condition.text} />
          </Box>
          <Box className="modal-subheading-levels">
            <Text>Máxima: {forecast.day.maxTempC}°C</Text>
            <Text>Mínima: {forecast.day.minTempC}°C</Text>
            <Text>Umidade: {weather.humidity}%</Text>
          </Box>
        </Box>
        <Box></Box>

        <Box className="chart-box">
          <ModalChart forecast={forecast.hour} />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
