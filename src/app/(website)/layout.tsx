import React, { ReactNode } from "react";
import "@/styles/globals.css";
import HeaderServer from '@/blocks/global/Header/Server';
import FooterServer from '@/blocks/global/Footer/Server';

export default function layout({children}: { children: ReactNode }) {
  return (
    <html lang={'en'}>
      <body>
        <HeaderServer />
          {children}
        <FooterServer />
      </body>
    </html>
  )
}