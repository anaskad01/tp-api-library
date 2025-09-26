import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { authorService } from "../services/author.service";
import { AuthorDTO } from "../dto/author.dto";
import { Author } from "../models/author.model";

@Route("authors")
@Tags("Authors")
export class AuthorController extends Controller {
  // Récupère tous les auteurs
  @Get("/")
  public async getAllAuthors(): Promise<AuthorDTO[]> {
    return authorService.getAllAuthors();
  }

  // Récupère un auteur par ID
  @Get("{id}")
  public async getAuthorById(@Path() id: number): Promise<AuthorDTO | null> {
    const author = await authorService.getAuthorById(id);
      if (!author) {
        throw { status: 404, message: `Pas d'utilisateur avec l'id: ${id} ` };
      }
    return author;
  }

  // Crée un nouvel auteur
  @Post("/")
  public async createAuthor(
    @Body() requestBody: AuthorDTO
  ): Promise<AuthorDTO> {
    const { firstName, lastName } = requestBody;
    return authorService.createAuthor(firstName, lastName);
  }

  // Supprime un auteur par ID
  @Delete("{id}")
  public async deleteAuthor(@Path() id: number): Promise<void> {
    await authorService.deleteAuthor(id);
  }

  // Met à jour un auteur par ID
@Patch("{id}")
public async updateAuthor(
  @Path() id: number,
  @Body() requestBody: AuthorDTO
): Promise<AuthorDTO> {
  const { firstName, lastName } = requestBody;
  const updatedAuthor = await authorService.updateAuthor(id, firstName, lastName);
  if (!updatedAuthor) {
    throw { status: 404, message: `Pas d'utilisateur avec l'id: ${id}` };
  }
  return updatedAuthor;
}
}
