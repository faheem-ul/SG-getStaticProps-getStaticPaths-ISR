import React from "react";

function ProductDeatils({ details }) {
  return (
    <div>
      <h1>Product Deatils</h1>
      <>
        {details.map((details) => {
          return (
            <div key={details.id}>
              <h4>{details.Title}</h4>
              {details.Description} {""},{details.price}
            </div>
          );
        })}
      </>
    </div>
  );
}

export default ProductDeatils;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { idproduct: "1" } },
      { params: { idproduct: "2" } },
      { params: { idproduct: "3" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  // console.log("params", params);
  const response = await fetch(
    `http://localhost:4000/Products/?id=${params.idproduct}`
    // here we have used query parameter
  );
  // console.log("this is the response console", response);
  const data = await response.json();
  // console.log("this is data console", data);

  return {
    props: {
      details: data,
    },
    revalidate: 10,
  };
}
