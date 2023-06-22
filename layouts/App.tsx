import React, { FC } from 'react';

import { Switch, Route, Redirect } from 'react-router';

//코드 스플리팅
import loadable from '@loadable/component';

const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/Signup'));
const Channel = loadable(() => import('@pages/Channel'));

const App: FC = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace/channel" component={Channel} />
      <Route />
    </Switch>
  );
};

export default App;
