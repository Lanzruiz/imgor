// Modules
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Form, Field, reduxForm } from 'redux-form';
import scrollToComponent from 'react-scroll-to-component';
// Components
import Header from '../../components/Header';
import Card, { CardContent, CardContentRow, CardContentCol } from '../../components/Card';
import LocaleString from '../../components/LocaleString';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
// Helpers
import validation from '../../helpers/validate';
// Styles
import './styles.scss';

class StepFinal extends React.Component {
  constructor(props) {
    super(props);
    this.stepFinal = React.createRef();
  }

  componentDidMount() {
    scrollToComponent(this.stepFinal.current);
  }

  render() {
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
                              name="first_name"
                              label="first name"
                            />
                          </label>
                          <label className="step-final__form-control">
                            <Input
                              inputClassName="step-final__input"
                              name="last_name"
                              label="last name"
                            />
                          </label>
                          <label className="step-final__form-control">
                            <Input
                              inputClassName="step-final__input"
                              name="email"
                              label="email (optional)"
                            />
                          </label>
                          <label className="step-final__form-control">
                            <Input
                              inputClassName="step-final__input"
                              name="phone"
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
                          <Field
                            name="position"
                            value="wing"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.position.wing" />}
                          />
                          <Field
                            name="position"
                            value="point guard"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.position.point_guard" />}
                          />
                          <Field
                            name="position"
                            value="center"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.position.center" />}
                          />
                          <Field
                            name="position"
                            value="power forward"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.position.power_forward" />}
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
                      <CardContentCol>
                        <Form className="step-final__form" onSubmit={() => {}}>
                          <Field
                            name="shirt_size"
                            value="x-small"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.shirt_size.x-small" />}
                          />
                          <Field
                            name="shirt_size"
                            value="medium"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.shirt_size.medium" />}
                          />
                          <Field
                            name="shirt_size"
                            value="x-large"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.shirt_size.x-large" />}
                          />
                        </Form>
                      </CardContentCol>
                      <CardContentCol>
                        <Form className="step-final__form" onSubmit={() => {}}>
                          <Field
                            name="shirt_size"
                            value="small"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.shirt_size.small" />}
                          />
                          <Field
                            name="shirt_size"
                            value="large"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.shirt_size.large" />}
                          />
                          <Field
                            name="shirt_size"
                            value="xx-large"
                            type="radio"
                            component={this.renderRadio}
                            className="step-final__radio"
                            children={<LocaleString stringKey="step_final.shirt_size.xx-large" />}
                          />
                        </Form>
                      </CardContentCol>
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
                          name="guardian_information.first_name"
                          label="first name"
                        />
                      </label>
                      <label className="step-final__form-control">
                        <Input
                          inputClassName="step-final__input"
                          name="guardian_information.last_name"
                          label="last name"
                        />
                      </label>
                      <label className="step-final__form-control">
                        <Input
                          inputClassName="step-final__input"
                          name="guardian_information.email"
                          label="email"
                        />
                      </label>
                      <label className="step-final__form-control">
                        <Input
                          inputClassName="step-final__input"
                          name="guardian_information.phone"
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

  renderRadio = ({ input, className, ...rest }) => {
    return (
      <Radio
        {...input}
        {...rest}
        className={className}
      />
    );
  }
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validation, // <------ validation
})(StepFinal);
