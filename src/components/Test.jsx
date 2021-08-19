import React from "react";
import HigherRoute from "../routes/HigherRoute";

const Test = (props) => {
  return <div {...props}>For Test</div>;
};

export default HigherRoute(Test);
