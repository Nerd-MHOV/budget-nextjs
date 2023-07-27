"use client";
import "./styles.scss";
import { useContext } from "react";
import Link from "next/link";
import { SidebarContext } from "@/contexts/SidebarContext";
import Image from "next/image";
import { pagesSidebar } from "./pagesSidebar";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { activeSidebar, setActiveSidebar } = useContext(SidebarContext);
  const pathname = usePathname();
  console.log(pathname, "path");

  async function handleLogout(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    signOut({
      redirect: true,
      callbackUrl: "/auth/signin",
    });
  }

  return (
    <div className={activeSidebar ? "sidebar active" : "sidebar"}>
      <div className="navigation">
        <span className="btnMenu" onClick={setActiveSidebar}>
          {/* <Menu /> */}
        </span>
        <ul>
          <li>
            <Link href="/" className="link">
              <span className="icon logo_peraltas">
                <Image
                  src="/GP.png"
                  alt=""
                  width={60}
                  height={60}
                  style={{
                    width: "30px",
                  }}
                />
              </span>
              <span className="title ">Peraltas Orçamento</span>
            </Link>
          </li>
          {pagesSidebar.map((page) => (
            <li
              key={page.title}
              className={pathname === page.path ? "hovered" : ""}
            >
              <Link href={page.path} className="link flex items-stretch">
                <span className="icon flex justify-center pt-4 pl-2">
                  {page.icon}
                </span>
                <span className="title ">{page.title}</span>
              </Link>
            </li>
          ))}

          <li>
            <Link href="/" className="link" onClick={handleLogout}>
              <span className="icon flex justify-center pt-4 pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="title">Sair</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
