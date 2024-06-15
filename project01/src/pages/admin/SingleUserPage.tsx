import { Label } from "@radix-ui/react-label";
import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import api from "~/lib/api";
import { SERVER } from "~/lib/utils";
import { AdminType, UserInterface } from "~/models/User";

const SingleUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state as UserInterface;
  const [address, setAddress] = useState(user.address);
  const [admin, setAdmin] = useState(user.admin ? user.admin : AdminType.User);
  const [city, setCity] = useState(user.city);
  // const [createdAt, setCreatedAt] = useState(user.createdAt);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image);
  const [name, setName] = useState(user.name);
  const [tel, setTel] = useState(user.tel);
  const [password, setPassword] = useState("");

  const saveUser = async (ev: FormEvent) => {
    try {
      ev.preventDefault();
      const userToSave = {
        name,
        address,
        admin,
        city,
        email,
        image,
        tel,
      };
      if (user._id) {
        if (password) {
          await api.put(`${SERVER}/users/${user._id}`, {
            ...userToSave,
            _id: user._id,
            password: password,
          });
          navigate(-1);
        } else {
          await api.put(`${SERVER}/users/${user._id}`, { ...userToSave, _id: user._id });
          navigate(-1);
        }
      } else {
        try {
          const isAdmin = (await api.get(`${SERVER}/auth/admin`)).data.isAdmin;
          if (isAdmin) {
            if (password) {
              await api.post(`${SERVER}/users`, { ...userToSave, password });
              navigate(-1);
            } else {
              await api.post(`${SERVER}/users`, userToSave);
              navigate(-1);
            }
          }
          throw "not admin";
        } catch (err) {
          console.log(err);
          navigate(`/admin/users`);
        }
      }
    } catch (err) {
      console.log(err);
      navigate(-1);
    }
  };

  return (
    <form
      className="flex flex-col m-5"
      onSubmit={saveUser}
    >
      <div className="flex items-center gap-4">
        <Button
          className="m-auto text-xl"
          size="sm"
        >
          <input
            type="submit"
            className="cursor-pointer"
            value="Запазване"
          />
        </Button>
      </div>
      <Card className="mt-4 ">
        <CardContent>
          <div className="my-5 flex flex-col gap-4 md:grid md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Име</Label>
              <Input
                id="name"
                value={name}
                placeholder="Enter user name"
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                value={address}
                placeholder="Enter user address"
                onChange={(ev) => setAddress(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="admin">Тип акаунт</Label>

              <select
                id="admin"
                value={admin}
                onChange={(e) => setAdmin(Number(e.target.value) as AdminType)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={AdminType.User}>User</option>
                <option value={AdminType.Admin}>Admin</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="city">Град</Label>
              <Input
                id="city"
                value={city}
                placeholder="Enter user city"
                onChange={(ev) => setCity(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email адрес</Label>
              <Input
                id="email"
                value={email}
                placeholder="Enter user email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="image">Линк към снимка</Label>
              <Input
                id="image"
                value={image}
                placeholder="Enter user image"
                onChange={(ev) => setImage(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="tel">Телефонен Номер</Label>
              <Input
                id="tel"
                value={tel}
                placeholder="Enter user tel"
                onChange={(ev) => setTel(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password">
                {user._id && "Нова"} Парола {user._id && "(старата ще се замени)"}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Enter user password"
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default SingleUserPage;
