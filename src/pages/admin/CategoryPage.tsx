import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Tag,
  Plus,
  Edit,
  Trash2,
  LogOut,
  User,
} from "lucide-react";
import ConfirmModal from '../../components/common/ConfirmModal';
import CategoryService from '../../services/CategoryService'; 
import ActionDropdown from '../../components/types/ActionDropdown';
import { toast } from 'react-toastify';
import type { GetCategoryResponse } from '../../types/Category';
import { getUserFromToken } from '../../utils/auth';

const CategoryPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categories, setCategories] = useState<GetCategoryResponse[]>([]);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<GetCategoryResponse | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCategories();
    try {
      const userInfo = getUserFromToken();
      setUser(userInfo);
    } catch (error) {
      console.error('Error getting user from token:', error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/', { replace: true });
    toast.success('Đăng xuất thành công!');
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching categories...");
      const response = await CategoryService.getCategories();
      
      console.log("Full Response:", response);
      console.log("Response Data:", response.data);
      
      let categoriesData: GetCategoryResponse[] = [];
      
      if (response && response.data) {
        const data = response.data;
        
        if (data.payload && Array.isArray(data.payload)) {
          categoriesData = data.payload;
        } else if (data.data?.payload && Array.isArray(data.data.payload)) {
          categoriesData = data.data.payload;
        } else if (data.data && Array.isArray(data.data)) {
          categoriesData = data.data;
        } else if (Array.isArray(data)) {
          categoriesData = data;
        } else if (data.status === "ERROR") {
          const errorMsg = data.error?.details || "Lỗi không xác định";
          console.error("Backend Error:", data.error);
          toast.error(`Lỗi: ${errorMsg}`);
          setCategories([]);
          return;
        }
      }
      
      console.log("Categories loaded:", categoriesData.length, "items");
      setCategories(categoriesData);
      
      if (categoriesData.length === 0) {
        toast.info("Chưa có danh mục nào");
      }
      
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      
      if (error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (status === 401) {
          toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          navigate('/login');
          return;
        }
        
        if (status === 403) {
          toast.error("Bạn không có quyền truy cập");
          return;
        }
        
        if (status === 500) {
          const errorMsg = errorData?.error?.details 
            || errorData?.message 
            || "Lỗi server. Vui lòng kiểm tra backend.";
          toast.error(errorMsg);
        } else {
          toast.error("Không thể tải danh sách danh mục.");
        }
      } else if (error.request) {
        toast.error("Không thể kết nối đến server.");
      } else {
        toast.error(error.message || "Đã xảy ra lỗi không xác định");
      }
      
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    setSubmitting(true);
    try {
      toast.success("Xóa danh mục thành công!");
      
      setCategories((prevCategories) =>
        prevCategories.filter((c) => c.categoryId !== selectedCategory.categoryId)
      );

      setShowDeleteConfirm(false);
      setSelectedCategory(null);
      
      await fetchCategories();
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.message || "Xóa danh mục thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header with User Info and Logout */}
      <div className="mb-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Tag size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
                <p className="text-gray-600 mt-1">Quản lý danh mục sản phẩm của hệ thống</p>
              </div>
            </div>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <User size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.email ? user.email.split('@')[0] : 'Admin'}
                    </p>
                    <p className="text-xs text-orange-600 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg font-medium group"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <p className="text-sm font-medium text-blue-700 mb-1">Tổng danh mục</p>
            <p className="text-2xl font-bold text-blue-900">{categories.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <p className="text-sm font-medium text-green-700 mb-1">Đang hiển thị</p>
            <p className="text-2xl font-bold text-green-900">{filteredCategories.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <p className="text-sm font-medium text-purple-700 mb-1">Trang hiện tại</p>
            <p className="text-2xl font-bold text-purple-900">{currentPage}/{totalPages || 1}</p>
          </div>
        </div>
      </div>

      {/* Search, Filter & Add Button Container */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2.5 flex-1 min-w-0">
            <Search size={20} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-gray-700"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2.5 min-w-[200px]">
            <Filter size={20} className="text-gray-400 flex-shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-gray-700 cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => toast.info("Chức năng đang phát triển")}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-2.5 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all shadow-md hover:shadow-lg font-medium whitespace-nowrap"
          >
            <Plus size={20} />
            Thêm danh mục
          </button>
        </div>

        {/* Stats Info */}
        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            {searchTerm && (
              <span>
                Tìm thấy: <span className="font-semibold text-orange-600">{filteredCategories.length}</span> kết quả
              </span>
            )}
          </div>
          {(searchTerm || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  STT
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Tên danh mục
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Mã danh mục
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600 mb-3"></div>
                      <p>Đang tải...</p>
                    </div>
                  </td>
                </tr>
              ) : currentCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <p className="font-medium">
                        {searchTerm ? "Không tìm thấy danh mục nào" : "Chưa có danh mục nào"}
                      </p>
                      {searchTerm && (
                        <p className="text-sm mt-1">Thử tìm kiếm với từ khóa khác</p>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                currentCategories.map((category, index) => (
                  <tr key={category.categoryId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="font-semibold text-gray-900">
                        {category.categoryName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {category.categoryId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <ActionDropdown
                          actions={[
                            {
                              label: "Xem chi tiết",
                              icon: Eye,
                              onClick: () => {
                                setSelectedCategory(category);
                                setShowDetailModal(true);
                              },
                            },
                            {
                              label: "Xóa",
                              icon: Trash2,
                              onClick: () => {
                                setSelectedCategory(category);
                                setShowDeleteConfirm(true);
                              },
                              danger: true,
                              disabled: submitting,
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {currentCategories.length > 0 && totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold text-gray-900">{startIndex + 1}</span> đến{' '}
                <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredCategories.length)}</span> trong tổng số{' '}
                <span className="font-semibold text-gray-900">{filteredCategories.length}</span> danh mục
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-colors ${
                        pageNum === currentPage
                          ? "bg-orange-600 text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold">Chi tiết danh mục</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                  {selectedCategory.categoryName.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Tag size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                    Tên danh mục
                  </p>
                </div>
                <p className="text-2xl font-bold text-orange-900">
                  {selectedCategory.categoryName}
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gray-500 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Mã danh mục
                  </p>
                </div>
                <p className="text-xl font-mono font-bold text-gray-900">
                  {selectedCategory.categoryId}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    toast.info("Chức năng đang phát triển");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-semibold"
                >
                  <Edit size={20} />
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setShowDeleteConfirm(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl font-semibold"
                >
                  <Trash2 size={20} />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Xác nhận xóa danh mục"
        message={`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory?.categoryName}"? Hành động này không thể hoàn tác!`}
        confirmText={submitting ? "Đang xóa..." : "Xóa"}
        cancelText="Hủy"
        onConfirm={handleDeleteCategory}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setSelectedCategory(null);
        }}
        type="danger"
      />

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        title="Xác nhận đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
        type="danger"
      />
    </div>
  );
};

export default CategoryPage;