import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import {
  QuickSelect,
  ResultCryptLayoutText,
  ResultLibraryLayoutText,
  ButtonCardCopyUrl,
  ButtonSearchTwd,
  ButtonSearchPda,
  ButtonAddCard,
  ButtonIconed,
  CardImage,
} from 'components';
import { useApp } from 'context';

function Cards({ lastDeckId }) {
  const params = useParams();
  const {
    decks,
    cryptCardBase,
    libraryCardBase,
    showImage,
    toggleShowImage,
    isMobile,
    activeDeck,
  } = useApp();

  const [cardId, setCardId] = useState(undefined);
  const [card, setCard] = useState(undefined);
  const [imageSet, setImageSet] = useState(null);
  const navigate = useNavigate();

  const randomCrypt = () => {
    const id =
      Math.floor(
        Math.random() * Math.floor(Object.keys(cryptCardBase).length)
      ) + 200000;
    setCardId(id);
  };

  const randomLibrary = () => {
    const id =
      Math.floor(
        Math.random() * Math.floor(Object.keys(libraryCardBase).length)
      ) + 100000;
    setCardId(id);
  };

  const deckId = activeDeck.src == 'my' ? activeDeck.deckid : lastDeckId;

  let inDeck = 0;
  if (
    cardId &&
    decks &&
    decks[deckId] &&
    (decks[deckId].crypt[cardId] || decks[deckId].library[cardId])
  ) {
    inDeck =
      cardId > 200000
        ? decks[deckId].crypt[cardId].q
        : decks[deckId].library[cardId].q;
  }

  useEffect(() => {
    if (!cardId) setCardId(params.id);
  }, [params.id]);

  useEffect(() => {
    if (cardId) {
      if (params.id !== cardId) navigate(`/cards/${cardId}`);
      cardId > 200000
        ? setCard(cryptCardBase[cardId])
        : setCard(libraryCardBase[cardId]);
    }
  }, [cardId]);

  return (
    <Container className="cards-container p-0">
      <>
        {isMobile ? (
          <>
            <Row className="align-content-center justify-content-center mx-0 px-1 py-1">
              <Col md={8} className="px-0">
                <QuickSelect setCardId={setCardId} />
                <div
                  onClick={() => randomCrypt()}
                  className="d-flex float-right-top float-random align-items-center justify-content-center"
                >
                  <Dice3 viewBox="0 0 16 16" className="pe-1" /> C
                </div>
                <div
                  onClick={() => randomLibrary()}
                  className="d-flex float-right-middle float-random align-items-center justify-content-center"
                >
                  <Dice3 viewBox="0 0 16 16" className="pe-1" /> L
                </div>
              </Col>
            </Row>
            {card && (
              <>
                <Row className="m-0 p-0">
                  <Col className="m-0 p-0">
                    {showImage ? (
                      <CardImage
                        className="card-popover full-width"
                        card={card}
                        set={imageSet}
                      />
                    ) : (
                      <>
                        <div className="p-3">
                          {card && card.Id > 200000 && (
                            <ResultCryptLayoutText
                              card={card}
                              setCardId={setCardId}
                              setImageSet={setImageSet}
                            />
                          )}
                          {card && card.Id < 200000 && (
                            <ResultLibraryLayoutText
                              card={card}
                              setCardId={setCardId}
                              setImageSet={setImageSet}
                            />
                          )}
                        </div>
                        <Stack className="ps-3" direction="horizontal" gap={1}>
                          <ButtonCardCopyUrl id={cardId} />
                          <ButtonSearchTwd id={card.Id} />
                          <ButtonSearchPda id={card.Id} />
                          {deckId && (
                            <ButtonAddCard
                              cardid={cardId}
                              deckid={deckId}
                              inDeck={inDeck}
                              inQuick={true}
                            />
                          )}
                        </Stack>
                      </>
                    )}
                  </Col>
                </Row>
                <div
                  onClick={() => toggleShowImage()}
                  className="d-flex float-right-bottom float-turn align-items-center justify-content-center"
                >
                  <ArrowRepeat viewBox="0 0 16 16" />
                </div>
              </>
            )}
          </>
        ) : (
          <Row>
            <Col md={{ span: 8, offset: 2 }} className="quick-cards">
              {cryptCardBase && libraryCardBase && (
                <Row className="align-content-center justify-content-center py-3">
                  <Col className="px-0">
                    <QuickSelect setCardId={setCardId} />
                  </Col>
                </Row>
              )}
              {card && (
                <Row className="align-content-center justify-content-center my-3 bordered">
                  <Col md={6} className="ps-0">
                    <CardImage
                      className="card-popover full-width"
                      card={card}
                      set={imageSet}
                    />
                  </Col>
                  <Col md={6} className="pt-3">
                    {card.Id > 200000 && (
                      <ResultCryptLayoutText
                        card={card}
                        setCardId={setCardId}
                        setImageSet={setImageSet}
                      />
                    )}
                    {card.Id < 200000 && (
                      <ResultLibraryLayoutText
                        card={card}
                        setCardId={setCardId}
                        setImageSet={setImageSet}
                      />
                    )}
                    <Stack className="pt-3" direction="horizontal" gap={1}>
                      <ButtonCardCopyUrl id={card.Id} />
                      <ButtonSearchTwd id={card.Id} />
                      <ButtonSearchPda id={card.Id} />
                      {deckId && (
                        <ButtonAddCard
                          deckid={deckId}
                          card={card}
                          inDeck={inDeck}
                          inQuick={true}
                        />
                      )}
                    </Stack>
                  </Col>
                </Row>
              )}
            </Col>
            {!isMobile && (
              <Col>
                <Stack gap={1} className="py-3 px-2">
                  <ButtonIconed
                    variant="secondary"
                    onClick={() => randomCrypt()}
                    title="Random Crypt Card"
                    icon={<Dice3 />}
                    text="Crypt"
                  />
                  <ButtonIconed
                    variant="secondary"
                    onClick={() => randomLibrary()}
                    title="Random Library Card"
                    icon={<Dice3 />}
                    text="Library"
                  />
                </Stack>
              </Col>
            )}
          </Row>
        )}
      </>
    </Container>
  );
}

export default Cards;
