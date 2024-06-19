import { PersonelModel } from "./personel.model";

export class PaginationResultModel{
    data: PersonelModel[] = [];
    totalPageCount: number = 0;
    totalPages: number[] = [];
}