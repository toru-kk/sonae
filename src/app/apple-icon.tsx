import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      // borderRadius なし — iOSが自動で角丸を付けるためフルブリードにする
      <div
        style={{
          width: 180,
          height: 180,
          background: "#185535",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 20 20" width={130} height={130}>
          <path
            d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z"
            fill="white"
          />
          <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
