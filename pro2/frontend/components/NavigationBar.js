import React from "react";
import Link from "next/link";

export default function NavigationBar(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <Link href="/">
            <h1>Netflix 2</h1>
          </Link>
        </div>
        <div className="col-3">
          <span className="current-user">
            <i className="fa fa-user" aria-hidden="true"></i> {props.userId}
            <a onClick={props.openSwitchUser}>
              <i className="fa fa-exchange" aria-hidden="true"></i>
            </a>
          </span>
        </div>
      </div>
      <style jsx>{`
        a {
          text-decoration: none;
          margin-left: 30px;
          color: white;
        }
        a:hover{
            color: rgba(255, 255, 255, 0.7);
        }
        span {
          float: left;
        }
        .current-user {
          margin-top: 30px;
          ont-size: 19px;
          float:right;
        }
        i {
          margin-right: 3px;
        }
        h1 {
          margin: 30px 0px;
        }
      `}</style>
    </div>
  );
}
