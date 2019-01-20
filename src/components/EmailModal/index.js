// Modules
import React from 'react';
import { Form, reduxForm } from 'redux-form';
// Components
import Input from '../Input';
import Button from '../Button';
import LocaleString from '../LocaleString';
// Helpers
import validation from '../../helpers/validate';
// Styles
import './styles.scss';

class EmailModal extends React.Component {
  render() {
    const { handleSubmit, onSubmit, shouldShowEmailModal } = this.props;
    return shouldShowEmailModal && (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="email-modal__container">
          <div className="email-modal__body">
            <h2 className="email-modal__header">
              <LocaleString stringKey="enter_your_email_message" />
            </h2>
            <p className="email-modal__description">
              <LocaleString stringKey="configured_camps_can_be_saved_and_shared" />
            </p>
            <div className="email-modal__input-container">
              <Input
                name="email"
                inputClassName="email-modal__input"
                errorBlockClassName="email-modal__error-block"
                label="email"
              />
            </div>
            <Button
              buttonClassName="email-modal__button"
              className="email-modal__button-block react-upper-case"
              children="build a camp now"
              type="submit"
            />
          </div>
        </div>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: validation, // <------ validation
})(EmailModal);
