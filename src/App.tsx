import Container from 'react-bootstrap/Container';
import { Header } from './components/header/Header';
import { ValidatorApp } from './components/validator/ValidatorApp';
import { TfnValidationServiceContext } from './context';
import { TfnValidationService } from './services/TfnValidationService';

function App() {
  return (
    <Container className="p-3">
      <Header />
      <TfnValidationServiceContext.Provider
        value={new TfnValidationService("https://localhost:44386/validate")}
      >
        <ValidatorApp />
      </TfnValidationServiceContext.Provider>
    </Container>
  );
}

export default App;
