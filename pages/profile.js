import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";
import { useSelector } from "react-redux";
const Profile = () => {
  const { me } = useSelector(state => state.user);

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
