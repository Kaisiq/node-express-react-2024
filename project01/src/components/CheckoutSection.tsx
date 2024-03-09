import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Input } from "~/components/ui/input";
import { Button } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "~/components/ui/use-toast";

const FormSchema = z.object({
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
});

export function CheckoutSection() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      flname: "",
      tel: "",
      address: "",
      info: "",
      city: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="w-full md:col-span-1 md:w-auto">
          Продължаване към Плащане
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Информация за поръчката:</SheetTitle>
          <SheetDescription>
            За момента изпращаме всички поръчки чрез Еконт/Спиди. Ако имате
            предпочитание към някой от куриерите, моля уведомете ни в полето за
            допълнителна информация
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="flname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Име и Фамилия на получател</FormLabel>
                  <FormControl>
                    <Input placeholder="Име Фамилия" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Телефонен номер</FormLabel>
                  <FormControl>
                    <Input placeholder="Вашият телефонен номер" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Град за доставка</FormLabel>
                  <FormControl>
                    <Input placeholder="Град" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес за доставка</FormLabel>
                  <FormControl>
                    <Input placeholder="Адрес" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ако адреса е офис на Еконт/Спиди, моля напишете това в
                    допълнителната информация
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Допълнителна информация</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
