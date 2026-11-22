import { Fragment } from 'react';
import type { FC } from 'react';
import { stripWords } from '../data/portfolio-data';

export const Strip: FC = () => {
  const doubled = [...stripWords, ...stripWords];

  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__row">
        {doubled.map((word, i) => (
          <Fragment key={i}>
            <span className={i % 2 ? 'is-outline' : undefined}>{word}</span>
            <i>—</i>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
