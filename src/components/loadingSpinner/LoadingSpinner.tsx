import React, { ReactNode } from 'react';
import { Spinner } from 'react-bootstrap';

export class LoadingSpinner extends React.Component<{}, {}> {
  public render(): ReactNode {
    return (
      <>
        <Spinner as="span" animation="border" size="sm"></Spinner> Loading...
      </>
    );
  }
}
