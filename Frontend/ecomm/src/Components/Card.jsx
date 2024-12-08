import React, { useState } from "react";

export default function Card({ items, addToCart }) {
    const [quantity, setQuantity] = useState(1);
    const totalPrice = items.price * quantity;

    return (
        <div>
            <div className="card card-compact bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={items.image_url}
                        alt="Shoes"
                        className="w-60 h-52" />
                </figure>
                <div className="card-body">
                    <div className="">
                        <h2 className="font-bold text-2xl">{items.title}</h2>
                        <p className="font-semibold text-xl text-red-600"> <span className="font-semibold text-xl">$</span>{totalPrice}</p>
                    </div>

                    <p className="font-semibold">{items.desc}</p>
                    {items.stock === 0 && (
                        <p className="text-red-500 font-bold">OUT OF STOCK</p>
                    )}
                    <div className="flex justify-around mt-2">
                        <input
                            type="number"
                            min="1"
                            value={quantity}  
                            onChange={(e) => setQuantity(Number(e.target.value))}  
                            className="input input-bordered w-16"
                            disabled={items.stock === 0}
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={() => addToCart(items._id, quantity)}
                            disabled={items.stock === 0}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}