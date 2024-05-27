// import Link from "next/link";
// import Image from "next/image";

const LinkImageWithText = (props: {
  image: string;
  text: string;
  height?: number;
  width?: number;
}) => {
  return (
    <div className="relative">
      <a
        href="/collection/sale"
        className="rounded-xl text-lg"
      >
        <img
          className="aspect-[8/7] overflow-hidden rounded-xl object-cover object-center"
          alt={props.text}
          src={props.image}
          height={props.height ?? 400}
          width={props.width ?? 400}
        />
        <div className="duration-125 absolute inset-0 flex items-center justify-center rounded-xl bg-black bg-opacity-50 transition hover:bg-opacity-40">
          <span className="text-3xl font-bold text-white drop-shadow-md md:text-4xl">
            {props.text}
          </span>
        </div>
      </a>
    </div>
  );
};

export default LinkImageWithText;
