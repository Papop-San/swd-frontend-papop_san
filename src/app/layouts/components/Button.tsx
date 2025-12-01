"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Button.module.scss";
import { ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "antd";

interface ArrowButtonsProps {
  onClick?: (direction: string) => void;
}

const ArrowButtons: React.FC<ArrowButtonsProps> = ({ onClick }) => {
  const { t } = useTranslation("layout");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const buttons = [
    { key: "Left", label: t("Left"), Icon: ArrowLeftCircle },
    { key: "Right", label: t("Right"), Icon: ArrowRightCircle },
    { key: "Top", label: t("Top"), Icon: ArrowUpCircle },
    { key: "Down", label: t("Down"), Icon: ArrowDownCircle },
  ];

  return (
    <Row gutter={[16, 16]} justify="center">
      {buttons.map(({ key, label, Icon }) => (
        <Col key={key} xs={12} sm={6}>
          <button
            className={styles.button}
            style={{ width: "100%" }}
            onClick={() => onClick?.(key)}
          >
            <Icon size={40} />
            <span className={styles.span}>{t("Move")} {label}</span>
          </button>
        </Col>
      ))}
    </Row>
  );
};

export default ArrowButtons;
