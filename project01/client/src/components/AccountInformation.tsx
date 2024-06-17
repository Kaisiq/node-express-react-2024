import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { type AxiosResponse } from "axios";
import { type UserInterface } from "~/models/User";
import { Input } from "./ui/input";
import { SERVER } from "~/lib/utils";
import api from "~/lib/api";

export function AccountInformation({ userEmail }: { userEmail: string }) {
  const [userData, setUserData] = useState<UserInterface>();
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState("");
  const [editingTel, setEditingTel] = useState(false);
  const [tel, setTel] = useState("");
  const [editingAddress, setEditingAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const getUserInformation = useCallback(async () => {
    if (!userEmail) {
      return;
    }
    await api
      .get(`${SERVER}/users/${userEmail}`)
      .then((res: AxiosResponse<UserInterface>) => {
        setUserData(res.data);
        if (userData?.name) setName(userData.name);
        if (userData?.tel) setTel(userData.tel);
        if (userData?.address) setAddress(userData?.address);
        if (userData?.city) setCity(userData?.city);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [userEmail, userData?.name, userData?.tel, userData?.address, userData?.city]);

  useEffect(() => {
    getUserInformation().catch((err) => console.log(err));
  }, [getUserInformation]);
  return (
    <section id="account">
      <h2 className="mb-4 text-xl font-semibold">Информация за вашият акаунт</h2>
      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800">
          <div>
            <p className="text-gray-700 dark:text-gray-300">Име и Фамилия</p>
            {editingName ? (
              <Input
                value={name}
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
                className="text-md h-[2rem] text-gray-500 dark:text-gray-400"
              />
            ) : (
              <p className="h-[2rem] pl-3 pt-1 text-gray-500 dark:text-gray-400">
                {userData?.name}
              </p>
            )}
          </div>
          <Button
            onClick={() => {
              if (editingName) {
                if (userData) userData.name = name;
                api
                  .patch(`${SERVER}/users/${userData?.email}`, { name })
                  .then(() => {
                    getUserInformation().catch((err) => {
                      console.log(err);
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              setEditingName(!editingName);
            }}
            variant="outline"
          >
            {editingName ? "Запазване" : "Промяна"}
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800">
          <div>
            <p className="text-gray-700 dark:text-gray-300">Телефонен номер</p>
            {editingTel ? (
              <Input
                value={tel}
                onChange={(ev) => {
                  setTel(ev.target.value);
                }}
                className="text-md h-[2rem] text-gray-500 dark:text-gray-400"
              />
            ) : (
              <p className="h-[2rem] pl-3 pt-1 text-gray-500 dark:text-gray-400">{userData?.tel}</p>
            )}
          </div>
          <Button
            onClick={() => {
              if (editingTel) {
                if (userData) userData.tel = tel;
                api
                  .patch(`${SERVER}/users/${userData?.email}`, { tel })
                  .then(() => {
                    getUserInformation().catch((err) => {
                      console.log(err);
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              setEditingTel(!editingTel);
            }}
            variant="outline"
          >
            {editingTel ? "Запазване" : "Промяна"}
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-md bg-white p-4 shadow dark:bg-gray-800">
          <div>
            <p className="text-gray-700 dark:text-gray-300">Адрес за доставка</p>
            {editingAddress ? (
              <div className="flex gap-2">
                <Input
                  placeholder="град"
                  value={city}
                  onChange={(ev) => {
                    setCity(ev.target.value);
                  }}
                  className="text-md h-[2rem] text-gray-500 dark:text-gray-400"
                />
                <Input
                  placeholder="адрес"
                  value={address}
                  onChange={(ev) => {
                    setAddress(ev.target.value);
                  }}
                  className="text-md h-[2rem] text-gray-500 dark:text-gray-400"
                />
              </div>
            ) : (
              <p className="h-[2rem] pl-3 pt-1 text-gray-500 dark:text-gray-400">
                {userData?.city}
                {userData?.city && userData?.address ? ", " : ""}
                {userData?.address}
              </p>
            )}
          </div>
          <Button
            onClick={() => {
              if (editingAddress) {
                if (userData) {
                  userData.address = address;
                  userData.city = city;
                }
                api
                  .patch(`${SERVER}/users/${userData?.email}`, { city, address })
                  .then(() => {
                    getUserInformation().catch((err) => {
                      console.log(err);
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              setEditingAddress(!editingAddress);
            }}
            variant="outline"
          >
            {editingAddress ? "Запазване" : "Промяна"}
          </Button>
        </div>
      </div>
    </section>
  );
}
