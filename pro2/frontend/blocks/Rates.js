import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import useFetchEstimatedRating from "../hooks/useFetchEstimatedRating";

function Rates(props) {
  const [data, loading, error] = useFetchEstimatedRating(props);
  console.log(props);
  const movie = props.movie;
  console.log(data);
  console.log("error" + error);
  return (
    <div className="rate-area">
      <div style={{ display: "inline-block" }}>
        <a data-tip data-for="Rate" className="rate">
          <span className="rate-label">Rating</span>
          <span className="rate-value">{movie.vote_average}</span>
          <span className="rate-total"> / 10</span>
        </a>
      </div>
      <ReactTooltip id="Rate" place="top" type="dark" effect="float">
        <span>
            This is average ratings calculated from {movie.vote_count} votes
        </span>
      </ReactTooltip>
      {data && !isNaN(data[3]) ? (
        <div style={{ display: "inline-block" }}>
          <a data-tip data-for="EstimatedRate" className="rate">
            <span className="rate-label ">Est. Rating</span>
            <span className="rate-value est-rating">
              {parseFloat(data[3]).toFixed(1)}
            </span>
            <span className="rate-total est-rating"> / 10</span>
          </a>
          <ReactTooltip
            id="EstimatedRate"
            place="top"
            type="dark"
            effect="float"
          >
            <span>
              We used Collaborative Filtering (Surprise Library) to build a collaborative filter
              <br />  based on single value decomposition. The RMSE obtained was less than 1 and the 
              <br />  engine gave estimated ratings for a given user and movie.
            </span>
          </ReactTooltip>
        </div>
      ) : null}

      <style jsx>{`
        .rate-area {
          margin: 20px 0;
        }
        .rate {
          margin-right: 30px;
          padding: 15px 20px;
          border-radius: 5px;
          display: inline-block;
          background-color: rgba(255, 255, 255, 0.1);
        }
        .rate-label {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 600;
          margin-right: 15px;
          font-size: 15px;
        }
        .rate-value {
          font-size: 0.9em;
          font-size: 30px;
          color: #fff;
        }
        .rate-total {
          font-size: 0.9em;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
        }
        .est-rating {
           {
            /* color: yellow; */
          }
        }
      `}</style>
    </div>
  );
}
export default Rates;
