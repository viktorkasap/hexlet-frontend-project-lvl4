import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Add from './Add';
import Rename from './Rename';
import Remove from './Remove';

const ModalComponent = (props) => {

  const { type } = props;
  const modal = {
    addChannel: Add,
    renameChannel: Rename,
    removeChannel: Remove,
  };

  const Component = modal[type];

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
      <Component {...props} />
  );

};

const Modal = ({ onHide }) => {

  const type = useSelector(({ modal }) => modal.type);

  return (
      <>
          { type && <ModalComponent
type={type}
onHide={onHide} /> }
      </>
  );

};

export default Modal;
