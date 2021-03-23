import Container from 'react-bootstrap/Container';
import { Header } from './components/header/Header';
import { ValidatorApp } from './components/validatorApp/ValidatorApp';
import { TfnValidationServiceContext } from './context';
import { TfnValidationService } from './services/TfnValidationService';

const validationApiUrl =
  process.env.REACT_APP_VALIDATION_API_URL ||
  "https://localhost:44386/validate";

function App() {
  return (
    <Container className="p-3">
      <Header />
      <TfnValidationServiceContext.Provider
        value={new TfnValidationService(validationApiUrl)}
      >
        <ValidatorApp />
      </TfnValidationServiceContext.Provider>
    </Container>
  );
}

export default App;
