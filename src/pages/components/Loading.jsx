export const Loading = () => {
  return (
    <div className="flex items-center justify-center fixed h-screen w-screen z-50 bg-[#cdcdcd80]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
};