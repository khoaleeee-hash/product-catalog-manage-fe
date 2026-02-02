import React, { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { GetCategoryResponse } from '../../types/Category'
import { ca } from 'date-fns/locale'

interface Props {
    open: boolean
    onClose: () => void
    onUpdate: (categoryId: number, data: { categoryName: string }) => Promise<void> | void
    category: GetCategoryResponse | null
    existingCategories: GetCategoryResponse[]
}


const CategoryEditModal: React.FC<Props> = ({
	open,
	onClose,
	onUpdate,
	category,
	existingCategories
}) => {
	const [categoryName, setCategoryName] = useState('')
	const [error, setError] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const firstRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (open && category) {
			setCategoryName(category.categoryName)
			setError('')
			setTimeout(() => firstRef.current?.focus(), 100)
		}
	}, [open, category])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		if (open) window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [open, onClose])

	const handleChange = (value: string) => {
		setCategoryName(value)

		if (!value.trim()) {
			setError('Tên danh mục không được để trống')
			return
		}

		if (isDuplicateName(value.trim())) {
			setError('Tên này đã tồn tại')
		} else {
			setError('')
		}
	}

	const isDuplicateName = (name: string) => {
		return existingCategories.some(
			c =>
				c.categoryId !== category?.categoryId &&
				c.categoryName.toLowerCase() === name.toLowerCase()
		)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!categoryName.trim()) {
			setError('Tên danh mục không được để trống')
			return
		}

		if (error || !category) return

		setIsSubmitting(true)
		try {
			await onUpdate(category.categoryId, { categoryName: categoryName.trim() })
			onClose()
		} catch (err: any) {
			const msg =
				err?.response?.data?.error?.details ||
				err?.response?.data?.message ||
				'Cập nhật danh mục thất bại'
			setError(msg)
		} finally {
			setIsSubmitting(false)
		}
	}

	if (!open) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="fixed inset-0 bg-black/50" onClick={onClose} />

			<div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
				<div className="flex items-center justify-between p-6 border-b">
					<h2 className="text-xl font-semibold">Chỉnh sửa danh mục</h2>
					<button onClick={onClose}><X size={22} /></button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div>
						<label className="block text-sm font-medium mb-2">Mã danh mục</label>
						<input
							disabled
							value={category?.categoryId || ''}
							className="w-full px-4 py-2 border rounded bg-gray-100"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">
							Tên danh mục <span className="text-red-500">*</span>
						</label>
						<input
							ref={firstRef}
							value={categoryName}
							onChange={(e) => handleChange(e.target.value)}
							disabled={isSubmitting}
							className={`w-full px-4 py-2 border rounded focus:ring-2 ${
								error
									? 'border-red-500 focus:ring-red-300'
									: 'border-gray-300 focus:ring-blue-300'
							}`}
						/>
						{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
					</div>

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 bg-red-600 text-white py-2 rounded"
						>
							Hủy
						</button>
						<button
							type="submit"
							disabled={!!error || isSubmitting}
							className="flex-1 bg-orange-600 text-white py-2 rounded disabled:opacity-50"
						>
							{isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}


export default CategoryEditModal