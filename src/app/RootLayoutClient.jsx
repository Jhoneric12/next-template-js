"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import TanStackProvider from "./TanStackProvider";

export default function RootLayoutClient({ children }) {
  return (
    <AntdRegistry>
      <TanStackProvider>
        <ConfigProvider theme={{ token: { primaryColor: "#1890ff" } }}>{children}</ConfigProvider>
      </TanStackProvider>
    </AntdRegistry>
  );
}
