/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type UserSubscriptionCreateFormInputValues = {
    userName?: string;
    phoneNumber?: string;
    email?: string;
    sendEmailNoti?: boolean;
    sendPhoneNoti?: boolean;
    genres?: string[];
};
export declare type UserSubscriptionCreateFormValidationValues = {
    userName?: ValidationFunction<string>;
    phoneNumber?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    sendEmailNoti?: ValidationFunction<boolean>;
    sendPhoneNoti?: ValidationFunction<boolean>;
    genres?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserSubscriptionCreateFormOverridesProps = {
    UserSubscriptionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userName?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNumber?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    sendEmailNoti?: PrimitiveOverrideProps<SwitchFieldProps>;
    sendPhoneNoti?: PrimitiveOverrideProps<SwitchFieldProps>;
    genres?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserSubscriptionCreateFormProps = React.PropsWithChildren<{
    overrides?: UserSubscriptionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserSubscriptionCreateFormInputValues) => UserSubscriptionCreateFormInputValues;
    onSuccess?: (fields: UserSubscriptionCreateFormInputValues) => void;
    onError?: (fields: UserSubscriptionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserSubscriptionCreateFormInputValues) => UserSubscriptionCreateFormInputValues;
    onValidate?: UserSubscriptionCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserSubscriptionCreateForm(props: UserSubscriptionCreateFormProps): React.ReactElement;
