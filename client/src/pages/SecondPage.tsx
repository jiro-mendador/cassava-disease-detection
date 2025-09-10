import NavigationBar from "../components/NavigationBar";

const SecondPage = () => {
  return (
    <>
      <NavigationBar />
      <h1 className="absolute top-[50%] left-[50%] translate-[-50%] bg-blue-400 p-4 rounded-lg text-white shadow-2xl">
        React Boilerplate Second Page
      </h1>
    </>
  );
};

export default SecondPage;
