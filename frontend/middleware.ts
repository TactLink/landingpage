// Edge middleware is incompatible with the legacy @vercel/next builder.
// Locale redirect is handled by app/page.tsx instead.
export const config = {
  matcher: [],
};
