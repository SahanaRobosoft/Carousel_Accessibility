import React from "react";

import "./App.css";
import { Carousel } from "./components/Carousel";

function App() {
  const images = [
    {
      id: 1,
      title: "Slide 1",
      image: "https://picsum.photos/id/10/3000/2000",
      description: "Beautiful landscape with mountains and a clear blue sky",
    },
    {
      id: 2,
      title: "Slide 2",
      image: "https://picsum.photos/id/11/2500/1667",
      description: "Stunning mountains with bright blue sky",
    },
    {
      id: 3,
      title: "Slide 3",
      image: "https://picsum.photos/id/16/2500/1667",
      description: "Gorgeous view over the sea with clouds in the sky",
    },
    {
      id: 4,
      title: "Slide 4",
      image: "https://picsum.photos/id/184/4288/2848",
      description: "Beautiful desert sunset with sand dunes and a colorful sky",
    },
  ];

  return (
    <div className="App">
      <h1 style={{ width: "100%" }} tabIndex={0}>
        Carousel Accessibility
      </h1>
      <Carousel images={images} />
    </div>
  );
}

export default App;
