import bcrypt from "bcryptjs";
import Usermodel from "../model/userModel";

type userInputdata = {
  name: string;
  email: string;
  password: string;
};

export async function regiseterUser(data: userInputdata) {
  const existingUser = await Usermodel.findOne({ email: data.email });

  if (existingUser) {
    throw new Error("user already exist");
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await Usermodel.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return newUser;
}
