import z from "zod";

export enum AdminType {
  User = 0,
  Staff = 1,
  Admin = 2,
}

export const UserFromSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Моля не оставяйте полето празно",
    })
    .optional(),
  tel: z
    .string()
    .min(10, {
      message: "Моля напишете валиден телефонен номер",
    })
    .max(13, {
      message: "Моля напишете валиден телефонен номер",
    })
    .optional(),
  address: z
    .string()
    .min(2, {
      message: "Моля въведете адрес",
    })
    .optional(),
  city: z
    .string()
    .min(1, {
      message: "Моля въведете валиден град",
    })
    .optional(),
  email: z.string(),
  hashedPassword: z.string().optional(),
  image: z.string().optional(),
  admin: z.nativeEnum(AdminType).optional(),
  emailVerified: z.boolean().optional(),
  _id: z.string().min(4).optional().or(z.literal("")),
  createdAt: z.string().min(4).optional().or(z.literal("")),
});

export type UserInterface = z.infer<typeof UserFromSchema>;
