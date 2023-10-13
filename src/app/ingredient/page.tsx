"use client";
import {
  Checkbox,
  Dropdown,
  Empty,
  Progress,
  Table,
  Button,
  Modal,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Space,
  InputRef,
} from "antd";
import { v4 as uuidv4 } from "uuid";

import TextArea from "antd/es/input/TextArea";
import { ColumnType, ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IngredientCreateForm } from "@/conponents/IngredientCreateForm";
import { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { DataIndex, Ingredient, IngredientCategory } from "./type";
import { ingredienCategorytData, mockIngredient } from "@/util/mockData";
import axios from "axios";
import { useAllIngredient } from "@/swr/useAllIngredient";

const IngredientPage = () => {
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const { data: ingredientListFromApi, mutate: refetchIngredients } =
    useAllIngredient();
  useEffect(() => {
    if (ingredientListFromApi) {
      setIngredientList(ingredientListFromApi);
    }
  }, [ingredientListFromApi]);
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<Ingredient> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          // @ts-ignore
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="default"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const onCreate = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/ingredients", {
        key: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d,
        ...values,
      });
      await refetchIngredients();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }

    // await setTimeout(() => {
    //   setIngredientList((p) => {
    //     return [...p, values];
    //   });
    //   setOpen(false);
    //   setLoading(false);
    // }, 3000);
    // setOpen(false);s
  };
  const onCancel = () => {
    setOpen(false);
  };
  const handleShowModal = () => {
    setOpen(true);
  };
  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-10">
      <h1>Ingredient List</h1>

      <div className=" mt-2 flex w-full flex-1 flex-col   pb-4">
        <Table
          loading={loading}
          className="custom-playlist-management-table "
          columns={handleGenerateColumns({ getColumnSearchProps })}
          dataSource={ingredientList}
        />

        <Button type="default" onClick={handleShowModal}>
          Add New Ingredient
        </Button>
        <IngredientCreateForm
          open={open}
          loading={loading}
          onCreate={onCreate}
          onCancel={onCancel}
        />
      </div>
    </main>
  );
};

const handleGenerateColumns: ({
  getColumnSearchProps,
}: {
  getColumnSearchProps: any;
}) => //   mutate,

ColumnsType<Ingredient> = ({ getColumnSearchProps }) => [
  {
    title: () => <p className=" text-xs font-bold text-[#5422D2]">Name</p>,
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps("name"),

    render: (name, item) => {
      return (
        <div className=" flex flex-col text-xs font-normal">
          <p className={``}>{name}</p>
        </div>
      );
    },
  },
  {
    title: () => (
      <p className=" text-xs font-bold text-[#5422D2]">Categories</p>
    ),

    dataIndex: "category",
    key: "category",
    filters: ingredienCategorytData.map((e) => {
      return { text: e, value: e };
    }),

    onFilter: (value: string, record) => record.category.indexOf(value) === 0,

    render: (category, item) => {
      return (
        <div className=" flex flex-col text-xs font-normal">{category}</div>
      );
    },
  },
  {
    title: () => <p className=" text-xs font-bold text-[#5422D2]">Unit</p>,
    dataIndex: "unit",
    key: "unit",

    render: (unit, item) => {
      return <div className=" flex flex-col text-xs font-normal">{unit}</div>;
    },
  },
  {
    title: () => (
      <p className=" text-xs font-bold text-[#5422D2]">Unit Price</p>
    ),
    dataIndex: "unitPrice",
    key: "unitPrice",

    render: (unitPrice, item) => {
      return (
        <div className=" flex flex-col text-xs font-normal">
          <p>{`${unitPrice} $`}</p>
        </div>
      );
    },
  },
];

export default IngredientPage;
