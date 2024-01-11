export interface Product{
    owner_id: number
    name: string
    category: Category
    price: number
    describe: string
    content: string
    posted_at: string
}

export interface ResponceProduct{
    name: string
    category: number
    price: number
    describe: string
    posted_at: string
}

export enum Category {
    all, image, music, script, data
}

export const ConvCategory = ["all", "image", "music", "script", "data"]