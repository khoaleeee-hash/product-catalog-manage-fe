import type { AxiosResponse } from "axios";
import type { GetCategoryResponse } from "../types/Category";
import type { ApiResponse } from "../types/ApiResponse";
import { CATEGORY_URL } from "../constants/apiEndPoints";
import { apiUtils } from "../api/axios";

const CategoryService = {

    async getCategories(): Promise<AxiosResponse<ApiResponse<GetCategoryResponse[]>>> {
        console.log("API Call: getCategories");
        console.log("Full URL:", CATEGORY_URL);

        const response = await apiUtils.get<ApiResponse<GetCategoryResponse[]>>(
            CATEGORY_URL
        );
        console.log("API Response:", response);
        return response;
    }
};
export default CategoryService;