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

  const saveUser = async (ev: FormEvent) => {
    try {
      ev.preventDefault();
      const userToSave = {
        _id: user._id,
        name,
        address,
        admin,
        city,
        email,
        image,
        tel,
      };
      await api.put(`${SERVER}/users`, userToSave);
      navigate(-1);
    } catch (err) {
      console.log(err);
      navigate(-1);
    }
  };

  return (
    <form onSubmit={saveUser}>
      <div className="flex items-center gap-4">
        <Button
          className="ml-auto"
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                placeholder="Enter user name"
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                placeholder="Enter user address"
                onChange={(ev) => setAddress(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="admin">admin</Label>

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
              <Label htmlFor="city">city</Label>
              <Input
                id="city"
                value={city}
                placeholder="Enter user city"
                onChange={(ev) => setCity(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                value={email}
                placeholder="Enter user email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="image">image</Label>
              <Input
                id="image"
                value={image}
                placeholder="Enter user image"
                onChange={(ev) => setImage(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="tel">tel</Label>
              <Input
                id="tel"
                value={tel}
                placeholder="Enter user tel"
                onChange={(ev) => setTel(ev.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default SingleUserPage;
