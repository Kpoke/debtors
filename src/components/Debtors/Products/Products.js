import React from "react";

const Products = props => {
	const { products } = props;
	return (
		<>
			<ul>
				{products.map(p => (
					<li key={p.id}>
						<p>Name of product collected: {p.name}</p>
						<p>Quantity collected: {p.quantity}</p>
						<p>Price of one: {p.priceOfOne}</p>
						<p>
							Total price: <strong>{p.priceOfOne * p.quantity}</strong>
						</p>
					</li>
				))}
			</ul>
		</>
	);
};

export default Products;
