import React, { useEffect } from "react";

import AppLayout from "../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    state => state.post
  );
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight
      );

      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        console.log(hasMorePosts);
        if (hasMorePosts && !loadPostLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST
          });
        }
      }
    }
    //useEffect 에서 addEventListener return해서 removeEventListener 해제해주지 않으면 메모리에 쌓임
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, loadPostLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
