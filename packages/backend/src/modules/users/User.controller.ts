import { Request, Response } from "express";

import RequestWithJwt from "../../interfaces/RequestWithJwt.interface";

import { FindAllUseCase } from "./use-cases/find-all-use-case";
import { FindOneUseCase } from "./use-cases/find-one-use-case";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";
import { UpdateUserUseCase } from "./use-cases/update-user-use-case";

import { CreateUserDto } from "./dtos/createUser.dto";

export class UserController {
  private findAllUseCase: FindAllUseCase = new FindAllUseCase();
  private findOneUseCase: FindOneUseCase = new FindOneUseCase();
  private createUserUseCase: CreateUserUseCase = new CreateUserUseCase();
  private updateUserUseCase: UpdateUserUseCase = new UpdateUserUseCase();

  async findAll(req: Request, res: Response): Promise<any> {
    try {
      const users = await this.findAllUseCase.execute();
      res.json(users);
    } catch (error: any) {
      console.error("Error finding user:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async findOne(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const users = await this.findOneUseCase.execute(req?.userId);
      res.json(users);
    } catch (error: any) {
      console.error("Error finding user:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const body: CreateUserDto = req.body;

      const user = await this.createUserUseCase.execute(body);

      res.json(user);
    } catch (error: any) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: error?.message });
    }
  }

  async update(req: RequestWithJwt, res: Response): Promise<any> {
    try {
      const body: CreateUserDto = req.body;
      const userId: number | undefined = req?.userId;

      const user = await this.updateUserUseCase.execute(body, userId);

      res.json(user);
    } catch (error: any) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: error?.message });
    }
  }
}
