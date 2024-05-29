import z from "zod";

export const OrderFormSchema = z.object({
  flname: z.string().min(2, {
    message: "Моля не оставяйте полето празно",
  }),
  tel: z
    .string()
    .min(10, {
      message: "Моля напишете валиден телефонен номер",
    })
    .max(13, {
      message: "Моля напишете валиден телефонен номер",
    }),
  address: z.string().min(2, {
    message: "Моля въведете адрес",
  }),
  info: z.string(),
  city: z.string().min(1, {
    message: "Моля въведете валиден град",
  }),
  email: z.string(),
  price: z.number(),
  status: z.string(),
  productIDs: z.array(z.string()),
  productNames: z.array(z.string()),
  _id: z.string().min(4).optional(),
  createdAt: z.string().min(4).optional(),
});

export type OrderInterface = z.infer<typeof OrderFormSchema>;
