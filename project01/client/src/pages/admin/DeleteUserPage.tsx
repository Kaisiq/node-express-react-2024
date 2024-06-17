import { Button } from "~/components/ui/button";
import { useLocation, useNavigate } from "react-router";
import { SERVER } from "~/lib/utils";
import api from "~/lib/api";

export default function DeleteProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const _id = location.state;

  function goBack() {
    navigate(-1);
  }

  function deleteProduct() {
    api
      .delete(`${SERVER}/users/${_id}`)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="p-10">
      <h1 className="text-lg font-semibold md:text-2xl">
        Do you really want to delete user with id: {_id}
      </h1>
      <Button onClick={deleteProduct}>Yes</Button>
      <Button onClick={goBack}>No</Button>
    </main>
  );
}
