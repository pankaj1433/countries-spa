import { Fragment } from "react";
interface IMultiFieldChips {
  items: string[] | number[];
  title: string;
}

const MultiFieldChips = ({ items, title }: IMultiFieldChips) => (
  <div className="multi-val-wrapper">
    <h4>{`${title}: `}</h4>
    <div className="chips-wrapper">
      {
        items.map((item, idx) => (
          <Fragment key={`${title}-${item}`}>
            <span>{item}</span>
            <span>{idx !== items.length - 1 ? "|" : ""}</span>
          </Fragment>
        ))
      }
    </div>
  </div>
)

export default MultiFieldChips;
