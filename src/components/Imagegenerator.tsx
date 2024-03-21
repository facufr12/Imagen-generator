import React, { useState, useRef } from "react";
import letraf from "../assets/letraf.jpeg";
import "./imagegenerator.css";
import.meta.env.VITE_MY_API_KEY;
const apiKey = import.meta.env.VITE_MY_API_KEY;

const Imagegenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading, setLoading] = useState(false);

  let inputRef = useRef(null);
  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "1024x1024",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        IA Generador de <span>Imagenes</span>
        <div className="img-loading">
          <div className="image">
            <img src={image_url === "/" ? letraf : image_url} alt="" />
            <div className="loading">
              <div className={loading ? "loading-bar-full" : "loading-bar"}>
                <div className={loading ? "loading-text" : "display-none"}>
                  Cargando...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describi que quieres ver"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Crear
        </div>
      </div>
    </div>
  );
};

export default Imagegenerator;
