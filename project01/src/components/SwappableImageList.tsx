import { ReactSortable } from "react-sortablejs";
import Image from "next/image";
import { useState } from "react";
import { useCallback } from "react";

interface SwappableImage {
  id: string;
  content: JSX.Element;
}

interface SwappableImageListProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export function SwappableImageList({
  images,
  onImagesChange,
}: SwappableImageListProps) {
  const [imageItems, setImageItems] = useState(
    images.map((image) => ({
      id: image,
      content: (
        <Image
          className="rounded-lg bg-gray-200"
          alt={image}
          src={image}
          width={100}
          height={175}
          key={image}
        />
      ),
    })),
  );

  const handleInputChange = useCallback(
    (images: string[]) => {
      onImagesChange(images);
    },
    [onImagesChange],
  );

  function sortImages(imageItems: SwappableImage[]) {
    setImageItems(imageItems);
    const onlyLinks: string[] = [];
    imageItems.forEach((el) => onlyLinks.push(el.id));
    handleInputChange(onlyLinks);
  }

  return (
    <ReactSortable list={imageItems} setList={sortImages} className="flex h-24">
      {!!imageItems?.length &&
        imageItems.map((item) => <div key={item.id}>{item.content}</div>)}
    </ReactSortable>
  );
}
