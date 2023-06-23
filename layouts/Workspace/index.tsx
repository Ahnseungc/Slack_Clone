import {
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceName,
  WorkspaceWrapper,
  Workspaces,
  ProfileModal,
  LogOutButton,
} from '@layouts/Workspace/styles';
import fetcher from '@utils/fetcher';
import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Redirect } from 'react-router';
import gravatar from 'gravatar';
import Menu from '@components/Menu';

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then((res) => {
        mutate(res.data, true); //optimistic UI
      });
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  //gravatar 랜덤으로 아이콘 생성
  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.nickname, { s: '20px', d: 'retro' })} alt={data.nickname} />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 30 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(data.nickname, { s: '36px', d: 'retro' })} alt={data.nickname} />
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>tset</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>Menuscroll</MenuScroll>
        </Channels>
        <Chats>Chats</Chats>
      </WorkspaceWrapper>
      {children}
    </div>
  );
};

export default Workspace;
