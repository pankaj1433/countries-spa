import { useMemo } from 'react';
import { AgGridReact, CustomCellRendererProps } from '@ag-grid-community/react';

export const LanguagesCell = (props: CustomCellRendererProps) => {
  if (!props.value) {
    return null
  }

  return (
    <div className='multi-value-field'>
      <div className="values-wrapper">
        {
          Object.keys(props.value).map((language) => (
            <span key={language}>{props.value[language]}</span>
          ))
        }
      </div>
    </div>
  )
};

export const CurrenciesCell = (props: CustomCellRendererProps) => {
  if (!props.value) {
    return null
  }

  return (
    <div className='multi-value-field'>
      <div className="values-wrapper">
        {
          Object.keys(props.value).map((currency) => (
            <span key={currency}>{props.value[currency].name}</span>
          ))
        }
      </div>
    </div>
  )
};
