import { useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import api from "~/lib/api";
import { SERVER } from "~/lib/utils";

export default function DeleteOrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const _id = location.state;

  function goBack() {
    navigate(-1);
  }

  function deleteOrder() {
    api
      .delete(`${SERVER}/orders/${_id}`)
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="p-10">
      <h1 className="text-center text-lg font-semibold md:text-2xl">
        Сигурен ли си че искаш да изтриеш поръчка с номер: {_id}
      </h1>
      <div className="mt-10 flex justify-center">
        <Button
          onClick={deleteOrder}
          variant="destructive"
          className="mr-10 w-[10%]"
        >
          Да
        </Button>
        <Button
          onClick={goBack}
          className="w-[10%]"
        >
          Не
        </Button>
      </div>
    </main>
  );
}
