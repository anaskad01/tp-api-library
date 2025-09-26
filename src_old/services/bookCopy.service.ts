import { Author } from "../models/author.model";
import { Book } from "../models/book.model";
import { BookCopyDTO } from "../dto/bookCopy.dto";
import { BookCopy } from "../models/bookCopy.model";

export class BookCollectionService {
    public async getAllBookCollections(): Promise<BookCopy[]> {
        return BookCopy.findAll({
            include: [{
                model: Book,
                as: 'book'
            }]
        });
    }

    public async getBookCollectionsByBookId(bookId: number): Promise<BookCopy[]> {
    return BookCopy.findAll({
        where: { bookId: bookId }, 
        include: [
        {
            model: Book,
            as: "book", 
        },
        ],
    });
}



}

export const bookCollectionService = new BookCollectionService();
