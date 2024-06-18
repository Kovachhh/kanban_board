import { SyncLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <SyncLoader color="#fff" className="mb-10"/>
      <h1 className="text-white" >Loading...</h1>
    </div>
  );
};

export default Loader;
