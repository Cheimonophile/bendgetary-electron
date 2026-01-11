import { ReactNode } from "react";
import { Icon } from "./Icon";

/**
 * Props for the data consumer
 */
export interface DataConsumerProps<T> {

  /**
   * Values to consume
   */
  value: T | null | undefined;

  /**
   * Children is callback if the call is successful
   * 
   * @param value 
   * @returns 
   */
  children: (value: T) => ReactNode;
}


/**
 * Data consumer component
 */
export function DataConsumer<T>({
  value,
  children
}: DataConsumerProps<T>) {

  // if loading
  if (value === undefined) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 animate-spin">
          <Icon icon="ArrowPathIcon" style="solid" />
        </div>
      </div>
    )
  }

  // if error
  if (value === null) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 text-red-500">
          <Icon icon="ExclamationCircleIcon" style="solid" />
        </div>
      </div>
    )
  }

  // values
  return children(value);
}