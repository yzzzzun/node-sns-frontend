import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../reducers/user";
const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector(state => state.user);
  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);
  return (
    <>
      <Card
        actions={[
          <div key="twit">
            트윗
            <br />
            {me.Posts.length}
          </div>,
          <div key="flowings">
            팔로잉
            <br />
            {me.Followings.length}
          </div>,
          <div key="flowers">
            팔로워
            <br />
            {me.Followers.length}
          </div>
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onLogout} loading={logOutLoading}>
          Logout
        </Button>
      </Card>
    </>
  );
};
export default UserProfile;
