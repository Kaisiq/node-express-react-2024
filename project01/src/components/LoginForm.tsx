import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { type FormEvent, useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { toast } from "./ui/use-toast";
import type { UserInterface } from "~/models/User";
import { Link, useNavigate } from "react-router-dom";
import { SERVER } from "~/lib/utils";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const credentials = {
      email,
      password,
    };
    axios
      .post(`${SERVER}/auth/password`, credentials)
      .then((response: AxiosResponse<{ user: UserInterface; token: string }>) => {
        const { user, token } = response.data;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", user.email);
        navigate("/account");
      })
      .catch((err: Error) => {
        toast({ title: "Грешка", description: err.message });
      });
  };

  return (
    <div className="flex h-full min-h-[80vh] items-center justify-center">
      <div className="max-w-sm space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700">
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Влизане в две/трети</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Влизайки или създавайки акаунт, Вие се съгласявате с нашите{" "}
              <Link
                className="text-blue-500 hover:text-blue-700"
                to="#"
              >
                terms
              </Link>{" "}
              и{" "}
              <Link
                className="text-blue-500 hover:text-blue-700"
                to="#"
              >
                privacy policy
              </Link>
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
            <Link
              className="ml-auto inline-block text-sm underline"
              to="#"
            >
              Забравили сте паролата си?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full text-white"
          >
            Влизане
          </Button>
        </form>
      </div>
    </div>
  );
}
