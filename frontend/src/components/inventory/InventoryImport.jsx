import React, { useState, useRef } from 'react';
import {
  ErrorOverlay,
  InventoryImportButton,
  DeckImportBadCardsModal,
} from 'components';
import { useApp } from 'context';
import { useDeckImport } from 'hooks';

const InventoryImport = () => {
  const { activeDeck, inventoryCardsAdd, cryptCardBase, libraryCardBase } =
    useApp();

  const [importError, setImportError] = useState(false);
  const [badCards, setBadCards] = useState([]);
  const ref = useRef(null);
  const fileInput = React.createRef();

  const handleFileInputClick = () => {
    fileInput.current.click();
  };

  const importDeckFromFile = (fileInput) => {
    setImportError(false);

    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsText(file);
    reader.onload = async () => {
      let deckText;

      if (file.type === 'text/plain') {
        deckText = reader.result;
      } else {
        deckText = '';
        const cards = reader.result.split('\n');
        cards.forEach((res) => {
          const card = res.split(',');
          if (card.length >= 5) {
            let name = card[0].slice(1);
            const n = card.length - 5;
            if (n) {
              for (let i = 1; i <= n; i++) {
                name += `, ${card[i]}`;
              }
            }
            name = name.slice(0, -1);
            const q = card[n + 1];

            if (q && name) deckText += `${q} ${name}\n`;
          }
        });
      }

      const deck = await useDeckImport(
        deckText,
        cryptCardBase,
        libraryCardBase
      );

      inventoryCardsAdd(deck.cards);
    };
  };

  return (
    <>
      <InventoryImportButton handleClick={handleFileInputClick} />
      {badCards && (
        /* TODO FIX FOR INVENTORY */
        <DeckImportBadCardsModal
          deckid={activeDeck.deckid}
          badCards={badCards}
          setBadCards={setBadCards}
        />
      )}
      <input
        ref={fileInput}
        accept="text/*"
        type="file"
        onChange={() => importDeckFromFile(fileInput)}
        style={{ display: 'none' }}
      />
      <ErrorOverlay
        show={importError}
        target={ref.current}
        placement="left"
        modal={true}
      >
        {importError && <b>CANNOT IMPORT THIS INVENTORY</b>}
      </ErrorOverlay>
    </>
  );
};

export default InventoryImport;
