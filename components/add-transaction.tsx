'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
// import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import {
  type TransactionRequest,
  TransactionRequestSchema,
} from '@/server/schemas/transaction.schema';
import { orpc } from '@/utils/orpc';

export function AddTransaction() {
  const queryClient = useQueryClient();

  const form = useForm<TransactionRequest>({
    resolver: zodResolver(TransactionRequestSchema),
    defaultValues: {
      text: '',
      amount: '',
    },
  });

  const { mutate: createTransactionMutation } = useMutation(
    orpc.transaction.create.mutationOptions({
      onSuccess: async () => {
        form.reset();
        await queryClient.invalidateQueries({
          queryKey: orpc.transaction.key({ type: 'query' }),
        });
      },
    }),
  );

  const onSubmit: SubmitHandler<TransactionRequest> = (data) => {
    createTransactionMutation(data);
  };

  return (
    <>
      <h3>Add New transaction</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Value
                </FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="0.00"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-base">
                  Description
                </FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          className="text-base hover:cursor-pointer"
          disabled={form.formState.isSubmitting || form.formState.isLoading}
        >
          Add Transaction
        </Button>
      </form>
    </>
  );
}
