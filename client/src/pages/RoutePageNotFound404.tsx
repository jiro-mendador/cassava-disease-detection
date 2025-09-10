import NavigationBar from "../components/NavigationBar";

const RoutePageNotFound404 = () => {
  return (
    <>
      <NavigationBar />
      <h1 className="absolute top-[50%] left-[50%] translate-[-50%] bg-red-400 p-4 rounded-lg text-white shadow-2xl">
        Oops! It seems like the page you accessed is not available.
      </h1>
    </>
  );
};

export default RoutePageNotFound404;
