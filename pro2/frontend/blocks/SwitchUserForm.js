import React, { useState } from "react";
function SwitchUserForm(props) {
  const [inputContent, setInputContent] = useState(props.userId + "");
  const onSubmit = (e) => {
    e.preventDefault();
    props.setUserId(parseInt(inputContent));
  };
  const onChange = (e) => setInputContent(e.target.value);
  return (
    <div class="clearfix">
      <div className="switch-form">
        <form onSubmit={onSubmit}>
          <label>
            User Id:
            <input
              type="number"
              value={inputContent}
              onChange={onChange}
            ></input>
          </label>
          <input type="submit" value="Update user id"></input>
        </form>
      </div>
      <style jsx>{`
        .switch-form {
          display: block;
          padding: 10px;
          border: 1px solid red;
          background-color: #fafafa;
        }
        .switch-form label {
            margin-right: 20px;
        }
        .switch-form input {
            padding: 5px 10px;
            border-radius:5px;
            border: 1px solid #ccc
        }
      `}</style>
    </div>
  );
}
export default SwitchUserForm;
