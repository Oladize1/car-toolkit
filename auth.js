// Your Task
// Build a simple auth system that demonstrates these security concepts. It must:

// Have a register(email, password) function that validates the email format, hashes the password with bcrypt, and stores the user in a simple in-memory object (no database needed)
// Have a login(email, password) function that finds the user, compares the password with bcrypt, and returns a JWT token on success
// Have a verifyToken(token) function that verifies and decodes a JWT
// Store your JWT secret in a .env file and read it with dotenv
// Validate all inputs — throw meaningful errors for invalid email, missing fields, user not found, wrong password
// Call all three functions in sequence: register a user, log them in, verify the token
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import bcrypt from "bcryptjs";
const db = [];
async function register(email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  if (!email.includes("@") || !email.includes('.')) {
    throw new Error(
      `Invalid email format, email must contains @gmail.com extension`,
    );
  }
  try {
    const hashPassword = bcrypt.hashSync(password, 12);

    const newUser = { email, password: hashPassword };
    db.push(newUser);
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register");
  }
}

async function login(email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  try {
    const user = db.find((user) => user.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const passwordCheck = bcrypt.compareSync(password, user.password);
    if (!passwordCheck) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    return { status: "login successfully", user, token };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to log in");
  }
}

function verifyToken(token) {
  if (!token) {
    throw new Error("Unauthorized-401: Token Not Found");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      throw new Error("Unauthorized-403: Invalid Token");
    }
    return decode;
  } catch (error) {
    throw new Error("Invalid or Expired token");
  }
}

async function main() {
  await register("pamoladize10@gmail.com", "123456");
  const result = await login("pamoladize10@gmail.com", "123456");
  console.log(verifyToken(result.token));
}

main();
