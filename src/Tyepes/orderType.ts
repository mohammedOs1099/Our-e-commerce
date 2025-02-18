import { productType } from "./productType";

export type TOrder = {
    id: number;
    userId: number;
    items: productType[];
    subTotalPraice: number;
}