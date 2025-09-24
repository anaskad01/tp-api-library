import { Controller, Get, Route, Tags, Path, Post, Body} from "tsoa";
import { BookDTO } from "../dto/book.dto";

import { bookService } from "../services/book.service";


@Route("books")
@Tags("Books")
export class BookController extends Controller {
  @Get("/")
  public async getAllBooks(): Promise<BookDTO[]> {
    return bookService.getAllBooks();
  }


  @Get("{id}")
  public async getBookById(@Path() id: number): Promise<BookDTO | null> {
    let book = await bookService.getBookById(id);
    
    if (book === null) {
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
}



