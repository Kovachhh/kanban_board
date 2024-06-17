import { SyncLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SyncLoader color="#fff" />
    </div>
  );
};

export default Loader;
