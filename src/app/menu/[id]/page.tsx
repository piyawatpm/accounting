"use client";
import { mockMenu } from "../page";

const MenuDetail = ({ params, searchParams }) => {
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
