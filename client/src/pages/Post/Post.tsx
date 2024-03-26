import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IPost } from "../../types/TPost";
import { getPostApi } from "../../api/postApi";
import { createCommentApi, getCommentsPost } from "../../api/commentApi";
import { IComment } from "../../types/TComnent";
import Button from "../../components/Button/Button";

const Post = () => {
  const { REACT_APP_BASE_URL } = process.env;
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [post, setPost] = useState<IPost | null>(null);
  const [postComments, setPostComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState("");

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSendComment = () => {
    if (id) {
      createCommentApi({
        text: comment,
        postId: id,
      }).then((data) => {
        console.log(data);
        setPostComments((state) => [data, ...state]);
      });
    }
  };

  useEffect(() => {
    if (id) {
      getPostApi(id)
        .then((data) => {
          setPost(data);
        })
        .catch((e) => {
          navigate("/");
        })
        .finally(() => setLoading(false));

      getCommentsPost(id)
        .then((data) => {
          if (data.length > 0) {
            setPostComments(data);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoadingComments(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <article className="post__page">
      <header className="header">
        <div className="user">
          <img
            className="avatar"
            src={`${REACT_APP_BASE_URL}${post?.creator.avatar}`}
            alt="avatar"
          />
          <div className="description">
            <b className="name">{post?.creator.username}</b>
            <p className="date">{post?.createdAt}</p>
          </div>
        </div>
      </header>
      <div className="image">
        <img src={`${REACT_APP_BASE_URL}${post?.imageUrl}`} alt="img" />
      </div>
      <div className="content">
        <h1 className="title">{post?.title}</h1>
        <p className="description">{post?.description}</p>
      </div>
      {loadingComments ? (
        <p>loading...</p>
      ) : (
        <div className="comments">
          <div className="send__comment">
            <textarea
              onChange={handleChangeComment}
              className="send__comment-textarea"
              placeholder="send comment"
            ></textarea>
            <Button variant="contained" onClick={handleSendComment}>
              send
            </Button>
          </div>
          {postComments.map((comment: IComment) => (
            <div className="comment" key={comment._id}>
              <img
                className="avatar"
                src={`${REACT_APP_BASE_URL}${comment.creator.avatar}`}
                alt="avatar"
              />
              <div className="content">
                <p className="message">
                  <strong className="name"> {comment.creator.username}</strong>
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default Post;
