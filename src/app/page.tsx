"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { Card, Row, Col, Button } from "antd";

export default function Home() {
  return (
    <div className={styles.page} style={{  display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card title="Navigation" style={{ width: 300, textAlign: "center" }}>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Link href="/forms" passHref>
              <Button type="primary" block>
                Go to Forms
              </Button>
            </Link>
          </Col>
          <Col span={24}>
            <Link href="/layouts" passHref>
              <Button type="default" block>
                Go to Layouts
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
