import { SessionData } from "express-session";

export interface UserSession extends SessionData {
  uid?: string | null;
}

export interface HasPassword {
  password: string;
}
