import useInput from '@hooks/useInput';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Success, Form, Label, Input, LinkContainer, Button, Header, Error } from './styles';
import { Link, Redirect } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import fetcher from '@utils/fetcher';

const Login = () => {
  //swr 보통 get
  //revalidate 호출시 fetcher 바로 실행
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
    //dedupingInterval 주기적으로 호출하는거 막기!!
    dedupingInterval: 100000,
  });
  const [logInError, setLoginError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoginError(false);
      axios
        .post(
          'http://localhost:3095/api/users/login',
          { email, password },
          {
            //쿠키설정 3번쨰 post
            withCredentials: true,
          },
        )
        .then((res) => {
          mutate('http://localhost:3095/api/users');
        })
        .catch((err) => setLoginError(err.response?.data?.statusCode === 401));
    },
    [email, password],
  );

  if (data) {
    return <Redirect to="/workspace/channel"></Redirect>;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
