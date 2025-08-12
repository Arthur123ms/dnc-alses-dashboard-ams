import { useEffect, useState } from "react";
import { type InputProps } from "@/types";

export const useFormValidation = (inputs: InputProps[]) => {
    const [formValues, setFormValues] = useState(inputs.map((input) => input.value || ''))
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        const allFieldValid = inputs.every((inputs, index) => {
            const value = formValues[index]
            if(inputs.required && !value){
                return false
            }
            if(inputs.type === 'email'){
                return /\S+@\S+\.\S+/.test(String(formValues[index]))
            }

            if(inputs.type === 'password') {
                const password = String(value)
                const hasCorrectLenght = password.length >= 8 && password.length <= 16
                const hasUpperCaseLetter = /[A-Z]/.test(password)
                const hasSpecialCharater = /[!@#$%^&*(),.?":{}|<>]/.test(password)
                const hasNumber = /\d/.test(password)
                return (
                    hasCorrectLenght && 
                    hasUpperCaseLetter && 
                    hasSpecialCharater && 
                    hasNumber
                )
            }
            return true
        })
        setFormValid(allFieldValid)
    }, [formValues, inputs])

    const handleChange = (index: number, value: string) =>{
        setFormValues((prevValues) => {
            const newValues = [...prevValues]
            newValues[index] = value
            return newValues
        })
    }

    return { formValues, formValid, handleChange}
}