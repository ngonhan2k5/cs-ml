import { useRef, useState } from "react";
import Head from "next/head";
import axios from "axios";
import NProgress from "nprogress"; //nprogress module

import Checkbox from "./CheckBox";

export default function ImagePredictForm(props) {
  const imageRef = useRef();
  const [imageSrc, setImageSrc] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [predicts, setPredicts] = useState([]);

  const handleFileChanged = (e) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      let dataURL = reader.result;
      setImageSrc(dataURL);
      const base64Image = dataURL.replace("data:image/png;base64,", "");
      // const base64Image = dataURL.substr(22);
      setImageBase64(base64Image);
    };
    reader.readAsDataURL(e.target.files[0]);
    props.setData([]);
  };

  const fetchData = async (predict) => {
    const response = await axios({
      method: "POST",
      url: `http://localhost:5000/api/${predict}`, //${process.env.host}:
      data: JSON.stringify({
        image: imageBase64,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // console.log(response);
    // console.log("response" + response);
    const data = response.data;
    data.type=predict
    return data;
  };

  const handlePredict = async () => {
    NProgress.start();
    if (predicts.length === 0) {
      return alert("Must choose at least one prediction model");
    }
    if (imageSrc.length === 0) {
      return alert("Must select picture to predict");
    }
    try {
      props.setData([]);
      const fetchDataList = predicts.map((predict) => fetchData(predict));
      let dataList = await Promise.all(fetchDataList);
      const cam = dataList.filter(i=>i.type=="cam");
      console.log(111,cam)
      if (cam.length && cam[0].ret_img_base64){
        props.setCamImageSrc("data:image/png;base64,"+cam[0].ret_img_base64);
      }
      dataList = dataList.filter(i=>i.type!="cam");
      const newDataList = [];
      const newExectionTimeList = [];
      for (let i = 0; i < dataList.length; i++) {
        newDataList.push({
          name: predicts[i],
          dog: Math.round(dataList[i]["prediction"]["dog"] * 10000) / 10000,
          cat: Math.round(dataList[i]["prediction"]["cat"] * 10000) / 10000,
        });
        newExectionTimeList.push({
          name: predicts[i],
          execution_time:
            Math.round(dataList[i]["execution_time"] * 10000) / 10000,
        });
      }
      console.log(newDataList);
      console.log(newExectionTimeList);
      props.setData(newDataList);
      props.setExectionTimes(newExectionTimeList);
    } catch (e) {
      console.log("e" + e);
      alert(e);
    }
    NProgress.done();
  };

  const selectedCheckboxes = new Set();
  const toggleCheckbox = (predict) => {
    const index = predicts.indexOf(predict);
    if (index > -1) {
      predicts.splice(index, 1);
    } else {
      predicts.push(predict);
    }
    setPredicts([...predicts]);
  };
  const selections = [
    "predict_vgg16",
    "predict_vgg19",
    "predict_densenet121",
    "predict_mobilenet",
    "cam",
  ];
  return (
    <div>
      <div className="row input-area">
        <div className="col-12 col-md-6">
          <h4 className="predicts-selection-label">Step 1: Select image to predict</h4>
          {imageSrc.length > 0 ? (
            <img src={imageSrc} />
          ) : (
            <div className="img-placeholder">
              <span>No image is selected</span>
            </div>
          )}
          <input type="file" onChange={handleFileChanged} />
        </div>
        <div className="col-12 col-md-6">
          <h4 className="predicts-selection-label">
            Step 2: Select model(s) to predict
          </h4>
          {selections.map((predict) => {
            console.log(
              "predicts.indexOf(predict)" + predicts.indexOf(predict)
            );
            return (
              <Checkbox
                label={predict}
                isSelected={predicts.indexOf(predict) > -1}
                handleCheckboxChange={toggleCheckbox}
                key={predict}
              />
            );
          })}
        </div>
      </div>
      <button onClick={handlePredict}>Predict</button>

      <style jsx>{`
        .input-area {
          border: 1px solid #ccc;
          padding: 10px 10px 30px 10px;
          border-radius: 5px;
        }
        .img-placeholder {
          widht: 300px;
          height: 300px;
          background-color: #ccc;
          position: relative;
        }
        .img-placeholder span {
          display: block;
          position: absolute;
          transition: lef;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .predicts-selection-label {
          display: block;
          margin-top: 17px;
          margin-bottom: 8px;
          font-weight: 500;
        }
        button,
        input {
          margin-top: 25px;
          border: 1px solid #ccc;
          padding: 5px 10px;
        }
      `}</style>
    </div>
  );
}
