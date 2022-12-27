import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface CarouselProps {
  images: {
    image: string;
    description: string;
  }[];
}

export const Carousel = ({ images }: CarouselProps) => {
  const href = images.map((link) => link.image);
  const heading = images.map((desc) => desc.description);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setCurrentIndex((currentIndex + 1) % href.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, paused, href.length]);

  const handlePreviousClick = () => {
    console.log(currentIndex);
    setCurrentIndex((currentIndex - 1 + href.length) % href.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % href.length);
  };

  const handlePaginationClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePauseClick = () => {
    setPaused(!paused);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft") {
      handlePreviousClick();

      const previousButton = document.querySelector(
        `#tab-${(currentIndex - 1 + images.length) % images.length}`
      ) as HTMLButtonElement;
      console.log(currentIndex);
      if (previousButton) {
        previousButton.focus();
      }
    } else if (event.key === "ArrowRight") {
      handleNextClick();
      const nextButton = document.querySelector(
        `#tab-${(currentIndex + 1) % images.length}`
      ) as HTMLButtonElement;
      console.log(nextButton);

      if (nextButton) {
        nextButton.focus();
      }
    }
  };

  return (
    <section className="carousel" id="carousel" aria-label="carousel">
      <button
        onClick={handlePauseClick}
        aria-label={paused ? "Play" : "Pause"}
        className="pauseBtn"
        tabIndex={0}
      >
        {paused ? (
          <FontAwesomeIcon icon={faPlay} />
        ) : (
          <FontAwesomeIcon icon={faPause} />
        )}
      </button>
      <button
        onClick={handlePreviousClick}
        aria-label="Previous"
        className="left"
      >
        Previous
      </button>
      <img
        src={href[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        id={`slide-${currentIndex}`}
        aria-hidden={currentIndex !== 0}
        aria-describedby={`slide-${currentIndex}-description`}
      />
      <h2
        id={`slide-${currentIndex}-description`}
        aria-hidden={currentIndex !== 0}
        aria-live="polite"
      >
        {heading[currentIndex]}
      </h2>
      <button onClick={handleNextClick} aria-label="Next" className="right">
        Next
      </button>
      <ul className="pagination" role="tablist">
        {heading.map((description, index) => {
          const activeIndex = index === currentIndex;

          return (
            <li key={index} id="tablist">
              <button
                id={`tab-${index}`}
                role="tab"
                aria-label={description}
                onClick={() => handlePaginationClick(index)}
                className={activeIndex ? "active" : ""}
                aria-current={activeIndex}
                tabIndex={activeIndex ? undefined : -1}
                aria-controls={`abpanel-${index}`}
                onKeyDown={handleKeyDown}
              ></button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
