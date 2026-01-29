import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Tag, Lock, ArrowLeft, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  stock?: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      color: 'Black / Over-ear',
      stock: 'In Stock'
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      price: 149.50,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop',
      color: 'Grey / Mesh',
      stock: 'Low Stock'
    },
    {
      id: 3,
      name: 'USB-C Fast Charger',
      price: 39.98,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1591290619762-d4c5fd0c7c4e?w=400&h=400&fit=crop',
      color: 'White',
      stock: 'In Stock'
    }
  ]);
  
  const [discountCode, setDiscountCode] = useState('');
  const [shipping] = useState(0);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.058;
  const total = subtotal + tax + shipping;

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Giỏ Hàng 
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Table Header - Desktop */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 mb-4 border-b text-xs font-semibold text-gray-600 uppercase tracking-wide">
              <div className="col-span-5">Sản phẩm</div>
              <div className="col-span-3 text-center">Số lượng</div>
              <div className="col-span-4 text-right">Giá</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="pb-6 border-b last:border-0">
                  <div className="grid md:grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-5 flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{item.color}</p>
                        <p className={`text-xs font-medium ${item.stock === 'In Stock' ? 'text-green-600' : 'text-orange-600'}`}>
                          {item.stock === 'In Stock' ? 'Còn hàng' : 'Sắp hết'}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-600 hover:underline mt-1 flex items-center gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          Xóa
                        </button>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="md:col-span-3 flex items-center justify-start md:justify-center">
                      <div className="flex items-center gap-3 border rounded-lg px-3 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="text-gray-700 hover:text-fpt-orange disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-700 hover:text-fpt-orange"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-4 text-left md:text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-600">
                          {formatPrice(item.price)} mỗi cái
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link to="/" className="text-fpt-orange hover:underline font-medium flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính</span>
                  <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Phí vận chuyển</span>
                  <span className="text-gray-500">Tính ở bước tiếp theo</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Thuế (5.8%)</span>
                  <span className="font-semibold text-gray-900">{formatPrice(tax)}</span>
                </div>
                
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
                  <button className="px-4 py-2 text-sm font-medium text-fpt-orange border border-fpt-orange rounded-lg hover:bg-fpt-orange hover:text-white transition-colors">
                    Áp dụng
                  </button>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                    <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-fpt-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md transition-colors">
                Tiến hành thanh toán
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Lock className="h-3 w-3" />
                <span>Thanh toán bảo mật</span>
              </div>
              
              <div className="mt-3 flex items-center justify-center gap-2">
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">
                  VISA
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">
                  MC
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-700">
                  AMEX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;