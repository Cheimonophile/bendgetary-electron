import { ComponentProps, FC } from "react";
import { Button } from '@headlessui/react';
import { clsx } from "clsx";


/**
 * Props for the button component
 */
export interface GButtonProps extends ComponentProps<typeof Button> {

  /**
   * Click handler
   */
  onClick: ComponentProps<typeof Button>['onClick'];

  /**
   * Button text
   */
  text: string;

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
}


/**
 * Button component
 */
export const GButton: FC<GButtonProps> = ({
  onClick,
  text,
  disabled
}) => {
  return (
    <Button
      className={clsx(
        "bg-ball-red text-white relative rounded px-2 py-0.25",
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "hover:after:backdrop-brightness-90 active:after:backdrop-brightness-75 after:absolute after:inset-0"
      )}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </Button>
  );
}