interface EmptyStateProps {
  text?: string;
}

const EmptyState = ({ text }: EmptyStateProps) => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-white" >{text}</h1>
    </div>
  );
};

export default EmptyState;
