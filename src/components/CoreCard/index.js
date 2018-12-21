// Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import Card, { CardContentRow, CardContentCol, ImagePlus } from '../Card';
import LocaleString from '../../components/LocaleString';
// Images
import footballCore from '../../assets/img/football-core_copy_2.png';
// Styles
import './styles.scss';

const CoreCard = (props) => {
  const { selectedId, onClick, price, label, id, header, soldOut, displayViaLabel } = props;
  return (
    <Card
      cardHeader={<LocaleString stringKey="group_sport_training" />}
      color="light-blue"
      header={header}
      headerSize="large"
      id={id}
      imgSrc={footballCore}
      label={label}
      onClick={onClick}
      price={price}
      selectedId={selectedId}
      size="large"
      via={displayViaLabel}
      soldOut={soldOut}
    >
      <CardContentRow>
        <CardContentCol>
          <div className="core-card__container">
            <div className="core-card__sessions core-card__sessions--center">
              <span className="core-card__text">
                <LocaleString stringKey="two_group_training_sessions" />
              </span>
              <span className="core-card__text core-card__text--bold core-card__text--16">
                <LocaleString stringKey="per_day" />
              </span>
            </div>
            <ImagePlus className="core-card__image" />
          </div>
        </CardContentCol>
        <CardContentCol>
          <div className="core-card__container">
            <div className="core-card__physical core-card__physical--center">
              <span className="core-card__text core-card__text--bold core-card__text--15">
                <LocaleString stringKey="physical_conditioning" />
              </span>
              <span className="core-card__text core-card__text--or">
                -<LocaleString stringKey="or" />-
              </span>
              <span className="core-card__text core-card__text--bold core-card__text--15">
                <LocaleString stringKey="mental_training" />
              </span>
            </div>
          </div>
        </CardContentCol>
      </CardContentRow>
    </Card>
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
