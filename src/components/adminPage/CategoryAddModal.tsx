
import React, { useEffect, useRef, useState } from 'react'
import type { CreateCategoryRequest } from '../../types/Category'

interface Props {
	open: boolean
	onClose: () => void
	onCreate: (data: CreateCategoryRequest) => Promise<void> | void
	existingNames: string[]
}

const CategoryAddModal: React.FC<Props> = ({
	open,
	onClose,
	onCreate,
	existingNames
}) => {
	const [categoryName, setCategoryName] = useState('')
	const [error, setError] = useState('')
	const firstRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (open) {
			setError('')
			setCategoryName('')
			setTimeout(() => firstRef.current?.focus(), 0)
		}
	}, [open])

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
			setError('Tên danh mục là bắt buộc')
			return
		}

		const isDuplicate = existingNames.some(
			name => name.toLowerCase() === value.trim().toLowerCase()
		)

		if (isDuplicate) {
			setError('Tên này đã tồn tại')
		} else {
			setError('')
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!categoryName.trim()) {
			setError('Tên danh mục là bắt buộc')
			firstRef.current?.focus()
			return
		}

		if (error) return 

		try {
			await onCreate({ categoryName: categoryName.trim() })
			onClose()
		} catch (err: any) {
			// fallback nếu backend trả lỗi
			const msg =
				err?.response?.data?.error?.data ||
				err?.code ||
				'Lỗi khi tạo danh mục'

			setError(msg)
		}
	}

	if (!open) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="fixed inset-0 bg-black/50" onClick={onClose} />

			<div className="relative bg-white rounded-lg w-full max-w-md mx-4 p-6 shadow-lg">
				<button
					aria-label="close"
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
				>
					×
				</button>

				<h3 className="text-lg font-semibold mb-4">Thêm danh mục</h3>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Tên danh mục <span className="text-red-500">*</span>
						</label>
						<input
							ref={firstRef}
							value={categoryName}
							onChange={(e) => handleChange(e.target.value)}
							className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
								error
									? 'border-red-400 focus:ring-red-300'
									: 'border-gray-200 focus:ring-blue-300'
							}`}
							placeholder="Nhập tên danh mục"
						/>
					</div>

					{error && <p className="text-sm text-red-600">{error}</p>}

					<div className="flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
						>
							Hủy
						</button>
						<button
							type="submit"
							disabled={!!error}
							className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 disabled:opacity-50"
						>
							Tạo
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}


export default CategoryAddModal
