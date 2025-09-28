import { Author } from "../models/author.model";

export class AuthorService {
  public async getAllAuthors(): Promise<Author[]> {
    return Author.findAll();
  }

  public async getAuthorById(id: number): Promise<Author | null> {
    return Author.findByPk(id);
  }

  public async createAuthor(
    firstName: string,
    lastName: string
  ): Promise<Author> {
    const newAuthor = await Author.create({
      firstName: firstName, 
      lastName: lastName 
    });
    
    return await Author.findByPk(newAuthor.id) || newAuthor;
  }

  public async deleteAuthor(id: number): Promise<void> {
    const author = await Author.findByPk(id);
    if (author) {
      await author.destroy();
    }
  }

  public async updateAuthor(
    id: number,
    firstName?: string,
    lastName?: string
  ): Promise<Author | null> {
    const author = await Author.findByPk(id);
    if (author) {
      if (firstName) author.firstName = firstName;
      if (lastName) author.lastName = lastName;
      await author.save();
      return author;
    }
    return null;
  }
}

export const authorService = new AuthorService();
