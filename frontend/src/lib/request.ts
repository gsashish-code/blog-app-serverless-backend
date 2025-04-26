// src/lib/request.ts
import { RequestOptions } from "../common/contants";
import API from "./axios";



export async function makeRequest<TResponse = any, TPayload = any, TParams = any>({
    url,
    method = "get",
    payload,
    params,
    onSuccess,
}: RequestOptions<TPayload, TParams>) {
    try {
        const response = await API.request<TResponse>({
            url,
            method,
            data: payload,
            params,
        });

        if (onSuccess) {
            onSuccess(response.data);
        }

        return {
            data: response.data,
            error: null,
        };
    } catch (error: any) {
        console.error("API Error:", error.response?.data || error.message);
        return {
            data: null,
            error: error.response?.data || error.message,
        };
    }
}
