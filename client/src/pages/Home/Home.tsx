import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const page = Number(query.get("page")) || 1;
  const searchQuery = query.get("searchQuery");

  const { getPosts } = useActions();
  const { posts, numberOfPages, postLoading } = useTypedSelector(
    (state) => state.postsData
  );

  useEffect(() => {
    if (page) {
      if (!searchQuery) {
        getPosts(page);
      }
    }
  }, [page]);

  if (postLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="home">
      <div className="posts__list">
        {posts &&
          posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          ))}
      </div>

      <div className="pagination">
        {numberOfPages &&
          Array.from({ length: numberOfPages }, (_, index) => (
            <Link
              key={index + 1}
              to={`/?page=${index + 1}${
                searchQuery ? `&searchQuery=${searchQuery}` : ""
              }`}
            >
              {index + 1}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
