import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const transactionSchema = z.object({
  text: z.string().min(1, "Please add some text").trim(),
  amount: z.string().min(1, "Please add some text").trim(),
});

export function AddTransaction() {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      text: "",
      amount: "0",
    },
  });

  const { mutate: createTransactionMutation } = useMutation(
    orpc.transaction.create.mutationOptions({
      onSuccess: async () => {
        form.reset();
        await queryClient.invalidateQueries({
          queryKey: orpc.transaction.key({ type: "query" }),
        });
      },
    }),
  );

  const onSubmit: SubmitHandler<z.infer<typeof transactionSchema>> = (data) => {
    createTransactionMutation({ ...data, amount: Number(data.amount) });
  };

  return (
    <>
      <h3>Add New transaction</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput placeholder="0.00" {...field} />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    className="bg-background"
                    placeholder="johndoe"
                    {...field}
                  />
                </FormControl>
                <FormDescription>give some description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Transaction</Button>
        </form>
      </Form>
    </>
  );
}
