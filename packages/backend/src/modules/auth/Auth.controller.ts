import { Request, Response } from "express";

import { LoginUseCase } from "./use-cases/login-use-case";
import { RecoverPasswordUseCase } from "./use-cases/recover-password-use-case";

import { LoginDto } from "./dtos/login.dto";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";

export class AuthController {
  private loginUseCase: LoginUseCase = new LoginUseCase();
  private recoverPasswordUseCase: RecoverPasswordUseCase =
    new RecoverPasswordUseCase();

  async login(req: Request, res: Response): Promise<any> {
    try {
      const body: LoginDto = req.body;
      const credentials = await this.loginUseCase.execute(body);

      res.header("Authorization", credentials.token).send(credentials);
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<any> {
    try {
      const body: ForgotPasswordDto = req.body;

      const user = await this.recoverPasswordUseCase.execute(body);

      if (!user) {
        res.send("Não foi possível recuperar a senha").status(404);
      }

      res.send("E-mail enviado");
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  }
}
