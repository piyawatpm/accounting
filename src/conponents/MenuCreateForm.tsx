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
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { mockIngredient } from "@/util/mockData";
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
    const currentData = form.getFieldValue("ingredients");
    // @ts-ignore
    const newData = currentData.map((ingredient) => {
      if (!ingredient) {
        return;
      }
      const targetIngredient = mockIngredient.find(
        (ingredientDetail) => ingredientDetail.key === ingredient.ingredientId
      );
      console.log("ingredient", ingredient);
      console.log("mockIngredient", mockIngredient);
      console.log("targetIngredient", targetIngredient);
      return {
        ...ingredient,
        productSize: targetIngredient?.productSize,
        unit: targetIngredient?.unit,
        productPrice: targetIngredient?.unitPrice,
      };
    });
    form.setFieldValue("ingredients", newData);
    console.log("values = ", form.getFieldValue("ingredients"));
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
  const handleFieldsChange = () => {
    console.log("values = ", form.getFieldValue("ingredients"));
    // const currentData = form.getFieldValue("ingredients");
    // const newValue =
    // console.log(values);
  };
  // {
  //   key: "1",
  //   name: "ingredient 1",
  //   category: "seafood",
  //   unit: "kg",
  //   unitPrice: 200,
  // },

  const testFn = () => {
    console.log("values = ", form.getFieldValue("ingredients"));
  };
  const handleCalculateCost = () => {
    const currentData = form.getFieldValue("ingredients");
    const newData = currentData.map((ingredient: any) => {
      if (!ingredient) {
        return;
      }
      const targetIngredient = mockIngredient.find(
        (ingredientDetail) => ingredientDetail.key === ingredient.ingredientId
      );
      console.log("ingredient", ingredient);
      console.log("mockIngredient", mockIngredient);
      console.log("targetIngredient", targetIngredient);
      const cost =
        // @ts-ignore
        (ingredient.qtyServe / targetIngredient?.productSize) *
        // @ts-ignore
        targetIngredient?.unitPrice;
      return {
        ...ingredient,
        cost,
      };
    });
    form.setFieldValue("ingredients", newData);
    console.log("values = ", form.getFieldValue("ingredients"));
  };
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
        onFieldsChange={handleFieldsChange}
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="sellingPrice" initialValue={0} label="Selling Price">
          <InputNumber min={0} />
        </Form.Item>
        <Form.List name="ingredients">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item name={[name, "ingredientId"]}>
                    <Select
                      showSearch
                      placeholder="Select an ingredient"
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      // @ts-ignore
                      filterOption={filterOption}
                      options={mockIngredient.map((ingredient) => {
                        console.log("heyy", key);
                        console.log("hey2", name);
                        return {
                          label: ingredient.name,
                          value: ingredient.key,
                        };
                      })}
                    />
                  </Form.Item>
                  <Form.Item name={[name, "unit"]}>
                    <Input placeholder="Unit" disabled />
                  </Form.Item>
                  <Form.Item name={[name, "productPrice"]}>
                    <Input placeholder="Product Price" disabled />
                  </Form.Item>
                  <Form.Item name={[name, "qtyServe"]}>
                    <Input
                      onChange={handleCalculateCost}
                      placeholder="QTY/Serve"
                    />
                  </Form.Item>

                  <Form.Item name={[name, "cost"]}>
                    <Input disabled placeholder="Cost" />
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
