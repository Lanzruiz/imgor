// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import Card, { CardContentRow, CardContentCol, ImagePlus } from '../Card';
import LocaleString from '../../components/LocaleString';
// Images
import footballGameChanger from '../../assets/img/football-game-changer.png';
// Styles
import './styles.scss';

const GameChangerCard = (props) => {
  const { selectedId, onClick, price, label, id, header } = props;
  return (
    <Card
      cardHeader={<LocaleString stringKey="individualized_sport_training" />}
      color="red"
      header={header}
      headerSize="large"
      id={id}
      imgSrc={footballGameChanger}
      label={label}
      onClick={onClick}
      price={price}
      selectedId={selectedId}
      size="large"
      via={true}
    >
    <CardContentRow>
        <CardContentCol>
          <div className="game-changer-card__container">
            <div className="game-changer-card__column game-changer-card__column--center game-changer-card__column--lh-20">
              <span className="game-changer-card__column--core game-changer-card__column--lh-16">
                <LocaleString stringKey="core" />
              </span>
              <span className="game-changer-card__column--core-training game-changer-card__column--lh-16">
                <LocaleString stringKey="training" />
              </span>
              <span className="game-changer-card__column--ampersand">&</span>
              <span className="game-changer-card__column--breakthrough game-changer-card__column--lh-16">
                <LocaleString stringKey="breakthrough" />
              </span>
              <span className="game-changer-card__column--breakthrough-training game-changer-card__column--lh-16">
                <LocaleString stringKey="training" />
              </span>
            </div>
            <ImagePlus className="game-changer-card__image" />
          </div>
        </CardContentCol>
        <CardContentCol>
          <div className="game-changer-card__container">
            <div className="game-changer-card__column game-changer-card__column--center game-changer-card__column--lh-16">
              <span className="game-changer-card__column--daily-training-concentration">
                <LocaleString stringKey="daily-training-concentration" />
              </span>
              <span className="game-changer-card__column--or">
                -<LocaleString stringKey="or" />-
              </span>
              <span className="game-changer-card__column--education-class">
                <LocaleString stringKey="education-class" />
              </span>
            </div>
          </div>
        </CardContentCol>
      </CardContentRow>
    </Card>
  );
};

GameChangerCard.propTypes = {
  selectedId: PropTypes.number,
  onClick: PropTypes.func,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
};

GameChangerCard.defaultProps = {
  onClick: () => {},
  label: '',
  header: '',
};

export default GameChangerCard;
