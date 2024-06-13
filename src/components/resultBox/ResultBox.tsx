import { Box, Text, Clickable } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import React, { useState } from "react";
import ItemModal from "../item-modal/ItemModal"; // Certifique-se de que o caminho está correto

const ResultBox = ({ resultData, regions, subRegions }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box textColor="Box-module_textPrimaryTextColor" className="result-box">
      {resultData.length > 0 ? (
        resultData.map((item) => (
          <Box
            key={item.id}
            backgroundColor="Box-module_bgSecondaryBackgroundColor"
            border="Box-module_border"
            rounded="Box-module_roundedMedium"
          >
            <Clickable onClick={() => handleModal(item)}>
              <Heading type="h3">{item.name}</Heading>
            </Clickable>
          </Box>
        ))
      ) : (
        <Box
          backgroundColor="Box-module_bgPrimaryBackgroundColor"
          border="Box-module_border"
          rounded="Box-module_roundedMedium"
        >
          <Heading>No results</Heading>
        </Box>
      )}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          regions={regions}
          subRegions={subRegions}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </Box>
  );
};

export default ResultBox;
