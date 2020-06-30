import React, { useCallback, useState } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import useInput from "../hooks/useInput";
import { Form, Input, Checkbox, Button } from "antd";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [id, onChangeID] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
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

    console.log(id, nickName, password);
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
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input name="user-id" value={id} onChange={onChangeID} required />
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
            <Button type="primary" htmlType="submit">
              회원가입
            </Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};
export default Signup;
