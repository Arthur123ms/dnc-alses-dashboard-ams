/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios, {type AxiosRequestConfig} from "axios";


const axiosInstace = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/`
})

export const usePost = <T, P> (endpoint: string) => {
    const [data, setData] = useState<T | null> (null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<number | null>(null)

    const postData = async (postData: P, config?: AxiosRequestConfig) => {
        setData(null)
        setLoading(true)
        setError(null)

        try {
            const reponse = await axiosInstace({
                url: endpoint,
                method: 'POST',
                data: postData,
                headers: {
                    'Content-Type': 'application/json',
                    ...config?.headers
                },
                ...config
            })
            setData(reponse.data)
        }
        catch (e: any) {
            setError(e.reponse.status ?? 500)
        } 
        finally {
            setLoading(false)
        }
    }

    return { data, loading, error, postData}
}