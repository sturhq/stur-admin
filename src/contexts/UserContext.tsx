import React, {createContext, useEffect, useState} from 'react';
import {useGetUser} from '@/services/user.service';
import {USERDATA} from './types';
import LoaderScreen from '@/components/organisms/LoaderScreen';
import {useGetPresignedUrl} from '@/services/fileupload.service';

type UserContextType = {
  userData: USERDATA;
  setUserData: React.Dispatch<React.SetStateAction<USERDATA>>;
  refresh: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({children}: UserProviderProps) => {
  const [localUserData, setLocalUserData] = useState<USERDATA>(null);

  const userId = window.localStorage.getItem('userId');
  const accessToken = window.localStorage.getItem('accessToken');

  const {data, refetch: refresh, isLoading} = useGetUser(userId);

  const {refetch} = useGetPresignedUrl(1);

  // derive userData: if manually updated, use localUserData; otherwise fallback to API response
  const userData: USERDATA =
    localUserData ?? (data?.data?.data?.user || null);

  // Automatically refetch presigned URL if token is available
  useEffect(() => {
    if (accessToken) {
      refetch();
    }
  }, [accessToken, refetch]);

  // Whenever userData changes, update localStorage
  useEffect(() => {
    if (userData?.store?._id) {
      window.localStorage.setItem('storeId', userData.store._id);
    }
  }, [userData]);

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <UserContext.Provider
      value={{userData, setUserData: setLocalUserData, refresh: refresh}}
    >
      {children}
    </UserContext.Provider>
  );
};
