// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Form, Field, reduxForm } from 'redux-form';
import scrollToComponent from 'react-scroll-to-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
// Actions
import * as finalStepActions from '../../actions/final.step';
// Selectors
import { finalStepPositionsSelector, finalStepSelectedPositionSelector, finalStepShirtSizeSelector } from './selectors';
import { stepOneFormValuesName } from '../StepOne/selectors';
// Constants
import { stepFinalFormFieldNames } from './selectors';
// Helpers
import validation from '../../helpers/validate';
// Styles
import './styles.scss';

class StepFinal extends React.Component {
  static propTypes = {
    finalStepActions: PropTypes.shape({
      finalStepGetCatalogPositionsRequest: PropTypes.func.isRequired,
      finalStepSetDefaultState: PropTypes.func.isRequired,
    }),
    sport: PropTypes.string.isRequired,
    positions: PropTypes.arrayOf(
      PropTypes.shape({
        position_id: PropTypes.string,
        name: PropTypes.string,
      }),
    ).isRequired,
    prefix: PropTypes.string,
    selectedPosition: PropTypes.string,
    shirtSize: PropTypes.string,
  };

  static defaultProps = {
    positions: [],
  };

  constructor(props) {
    super(props);
    this.stepFinal = React.createRef();
  }

  componentDidMount() {
    const { sport, participant } = this.props;
    this.finalStepGetCatalogPositions({ sport, participant });
    scrollToComponent(this.stepFinal.current);
  }

  componentWillMount() {
    this.setDefaultState();
  }

