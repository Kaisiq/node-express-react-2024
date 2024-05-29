import { Request, Response } from "express";

//TODO: FIX both of the functions

export async function isAdminRequest(req: Request, res: Response) {
  return true;
}

export async function isUserRequest(req: Request, res: Response) {
  return true;
}
