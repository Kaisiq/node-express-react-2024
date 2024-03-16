import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import type {
	NextApiResponse,
	GetServerSidePropsContext,
	NextApiRequest,
} from "next";
import {
	getServerSession,
	type DefaultSession,
	type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "~/lib/mongodb";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: DefaultSession["user"] & {
			id: string;
			// ...other properties
			// role: UserRole;
		};
	}

	// interface User {
	//   // ...other properties
	//   // role: UserRole;
	// }
}

const adminEmails = ["dahudohu@gmail.com"];

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	callbacks: {
		// session: ({ session, token, user }) => ({
		//   ...session,
		//   user: {
		//     ...session.user,
		//     id: token.sub,
		//   },
		// }),
		session: ({ session }) => {
			return session;
		},
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID
				? process.env.GOOGLE_CLIENT_ID
				: "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
				? process.env.GOOGLE_CLIENT_SECRET
				: "",
		}),

		// DiscordProvider({
		// clientId: env.DISCORD_CLIENT_ID,
		// clientSecret: env.DISCORD_CLIENT_SECRET,
		// }),
		/**
		 * ...add more providers here.
		 *
		 * Most other providers require a bit more work than the Discord provider. For example, the
		 * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
		 * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */
	],
	adapter: MongoDBAdapter(clientPromise),
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};

export async function isAdminRequest(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const session = await getServerSession(req, res, authOptions);
	if (
		!session ||
		!session.user ||
		!session.user.email ||
		!adminEmails.includes(session.user.email)
	) {
		return false;
	}
	return true;
}

export async function isUserRequest(
	req: NextApiRequest,
	res: NextApiResponse,
	email: string,
) {
	const session = await getServerSession(req, res, authOptions);
	if (!session?.user?.email || email != session.user.email) {
		return false;
	}
	return true;
}
