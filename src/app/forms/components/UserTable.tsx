"use client";

import React from "react";
import { Table, Button, Space, Card } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import {
  deleteUser,
  deleteSelectedUsers,
  setSelectedKeys,
  DataType,
} from "@/app/store/user/userSlice";

interface UserTableProps {
  onEdit?: (user: DataType) => void;
}

const UserTable: React.FC<UserTableProps> = ({ onEdit }) => {
  const { t } = useTranslation("table");
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const selectedRowKeys = useSelector((state: RootState) => state.user.selectedKeys);

  const handleEdit = (record: DataType) => {
    if (onEdit) {
      onEdit(record);
    }
  };

  const handleDelete = (record: DataType) => {
    dispatch(deleteUser(record.key));
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: t("name"),
      key: "name",
      width: 150,
      render: (_, record) => {

        const titleMap = {
          "Mr.": "mr",
          "Ms.": "ms",
          "Other": "other",
        };
        const titleKey = titleMap[record.title as keyof typeof titleMap] ?? "other";


        return (
          <span style={{ padding: "0 8px", display: "inline-block", minWidth: 140 }}>
             {t(`titles.${titleKey}`)} {record.firstname} {record.lastname}
          </span>
        );
      },
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      width: 100,
      render: (gender) => t(`genders.${gender.toLowerCase()}`)
    },
    {
      title: t("phone"),
      key: "phone",
      width: 150,
      render: (_, record) => (
        <span style={{ padding: "0 8px", display: "inline-block", minWidth: 140 }}>
          {record.country_code} {record.phone_number}
        </span>
      ),
    },
    {
      title: t("manage"),
      key: "manage",
      width: 180,
      render: (_value: unknown, record: DataType) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            {t("edit")}
          </Button>
          <Button type="default" danger onClick={() => handleDelete(record)}>
            {t("delete")}
          </Button>
        </Space>
      ),
    }
  ];

  const rowSelection: TableProps<DataType>["rowSelection"] = {
    selectedRowKeys,
    onChange: (keys) => dispatch(setSelectedKeys(keys)),
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Card>
      <div style={{ width: "100%", maxWidth: 900, marginBottom: 16 }}>
        <span style={{ marginLeft: 8, color: "black" }}>
          {hasSelected ? t("selected", { count: selectedRowKeys.length }) : ""}
        </span>
        <Button
          type="primary"
          danger
          disabled={!hasSelected}
          onClick={() => dispatch(deleteSelectedUsers())}
          style={{ marginLeft: 8 }}
        >
          {t("delete")}
        </Button>
      </div>

      <Table<DataType>
        rowKey="key"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 700 }}
      />
    </Card>
  );
};

export default UserTable;
