import { EditIcon } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { UserInterface } from "~/models/User";

const UsersPage = () => {
  const users = useLoaderData() as UserInterface[];
  return (
    <div>
      <section
        className={`text-white text-center justify-between flex flex-row gap-5 w-full m-auto p-3 rounded-lg text-lg my-1 bg-[#171717]`}
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
          color={index % 2 ? "bg-[#171717]" : "bg-[#313131]"}
        />
      ))}
    </div>
  );
};

export default UsersPage;

const User = ({ user, color }: { user: UserInterface; color: string }) => {
  const navigate = useNavigate();
  return (
    <section
      className={`text-white text-center justify-between flex flex-row gap-5 w-full m-auto p-3 rounded-lg text-lg my-1 ${color}`}
    >
      <p className="basis-full">{`${user._id}`}</p>
      <p className="basis-full">{`${user.name ? user.name : ""}`}</p>
      <p className="basis-full">{`${user.email ? user.email : ""}`}</p>
      <p className="basis-full">{`${user.tel ? user.tel : ""}`}</p>
      <p className="basis-full">{`${user.address ? user.address : ""}`}</p>
      <p className="basis-full">{`${user.city ? user.city : ""}`}</p>
      <p className="basis-full">{`${user.admin ? "Да" : ""}`}</p>
      <p className="basis-full">{`${
        user.createdAt ? new Date(user.createdAt) : "няма информация"
      }`}</p>
      <div className="basis-full">
        <Button
          onClick={() => {
            navigate(`/admin/users/${user._id}`, { state: user });
          }}
          className="bg-slate-600 m-auto"
        >
          <EditIcon />
        </Button>
      </div>
    </section>
  );
};
