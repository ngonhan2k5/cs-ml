import React, { useRef, useEffect } from "react";
import Link from "next/link";
import IconCross from "./../Icons/IconCross";

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Content = ({ movie, onClose }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <div
          className="content__background__image"
          style={{ backgroundImage: `url(${movie.Poster})` }}
        />
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{movie.Title}</div>
          <div className="content__description">{movie.overview}</div>
          <div>
            <span className="list-label">Starring</span>
            <span className="list-item">{movie.Genre}</span>
          </div>
          <div>
            <span className="list-label">Actors</span>
            <span className="list-item">{movie.Actors}</span>
          </div>
          <div>
            <span className="list-label">Languages</span>
            <span className="list-item">{movie.Language}</span>
          </div>
          <Link href="/movies/[movieId]" as={`/movies/${movie.id}`}>
            <div className="play-button">
              <svg viewBox="0 0 24 24">
                <path d="M6 4l15 8-15 8z" fill="black"></path>
              </svg>
              Play
            </div>
          </Link>
          <style jsx>{`
            .play-button {
              cursor: pointer;
              margin-top: 30px;
              width: 100px;
              color: black;
              background: #eee;
              text-align: center;
              border-radius: 5px;
              padding: 5px;
            }
            svg {
              width: 17px;
              margin-right: 4px;
              margin-bottom: 2px;
            }
            .list-label {
              color: #828282;
              font-weight: 700;
              margin-right: 5px;
              font-size: 15px;
            }
            .list-item {
              font-size: 0.9em;
              color: #828282;
            }
          `}</style>
        </div>
        <button className="content__close" onClick={onClose}>
          <IconCross />
        </button>
      </div>
    </div>
  );
};

export default Content;
