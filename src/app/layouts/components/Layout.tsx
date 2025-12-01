"use client";

import React from "react";
import { Card, Row, Col } from "antd";
import styles from "../styles/shape.module.scss";

interface LayoutProps {
  shapes: string[];
  swapRows?: boolean;
  onShapeClick?: (index: number) => void;
}

const Layout: React.FC<LayoutProps> = ({ shapes, swapRows = false, onShapeClick }) => {
  const row1 = shapes.slice(0, 3);
  const row2 = shapes.slice(3, 6);

  const row1Style = {
    width: 800,
    marginBottom: 16,
    marginLeft: swapRows ? "auto" : "0",
  };
  const row2Style = {
    width: 800,
    marginLeft: swapRows ? "0" : "auto",
  };

  return (
    <div>
      <Card title="Grid & Layout" style={{ width: 1200, margin: "0 auto" }}>
        
        {/* Row 1 */}
        <Card type="inner" style={row1Style}>
          <Row gutter={[16, 16]} justify="center">
            {row1.map((shape, index) => (
              <Col key={shape + index}>
                <button
                  className={styles.button}
                  onClick={() => onShapeClick?.(index)} 
                >
                  <div className={styles.layout}>
                    <div className={styles[shape]}></div>
                  </div>
                </button>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Row 2 */}
        <Card type="inner" style={row2Style}>
          <Row gutter={[16, 16]} justify="center">
            {row2.map((shape, index) => (
              <Col key={shape + (index + 3)}>
                <button
                  className={styles.button}
                  onClick={() => onShapeClick?.(index + 3)} 
                >
                  <div className={styles.layout}>
                    <div className={styles[shape]}></div>
                  </div>
                </button>
              </Col>
            ))}
          </Row>
        </Card>

      </Card>
    </div>
  );
};

export default Layout;
