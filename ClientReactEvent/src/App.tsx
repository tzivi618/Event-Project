import { Outlet } from 'react-router-dom';
import './App.css';
import { MainMenuComponent } from './components/mainMenu';

function App() {
  return (
    <>
      <Outlet />
      <h1>HELLO EVENTS😄😄😄</h1>
    </>
  );
}

export default App;
