import React from "react";
import Link from "next/link";

export default function NavigationBar(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <Link href="/">
            <span className="row web-site-title">
              <img
                height="40px"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              ></img>
              <h1>ML</h1>
            </span>
          </Link>
        </div>
        <div className="col-3">
          <a onClick={props.openSwitchUser}>
            <span className="current-user">
              Welcome #{props.userId}
              <i className="fa fa-power-off" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </div>
      <style jsx>{`
        a {
          text-decoration: none;
          color: white;
        }
        a:hover {
          color: rgba(255, 255, 255, 0.7);
        }
        span {
          float: left;
        }
        .current-user {
          margin-top: 30px;
          ont-size: 19px;
          float: right;
          background-color: rgba(255, 255, 255, 0.2);
          padding: 6px 20px;
          border-radius: 5px;
          font-weight: 400;
        }
        i {
          margin-left: 10px
        }
        img {
          margin: 30px 0px;
        }
        .web-site-title {
          float: none;
          cursor: pointer;
        }
        .web-site-title h1 {
          margin-bottom: 0;
          margin-left: 10px;
          line-height: 2.5;
        }
      `}</style>
    </div>
  );
}
