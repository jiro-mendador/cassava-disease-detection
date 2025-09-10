import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <nav className="w-full bg-black text-white p-4 flex justify-end gap-2">
        <Link to="/">Home</Link>
        <Link to="/second-page">Second Page</Link>
      </nav>
    </>
  );
};

export default NavigationBar;
