import React, { useState } from "react";
function SwitchUserForm(props) {
  const [inputContent, setInputContent] = useState(props.userId + "");
  const onSubmit = (e) => {
    e.preventDefault();
    props.setUserId(parseInt(inputContent));
    props.closeSwitchUser();
  };
  const onChange = (e) => setInputContent(e.target.value);
  return (
    <div className="switch-form">
      <form onSubmit={onSubmit}>
        <label>
          <span>User Id:</span>
          <input type="number" value={inputContent} onChange={onChange}></input>
        </label>
        <button onClick={props.closeSwitchUser}>Close</button>
        <input type="submit" value="Switch User"></input>
      </form>
      <style jsx>{`
        .switch-form {
          z-index: 100;
          position: fixed;
          width: 100vw;
          height: 100vh;
          display: block;
          padding: 10px;
          border: 1px solid red;
          background-color: rgba(255, 255, 255, 0.9);
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        button {
          cursor: pointer;
          float: right;
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          margin-left: 10px;
        }
        .switch-form label {
          color: black;
          display: block;
          padding-bottom: 10px;
        }
        .switch-form label span {
          padding-right: 10px;
          line-height: 36px;
        }
        .switch-form input {
          float: right;
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
export default SwitchUserForm;
