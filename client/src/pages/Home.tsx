import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import api from "../services/api";

const Home = () => {
  // * sample ts type
  type Data = {
    id: number;
    title: string;
  };

  // * apply the type by doing Type[], mean an array of that type, remove [] for single object or data
  const [data, setData] = useState<Data[]>([]);

  const getData = async () => {
    try {
      const response = await api.get("/posts");
      if (response) {
        console.log(response);
        setData(response.data.slice(0, 5)); // * limiting to 5
      }
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="absolute top-[50%] left-[50%] translate-[-50%] flex flex-col gap-2">
        <h1 className=" bg-blue-400 p-4 rounded-lg text-white shadow-2xl">
          React Boilerplate Home Page
        </h1>
        <div className="p-4 bg-blue-100 rounded-lg flex flex-col gap-2">
          <h2 className="font-semibold text-blue-400">
            Sample Axios Get Request
          </h2>
          {data.map((data) => {
            return <li key={data.id}>{data.title}</li>;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
