"use client";
import { Space, Button, Table, InputRef } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import { Input } from "postcss";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { MenuCreateFrom } from "@/conponents/MenuCreateForm";
import { mockMenu } from "@/util/mockData";
import { MenuTableData, DataIndex } from "./type";
import { v4 as uuidv4 } from "uuid";
import { api } from "../../../lib/axios";

const MenuPage = () => {
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState<MenuTableData[]>(mockMenu);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
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
  ): ColumnType<MenuTableData> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        {/* @ts-ignore */}
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e: any) =>
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
  const handleShowModal = () => {
    setOpen(true);
  };
  const onCreate = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      setLoading(true);
      const response = await api.post("menus", {
        key: uuidv4(),
        ...values,
      });
      // await refetchIngredients();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // setOpen(false);
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
  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-10">
      <h1>Menu List</h1>

      <div className=" mt-2 flex w-full flex-1 flex-col   pb-4">
        <Table
          loading={loading}
          className="custom-playlist-management-table "
          columns={handleGenerateColumns({ getColumnSearchProps })}
          dataSource={menuList}
        />

        <Button type="default" onClick={handleShowModal}>
          Add New Menu
        </Button>
        <MenuCreateFrom
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

ColumnsType<MenuTableData> = ({ getColumnSearchProps }) => [
  {
    title: () => <p className=" text-xs font-bold text-[#5422D2]">Name</p>,
    dataIndex: "name",
    key: "name",
    ...getColumnSearchProps("name"),

    render: (name, item) => {
      return (
        <Link
          href={`/menu/${item.key}`}
          className=" flex flex-col text-xs font-normal"
        >
          <p className={``}>{name}</p>
        </Link>
      );
    },
  },
  {
    title: () => <p className=" text-xs font-bold text-[#5422D2]">Cost</p>,

    dataIndex: "cost",
    key: "cost",

    render: (cost, item) => {
      return <div className=" flex flex-col text-xs font-normal">{cost}</div>;
    },
  },
  {
    title: () => <p className=" text-xs font-bold text-[#5422D2]">Cost %</p>,
    dataIndex: "costPercent",
    key: "costPercent",

    render: (costPercent, item) => {
      return (
        <div className=" flex flex-col text-xs font-normal">{costPercent}</div>
      );
    },
  },
  {
    title: () => <p className=" text-xs font-bold text-[#5422D2]">Yield %</p>,
    dataIndex: "yieldPercent",
    key: "yieldPercent",

    render: (yieldPercent, item) => {
      return (
        <div className=" flex flex-col text-xs font-normal">
          <p>{`${yieldPercent}`}</p>
        </div>
      );
    },
  },
];

export default MenuPage;
