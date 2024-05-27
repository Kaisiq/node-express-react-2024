import type { ProductInterface } from "@/models/Product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import SingleProduct from "./SingleProduct";
// import { useRouter } from "next/router";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SingleProductModal = ({
  children,
  product,
}: {
  children: React.ReactNode;
  product: ProductInterface;
}) => {
  const [currentPath, setCurrentPath] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  // const router = useRouter();
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, []);
  return (
    <Dialog
      onOpenChange={(open: boolean) => {
        if (open) {
          navigate(`/product/${product._id}`, { replace: true });
          // router
          //   .push(`?product=${product._id}`, `/product/${product._id}`, {
          //     shallow: true,
          //   })
          //   .catch((err) => console.log(err));
        } else {
          navigate(currentPath, { replace: true });
          // router.push(currentPath, undefined, { shallow: true }).catch((err) => console.log(err));
        }
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-[90vw] max-w-[95vw] justify-center overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <SingleProduct {...product} />
      </DialogContent>
    </Dialog>
  );
};

export default SingleProductModal;
