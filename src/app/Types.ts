import { Dispatch, SetStateAction } from "react"

export interface Product{
    id: number
    owner_id: number
    name: string
    category: Category
    price: number
    describe: string
    content: string
    posted_at: string
}

export interface ResponceProduct{
    id: number
    name: string
    category: number
    price: number
    describe: string
    posted_at: string
}

export enum Category {
    all, image, music, script, data
}

export interface User {
    id: number,
    username: string
    balance: number
}

export interface Chat{
    id: number,
    content: string,
    user_id: number
}

export interface Community{
    id: number,
    name: string,
    describe: string
}

export const ConvCategory = ["all", "image", "music", "script", "data"]

export type Set<T> = Dispatch<SetStateAction<T>>