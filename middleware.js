import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes:['/','/view-listing/:path*','/rent', '/sell','/edit-listing/:path*']
});

// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};
