/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XNlTLb7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AppleIcon } from "~/components/Icons";
import { ChromeIcon } from "~/components/Icons";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-sm space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            By logging in, you accept our
            <Link className="text-blue-500 hover:text-blue-700" href="#">
              terms
            </Link>
            and
            <Link className="text-blue-500 hover:text-blue-700" href="#">
              privacy policy
            </Link>
            .{"\n                            "}
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
            <span className="text-sm text-zinc-400 dark:text-zinc-300">OR</span>
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" required type="password" />
          </div>
          <Button onClick={() => signIn()} className="w-full text-white">
            Login
          </Button>
          <Button
            onClick={() => signIn("google")}
            className="w-full bg-[#4285F4] text-white"
            variant="outline"
          >
            <div className="flex items-center justify-center">
              <ChromeIcon className="mr-2 h-5 w-5" />
              Login with Google
            </div>
          </Button>
          <Button
            onClick={() => signIn("apple")}
            className="w-full bg-black text-white"
            variant="outline"
          >
            <div className="flex items-center justify-center">
              <AppleIcon className="mr-2 h-5 w-5" />
              Login with Apple
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
