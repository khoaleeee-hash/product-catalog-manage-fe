import React from "react";
import type { Product } from "../../types/Product";

interface Props {
    products: Product[];
    onDelete: (productId: number) => void;
    onUpdate: (productId: number) => void;
}

const ProductTable: React.FC<Props> = ({ products, onDelete, onUpdate }) => {
    return (
        <div className="bg-white rounded">
            <table className="w-full">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="text-left p-3">PRODUCT</th>
                        <th className="text-left">CATEGORY</th>
                        <th className="text-left">PRICE</th>
                        <th className="text-left">STOCK</th>
                        <th className="text-left">ACTION</th>
                    </tr>
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

                            <td>{p.category.categoryName}</td>

                            <td>{Number(p.price ?? 0).toLocaleString()}đ</td>

                            <td>
                                {p.stockQuantity}
                            </td>

                            <td>
                                <button 
                                onClick={() => p.id && onDelete(p.id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Delete
                                </button>

                                <button
                                onClick={() => p.id && onUpdate(p.id)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Update
                                </button>
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