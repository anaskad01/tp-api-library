import { Author } from "../models/author.model";
import { Book } from "../models/book.model";

export class BookService {
  public async getAllBooks(): Promise<Book[]> {
    return Book.findAll({
        include: [{
            model: Author,
            as: 'author'
        }]
    });
  }

  public async getBookById(id: number): Promise<Book | null> {
    return Book.findByPk(id);
  }


  public async createBook(
    title: string,
    publishYear: number,
    isbn: string,
    authorId: number
  ): Promise<Book> {
    const author = await Author.findByPk(authorId);
    if (!author) {
      throw { status: 404, message: `Aucun auteur trouvé avec l'id: ${authorId}` };
    }

    const book = await Book.create({
      title: title,
      publishYear: publishYear,
      isbn: isbn,
      authorId: authorId,
    });

    const createdBook = await Book.findByPk(book.id, {
      include: [{ model: Author, as: "author" }],
    });
    if (!createdBook) {
      throw { status: 500, message: "Erreur lors de la création du livre." };
    }
    return createdBook;
  }


  public async deleteBook(id: number): Promise<void> {
  const book = await Book.findByPk(id);

  if (!book) {
    throw { status: 404, message: `Aucun livre trouvé avec l'id: ${id}` };
  }

  await book.destroy();
}
}

export const bookService = new BookService();
