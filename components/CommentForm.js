import React, { useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  const id = useSelector(state => state.user.me?.id);
  const { addCommentDone } = useSelector(state => state.post);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText("");
    }
  }, [addCommentDone]);

  const dispatch = useDispatch();

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { postId: post.id, content: commentText, userId: id }
    });
  }, [commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", marign: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40 }}
          type="primary"
          htmlType="submit"
        >
          등록
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired
};
export default CommentForm;
