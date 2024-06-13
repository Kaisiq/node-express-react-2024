import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { useCallback } from "react";
import { useSizeLTMd } from "~/hooks/useScreenSize";

interface SwappableImage {
  id: string;
  content: JSX.Element;
}

interface SwappableImageListProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export function SwappableImageList({ images, onImagesChange }: SwappableImageListProps) {
  const isMdOrLess = useSizeLTMd();
  const [imageItems, setImageItems] = useState(
    images.map((image) => ({
      id: image,
      content: (
        <img
          className="rounded-lg bg-gray-200"
          alt={image}
          src={image}
          width={isMdOrLess ? 150 : 200}
          height={175}
          key={image}
        />
      ),
    }))
  );

  const handleInputChange = useCallback(
    (images: string[]) => {
      onImagesChange(images);
    },
    [onImagesChange]
  );

  function sortImages(imageItems: SwappableImage[]) {
    setImageItems(imageItems);
    const onlyLinks: string[] = [];
    imageItems.forEach((el) => onlyLinks.push(el.id));
    handleInputChange(onlyLinks);
  }

  return (
    <ReactSortable
      list={imageItems}
      setList={sortImages}
      className="grid h-fit grid-cols-2 gap-2 py-3 md:flex"
    >
      {!!imageItems?.length && imageItems.map((item) => <div key={item.id}>{item.content}</div>)}
    </ReactSortable>
  );
}
