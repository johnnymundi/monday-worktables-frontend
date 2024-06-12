import React from "react";
import { Dialog, DialogContentContainer, Text } from "monday-ui-react-core";

const ItemModal = ({ item, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{ zIndex: 1000, position: "relative" }}>
      <Dialog
        content={
          <DialogContentContainer>
            <Text>{item.name}</Text>
            {item.column_values.map((column) => (
              <Text key={column.id}>
                {column.type}: {column.value ? column.value : "N/A"}
              </Text>
            ))}
          </DialogContentContainer>
        }
        hideTrigger={["click"]}
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              mainAxis: false,
            },
          },
        ]}
        position="right"
        shouldShowOnMount={isOpen}
        showTrigger={["click"]}
        onClose={onClose}
        overlay={{ zIndex: 1000 }} // Ensuring the overlay has a high z-index
      />
    </div>
  );
};

export default ItemModal;
