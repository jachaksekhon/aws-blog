/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createBlogPosts } from "../graphql/mutations";
export default function BlogPostsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    postTitle: "",
    postCategory: "",
    postAuthor: "",
    postBody: "",
    postImage: "",
  };
  const [postTitle, setPostTitle] = React.useState(initialValues.postTitle);
  const [postCategory, setPostCategory] = React.useState(
    initialValues.postCategory
  );
  const [postAuthor, setPostAuthor] = React.useState(initialValues.postAuthor);
  const [postBody, setPostBody] = React.useState(initialValues.postBody);
  const [postImage, setPostImage] = React.useState(initialValues.postImage);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPostTitle(initialValues.postTitle);
    setPostCategory(initialValues.postCategory);
    setPostAuthor(initialValues.postAuthor);
    setPostBody(initialValues.postBody);
    setPostImage(initialValues.postImage);
    setErrors({});
  };
  const validations = {
    postTitle: [{ type: "Required" }],
    postCategory: [{ type: "Required" }],
    postAuthor: [{ type: "Required" }],
    postBody: [{ type: "Required" }],
    postImage: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          postTitle,
          postCategory,
          postAuthor,
          postBody,
          postImage,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createBlogPosts.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "BlogPostsCreateForm")}
      {...rest}
    >
      <TextField
        label="Post title"
        isRequired={true}
        isReadOnly={false}
        value={postTitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              postTitle: value,
              postCategory,
              postAuthor,
              postBody,
              postImage,
            };
            const result = onChange(modelFields);
            value = result?.postTitle ?? value;
          }
          if (errors.postTitle?.hasError) {
            runValidationTasks("postTitle", value);
          }
          setPostTitle(value);
        }}
        onBlur={() => runValidationTasks("postTitle", postTitle)}
        errorMessage={errors.postTitle?.errorMessage}
        hasError={errors.postTitle?.hasError}
        {...getOverrideProps(overrides, "postTitle")}
      ></TextField>
      <TextField
        label="Post category"
        isRequired={true}
        isReadOnly={false}
        value={postCategory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              postTitle,
              postCategory: value,
              postAuthor,
              postBody,
              postImage,
            };
            const result = onChange(modelFields);
            value = result?.postCategory ?? value;
          }
          if (errors.postCategory?.hasError) {
            runValidationTasks("postCategory", value);
          }
          setPostCategory(value);
        }}
        onBlur={() => runValidationTasks("postCategory", postCategory)}
        errorMessage={errors.postCategory?.errorMessage}
        hasError={errors.postCategory?.hasError}
        {...getOverrideProps(overrides, "postCategory")}
      ></TextField>
      <TextField
        label="Post author"
        isRequired={true}
        isReadOnly={false}
        value={postAuthor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              postTitle,
              postCategory,
              postAuthor: value,
              postBody,
              postImage,
            };
            const result = onChange(modelFields);
            value = result?.postAuthor ?? value;
          }
          if (errors.postAuthor?.hasError) {
            runValidationTasks("postAuthor", value);
          }
          setPostAuthor(value);
        }}
        onBlur={() => runValidationTasks("postAuthor", postAuthor)}
        errorMessage={errors.postAuthor?.errorMessage}
        hasError={errors.postAuthor?.hasError}
        {...getOverrideProps(overrides, "postAuthor")}
      ></TextField>
      <TextField
        label="Post body"
        isRequired={true}
        isReadOnly={false}
        value={postBody}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              postTitle,
              postCategory,
              postAuthor,
              postBody: value,
              postImage,
            };
            const result = onChange(modelFields);
            value = result?.postBody ?? value;
          }
          if (errors.postBody?.hasError) {
            runValidationTasks("postBody", value);
          }
          setPostBody(value);
        }}
        onBlur={() => runValidationTasks("postBody", postBody)}
        errorMessage={errors.postBody?.errorMessage}
        hasError={errors.postBody?.hasError}
        {...getOverrideProps(overrides, "postBody")}
      ></TextField>
      <TextField
        label="Post image"
        isRequired={false}
        isReadOnly={false}
        value={postImage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              postTitle,
              postCategory,
              postAuthor,
              postBody,
              postImage: value,
            };
            const result = onChange(modelFields);
            value = result?.postImage ?? value;
          }
          if (errors.postImage?.hasError) {
            runValidationTasks("postImage", value);
          }
          setPostImage(value);
        }}
        onBlur={() => runValidationTasks("postImage", postImage)}
        errorMessage={errors.postImage?.errorMessage}
        hasError={errors.postImage?.hasError}
        {...getOverrideProps(overrides, "postImage")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
