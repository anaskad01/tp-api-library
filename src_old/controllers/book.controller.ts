import { Controller, Get, Route, Tags, Path, Post, Body, Delete } from "tsoa";
import { BookDTO } from "../dto/book.dto";
import { BookCopyDTO } from "../dto/bookCopy.dto";
import { bookService } from "../services/book.service";
import { bookCollectionService } from "../services/bookCollection.service";


@Route("books")
@Tags("Books")
export class BookController extends Controller {
  @Get("/")
  public async getAllBooks(): Promise<BookDTO[]> {
    return bookService.getAllBooks();
  }

  @Get("{id}")
  public async getBookById(@Path() id: number): Promise<BookDTO> {
    const book = await bookService.getBookById(id);

    if (!book) {
      throw { status: 404, message: `Aucun livre trouvé avec l'id: ${id}` };
    }

    return book;
  }

  @Post("/")
  public async createBook(
    @Body() requestBody: { title: string; publishYear: number; isbn: string; authorId: number }
  ): Promise<BookDTO> {
    const { title, publishYear, isbn, authorId } = requestBody;

    const book = await bookService.createBook(title, publishYear, isbn, authorId);

    return {
      id: book.id,
      title: book.title,
      publishYear: book.publishYear,
      isbn: book.isbn,
      author: book.author,
    };
  }

  @Delete("{id}")
  public async deleteBook(@Path() id: number): Promise<void> {
    const book = await bookService.getBookById(id);

    if (!book) {
      throw { status: 404, message: `Aucun livre trouvé avec l'id: ${id}` };
    }

    await bookService.deleteBook(id);
  }

  @Get("{id}/book-collections")
  public async getBookCollectionsByBookId(@Path() id: number): Promise<BookCopyDTO[]> {
    const bookCollections = await bookCollectionService.getBookCollectionsByBookId(id);

    if (bookCollections.length === 0) {
      throw { status: 404, message: `Aucun exemplaire trouvé pour le livre avec l'id: ${id}` };
    }

    return bookCollections;
  }
}



