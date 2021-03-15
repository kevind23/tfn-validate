import React, { ReactNode } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

export class Header extends React.Component {
  public render(): ReactNode {
    return (
      <Jumbotron>
        <h1>Check a TFN</h1>
        <p>Check an Australian Tax File Number for correctness.</p>
      </Jumbotron>
    );
  }
}
