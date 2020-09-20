import React, { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import Router from "next/router";
import useInput from "../hooks/useInput";
import { Form, Input, Checkbox, Button } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../reducers/user";
const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");  //뒤로가기시 전페이지가 나오지않음
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.push("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const dispatch = useDispatch();

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSignup = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    console.log(email, nickName, password);
    dispatch({
      type: SIGNUP_REQUEST,
      data: { email, nickName, password },
    });
  }, [password, passwordCheck, term]);

  return (
    <>
      <AppLayout>
        <Head>
          <meta charSet="utf-8" />
          <title>회원가입 | NodeSNS</title>
        </Head>
        <Form onFinish={onSignup}>
          <div>
            <label htmlFor="user-email">아이디</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </div>
          <div>
            <label htmlFor="user-nickName">닉네임</label>

            <br />
            <Input
              name="user-nickName"
              value={nickName}
              onChange={onChangeNickName}
              required
            />
          </div>
          <div>
            <label htmlFor="user-password">password</label>
            <br />
            <Input
              name="user-password"
              value={password}
              type="password"
              onChange={onChangePassword}
              required
            />
          </div>
          <div>
            <label htmlFor="user-passwordCheck">password 확인</label>
            <br />
            <Input
              name="user-passwordCheck"
              value={passwordCheck}
              type="password"
              onChange={onChangePasswordCheck}
              required
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </div>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
              위 약관을 동의합니다.(필수)
            </Checkbox>
            {termError && <ErrorMessage>약관에 동의해야합니다.</ErrorMessage>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              회원가입
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};
export default Signup;
