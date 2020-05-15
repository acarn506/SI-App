import React from 'react';

import Modal from './Modal';
import Button from '../Button';

const ThanksModal = props => {
  return (
    <Modal
      onCancel={props.onRegister}
      header="Thanks for Registering, please sign-in"
      show={!!props.error}
      footer={<Button to='/sign-in' onClick={props.onRegister}>Sign-in</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ThanksModal;