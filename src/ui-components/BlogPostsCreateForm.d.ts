/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BlogPostsCreateFormInputValues = {
    postTitle?: string;
    postCategory?: string;
    postAuthor?: string;
    postBody?: string;
    postImage?: string;
};
export declare type BlogPostsCreateFormValidationValues = {
    postTitle?: ValidationFunction<string>;
    postCategory?: ValidationFunction<string>;
    postAuthor?: ValidationFunction<string>;
    postBody?: ValidationFunction<string>;
    postImage?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BlogPostsCreateFormOverridesProps = {
    BlogPostsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    postTitle?: PrimitiveOverrideProps<TextFieldProps>;
    postCategory?: PrimitiveOverrideProps<TextFieldProps>;
    postAuthor?: PrimitiveOverrideProps<TextFieldProps>;
    postBody?: PrimitiveOverrideProps<TextFieldProps>;
    postImage?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BlogPostsCreateFormProps = React.PropsWithChildren<{
    overrides?: BlogPostsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BlogPostsCreateFormInputValues) => BlogPostsCreateFormInputValues;
    onSuccess?: (fields: BlogPostsCreateFormInputValues) => void;
    onError?: (fields: BlogPostsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BlogPostsCreateFormInputValues) => BlogPostsCreateFormInputValues;
    onValidate?: BlogPostsCreateFormValidationValues;
} & React.CSSProperties>;
export default function BlogPostsCreateForm(props: BlogPostsCreateFormProps): React.ReactElement;
