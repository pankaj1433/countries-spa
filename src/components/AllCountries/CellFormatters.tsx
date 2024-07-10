import { useMemo } from 'react';
import { CustomCellRendererProps } from '@ag-grid-community/react';

interface CustomMultiValueCellParams extends CustomCellRendererProps {
  hideBorder: boolean;
}

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

export const MultiValueCell = (props: CustomMultiValueCellParams) => {
  const borderClass = useMemo(() => props?.hideBorder ? 'no-border' : 'bordered', [props?.hideBorder]);

  if (!props.valueFormatted) {
    return null
  }

  return (
    <div className="multi-value-field">
      <div className={`values-wrapper ${borderClass}`}>
        {
          props.valueFormatted.split(',').map((val: string) => (
            <span key={val}>{val}</span>
          ))
        }
      </div>
    </div>
  )
};
