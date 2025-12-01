// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserFormCard from "./components/UserFormCard";
import UserTable from "./components/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { addUser, updateUser, setUsers, DataType } from "@/app/store/user/userSlice";
import { Select, Button, Row } from "antd";
import i18n from "@/app/i18n";

const LOCAL_STORAGE_KEY = "users_data";
type UserFormValues = Omit<DataType, "key">;

const Page: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const [editingUser, setEditingUser] = useState<DataType | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState(i18n.language);
  const router = useRouter();
  

  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      dispatch(setUsers(JSON.parse(savedData)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }
  }, [users, mounted]);

  const handleFinish = (values: UserFormValues) => {
    if (editingUser) {
      dispatch(updateUser({ ...editingUser, ...values }));
      setEditingUser(null);
    } else {
      dispatch(addUser({ key: Date.now().toString(), ...values }));
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ padding: 20 }}>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Button type="primary" onClick={() => router.push("/")}>
          Home
        </Button>

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
      </Row>

      <UserFormCard
        key={lang}
        onFinish={handleFinish}
        onFinishFailed={(err) => console.log("Form failed:", err)}
        initialValues={editingUser ?? undefined}
      />

      <UserTable onEdit={(user: DataType) => setEditingUser(user)} />
    </div>
  );
};

export default Page;
