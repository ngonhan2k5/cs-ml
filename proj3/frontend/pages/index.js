import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import ImagePredictForm from "../components/ImagePredictForm";
import ResultBarChart from "../components/ResultBarChart";
import ResultPieChart from "../components/ResultPieChart";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="container mt-5">
      <ImagePredictForm setData={setData}></ImagePredictForm>
      {data.length > 0 ? (
        <div className="mt-5">
          <ResultBarChart data={data} />
          <div className="row">
            {/* {data.map((data) => {
              const modelType = data["name"];
              const pieChartData = [
                { name: "dog", value: data["dog"] },
                { name: "cat", value: data["cat"] },
              ];
              return (
                <ResultPieChart
                  key={modelType}
                  data={pieChartData}
                  model={modelType}
                />
              );
            })} */}
          </div>
        </div>
      ) : null}
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
