import React from 'react';
import { useTranslation } from 'react-i18next';

export const Header = ({ channelName, count }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0 fw-bold">
        #
        { channelName }
      </p>
      <span className="text-muted">
        { t('home.count', { count }) }
      </span>
    </div>
  );
};
