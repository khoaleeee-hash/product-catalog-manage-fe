import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Tag, Lock, ArrowLeft } from "lucide-react";
import { getCart } from "../../services/CartService";
import type { CartResponse } from "../../types/Cart";
import type { ApiResponse } from "../../types/ApiResponse";
import { resolveImageUrl } from "../../utils/image";

const TAX_RATE = 0.058;

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
  try {
    const res = await getCart();

    console.log("CART API RESPONSE:", res.data);

    if (res.data.status === "SUCCESS") {
      setCart(res.data.payload);
    } else {
      setCart(null);
    }
  } catch (err) {
    console.error("GET CART ERROR:", err);
    setCart(null);
  } finally {
    setLoading(false);
  }
};

    fetchCart();
  }, []);

  /* ================== TÍNH TOÁN ================== */
  const items = cart?.items ?? [];

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  /* ================== CART RỖNG ================== */
  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Giỏ hàng trống 🛒
          </h1>
          <p className="text-gray-600 mb-8">
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-fpt-orange font-medium hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="p-10">Đang tải giỏ hàng...</div>;
  }

  /* ================== UI CHÍNH ================== */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Giỏ Hàng
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 mb-4 border-b text-xs font-semibold text-gray-600 uppercase">
              <div className="col-span-5">Sản phẩm</div>
              <div className="col-span-3 text-center">Số lượng</div>
              <div className="col-span-4 text-right">Giá</div>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="pb-6 border-b last:border-0">
                  <div className="grid md:grid-cols-12 gap-4 items-center">
                    {/* PRODUCT */}
                    <div className="md:col-span-5 flex gap-4">
                      <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-200">
                        <img
                            src={resolveImageUrl(item.product.imageUrl)}
                            alt={item.product.name}
                          />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.product.category.categoryName}
                        </p>

                        <p
                          className={`text-xs font-medium ${
                            item.product.stockQuantity > 0
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {item.product.stockQuantity > 0
                            ? "Còn hàng"
                            : "Sắp hết"}
                        </p>

                        <button className="text-xs text-red-600 flex items-center gap-1 mt-1">
                          <Trash2 className="h-3 w-3" />
                          Xóa
                        </button>
                      </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="md:col-span-3 flex justify-center">
                      <div className="flex items-center gap-3 border rounded-lg px-3 py-2">
                        <button disabled>
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">
                          {item.quantity}
                        </span>
                        <button>
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="md:col-span-4 text-right">
                      <p className="text-xl font-bold">
                        {formatPrice(
                          item.product.price * item.quantity
                        )}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.product.price)} mỗi cái
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/"
                className="text-fpt-orange flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Phí vận chuyển</span>
                  <span className="text-gray-500">
                    Tính ở bước tiếp theo
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Thuế (5.8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold">Tổng cộng</span>
                  <span className="text-2xl font-bold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 bg-fpt-orange text-white font-bold py-3 rounded-lg">
                Tiến hành thanh toán
              </button>

              <div className="mt-4 flex justify-center gap-2 text-xs text-gray-500">
                <Lock className="h-3 w-3" />
                Thanh toán bảo mật
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
