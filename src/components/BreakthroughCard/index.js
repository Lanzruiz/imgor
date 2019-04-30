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

const BreakthroughCard = (props) => {
  const { selectedId, onClick, onRemove, price, label, id, header, soldOut, displayViaLabel, viaLogoPath } = props;
  return (
    <Card
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
    >
      <CardContentRow>
        <CardContentCol>
          <div className="breakthrough-card__container">
            <div className="breakthrough-card__column breakthrough-card__column--center breakthrough-card__column--lh-20">
              <span className="breakthrough-card__column--core">
                <LocaleString stringKey="core" />
              </span>
              <span className="breakthrough-card__column--group">
                <LocaleString stringKey="group" />
              </span>
              <span className="breakthrough-card__column--training">
                <LocaleString stringKey="training" />
              </span>
            </div>
            <ImagePlus className="breakthrough-card__image" />
          </div>
        </CardContentCol>
        <CardContentCol>
          <div className="breakthrough-card__container">
            <div className="breakthrough-card__column breakthrough-card__column--center breakthrough-card__column--lh-20">
              <span className="breakthrough-card__column--position breakthrough-card__column--ratio">
                <LocaleString stringKey="breakthroug-ratio" />
              </span>
              <span className="breakthrough-card__column--specific breakthrough-card__column--small-group">
                <LocaleString stringKey="small_group" />
              </span>
              <span className="breakthrough-card__column--coaching breakthrough-card__column--instruction">
                <LocaleString stringKey="instruction" />
              </span>
            </div>
            <ImagePlus className="breakthrough-card__image" />
          </div>
        </CardContentCol>
        <CardContentCol>
          <div className="breakthrough-card__container">
            <div className="breakthrough-card__column breakthrough-card__column--center breakthrough-card__column--lh-20">
              <span className="breakthrough-card__column--skills">
                <LocaleString stringKey="skills" />
              </span>
              <span className="breakthrough-card__column--training breakthrough-card__column--instruction">
                <LocaleString stringKey="instruction" />
              </span>
            </div>
          </div>
        </CardContentCol>
      </CardContentRow>
    </Card>
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
