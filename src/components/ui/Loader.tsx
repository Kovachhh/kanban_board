import { SyncLoader } from "react-spinners";

interface LoaderProps {
  text?: string;
}

const Loader = ({ text }: LoaderProps) => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <SyncLoader color="#fff" className="mb-10"/>
      <h1 className="text-white" >{text || "Loading..."} </h1>
    </div>
  );
};

export default Loader;
