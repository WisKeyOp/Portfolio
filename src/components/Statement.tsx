import type { FC } from 'react';
import { statementData } from '../data/portfolio-data';

export const Statement: FC = () => {
  const words = statementData.text.trim().split(/\s+/);

  return (
    <section className="statement">
      <h2 className="statement__text" id="statementText">
        {words.map((word, i) => (
          <span className="statement__word" key={`${word}-${i}`}>
            {word}
          </span>
        ))}
      </h2>
    </section>
  );
};
