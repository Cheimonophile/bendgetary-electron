import { Fragment, ReactNode, useMemo } from "react";
import { DataConsumer } from "./DataConsumer";

/**
 * Function Component for the table column renderer
 */
export type GTableCellRenderer<T> = (id: T) => ReactNode;


/**
 * Type for a table column
 */
export interface GTableColumn<T> {


  /**
   * The column's label
   */
  readonly label: string;

  /**
   * The column's width
   */
  readonly width?: `${number}rem`;

  /**
   * The column's component
   */
  readonly renderer: GTableCellRenderer<T>;

}



/**
 * Props for the table component
 */
export interface GTableProps<T> {

  /**
   * The data for the table
   */
  readonly values: readonly T[] | null | undefined;


  /**
   * The columns for the table
   */
  readonly columns: readonly GTableColumn<T>[];
}



/**
 * Component for a table in the application
 */
export function GTable<T>({
  values,
  columns
}: GTableProps<T>) {


  /**
   * Internal columns
   * 
   * Adds an empty column with flex to fill the table
   */
  const _columns = useMemo((): GTableColumn<T>[] => [
    ...columns,
    {
      label: "",
      renderer: () => null,
    }
  ], [columns]);


  return (
    <div id="Table" className="h-full w-full overflow-auto border">
      <DataConsumer value={values}>
        {values => (<>


          {/** Internal Table */}
          <div
            className="min-w-full grid"
            style={{
              gridTemplateColumns: _columns.map((col) => col.width ?? "minmax(min-content, 1fr)").join(" "),
            }}>

            {/** Table Header */}
            {_columns.map((col, colIndex) => (
              <Fragment key={colIndex}>
                <div className="border-b bg-white px-1 py-0.5 font-medium sticky top-0 text-nowrap z-10">
                  {col.label}
                </div>
              </Fragment>
            ))}


            {/** Rows */}
            {values.map((id) => (
              <Fragment key={`r-${id}`}>

                {/** Cells */}
                {_columns.map((col, colIndex) => (
                  <Fragment key={`c-${colIndex}`}>
                    <div className="px-1 py-0.5 text-nowrap truncate">
                      {col.renderer(id)}
                    </div>
                  </Fragment>
                ))}
              </Fragment>
            ))}

          </div>

        </>)}
      </DataConsumer>
    </div>
  )
}