"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Buttons from "./components/Button";
import Layout from "./components/Layout";
import styles from "./styles/page.module.scss";
import { Select, Button } from "antd";
import i18n from "@/app/i18n";

export default function Page() {
  
  const [shapes, setShapes] = useState([
    "square", "circle", "oval",
    "trapezoid", "rectangle", "parallelogram"
  ]);
  const [swapRows, setSwapRows] = useState(false);
  const [lang, setLang] = useState(i18n.language);
  const router = useRouter();
  
  
  
  const rotateLeft = () => {
    setShapes(prev => {
      const newShapes = [...prev];
      newShapes.push(newShapes.shift()!);
      return newShapes;
    });
  };
  
  const rotateRight = () => {
    setShapes(prev => {
      const newShapes = [...prev];
      newShapes.unshift(newShapes.pop()!);
      return newShapes;
    });
  };

  const swapRowsHandler = () => {
    setSwapRows(prev => !prev);
  };

  const handleButtonClick = (dir: string) => {
    if (dir === "Left") rotateLeft();
    else if (dir === "Right") rotateRight();
    else if (dir === "Top" || dir === "Down") swapRowsHandler();
  };


  const handleShapeClick = (index: number) => {
    setShapes(prev => {
      const newShapes = [...prev];

      const clickedShape = newShapes[index];

      let randomIndex = index;
      while (randomIndex === index) {
        randomIndex = Math.floor(Math.random() * newShapes.length);
      }

      const temp = newShapes[randomIndex];
      newShapes[randomIndex] = clickedShape;
      newShapes[index] = temp;

      return newShapes;
    });
  };

  return (
    <div>
      <div className={styles.arrow_button}>
        <div>
          <Button type="primary" onClick={() => router.push("/")} style={{marginBottom:10}}>
            Home
          </Button>
          <Buttons  
              onClick={handleButtonClick}
              key={lang}
              />
        </div>
      
        <Select
          value={lang}
          style={{ width: 120 }}
          onChange={(value) => {
            i18n.changeLanguage(value);
            localStorage.setItem("lang", value);
            setLang(value);
          }}
          options={[
            { value: "en", label: "Eng" },
            { value: "th", label: "TH" },
          ]}
        />
      </div>
      
      <div className={styles.layout_component}>
        <Layout 
          shapes={shapes} 
          swapRows={swapRows} 
          onShapeClick={handleShapeClick}
        />
      </div>
    </div>
  );
}
