import fetcher from '@utils/fetcher';
import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Redirect } from 'react-router';

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then((res) => {
        mutate(res.data, false);
      });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}//컴포넌트로 감싼 props
    </div>
  );
};

export default Workspace;
