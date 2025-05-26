import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      profile: { id, login, bio },
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: id,
          name: name,
          username: login,
          email: email,
          image: image,
          bio: bio || "",
        });
      }

      if (existingUser) {
        return true;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
        if (user) {
          token.id = user._id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      console.log("👉 session (after):", session); 
      return session;
    },
  },
});






// console log token and...

//     async jwt({ token, account, profile }) {
//       //       console.log("🔐 JWT CALLBACK");
//       // console.log("👉 token:", token);
//       // console.log("👉 account:", account);
//       // console.log("👉 profile:", profile);
//       if (account && profile) {
//         const user = await client
//           .withConfig({ useCdn: false })
//           .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//             id: profile?.id,
//           });
//         if (user) {
//           token.id = user._id;
//         }
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // console.log("📦 SESSION CALLBACK");
//       // console.log("👉 session (before):", session);
//       // console.log("👉 token:", token);
//       Object.assign(session, { id: token.id });
//       // console.log("👉 session (after):", session);

//       return session;
//     },
//   },
// });
