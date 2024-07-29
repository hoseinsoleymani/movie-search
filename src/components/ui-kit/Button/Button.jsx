import { mergeClassNames } from '../../../helpers';

export const Button = ({
  asChild,
  disabled,
  variant = 'primary',
  className,
  ...props
}) => {
  const Element = 'button';

  return (
    <div className={`${getButtonParentClassNames(variant)}`}>
      <Element
        className={`${getButtonClassNames(variant, disabled)} ${className}`}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

function getButtonClassNames(
  variant,
  disabled
) {
  return mergeClassNames({
    'rounded-lg text-sm flex justify-center w-full items-center h-[2rem] md:h-[3rem] w-full px-8 transition-all font-normal whitespace-nowrap shadow-[0_8px_16px_0px_#6264F03D]':
      true,
    'text-white bg-primary-100 hover:bg-transparent hover:text-primary-100 hover:border-primary-100 border-2':
      variant === 'primary',
    'border border-gray-20 active:border-gray-30 hover:border-gray-25':
      variant === 'outlined',
    'text-white bg-primary-300 hover:bg-transparent hover:text-primary-300 hover:border-primary-300 border-2':
      variant === 'secondary',
    'opacity-25	pointer-events-none cursor-not-allowed': disabled,
  });
}

function getButtonParentClassNames(
  variant
) {
  return mergeClassNames({
    'relative transition-all w-full': true,
    '[&>svg]:hover:text-primary-100': variant === 'primary',
    '[&>svg]:hover:text-primary-300': variant === 'secondary',
  });
}