import React from "react";
import type { Product } from "../../types/Product";

interface Props {
    products: Product[];
}

const ProductTable: React.FC<Props> = ({ products }) => {
    return (
        <div className="bg-white rounded">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <th className="text-left p-3">PRODUCT</th>
                    <th className="text-left">CATEGORY</th>
                    <th className="text-left">PRICE</th>
                    <th className="text-left">STOCK</th>
                </thead>

                <tbody>
                    {
                        products.map((p) => (
                            <tr key={p.id} className="border-b">

                            <td className="p-3">
                                <div className="font-bold text-blue-600">
                                    {p.name}
                                </div>
                            
                            </td>

                            <td>{p.category}</td>

                            <td>{p.price.toLocaleString()}đ</td>

                            <td
                                className={
                                p.stock <= 2
                                    ? 'text-red-500 font-bold'
                                    : ''
                                }
                            >
                                {p.stock}
                            </td>

                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>

    );
};

export default ProductTable;