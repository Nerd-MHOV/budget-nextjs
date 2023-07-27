import NextAuth from "next-auth/next";

//  edit here the information the user to client
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken: string;
    }
  }
}
