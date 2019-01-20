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

const TotalAthleteCard = (props) => {
  const { selectedId, onClick, onRemove, price, label, id, header, soldOut, displayViaLabel } = props;
  return (
    <Card
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
    >
      <CardContentRow>
        <CardContentCol>
          <div className="total-athlete-card__container">
            <div className="total-athlete-card__column total-athlete-card__column--center total-athlete-card__column--lh-20">
              <span className="total-athlete-card__column--core">
                <LocaleString stringKey="core" />
              </span>
              <span className="total-athlete-card__column--group">
                <LocaleString stringKey="group" />
              </span>
              <span className="total-athlete-card__column--training">
                <LocaleString stringKey="training" />
              </span>
            </div>
            <ImagePlus className="total-athlete-card__image" />
          </div>
        </CardContentCol>
        <CardContentCol>
          <div className="core-card__container">
            <div className="total-athlete-card__column total-athlete-card__column--center total-athlete-card__column--lh-16">
              <span className="total-athlete-card__column--daily-training-concentration">
                <LocaleString stringKey="daily-training-concentration" />
              </span>
              <span className="total-athlete-card__column--or">
                -<LocaleString stringKey="or" />-
              </span>
              <span className="total-athlete-card__column--education-class">
                <LocaleString stringKey="education-class" />
              </span>
            </div>
          </div>
        </CardContentCol>
      </CardContentRow>
    </Card>
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
