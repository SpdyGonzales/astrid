/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { createElement, ReactNode } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
} from "react-hook-form";

/** I tend to lean towards a highly customizable component library written inhouse
 *  Due to the time limit I'll put my efforts towards state management etc. but here is the start.
 */

import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {props.value}
        </Typography>
      </Box>
    </Box>
  );
}

const Button = ({
  onClick,
  icon,
  props,
}: {
  onClick: () => void;
  icon: string | ReactNode;
  props?: Record<string, string | number>;
}) => {
  return (
    <div
      onClick={onClick}
      css={{
        height: "80px",
        lineHeight: "80px",
        width: "80px",
        fontSize: "2em",
        fontWeight: "bold",
        borderRadius: "50%",
        backgroundColor: "#4CAF50",
        color: "white",
        textAlign: "center",
        cursor: "pointer",
      }}
      {...props}
    >
      {icon}
    </div>
  );
};
const AstridLogo = (props: any) => (
  <svg
    width={90}
    height={24}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <title>{"logo/black"}</title>
    <defs>
      <path id="a" d="M0 22.767h89.767V.237H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#0A0A0A"
        d="M56.928 22.673h5.832V8.267h-5.832zM34.297 22.673h5.832V4.31h-5.832z"
      />
      <path fill="#0A0A0A" d="M31.597 12.804h11.232V8.268H31.597z" />
      <g transform="translate(0 .268)">
        <path
          d="M62.96 3.37a3.132 3.132 0 1 1-6.265 0 3.132 3.132 0 0 1 6.265 0M89.767 19.528a3.132 3.132 0 1 1-6.264 0 3.132 3.132 0 0 1 6.264 0M24.922 12.016c0-.242.224-.604.991-.604.453 0 1.391.156 2.28.478v-.001c.03.01.056.021.085.032.16.06.318.126.47.197.49.225.774.431 1.122.688.014.01.026.02.037.03V8.27c-.83-.03-2.364-.574-4.218-.574-4.186 0-6.55 1.691-6.55 4.802 0 4.47 5.655 4.711 5.655 5.798 0 .242-.159.544-.798.544-.802 0-2.302-.409-3.522-.974-.806-.33-1.127-.544-1.527-.826v4.91c.863 0 3.291.816 5.272.816 4.346 0 6.423-2.054 6.423-4.862 0-4.47-5.72-4.832-5.72-5.89"
          fill="#0A0A0A"
        />
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill="#0A0A0A"
          mask="url(#b)"
          d="M11.408 22.405h5.833V8h-5.833z"
        />
        <path
          d="M8.695 12.394a2.808 2.808 0 1 0 0 5.616 2.808 2.808 0 0 0 0-5.616m5.238 2.809c0 4.118-3.12 7.457-6.966 7.457C3.119 22.66 0 19.321 0 15.203c0-4.12 3.12-7.458 6.967-7.458 3.847 0 6.966 3.339 6.966 7.458M75.606 22.405h5.832V.238h-5.832z"
          fill="#0A0A0A"
          mask="url(#b)"
        />
        <path
          d="M72.894 12.394a2.809 2.809 0 1 0 0 5.617 2.809 2.809 0 0 0 0-5.617m5.237 2.809c0 4.118-3.12 7.457-6.966 7.457-3.848 0-6.967-3.339-6.967-7.457 0-4.12 3.12-7.458 6.967-7.458 3.847 0 6.966 3.339 6.966 7.458M53.109 12.932c.794 0 1.559.33 2.106.857V7.876s-.384-.179-1.15-.179c-2.078 0-3.559 1.07-4.23 2.9V7.999h-5.293v14.405h5.832V15.88c0-1.789 1.225-2.947 2.735-2.947"
          fill="#0A0A0A"
          mask="url(#b)"
        />
      </g>
    </g>
  </svg>
);
/** COMPONENTS FOR HOOK FORMS.
 *  Better suited in their own repo if continuing on repo
 */
export type SelectElementProps = Omit<
  TextFieldProps,
  "name" | "type" | "onChange"
> & {
  validation?: ControllerProps["rules"];
  name: string;
  options?: { id: string | number; title: string | number }[] | any[];
  valueKey?: string;
  labelKey?: string;
  type?: "string" | "number";
  parseError?: (error: FieldError) => string;
  objectOnChange?: boolean;
  onChange?: (value: any) => void;
  control?: Control<any>;
};

function SelectFieldForm({
  name,
  required,
  valueKey = "id",
  labelKey = "title",
  options = [],
  parseError,
  type,
  objectOnChange,
  validation = {},
  control,
  ...rest
}: SelectElementProps): JSX.Element {
  const isNativeSelect = !!rest.SelectProps?.native;
  const ChildComponent = isNativeSelect ? "option" : MenuItem;
  if (required) {
    validation.required = "This field is required";
  }
  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { error },
      }) => {
        // handle shrink on number input fields
        if (type === "number" && typeof value !== "undefined") {
          rest.InputLabelProps = rest.InputLabelProps || {};
          rest.InputLabelProps.shrink = true;
        }
        if (typeof value === "object") {
          value = value[valueKey]; // if value is object get key
        }
        return (
          <TextField
            {...rest}
            name={name}
            value={value ?? ""}
            onBlur={onBlur}
            onChange={(event) => {
              let item: number | string = event.target.value;
              if (type === "number") {
                item = Number(item);
              }
              onChange(item);
              if (typeof rest.onChange === "function") {
                if (objectOnChange) {
                  item = options.find((i) => i[valueKey] === item);
                }
                rest.onChange(item);
              }
            }}
            select
            required={required}
            error={!!error}
            helperText={
              error
                ? typeof parseError === "function"
                  ? parseError(error)
                  : error.message
                : rest.helperText
            }
          >
            {isNativeSelect && <option />}
            {options.map((item: any) =>
              createElement(
                ChildComponent,
                {
                  key: `${name}_${item[valueKey]}`,
                  value: item[valueKey],
                },
                item[labelKey]
              )
            )}
          </TextField>
        );
      }}
    />
  );
}
export type TextFieldElementProps = Omit<TextFieldProps, "name"> & {
  validation?: ControllerProps["rules"];
  name: string;
  parseError?: (error: FieldError) => string;
  control?: Control<any>;
};

function TextFieldForm({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  ...rest
}: TextFieldElementProps): JSX.Element {
  if (required) {
    validation.required = "This field is required";
  }
  if (type === "email") {
    validation.pattern = {
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter a valid email address",
    };
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <TextField
          name={name}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          type={type}
          error={!!error}
          helperText={
            error
              ? typeof parseError === "function"
                ? parseError(error)
                : error.message
              : rest.helperText
          }
          {...rest}
        />
      )}
    />
  );
}

function FullPageErrorFallback({ error }: { error: any }) {
  return (
    <div
      role="alert"
      css={{
        color: "red",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export {
  FullPageErrorFallback,
  Button,
  AstridLogo,
  TextFieldForm,
  SelectFieldForm,
  CircularProgressWithLabel,
};
