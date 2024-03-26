import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPostApi } from "../../api/postApi";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { IPostFormData } from "../../types/TPost";

const WritePost = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState({
    message: null,
    typeError: null,
  });
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    category: "",
    file: null as File | null,
  });
  const { categories, categoryLoading } = useTypedSelector(
    (state) => state.category
  );
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "file") {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        setPostData({ ...postData, file: selectedFile });
      }
    } else {
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  };

  const deleteFile = () => {
    setPostData({ ...postData, file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const postDataForApi: IPostFormData = {
      title: postData.title,
      description: postData.description,
      category: postData.category,
      file: postData.file as File,
    };

    setLoading(true);
    createPostApi(postDataForApi)
      .then((data) => {
        navigate(`/post/${data._id}`);
      })
      .catch((e) => {
        setError(e.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <p>...loading</p>;
  }

  return (
    <div className="post__write">
      <div className="wrapper">
        <h1 className="post__write-title">Write Post</h1>

        <div className="categories">
          <h4 className="categories__title">select category:</h4>
          {categoryLoading ? (
            "...loading"
          ) : (
            <div className="categories__buttons">
              {categories?.map((cat) => (
                <Button
                  key={cat._id}
                  onClick={() =>
                    setPostData({ ...postData, category: cat._id })
                  }
                  variant={
                    postData.category === cat._id ? "active" : "non-active"
                  }
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          )}
        </div>
        <form className="form">
          <fieldset className="fieldset">
            <Input
              handleChange={handleChange}
              type="text"
              name="title"
              placeholder="title"
              variant="soft"
              value={postData.title}
              error={error.typeError}
            />
            <Input
              handleChange={handleChange}
              type="text"
              name="description"
              placeholder="description"
              variant="soft"
              value={postData.description}
              error={error.typeError}
            />
            <Input
              handleChange={handleChange}
              type="file"
              name="file"
              error={error.typeError}
              inputRef={fileInputRef}
            />
            {postData.file && (
              <div className="image__select">
                <button onClick={deleteFile} className="delete">
                  X
                </button>
                <img
                  className="img"
                  src={URL.createObjectURL(postData.file)}
                  alt="img"
                />
              </div>
            )}
            {error.message && (
              <div className="post__write-error">{error.message}</div>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <input
              onClick={handleSubmit}
              className="submit"
              type="submit"
              value={"submit"}
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default WritePost;
