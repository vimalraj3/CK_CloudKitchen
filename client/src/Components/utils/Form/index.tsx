import { FieldErrors, FieldValues, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: UseFormReturn<TFormValues> & { errors: FieldErrors<TFormValues> }) => React.ReactNode;
    schema: any;
};

export const Form = <TFormValues extends FieldValues>({
    onSubmit,
    children,
    schema
}: FormProps<TFormValues>) => {

    const methods = useForm<TFormValues>({
        resolver: yupResolver(schema)
    });
    return (
        <form className={` flex flex-col gap-4 rounded-lg w-[100%] `} onSubmit={methods.handleSubmit(onSubmit)}>
            {children({ ...methods, errors: methods.formState.errors })}
        </form>
    );
};

export { Input } from './TextInput/TextInput'
export { PasswordInput } from './PasswordInput/PasswordInput'
