import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/gear", "/ai-suggest"];
const PROTECTED_PACKAGES = /^\/packages(?!\/[^/]+\/public).*$/; // /packages/[id]/public は除外
const AUTH_PAGES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // 未認証で保護ページ → ログインへ
  if (!user && (PROTECTED.some((p) => pathname.startsWith(p)) || PROTECTED_PACKAGES.test(pathname))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 認証済みでlogin/register → マイ装備へ
  if (user && AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/gear", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/gear/:path*", "/packages/:path*", "/ai-suggest/:path*", "/login", "/register"],
};
