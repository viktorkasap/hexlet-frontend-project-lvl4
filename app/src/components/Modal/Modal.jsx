import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { Add } from './Add';
import { Rename } from './Rename';
import { Remove } from './Remove';

const ModalComponent = (props) => {
  const { type } = props;
  const modal = {
    addChannel: Add,
    renameChannel: Rename,
    removeChannel: Remove,
  };

  const Component = modal[type];

  return (
    <Component {...props} />
  );
};

export const Modal = (props) => {
  const type = useSelector(({ modal }) => modal.type);

  return (
    <>
      { type && <ModalComponent type={type} {...props} /> }
    </>
  );
};
