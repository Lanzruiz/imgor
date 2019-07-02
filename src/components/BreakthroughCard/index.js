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

const BreakthroughCard = (props) => {
  const { selectedId, onClick, onRemove, price, label, id, header, soldOut, displayViaLabel, viaLogoPath } = props;
  return (
    <CardProduct
      cardHeader={<LocaleString stringKey="individualized_sport_training" />}
      color="dark-blue"
      header={header}
      headerSize="large"
      id={id}
      defaultImageSrc={footballGameChanger}
      imgSrc="step_three.breakthrough.image_path"
      label={label}
      onClick={onClick}
      onRemove={onRemove}
      price={price}
      selectedId={selectedId}
      size="large"
      via={displayViaLabel}
      soldOut={soldOut}
      viaLogoPath={viaLogoPath}
      overRideButtonName={header}
    >
      <CardContentRow>
        <CardContentCol>
          <ul className="product-list">
            <li>
              <LocaleString stringKey="step_three.breakthrough.bullet.1" />
            </li>
            <li>
              <LocaleString stringKey="step_three.breakthrough.bullet.2" />
            </li>
            <li>
              <LocaleString stringKey="step_three.breakthrough.bullet.3" />
            </li>
          </ul>
        </CardContentCol>
      </CardContentRow>
    </CardProduct>
  );
};

BreakthroughCard.propTypes = {
  selectedId: PropTypes.number,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
};

BreakthroughCard.defaultProps = {
  onClick: () => {},
  label: '',
  header: '',
};

export default BreakthroughCard;
