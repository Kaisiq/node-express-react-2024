import { DeleteIcon, EditIcon } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { AdminType, UserInterface } from "~/models/User";

const UsersPage = () => {
  const users = useLoaderData() as UserInterface[];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={() => {
          navigate("/admin/users/register", {
            state: {
              email: "",
              name: "",
              tel: "",
              address: "",
              city: "",
              hashedPassword: "",
              image: "",
              admin: AdminType.User,
              emailVerified: 0,
              _id: "",
              createdAt: "",
            },
          });
        }}
        className="text-2xl m-3 p-7"
        variant="outline"
      >
        Добавяне на потребител
      </Button>
      <div className="flex flex-col rounded-lg border border-slate-200  p-0 w-full m-3 ">
        <section
          className={`text-center justify-between flex flex-row w-full m-auto p-3 rounded-lg text-lg`}
        >
          <p className="basis-full">{`id`}</p>
          <p className="basis-full">{`Име`}</p>
          <p className="basis-full">{`email`}</p>
          <p className="basis-full">{`tel`}</p>
          <p className="basis-full">{`address`}</p>
          <p className="basis-full">{`city`}</p>
          <p className="basis-full">{`admin`}</p>
          <p className="basis-full">{`createdAt`}</p>
          <p className="basis-full">Edit</p>
        </section>
        {users.map((user, index) => (
          <User
            key={user._id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;

const User = ({ user }: { user: UserInterface }) => {
  const navigate = useNavigate();
  return (
    <section
      className={`border-t border-slate-200 text-center items-center justify-between flex flex-row w-full m-auto p-3 text-lg`}
    >
      <p className="basis-full">{`${user._id}`}</p>
      <p className="basis-full">{`${user.name ? user.name : ""}`}</p>
      <p className="basis-full">{`${user.email ? user.email : ""}`}</p>
      <p className="basis-full">{`${user.tel ? user.tel : ""}`}</p>
      <p className="basis-full">{`${user.address ? user.address : ""}`}</p>
      <p className="basis-full">{`${user.city ? user.city : ""}`}</p>
      <p className="basis-full">{`${
        user.admin === AdminType.Admin
          ? "Админ"
          : user.admin === AdminType.Staff
          ? "Служител"
          : "Потребител"
      }`}</p>
      <p className="basis-full">{`${
        user.createdAt ? new Date(user.createdAt) : "няма информация"
      }`}</p>
      <div className="flex basis-full flex-col gap-1">
        <Button
          size="sm"
          onClick={() => {
            navigate(`/admin/users/${user._id}`, { state: user });
          }}
          className="bg-slate-600 m-auto"
        >
          <EditIcon />
        </Button>
        <Button
          size="sm"
          onClick={() => {
            navigate(`/admin/users/delete`, { state: user._id });
          }}
          className="bg-slate-600 m-auto"
        >
          <DeleteIcon />
        </Button>
      </div>
    </section>
  );
};
