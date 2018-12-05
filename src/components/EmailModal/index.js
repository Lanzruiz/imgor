// Modules
import React from 'react';
import { Form, reduxForm } from 'redux-form';
// Components
import Input from '../Input';
import Button from '../Button';
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
              Enter your email to build a camp
            </h2>
            <p className="email-modal__description">
              Configured camps can be saved and shared!
            </p>
            <div className="email-modal__input-container">
              <Input
                name="email"
                inputClassName="email-modal__input"
                errorBlockClassName="email-modal__error-block"
                label="Email"
              />
            </div>
            <Button
              buttonClassName="email-modal__button"
              className="email-modal__button-block upper-case"
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
