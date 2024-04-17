import React from "react";
import Link from "next/link";

function Products({ products }) {
  return (
    <div>
      <h1>Products Page</h1>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Link href={`/products/${product.id}`}>
              <p>{product.title}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Products;

export async function getStaticProps() {
  const response = await fetch("http://localhost:4000/Products");
  const data = await response.json();
  return {
    props: {
      products: data,
    },
  };
}
