import { Request, Response } from "express";

import { FindAllUseCase } from "./use-cases/find-all-use-case";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";

import { CreateUserDto } from "./dtos/createUser.dto";

export class UserController {
  private findAllUseCase: FindAllUseCase = new FindAllUseCase();
  private createUserUseCase: CreateUserUseCase = new CreateUserUseCase();

  async findAll(req: Request, res: Response): Promise<any> {
    const users = await this.findAllUseCase.execute();
    res.json(users);
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const body: CreateUserDto = req.body;

      const user = await this.createUserUseCase.execute(body);

      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  }
}
