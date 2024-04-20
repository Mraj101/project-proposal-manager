const Hero = () => {
  return (
    <div className="w-full relative">
      <img
        src="https://images.unsplash.com/photo-1507537509458-b8312d35a233?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-full h-[400px] object-cover"
        alt="Not Found"
      />
       <div className="absolute inset-0 bg-black opacity-50 "></div>
      <h1 className="text-center text-8xl font-extrabold text-slate-100 absolute top-40 left-[310px] border-2 rounded-lg border-slate-100 px-4 py-2">Student's Panel</h1>
      <div className="absolute inset-0 bg-black opacity-30 "></div>
    </div>
  );
};

export default Hero;