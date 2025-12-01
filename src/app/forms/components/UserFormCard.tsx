"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
  Radio,
  InputRef
} from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { DataType } from "@/app/store/user/userSlice";
import { v4 as uuidv4 } from "uuid";
import type { ValidateErrorEntity } from "rc-field-form/lib/interface";

interface UserFormValues {
  title: string;
  firstname: string;
  lastname: string;
  birth_day: dayjs.Dayjs | null;
  nationality: string;
  citizen_id: string;
  gender: "Male" | "Female" | "Other";
  country_code: string;
  phone_number: string;
  passport: string;
  except_salary: number;
}

interface CitizenIdInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

interface UserFormCardProps {
  onFinish: (values: DataType) => void; 
  onFinishFailed?: (errorInfo: ValidateErrorEntity<UserFormValues>) => void; 
  initialValues?: Partial<DataType>;
}
const PATTERN = [1, 4, 5, 2, 1];

const CitizenIdInput: React.FC<CitizenIdInputProps> = ({
  value = "",
  onChange,
}) => {
  const [inputs, setInputs] = useState(Array(PATTERN.length).fill(""));
  const refs = useRef<Array<InputRef | null>>([]);

  useEffect(() => {
    if (!value) setInputs(Array(PATTERN.length).fill(""));
    else {
      let start = 0;
      const newInputs = PATTERN.map((len) => {
        const part = value.slice(start, start + len);
        start += len;
        return part;
      });
      setInputs(newInputs);
    }
  }, [value]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newInputs = [...inputs];
    newInputs[index] = val.slice(0, PATTERN[index]);
    setInputs(newInputs);
    onChange?.(newInputs.join(""));
    if (val.length >= PATTERN[index] && index < PATTERN.length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {PATTERN.map((len, i) => (
        <Input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          maxLength={len}
          value={inputs[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          style={{ width: len * 34, textAlign: "center", backgroundColor: "#fff" }}
        />
      ))}
    </div>
  );
};


const UserFormCard: React.FC<UserFormCardProps> = ({
  onFinish,
  onFinishFailed,
  initialValues,
}) => {
  const { t } = useTranslation("forms");
  const [citizenId, setCitizenId] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        birth_day: initialValues.birth_day
          ? dayjs(initialValues.birth_day)
          : null,
      });
      if (initialValues.citizen_id) setCitizenId(initialValues.citizen_id);
    }
  }, [initialValues, form]);

  const handleSubmit = (values: UserFormValues) => {
    const userToSave: DataType = {
      key: initialValues?.key || uuidv4(),
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      birth_day: values.birth_day ? dayjs(values.birth_day).format("YYYY-MM-DD") : "",
      nationality: values.nationality,
      citizen_id: citizenId,
      gender: values.gender,
      country_code: values.country_code,
      phone_number: values.phone_number,
      passport: values.passport,
      except_salary: values.except_salary,
    };
    onFinish(userToSave); 
    form.resetFields();
    setCitizenId("");
  };
  

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      <Card title={t("User Form")} style={{ width: "100%", maxWidth: 900 }}>
        <Form
          form={form}
          name="userForm"
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col xs={24} sm={6}>
              <Form.Item
                label={t("title")}
                name="title"
                rules={[{ required: true, message: t("required.title") }]}
              >
                <Select placeholder={t("select")}>
                  <Select.Option value="Mr.">{t("titles.mr")}</Select.Option>
                  <Select.Option value="Ms.">{t("titles.ms")}</Select.Option>
                  <Select.Option value="Other">
                    {t("titles.other")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={9}>
              <Form.Item
                label={t("firstname")}
                name="firstname"
                rules={[{ required: true, message: t("required.firstname") }]}
              >
                <Input placeholder={t("firstname")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={9}>
              <Form.Item
                label={t("lastname")}
                name="lastname"
                rules={[{ required: true, message: t("required.lastname") }]}
              >
                <Input placeholder={t("lastname")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label={t("birth_day")}
                name="birth_day"
                rules={[{ required: true, message: t("required.birth_day") }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder={t("select_date")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={6}>
              <Form.Item
                label={t("nationality")}
                name="nationality"
                rules={[{ required: true, message: t("required.nationality") }]}
              >
                <Select placeholder={t("select")}>
                  <Select.Option value="Thai">
                    {t("nationalities.thai")}
                  </Select.Option>
                  <Select.Option value="USA">
                    {t("nationalities.usa")}
                  </Select.Option>
                  <Select.Option value="Japan">
                    {t("nationalities.japan")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("citizen_id")}
                name="citizen_id"
                rules={[{ required: true, message: t("required.citizen_id") }]}
              >
                <CitizenIdInput value={citizenId} onChange={setCitizenId} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("gender")}
                name="gender"
                rules={[{ required: true, message: t("required.gender") }]}
              >
                <Radio.Group
                  options={[
                    { value: "Male", label: t("genders.male") },
                    { value: "Female", label: t("genders.female") },
                    { value: "Other", label: t("genders.other") },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} align="middle">
            <Col xs={24} sm={6}>
              <Form.Item
                name="country_code"
                label={t("country_code")}
                rules={[
                  { required: true, message: t("required.country_code") },
                ]}
              >
                <Select placeholder={t("select")}>
                  <Select.Option value="+66">
                    {t("country_codes.th")}
                  </Select.Option>
                  <Select.Option value="+1">
                    {t("country_codes.us")}
                  </Select.Option>
                  <Select.Option value="+81">
                    {t("country_codes.jp")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} style={{ marginTop: "1.7rem" }}>
              <Form.Item
                name="phone_number"
                rules={[
                  { required: true, message: t("required.phone_number") },
                ]}
              >
                <Input placeholder={t("phone_number")} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("passport")}
                name="passport"
                rules={[{ required: true, message: t("required.passport") }]}
              >
                <Input placeholder={t("passport")} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label={t("expected_salary")}
                name="except_salary"
                rules={[
                  { required: true, message: t("required.expected_salary") },
                ]}
              >
                <Input
                  type="number"
                  placeholder={t("expected_salary")}
                  min={0}
                  defaultValue={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button type="primary" htmlType="submit">
                {t("submit")}
              </Button>
              <Button
                htmlType="reset"
                style={{
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "#fff",
                }}
                onClick={() => setCitizenId("")}
              >
                {t("reset")}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserFormCard;
