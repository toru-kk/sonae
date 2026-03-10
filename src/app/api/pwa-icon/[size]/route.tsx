import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  const { size: sizeStr } = await params;
  const size = sizeStr === "512" ? 512 : 192;
  // maskable safe zone = 80% of canvas → keep icon within 60% to be safe
  const iconSize = size === 512 ? 280 : 108;

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          background: "#185535",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg viewBox="0 0 20 20" width={iconSize} height={iconSize}>
          <path
            d="M2 16 Q4 16 6.5 9 Q8 13 9.5 12.5 Q11.2 8.5 13 4 Q14.8 9 18 16 Z"
            fill="white"
          />
          <circle cx="13" cy="4" r="1.2" fill="#f59e0b" />
        </svg>
      </div>
    ),
    { width: size, height: size }
  );
}
