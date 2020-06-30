import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers/user";
const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <>
      <Card
        actions={[
          <div key="twit">
            트윗
            <br />0
          </div>,
          <div key="flowings">
            팔로잉
            <br />0
          </div>,
          <div key="flowers">
            팔로워
            <br />0
          </div>
        ]}
      >
        <Card.Meta avatar={<Avatar>Y</Avatar>} title="yzzzzun" />
        <Button onClick={onLogout}>Logout</Button>
      </Card>
    </>
  );
};
export default UserProfile;
