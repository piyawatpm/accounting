import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Radio } from "antd";
import { ingredienCategorytData } from "@/util/mockData";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  loading: boolean;
}

export const IngredientCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  loading,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new Ingredient"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Radio.Group>
            {ingredienCategorytData.map((category) => {
              return (
                <Radio key={category} value={category}>
                  {" "}
                  {category}{" "}
                </Radio>
              );
            })}
          </Radio.Group>
        </Form.Item>

        <Form.Item name="unit" label="Unit">
          <Input />
        </Form.Item>
        <Form.Item name="unitPrice" label="Unit Price">
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
