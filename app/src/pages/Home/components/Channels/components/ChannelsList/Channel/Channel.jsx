import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Nav, Dropdown, Button, ButtonGroup,
} from 'react-bootstrap';

import { setCurrentChannelId } from '../../../../../../../store/channels';

const ButtonChannelRemovable = ({
  onclick, variant, name, id, handleRemove, handleRename,
}) => {
  const { t } = useTranslation();

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <Button variant={variant} className="text-start w-100 text-truncate" onClick={onclick(id)}>
        <span className="me-1">#</span>
        {name}
      </Button>

      <Dropdown.Toggle split variant={variant} className="flex-grow-0 text-end" />
      <Dropdown.Menu>

        <Dropdown.Item onClick={handleRemove(id)}>
          { t('channel.remove') }
        </Dropdown.Item>
        <Dropdown.Item onClick={handleRename(id)}>
          { t('channel.rename') }
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ButtonChannel = ({
  onclick, variant, name, id,
}) => (
  <Button variant={variant} className="text-start w-100 text-truncate" onClick={onclick(id)}>
    <span className="me-1">#</span>
    {' '}
    {name}
  </Button>
);

export const Channel = ({
  channelData, currentChannelId, handleRename, handleRemove,
}) => {
  const dispatch = useDispatch();
  const { id, name, removable } = channelData;
  const variant = id === currentChannelId ? 'secondary' : 'light';

  const onClick = (currentId) => () => {
    dispatch(setCurrentChannelId(currentId));
  };

  return (
    <Nav.Item className="w-100" as="li">
      {
        removable
          ? (
            <ButtonChannelRemovable
              handleRename={handleRename}
              handleRemove={handleRemove}
              onclick={onClick}
              variant={variant}
              name={name}
              id={id}
            />
          )
          : (
            <ButtonChannel
              onclick={onClick}
              variant={variant}
              name={name}
              id={id}
            />
          )
      }
    </Nav.Item>
  );
};
