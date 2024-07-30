import { Slot } from '@radix-ui/react-slot';
import type { InputHTMLAttributes, Ref } from 'react';
import React, { isValidElement, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
  invalid?: boolean;
  errorId: string;
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  ref: Ref<any>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      asChild,
      invalid,
      'aria-describedby': ariaDescribedby,
      'aria-errormessage': areaErrorMessage,
      id,
      value,
      errorId,
      disabled,
      hasStartIcon,
      hasEndIcon,
      ...props
    },
    ref,
  ) => {
    const Element = asChild ? Slot : 'input';
    return (
      <Element
        {...props}
        ref={ref}
        disabled={disabled}
        className={`block size-full border-0 bg-transparent p-0 py-3.5 text-gray-900 outline-none placeholder:text-gray-300 focus:ring-0 sm:text-sm ${
          hasStartIcon ? 'pl-9' : 'pl-4'
        }
       ${hasEndIcon ? 'pr-9' : 'pr-4'}
      `}
        aria-describedby={ariaDescribedby}
        aria-invalid={invalid}
        id={id}
        value={value}
        aria-errormessage={areaErrorMessage}
      />
    );
  },
);

interface TextFieldDescriptionProps {
  description?: string;
  id: string;
  visuallyShow: boolean | undefined;
}

const TextFieldDescription = ({
  description,
  id,
  visuallyShow,
}: TextFieldDescriptionProps) => {
  return description ? (
    <p
      id={id}
      className={visuallyShow ? 'sr-only' : 'text-light-100 text-base'}
    >
      {description}
    </p>
  ) : null;
};

interface TextFieldLabelProps {
  label?: string;
  textFieldId: string;
}

const TextFieldLabel = ({ label, textFieldId }: TextFieldLabelProps) => {
  return label ? (
    <label
      htmlFor={textFieldId}
      className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
    >
      {label}
    </label>
  ) : null;
};

interface TextFieldErrorMessageProps {
  id: string;
  message?: string;
}

const TextFieldErrorMessage = ({ id, message }: TextFieldErrorMessageProps) => {
  return (
    <span id={id} className="ml-3 text-base text-red-600">
      {message}
    </span>
  );
};

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className="relative mt-6 h-28 w-full rounded-lg border border-gray-100 py-3.5 pl-4 shadow-sm outline-none focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
        {...props}
      />
    );
  },
);

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  invalid?: boolean;
  errorMessage?: string;
  maxLength?: number;
  label?: string;
  StartIcon?: any;
  EndIcon?: any;
  asChild?: boolean;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      description,
      invalid,
      errorMessage,
      asChild,
      label,
      value,
      StartIcon,
      EndIcon,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const descriptionId = `textField-description-${id}`;
    const errorId = `textField-error-${id}`;
    const textFieldId = `textField-${id}`;

    return (
      <div
        className={`relative h-[48px] rounded-lg border border-gray-100 shadow-sm focus-within:ring-indigo-600 focus:border-indigo-600 focus:ring-1 ${
          invalid
            ? 'border border-red-600 bg-red-700 hover:bg-red-500'
            : 'border border-gray-100 bg-gray-100'
        } ${className}`}
      >
        <TextFieldLabel label={label} textFieldId={textFieldId} />

        <div className="relative size-full">
          {StartIcon ? (
            <StartIcon
              className="absolute left-[10px] top-1/2 w-5 -translate-y-1/2 text-gray-300"
              aria-label="start icon"
            />
          ) : null}

          <Input
            {...props}
            ref={ref}
            value={value}
            asChild={asChild}
            invalid={invalid}
            aria-describedby={descriptionId}
            aria-errormessage={invalid ? errorId : undefined}
            id={textFieldId}
            errorId={errorId}
            hasStartIcon={Boolean(StartIcon)}
            hasEndIcon={Boolean(EndIcon)}
          />

          {EndIcon && !isValidElement(EndIcon) ? (
            <EndIcon
              aria-label="end icon"
              className="absolute right-[18px] top-1/2 -translate-y-1/2"
            />
          ) : null}

          {EndIcon && isValidElement(EndIcon) ? (
            <span className="absolute right-[18px] top-1/2 -translate-y-1/2">
              {EndIcon}
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex h-[10px] justify-between">
          {invalid && errorMessage ? (
            <TextFieldErrorMessage message={errorMessage} id={errorId} />
          ) : null}

          <TextFieldDescription
            id={descriptionId}
            description={description}
            visuallyShow={errorMessage ? invalid : undefined}
          />
        </div>
      </div>
    );
  },
);
