import { CustomCellRendererProps } from '@ag-grid-community/react';

export const SingleValueCell = (props: CustomCellRendererProps) => {
  if (!props.valueFormatted) {
    return null
  }

  return (
    <div className="cell-wrapper">
      <div className="single-values-wrapper">
        <span>{props.valueFormatted}</span>
      </div>
    </div>
  )
}

export const MultiValueCell = (props: CustomCellRendererProps) => {
  if (!props.valueFormatted) {
    return null
  }

  return (
    <div className=' cell-wrapper multi-value-field'>
      <div className="values-wrapper">
        {
          props.valueFormatted.split(',').map((val: string) => (
            <span key={val}>{val}</span>
          ))
        }
      </div>
    </div>
  )
};
