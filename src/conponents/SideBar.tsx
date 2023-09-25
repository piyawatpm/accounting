"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
const SideBar = () => {
  const activeSegment = useSelectedLayoutSegment();

  const links = [
    { label: " Ingredient", path: "/ingredient", targetSegment: null },
    { label: " Menu", path: "/menu", targetSegment: "news" },
    // { label: " Contact", path: "/contact", targetSegment: "contact" },
  ];
  return (
    <div className=" w-full h-full flex flex-col">
      {links.map((l, i) => {
        return (
          <Link
            key={i}
            href={l.path}
            style={{
              textDecoration:
                activeSegment === l.targetSegment ? "underline" : "none",
            }}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
};
export default SideBar;
