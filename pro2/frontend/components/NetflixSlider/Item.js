import React from "react";
import cx from "classnames";
import Link from "next/link";
import SliderContext from "./context";
import ShowDetailsButton from "./ShowDetailsButton";
import Mark from "./Mark";

const Item = ({ movie }) => (
  <SliderContext.Consumer>
    {({ onSelectSlide, currentSlide, elementRef }) => {
      const isActive = currentSlide && currentSlide.id === movie.id;

      return (
        <div
          ref={elementRef}
          className={cx("item", {
            "item--open": isActive,
          })}
        >
          <Link href="/movies/[movieId]" as={`/movies/${movie.id}`}>
            <img src={movie.Poster} alt="" />
          </Link>
          <div className="item_info">
            <p>
              {movie.Title} ({movie.Year})
            </p>
          </div>
          <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
          {isActive && <Mark />}
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Item;
