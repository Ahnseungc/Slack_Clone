import React, { FC } from 'react';

import { Switch, Route, Redirect } from 'react-router';

//코드 스플리팅
import loadable from '@loadable/component';
import Workspace from './Workspace';

const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/Signup'));
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const App: FC = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
      <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
      <Route path="/workspace/:workspace" component={Workspace} />
      //파라미터가 젤 밑에
      <Route />
    </Switch>
  );
};

export default App;
