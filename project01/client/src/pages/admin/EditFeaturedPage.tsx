import React from "react";
import { useLocation } from "react-router";
import SelectFeatured from "~/components/SelectFeatured";

const EditFeaturedPage = () => {
  const location = useLocation();
  const products = location.state;
  return (
    <>
      <h1 className="text-2xl text-center m-4">Edit featured</h1>
      <SelectFeatured products={products} />
    </>
  );
};

export default EditFeaturedPage;
