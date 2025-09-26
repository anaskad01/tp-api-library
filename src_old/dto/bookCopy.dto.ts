export interface BookCopyDTO {
    id?: number;
    bookId: number;
    status: 'available' | 'borrowed' | 'reserved';
}