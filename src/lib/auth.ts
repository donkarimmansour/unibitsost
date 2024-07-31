import { env } from "process"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { z } from "zod"

import db from "@/lib/db"

import { userSignInSchema } from "./validations/auth"

// type LoginResponse = {
//     token: string;
//     user: {
//       id: string;
//       email: string;
//       name: string;
//       phone: string;
//       role: string;
//       picture: string;
//     };
// };

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/error",
    signOut: "/signup",
  },
  // events: {
  //   createUser({ user }) {
  //     console.log("evants createUser => ");
  //     console.log("evants createUser => ");
  //     console.log(user);
  //   },
  //   linkAccount({ user, account, profile }) {
  //     console.log("evants linkAccount => ");
  //     console.log("evants linkAccount => ");
  //     console.log(user, account, profile);
  //   },
  //   signIn({ user, account, profile }) {
  //     console.log("evants signIn => ");
  //     console.log("evants signIn => ");
  //     console.log(user, account, profile);
  //   },
  //   signOut(message) {
  //     console.log("evants signOut => ");
  //     console.log("evants signOut => ");
  //     console.log(message);
  //   },
  //   updateUser(message) {
  //     console.log("evants updateUser => ");
  //     console.log("evants updateUser => ");
  //     console.log(message);
  //   },
  //   session({ session, token }) {
  //       console.log("evants session => ");
  //       console.log("evants session => ");
  //       console.log(session, token);
  //   },
  // },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile, tokens) {
          return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                // emailVerified: profile.emailVerified,
                image: profile.image,
                // createdAt: profile.createdAt,
                // updatedAt: profile.updatedAt,
                // accounts: profile.accounts,
                // sessions: profile.sessions,
                // weathers: profile.weathers
          }
      },
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      
      async authorize(credentials: any) {

        if (!credentials) {
          throw new Error("Please enter an email and password");
        }
        
        // check to see if email and password is there
        const check = userSignInSchema.safeParse(credentials)

        if (!check.success) {
          throw new Error("Please enter an email and password")
        }

        const user = await db.user.findUnique({
          where: { email: credentials?.email },
        })

        // if no user was found
        if (!user || !user?.hashedPassword) {
          console.log("USER NOT FOUND")
          throw new Error("No user found")
        }
        console.log("USER FOUND")
        const passwordCorrect = await compare(
          credentials.password,
          user.hashedPassword
        )

        console.log(passwordCorrect) // True or False
        // if password does not match
        if (!passwordCorrect) {
          throw new Error("Incorrect password")
        }

        return user as any
        // return {
        //   name: user.name,
        //   id: user.id,
        // }
      },
    }),

  
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "credentials") {
        return true
      }else if (account?.provider == "google") {
        return true
      }

      return true
    },
    async session({ token, session }) {
      // console.log("get session");

        if (token) {
          session.user.id = token.sub!
          session.user.name = token.name
          session.user.email = token.email
          session.user.image = token.picture
        }
 
       return session
    },
    async jwt({ token, user, account, profile, isNewUser, trigger, session }) {

      if(trigger === 'update') {
        token.name = session.name
      }

      // console.log("get jwt")
      // console.log(token, user)

      //   const dbUser = await db.user.findFirst({
      //     where: {
      //       email: token.email,
      //     },
      //   })

      //   if (!dbUser) {
      //     if (user) {
      //       token.id = user?.id
      //     }
      //     return token
      //   }

      //   return {
      //     id: dbUser.id,
      //     name: dbUser.name,
      //     email: dbUser.email,
      //     picture: dbUser.image,
      //   }

      return token
    },
  },
}
