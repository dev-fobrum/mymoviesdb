import { Request, Response } from "express";
import transporter from "./mailerConfig";

export const enviarEmailBoasVindas = async (email: string) => {
  try {
    await transporter.sendMail({
      from: '"My Movies Database" <seu-email@gmail.com>',
      to: email,
      subject: "Bem-vindo ao My Movies Database",
      text: "Olá! Bem-vindo ao My Movies Database. Esperamos que aproveite nossa plataforma.",
    });

    console.log("E-mail de boas-vindas enviado para", email);
  } catch (error) {
    console.error("Erro ao enviar e-mail de boas-vindas:", error);
    return false;
  }
};
