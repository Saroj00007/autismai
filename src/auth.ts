import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import Usermodel from "./model/userModel";
import { dbconnect } from "./lib/db";
import { use } from "react";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: { label: "password" },
      },

      // yo chai kasto haicha bhanda chai user le login garyo using the credential can this user move forward aaba yaha chai password compare garera result provide garne.

      async authorize(credentials)  {
        await dbconnect();

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await Usermodel.findOne({
          email: credentials.email,
        });

        if (!user) {
          return null;
        }

        const isValidPassword =  bcrypt.compare(
          credentials.password as string,
          user.password as string,
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name as string,
          email: user.email as string
        };
      },
    }),
  ],

  callbacks : {

    async jwt({token , user}) {
      if(user){
         token.id = user.id
      }

      return token
    } , 

    async session({session , token}){

      if(session.user) {
        session.user.id = token.id as string
      }

      return session
    }
  }
});

d
