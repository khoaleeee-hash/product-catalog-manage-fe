import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Tag, ArrowLeft } from "lucide-react";
import { getCart } from "../../services/CartService";
import type { CartResponse } from "../../types/Cart";
import { resolveImageUrl } from "../../utils/image";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const shipping = 30000; // Phí ship mặc định 30,000 VND

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

  const items = cart?.items ?? [];

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const total = subtotal + shipping - appliedDiscount;

  // Format giá VNĐ
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const applyDiscount = () => {
    if (discountCode.trim() === '') {
      alert('Vui lòng nhập mã giảm giá');
      return;
    }
    
    if (discountCode.toUpperCase() === 'DISCOUNT10') {
      setAppliedDiscount(50000);
      alert('Áp dụng mã giảm 50,000 VND thành công!');
    } else if (discountCode.toUpperCase() === 'DISCOUNT20') {
      setAppliedDiscount(100000);
      alert('Áp dụng mã giảm 100,000 VND thành công!');
    } else {
      alert('Mã giảm giá không hợp lệ');
      setAppliedDiscount(0);
    }
  };

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
                          alt={(item.product.name)}
                          className="w-full h-full object-cover"
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

                        <button className="text-xs text-red-600 hover:underline flex items-center gap-1 mt-1">
                          <Trash2 className="h-3 w-3" />
                          Xóa
                        </button>
                      </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="md:col-span-3 flex justify-center">
                      <div className="flex items-center gap-3 border rounded-lg px-3 py-2">
                        <button 
                          disabled={item.quantity <= 1}
                          className="text-gray-700 hover:text-fpt-orange disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button className="text-gray-700 hover:text-fpt-orange">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="md:col-span-4 text-right">
                      <p className="text-xl font-bold text-fpt-orange">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.product.price)} / cái
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
                className="text-fpt-orange hover:underline font-medium flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="font-semibold text-gray-900">{formatPrice(shipping)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      Giảm giá
                    </span>
                    <span className="font-semibold text-green-600">-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Mã giảm giá"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fpt-orange"
                    />
                    <Tag className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <button 
                    onClick={applyDiscount}
                    className="px-4 py-2 text-sm font-medium text-fpt-orange border border-fpt-orange rounded-lg hover:bg-fpt-orange hover:text-white transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>
                {/* <p className="text-xs text-gray-500">
                  Thử: DISCOUNT10 (giảm 50k) hoặc DISCOUNT20 (giảm 100k)
                </p> */}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-2xl font-bold text-fpt-orange">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-fpt-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md transition-colors">
                Tiến hành thanh toán
              </button>

              {/* <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="h-3 w-3" />
                <span>Thanh toán bảo mật</span>
              </div> */}
              
              <div className="mt-3 flex items-center justify-center gap-2">
                {/* <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">
                  VISA
                </div> */}
                {/* <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">
                  MC
                </div> */}
                {/* <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">
                  MOMO
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
