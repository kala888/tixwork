import {Typography} from "antd";

export default function HomePage() {
  return (
      <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxSizing: "border-box",
        paddingBottom: "20vh",
        color: "#666"
      }}>
        <Typography.Title>
          数据可视化大屏
        </Typography.Title>
        <div>
          技术支持：成都钛安科技科技
        </div>
      </div>
  );
};
