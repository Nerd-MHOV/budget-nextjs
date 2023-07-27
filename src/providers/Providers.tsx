"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import {SidebarContextProvider} from "@/contexts/SidebarContext";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {

  return <SessionProvider>
    <SidebarContextProvider>
      {children}
    </SidebarContextProvider>
  </SessionProvider>;
};

export default Providers;
