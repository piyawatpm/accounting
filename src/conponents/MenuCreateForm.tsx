import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
} from "antd";
import { ingredienCategorytData, mockIngredient } from "@/app/ingredient/page";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface MenuCreateForm {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  loading: boolean;
}

export const MenuCreateFrom: React.FC<MenuCreateForm> = ({
  open,
  onCreate,
  onCancel,
  loading,
}) => {
  const [form] = Form.useForm();
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      width={800}
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
        <Form.Item name="sellingPrice" label="Selling Price">
          <InputNumber />
        </Form.Item>
        <Form.List name="ingredient">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Select
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={mockIngredient.map((ingredient) => {
                      return {
                        label: ingredient.name,
                        value: ingredient.key,
                      };
                    })}
                  />
                  <Form.Item>
                    <Input  placeholder="Unit" disabled />
                  </Form.Item>
                  <Form.Item>
                    <Input placeholder="Product Price" disabled />
                  </Form.Item>
                  <Form.Item name={[name, "last"]}>
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
