import React, { useState, useRef } from "react";
import letraf from "../assets/letraf.jpeg";
import "./imagegenerator.css";
const Imagegenerator = () => {
  const [image_url, setImage_url] = useState("/");
  const [loading,setLoading] = useState(false);

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
          Authorization:
            "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
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
        Ai Generador <span>Imagen</span>
        <div className="img-loading">
          <div className="image">
            <img src={image_url === "/" ? letraf : image_url} alt="" />
            <div className="loading">
              <div className={loading?"loading-bar-full":"loading-bar" }>
                <div className={loading? "loading-text":"display-none"}>Cargando...</div>
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