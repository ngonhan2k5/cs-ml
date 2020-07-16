import { useRef, useState } from "react";
import Head from "next/head";
import axios from "axios";
import Checkbox from "./Checkbox";

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
    const data = response.data.prediction;

    return data;
  };

  const handlePredict = async () => {
    if(predicts.length === 0){
      return alert("Must choose at least one prediction model")
    }
    if(imageSrc.length === 0){
      return alert("Must select picture to predict")
    }
    try {
      props.setData([]);
      const fetchDataList = predicts.map((predict) => fetchData(predict));
      const dataList = await Promise.all(fetchDataList);
      const newDataList = [];
      for (let i = 0; i < dataList.length; i++) {
        newDataList.push({
          name: predicts[i],
          dog: Math.round(dataList[i]["dog"] * 10000) / 10000,
          cat: Math.round(dataList[i]["cat"] * 10000) / 10000,
        });
      }
      console.log(dataList);
      console.log(newDataList);
      props.setData(newDataList);
    } catch (e) {
      console.log("e" + e);
    }
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
  ];
  return (
    <div className="col">
      <img src={imageSrc} />
      <div>
        <input type="file" onChange={handleFileChanged} />
        {selections.map((predict) => {
          console.log("predicts.indexOf(predict)" + predicts.indexOf(predict));
          return (
            <Checkbox
              label={predict}
              isSelected={predicts.indexOf(predict) > -1}
              handleCheckboxChange={toggleCheckbox}
              key={predict}
            />
          );
        })}
        <button onClick={handlePredict}>Predict</button>
      </div>
    </div>
  );
}
