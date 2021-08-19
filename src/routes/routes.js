import Login from "../components/User/Login";
import Register from "../components/User/Register";
import MultiImgOneDrop from "../components/MultiImgOneDrop";
import MultiDropSingleImg from "../components/MultiDropSingleImg";
import DropzoneSingleImage from "../components/DropzoneSingleImage";

const routes = [
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/dropzone", Component: DropzoneSingleImage },
  { path: "/dropzone2", Component: MultiDropSingleImg },
  { path: "/dropzone3", Component: MultiImgOneDrop },
];

export default routes;
