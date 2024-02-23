import Link from "next/link";

export function ClothingSlot({ product }: any) {
  console.log(product);
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-xl transition-transform duration-300 ease-in-out hover:translate-y-[-4px] hover:shadow-2xl">
      <Link className="absolute inset-0 z-10" href={product.link}>
        <span className="sr-only">View</span>
      </Link>
      <img
        alt="Garment 1"
        className="h-60 w-full object-cover"
        height={400}
        src="/placeholder.svg"
        style={{
          aspectRatio: "300/400",
          objectFit: "cover",
        }}
        width={300}
      />
      <div className="grid gap-2 p-4 dark:text-gray-300">
        <h3 className="text-base font-bold md:text-xl lg:text-base xl:text-xl 2xl:text-2xl">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm md:text-base">
          {product.description}
        </p>
        <h4 className="text-base font-semibold md:text-xl lg:text-base xl:text-xl 2xl:text-2xl">
          {product.price}лв
        </h4>
      </div>
    </div>
  );
}
