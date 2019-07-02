// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import CardProduct, { CardContentRow, CardContentCol } from '../CardProduct';
import LocaleString from '../../components/LocaleString';
// Images
import footballCore from '../../assets/img/football-core_copy_2.png';
// Styles
import './styles.scss';

const TotalAthleteCard = (props) => {
  const { selectedId, onClick, onRemove, price, label, id, header, soldOut, displayViaLabel } = props;
  return (
    <CardProduct
      cardHeader={<LocaleString stringKey="group_sport_training" />}
      color="blue"
      header={header}
      headerSize="large"
      id={id}
      defaultImageSrc={footballCore}
      imgSrc="step_three.total_athlete_card.image_path"
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
              <LocaleString stringKey="step_three.totalathlete.bullet.1" />
            </li>
            <li>
              <LocaleString stringKey="step_three.totalathlete.bullet.2" />
            </li>
            <li>
              <LocaleString stringKey="step_three.totalathlete.bullet.3" />
            </li>
          </ul>
        </CardContentCol>
      </CardContentRow>
    </CardProduct>
  );
};

TotalAthleteCard.propTypes = {
  selectedId: PropTypes.number,
  onClick: PropTypes.func,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
};

TotalAthleteCard.defaultProps = {
  onClick: () => {},
  label: '',
  header: '',
};

export default TotalAthleteCard;
