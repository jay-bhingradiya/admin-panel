import EducationDetails from "../components/User/EducationDetails";
import Profile from "../components/User/Profile";

const protectedRoute = [
  { path: "/personal-details", Component: Profile },
  { path: "/education-details", Component: EducationDetails },
];

export default protectedRoute;
