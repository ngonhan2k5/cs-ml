import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import ImagePredictForm from "../components/ImagePredictForm";
import ResultBarChart from "../components/ResultBarChart";
import ExecutionTimeBarChart from "../components/ExecutionTimeBarChart";
import ResultPieChart from "../components/ResultPieChart";

export default function Home() {
  const [data, setData] = useState([]);
  const [camImageSrc, setCamImageSrc] = useState([]);
  const [exectionTimes, setExectionTimes] = useState([]);
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(exectionTimes);
  }, [exectionTimes]);
  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-12 col-md-12">
          <ImagePredictForm
            setData={setData}
            setExectionTimes={setExectionTimes}
            setCamImageSrc={setCamImageSrc}
          ></ImagePredictForm>
        </div>
        <div className="col-12 col-md-12">
          {data.length > 0 || camImageSrc.length > 0? (
            <div className="mt-5 results">
              <h1>Results</h1>
              <h2>Class Activation Map</h2>
              {camImageSrc.length > 0 && (
                <img src={camImageSrc} />
              ) }
              <h2>Prediction results</h2>
              <ResultBarChart data={data} />
              <h2>Execution time results (unit: seconds)</h2>
              <ExecutionTimeBarChart data={exectionTimes} />
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
        </div>
      </div>
      <style jsx>{`
        h1 {
          margin-bottom: 40px;
          font-weight: 800;
        }
        h2 {
          margin-top: 30px;
          margin-bottom: 30px;
          margin-left: 10px;
        }
        .results {
          background-color: #eeefff;
          padding: 30px;
          border-radius: 5px;
          margin-bottom: 50px;
        }
      `}</style>
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
