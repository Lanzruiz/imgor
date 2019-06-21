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
//  const { selectedId, onClick, onRemove, price, label, id, header, soldOut, displayViaLabel, viaLogoPath } = props;
//  header={header}

const CoreCard = (props) => {
  const { selectedId, onClick, onRemove, price, label, id, soldOut, displayViaLabel, viaLogoPath } = props;
  return (
    <CardProduct
      cardHeader={<LocaleString stringKey="group_sport_training" />}
      color="light-blue"
      header=<LocaleString stringKey="step_three.core" />
      headerSize="large"
      id={id}
      viaLogoPath={viaLogoPath}
      defaultImageSrc={footballCore}
      imgSrc="step_three.core.image_path"
      label={label}
      onClick={onClick}
      onRemove={onRemove}
      price={price}
      selectedId={selectedId}
      size="large"
      via={displayViaLabel}
      soldOut={soldOut}
      overRideButtonName=<LocaleString stringKey="step_three.core" />
    >
      <CardContentRow>
        <CardContentCol>
          <ul className="product-list">
            <li>
              <LocaleString stringKey="step_three.core.bullet.1" />
            </li>
            <li>
              <LocaleString stringKey="step_three.core.bullet.2" />
            </li>
            <li>
              <LocaleString stringKey="step_three.core.bullet.3" />
            </li>
          </ul>
        </CardContentCol>
      </CardContentRow>
    </CardProduct>
  );
};

CoreCard.propTypes = {
  selectedId: PropTypes.number,
  onClick: PropTypes.func,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
};

CoreCard.defaultProps = {
  onClick: () => {},
  label: '',
  header: '',
};

export default CoreCard;
