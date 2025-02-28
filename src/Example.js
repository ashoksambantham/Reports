import React from 'react';
import { Margin, usePDF } from 'react-to-pdf';
import Card from './card.tsx';

const ExampleMultipage = () => {
  const { toPDF, targetRef } = usePDF({
    method: 'save',
    filename: 'multipage-example.pdf',
    page: { margin: Margin.MEDIUM },
  });
  return (
    <>
      <button onClick={toPDF}>Download PDF</button>
      <div ref={targetRef}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Card
              imageId={30 + index}
              key={index}
              title={`Multipage support, card #${index + 1}`}
            />
          ))}
      </div>
    </>
  );
};

export default ExampleMultipage;
