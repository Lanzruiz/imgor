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
  const { selectedId, onClick, price, label, id, header } = props;
  return (
    <Card
      cardHeader={<LocaleString stringKey="individualized_sport_training" />}
      color="dark-blue"
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
              <span className="breakthrough-card__column--position">
                <LocaleString stringKey="position" />
              </span>
              <span className="breakthrough-card__column--specific">
                <LocaleString stringKey="specific" />
              </span>
              <span className="breakthrough-card__column--coaching">
                <LocaleString stringKey="coaching" />
              </span>
            </div>
            <ImagePlus className="breakthrough-card__image" />
          </div>
        </CardContentCol>
        <CardContentCol>
          <div className="breakthrough-card__container">
            <div className="breakthrough-card__column breakthrough-card__column--center breakthrough-card__column--lh-20">
              <span className="breakthrough-card__column--small-group">
                <LocaleString stringKey="small_group" />
              </span>
              <span className="breakthrough-card__column--skills">
                <LocaleString stringKey="skills" />
              </span>
              <span className="breakthrough-card__column--training">
                <LocaleString stringKey="training" />
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
