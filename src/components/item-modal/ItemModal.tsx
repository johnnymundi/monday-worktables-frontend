import React, { useEffect } from "react";
import { Modal, Text, ModalContent } from "monday-ui-react-core";

import DataService from "../../services/dataService";

const ItemModal = ({ item, isOpen, onClose }) => {
  if (!isOpen) return null;
  console.log("item", item);

  useEffect(() => {
    const getWeather = async (country: string) => {
      const res = await DataService.get(`/weather/${country}`);
      console.log("res", res);
    };

    getWeather(item.column_values[2].id);
  }, [item]);

  console.log("item", item.capital);

  return (
    <div style={{ zIndex: 1000, position: "relative" }}>
      <Modal
        contentSpacing
        description="Subtitle description text goes here"
        id="story-book-modal"
        onClose={onClose}
        title={item.name}
        triggerElement={undefined}
        show={isOpen}
      >
        <ModalContent>
          <Text>{item.name}</Text>
          {item.column_values.map((column) => (
            <Text key={column.id}>
              {column.id}: {column.value ? column.value.substr(0, 30) : "N/A"}
            </Text>
          ))}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ItemModal;
