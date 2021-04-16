import React, {
  FC, useEffect, useRef, useState
} from 'react';
import { User } from '@supabase/supabase-js';
import { BandList } from '@components/Settings/Band/BandList';
import { Button } from '@components/Button';

import { useUserData } from '@h/useUserData';
import { useAuth } from '@h/useAuth';
import { deepEqual } from '@helper/comparator';
import { useHistory } from 'react-router-dom';

import { defaultUserSettings, UserSettings, Band } from '@t/UserSettings';
import { R } from '@r/index';
import { cloneDeep } from 'lodash';

import './styles.scss';

const Settings: FC = () => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsChanged, setIsSettingsChanged] = useState(false);

  const settingsRef = useRef<UserSettings>(defaultUserSettings);

  const { user: authUser } = useAuth();
  const { getUserSettings, updateSettings } = useUserData();
  const { push } = useHistory();

  const user = authUser() as User;

  const retrieveUserData = async () => {
    try {
      const response = await getUserSettings(user.id);
      if (!response) {
        setUserSettings(defaultUserSettings);
        return;
      }

      setUserSettings(response);
      settingsRef.current = cloneDeep(response);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBands = (bands: Band[]) => {
    setUserSettings((prev) => ({ ...prev, bands }));
  };

  const saveSettings = async () => {
    const response = await updateSettings(user.id, userSettings as UserSettings);
    if (response) {
      push(R.DASHBOARD);
    }
  };

  useEffect(() => {
    retrieveUserData();
  }, []);

  useEffect(() => {
    setIsSettingsChanged(!deepEqual(userSettings, settingsRef.current));
  }, [userSettings]);

  return (
    <div className="page">
      <h1 className="heading heading--1 heading--top-heading">Settings</h1>
      {!isLoading ? (
        <div className="settings-page__content">
          <BandList className="settings-page__band-list" defaultBands={userSettings?.bands} onSave={saveBands} />
          {isSettingsChanged && <Button onClick={saveSettings} className="settings-page__submit-button" type="primary" size="s">Save Changes</Button>}
        </div>
      ) : (
        <div className="settings-page__loading-container" />
      ) }
    </div>
  );
};

export default Settings;
