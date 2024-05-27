// import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChromeIcon } from "~/components/Icons";
// import { signIn } from "next-auth/react";
import { type FormEvent, useState } from "react";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import { toast } from "./ui/use-toast";
import type { UserInterface } from "~/models/User";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const credentials = {
      email,
      password,
    };
    axios
      .post("/api/login", credentials)
      .then((user: AxiosResponse<UserInterface>) => {
        console.log(user.data);
        // signIn("credentials", {
        // ...credentials,
        // redirect: false,
        // }).catch((error: string) => {
        // console.log(error);
        // });
      })
      .catch((err: AxiosError<{ error: string }>) => {
        toast({ title: "Грешка", description: err.response?.data.error });
      });

    // const result = await signIn("credentials", {
    // 	redirect: false,
    // 	...credentials,
    // });
    // if (!result?.error) {
    // } else {
    // 	console.log("error logging in:", result.error);
    // }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-sm space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700">
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Влизане в две/трети</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Влизайки или създавайки акаунт, Вие се съгласявате с нашите{" "}
              <a
                className="text-blue-500 hover:text-blue-700"
                href="#"
              >
                terms
              </a>{" "}
              и{" "}
              <a
                className="text-blue-500 hover:text-blue-700"
                href="#"
              >
                privacy policy
              </a>
              .{"\n                            "}
            </p>
          </div>
          {/* <div className="space-y-4"> */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Парола</Label>
            </div>
            <Input
              id="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
              type="password"
            />
            <a
              className="ml-auto inline-block text-sm underline"
              href="#"
            >
              Забравили сте паролата си?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full text-white"
          >
            Влизане
          </Button>
        </form>

        <div className="flex items-center space-x-2">
          <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
          <span className="text-sm text-zinc-400 dark:text-zinc-300">или</span>
          <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
        </div>
        <Button
          // onClick={async () => await signIn("google")}
          className="w-full bg-[#4285F4] text-white"
          variant="outline"
        >
          <div className="flex items-center justify-center">
            <ChromeIcon className="mr-2 h-5 w-5" />
            Влизане с Google
          </div>
        </Button>
        {/* </div> */}
      </div>
    </div>
  );
}
