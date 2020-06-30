import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";
const Profile = () => {
  const followerList = [
    { nickname: "yzzzzun" },
    { nickname: "yzzzzun" },
    { nickname: "yzzzzun" },
    { nickname: "yzzzzun" }
  ];
  const followingList = [
    { nickname: "yzzzzun" },
    { nickname: "yzzzzun" },
    { nickname: "yzzzzun" },
    { nickname: "yzzzzun" }
  ];

  return (
    <>
      <AppLayout>
        <Head>
          <title>내 프로필 | NodeSNS</title>
        </Head>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
