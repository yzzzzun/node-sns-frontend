import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";
import Router from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }

  return (
    <>
      <AppLayout>
        <Head>
          <title>내 프로필 | NodeSNS</title>
        </Head>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Follwings} />
        <FollowList header="팔로워" data={me.Follwers} />
      </AppLayout>
    </>
  );
};

export default Profile;
