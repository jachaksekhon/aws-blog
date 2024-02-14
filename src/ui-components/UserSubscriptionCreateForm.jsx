/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createUserSubscription } from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserSubscriptionCreateForm(props) {
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
    userName: "",
    phoneNumber: "",
    email: "",
    sendEmailNoti: false,
    sendPhoneNoti: false,
    genres: [],
  };
  const [userName, setUserName] = React.useState(initialValues.userName);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [email, setEmail] = React.useState(initialValues.email);
  const [sendEmailNoti, setSendEmailNoti] = React.useState(
    initialValues.sendEmailNoti
  );
  const [sendPhoneNoti, setSendPhoneNoti] = React.useState(
    initialValues.sendPhoneNoti
  );
  const [genres, setGenres] = React.useState(initialValues.genres);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUserName(initialValues.userName);
    setPhoneNumber(initialValues.phoneNumber);
    setEmail(initialValues.email);
    setSendEmailNoti(initialValues.sendEmailNoti);
    setSendPhoneNoti(initialValues.sendPhoneNoti);
    setGenres(initialValues.genres);
    setCurrentGenresValue("");
    setErrors({});
  };
  const [currentGenresValue, setCurrentGenresValue] = React.useState("");
  const genresRef = React.createRef();
  const validations = {
    userName: [{ type: "Required" }],
    phoneNumber: [],
    email: [],
    sendEmailNoti: [],
    sendPhoneNoti: [],
    genres: [],
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
          userName,
          phoneNumber,
          email,
          sendEmailNoti,
          sendPhoneNoti,
          genres,
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
            query: createUserSubscription.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "UserSubscriptionCreateForm")}
      {...rest}
    >
      <TextField
        label="User name"
        isRequired={true}
        isReadOnly={false}
        value={userName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userName: value,
              phoneNumber,
              email,
              sendEmailNoti,
              sendPhoneNoti,
              genres,
            };
            const result = onChange(modelFields);
            value = result?.userName ?? value;
          }
          if (errors.userName?.hasError) {
            runValidationTasks("userName", value);
          }
          setUserName(value);
        }}
        onBlur={() => runValidationTasks("userName", userName)}
        errorMessage={errors.userName?.errorMessage}
        hasError={errors.userName?.hasError}
        {...getOverrideProps(overrides, "userName")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={false}
        isReadOnly={false}
        value={phoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userName,
              phoneNumber: value,
              email,
              sendEmailNoti,
              sendPhoneNoti,
              genres,
            };
            const result = onChange(modelFields);
            value = result?.phoneNumber ?? value;
          }
          if (errors.phoneNumber?.hasError) {
            runValidationTasks("phoneNumber", value);
          }
          setPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("phoneNumber", phoneNumber)}
        errorMessage={errors.phoneNumber?.errorMessage}
        hasError={errors.phoneNumber?.hasError}
        {...getOverrideProps(overrides, "phoneNumber")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userName,
              phoneNumber,
              email: value,
              sendEmailNoti,
              sendPhoneNoti,
              genres,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <SwitchField
        label="Send email noti"
        defaultChecked={false}
        isDisabled={false}
        isChecked={sendEmailNoti}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              userName,
              phoneNumber,
              email,
              sendEmailNoti: value,
              sendPhoneNoti,
              genres,
            };
            const result = onChange(modelFields);
            value = result?.sendEmailNoti ?? value;
          }
          if (errors.sendEmailNoti?.hasError) {
            runValidationTasks("sendEmailNoti", value);
          }
          setSendEmailNoti(value);
        }}
        onBlur={() => runValidationTasks("sendEmailNoti", sendEmailNoti)}
        errorMessage={errors.sendEmailNoti?.errorMessage}
        hasError={errors.sendEmailNoti?.hasError}
        {...getOverrideProps(overrides, "sendEmailNoti")}
      ></SwitchField>
      <SwitchField
        label="Send phone noti"
        defaultChecked={false}
        isDisabled={false}
        isChecked={sendPhoneNoti}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              userName,
              phoneNumber,
              email,
              sendEmailNoti,
              sendPhoneNoti: value,
              genres,
            };
            const result = onChange(modelFields);
            value = result?.sendPhoneNoti ?? value;
          }
          if (errors.sendPhoneNoti?.hasError) {
            runValidationTasks("sendPhoneNoti", value);
          }
          setSendPhoneNoti(value);
        }}
        onBlur={() => runValidationTasks("sendPhoneNoti", sendPhoneNoti)}
        errorMessage={errors.sendPhoneNoti?.errorMessage}
        hasError={errors.sendPhoneNoti?.hasError}
        {...getOverrideProps(overrides, "sendPhoneNoti")}
      ></SwitchField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userName,
              phoneNumber,
              email,
              sendEmailNoti,
              sendPhoneNoti,
              genres: values,
            };
            const result = onChange(modelFields);
            values = result?.genres ?? values;
          }
          setGenres(values);
          setCurrentGenresValue("");
        }}
        currentFieldValue={currentGenresValue}
        label={"Genres"}
        items={genres}
        hasError={errors?.genres?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("genres", currentGenresValue)
        }
        errorMessage={errors?.genres?.errorMessage}
        setFieldValue={setCurrentGenresValue}
        inputFieldRef={genresRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Genres"
          isRequired={false}
          isReadOnly={false}
          value={currentGenresValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.genres?.hasError) {
              runValidationTasks("genres", value);
            }
            setCurrentGenresValue(value);
          }}
          onBlur={() => runValidationTasks("genres", currentGenresValue)}
          errorMessage={errors.genres?.errorMessage}
          hasError={errors.genres?.hasError}
          ref={genresRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "genres")}
        ></TextField>
      </ArrayField>
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
