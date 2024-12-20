import { getYears } from "src/utils";

const Years = () => {
  const track = getYears();

  return <div>{track ? JSON.stringify(track) : "Loading..."}</div>;
};

export default Years;