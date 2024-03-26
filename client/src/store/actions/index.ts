import * as AuthActionCreators from "./authActions";
import * as CategoryActionCreatores from "./categoryActions";
import * as PostsActionCreatores from "./postsActions";

const allActionCreators = {
  ...AuthActionCreators,
  ...CategoryActionCreatores,
  ...PostsActionCreatores,
};

export default allActionCreators;

export type AllActionCreators = typeof allActionCreators;