  render() {
    const { positions, prefix, selectedPosition, shirtSize } = this.props;
    return (
      <Container style={{ marginBottom: '65px' }} ref={this.stepFinal}>
        <Row>
          <Col>
            <Header
              header="step_final.header"
              subHeader="step_final.subHeader"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col style={{ padding: 0, margin: '0 1px' }}>
                <Card
                  buttonBlock={false}
                  cardHeader={<LocaleString stringKey="step_final.camper_information" />}
                  cardHeaderCapitalize={true}
                  id={0}
                  priceBlock={false}
                  style={{ marginBottom: 0 }}
                >
                  <CardContent>
                    <CardContentRow>
                      <CardContentCol>
                        <Form className="step-final__form" onSubmit={() => {}}>
                          <label className="step-final__form-control">
                            <Input
                              inputClassName="step-final__input"
                              name={`${prefix}_${stepFinalFormFieldNames.firstName}`}
                              label="first name"
                            />
                          </label>
                          <label className="step-final__form-control">
                            <Input
                              inputClassName="step-final__input"
                              name={`${prefix}_${stepFinalFormFieldNames.lastName}`}
                              label="last name"
                            />
                          </label>
                          <label className="step-final__form-control">
                            <Input
                              inputClassName="step-final__input"
                              name={`${prefix}_${stepFinalFormFieldNames.email}`}
                              label="email (optional)"
                            />
                          </label>
                          <label className="step-final__form-control">
                            <Input
                              inputClassName="step-final__input"
                              name={`${prefix}_${stepFinalFormFieldNames.phone}`}
                              label="phone number (optional)"
                            />
                          </label>
                        </Form>
                      </CardContentCol>
                    </CardContentRow>
                  </CardContent>
                </Card>
              </Col>
              <Col style={{ padding: 0, margin: '0 1px' }}>
                <Card
                  buttonBlock={false}
                  cardHeader={<LocaleString stringKey="step_final.position" />}
                  cardHeaderCapitalize={true}
                  id={1}
                  priceBlock={false}
                  style={{ marginBottom: 0 }}
                >
                  <CardContent>
                    <CardContentRow>
                      <CardContentCol>
                        <Form className="step-final__form" onSubmit={() => {}}>
                          <PositionRadioBtn
                            options={positions}
                            position={selectedPosition}
                            prefix={prefix}
                          />
                        </Form>
                      </CardContentCol>
                    </CardContentRow>
                  </CardContent>
                </Card>
              </Col>
              <Col style={{ padding: 0, margin: '0 1px' }}>
                <Card
                  buttonBlock={false}
                  cardHeader={<LocaleString stringKey="step_final.shirt_size" />}
                  cardHeaderCapitalize={true}
                  id={2}
                  priceBlock={false}
                  style={{ marginBottom: 0 }}
                >
                  <CardContent>
                    <CardContentRow>
                      <ShirtSizeRadioBtn
                        prefix={prefix}
                        shirtSize={shirtSize}
                      />
                    </CardContentRow>
                  </CardContent>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col style={{ padding: 0, margin: '0 1px' }}>
            <Card
              buttonBlock={false}
              cardHeader={<LocaleString stringKey="step_final.guardian_information" />}
              cardHeaderCapitalize={true}
              id={3}
              priceBlock={false}
            >
              <CardContent>
                <CardContentRow>
                  <CardContentCol>
                    <Form className="step-final__form" style={{ maxWidth: 'calc(100%/3)', marginRight: 'auto' }} onSubmit={() => {}}>
                      <label className="step-final__form-control">
                        <Input
                          inputClassName="step-final__input"
                          name={`${prefix}_${stepFinalFormFieldNames.guardianInformationFirstName}`}
                          label="first name"
                        />
                      </label>
                      <label className="step-final__form-control">
                        <Input
                          inputClassName="step-final__input"
                          name={`${prefix}_${stepFinalFormFieldNames.guardianInformationLastName}`}
                          label="last name"
                        />
                      </label>
                      <label className="step-final__form-control">
                        <Input
                          inputClassName="step-final__input"
                          name={`${prefix}_${stepFinalFormFieldNames.guardianInformationEmail}`}
                          label="email"
                        />
                      </label>
                      <label className="step-final__form-control">
                        <Input
                          inputClassName="step-final__input"
                          name={`${prefix}_${stepFinalFormFieldNames.guardianInformationPhone}`}
                          label="phone number"
                        />
                      </label>
                    </Form>
                  </CardContentCol>
                </CardContentRow>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  finalStepGetCatalogPositions = ({ sport, participant }) => {
    this.props.finalStepActions.finalStepGetCatalogPositionsRequest({ sport, participant });
  };

  setDefaultState = () => {
    this.props.finalStepActions.finalStepSetDefaultState();
  };
}

function PositionRadioBtn({ options, prefix, position }) {
  return (
    <Field
      name={`${prefix}_${stepFinalFormFieldNames.position}`}
      type="radio"
      options={options}
      component={({ input, options }) => (
        options.map(({ position_id, name }) => {
          return (
            <div key={position_id} className="step-final__radio">
              <Radio
                {...input}
                value={position_id}
                checked={position === position_id}
                children={name}
              />
            </div>
          );
      }))}
    />
  );
};

function ShirtSizeRadioBtn({ prefix, shirtSize }) {
  const options = [
    { id: 1, value: 'xs', stringKey: 'step_final.shirt_size.x-small' },
    { id: 2, value: 's', stringKey: 'step_final.shirt_size.small' },
    { id: 3, value: 'm', stringKey: 'step_final.shirt_size.medium' },
    { id: 4, value: 'l', stringKey: 'step_final.shirt_size.large' },
    { id: 5, value: 'xl', stringKey: 'step_final.shirt_size.x-large' },
    { id: 6, value: 'xxl', stringKey: 'step_final.shirt_size.xx-large' },
  ];
  return (
    <Field
      name={`${prefix}_${stepFinalFormFieldNames.shirtSize}`}
      type="radio"
      options={options}
      component={({ input, options }) => (
        <React.Fragment>
          <CardContentCol>
            <Form className="step-final__form" onSubmit={() => {}}>
              {
                options.map(({ id, value, stringKey }) => {
                  return (id % 2 === 0) && (
                    <div key={id} className="step-final__radio">
                      <Radio
                        {...input}
                        value={value}
                        checked={shirtSize === value}
                        children={<LocaleString stringKey={stringKey} />}
                      />
                    </div>
                  );
                })
              }
            </Form>
          </CardContentCol>
          <CardContentCol>
            <Form className="step-final__form" onSubmit={() => {}}>
              {
                options.map(({ id, value, stringKey }) => {
                  return (id % 2 !== 0) && (
                    <div key={id} className="step-final__radio">
                      <Radio
                        {...input}
                        value={value}
                        checked={shirtSize === value}
                        children={<LocaleString stringKey={stringKey} />}
                      />
                    </div>
                  );
                })
              }
            </Form>
          </CardContentCol>
        </React.Fragment>
      )}
    />
  );
}

function mapStateToProps(state) {
  return {
    positions: finalStepPositionsSelector(state),
    prefix: stepOneFormValuesName(state),
    selectedPosition: finalStepSelectedPositionSelector(state),
    shirtSize: finalStepShirtSizeSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    finalStepActions: bindActionCreators(finalStepActions, dispatch),
  };
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validation, // <------ validation
})(
  connect(mapStateToProps, mapDispatchToProps)(StepFinal)
);
