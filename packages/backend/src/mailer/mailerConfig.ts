import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: "4kts.testetecnico@gmail.com",
    pass: "SenhaTeste123@",
  },
});

export default transporter;

//A4R6NCU51DPRBQ4SRMRVJ9W8
