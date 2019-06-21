// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import CardProduct, { CardContentRow, CardContentCol } from '../CardProduct';
import LocaleString from '../../components/LocaleString';
// Images
import footballGameChanger from '../../assets/img/football-game-changer.png';
// Styles
import './styles.scss';

const GameChangerCard = (props) => {
  const { selectedId, onClick, onRemove, price, label, id, header, soldOut, displayViaLabel } = props;
  return (
    <CardProduct
      cardHeader={<LocaleString stringKey="individualized_sport_training" />}
      color="red"
      header={header}
      headerSize="large"
      id={id}
      defaultImageSrc={footballGameChanger}
      imgSrc="step_three.game_changer_card.image_path"
      label={label}
      onClick={onClick}
      onRemove={onRemove}
      price={price}
      selectedId={selectedId}
      size="large"
      via={displayViaLabel}
      soldOut={soldOut}
      overRideButtonName={header}
    >
      <CardContentRow>
        <CardContentCol>
          <ul className="product-list">
            <li>
              <LocaleString stringKey="step_three.gamechanger.bullet.1" />
            </li>
            <li>
              <LocaleString stringKey="step_three.gamechanger.bullet.2" />
            </li>
            <li>
              <LocaleString stringKey="step_three.gamechanger.bullet.3" />
            </li>
          </ul>
        </CardContentCol>
      </CardContentRow>
    </CardProduct>
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
