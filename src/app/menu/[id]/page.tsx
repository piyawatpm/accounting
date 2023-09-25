"use client";

import { mockMenu } from "@/util/mockData";

const MenuDetail = ({ params, searchParams }: any) => {
  console.log("params", params);
  console.log("searchParams", searchParams);
  const targetMenu = mockMenu.find((e) => e.id === params.id);
  return (
    <div className=" w-screen h-screen flex flex-col">
      <p className=" text-xl">{targetMenu?.name}</p>
    </div>
  );
};
export default MenuDetail;
