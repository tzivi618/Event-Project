import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainMenuComponent } from './components/mainMenu';
import { ProducerMenuComponent } from './components/producer/producerMenu';
import { EventsListForUserComponent } from './components/user/eventsListForUser';
import { AddProducerComponent } from './components/producer/addProducer';
import { CheckProducerComponent } from './components/producer/checkProducer';
import { ProducerProvider } from './context/producer.context';
import { ActivityProvider } from './context/activity.context';
import App from './App';
import { ProducerDetailComponent } from './components/producer/producerDetail';
import { EventDetailForProducerComponent } from './components/producer/eventDetailForProducer';
import { AddEventComponent } from './components/producer/addEvent';
import { EventDetailForUserComponent } from './components/user/eventDetailForUser';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ActivityProvider>
        <ProducerProvider>
          <MainMenuComponent />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path='/producer' element={<ProducerMenuComponent />}>
              <Route path='addProducer' element={<AddProducerComponent />} />
              <Route path='checkProducer' element={<CheckProducerComponent />} />
              <Route path=':email' element={<ProducerDetailComponent />} >
              </Route>
              <Route path=':email/addEvent' element={<AddEventComponent />} />
              <Route path=':email/:eventName' element={<EventDetailForProducerComponent />} />
            </Route>
            <Route path='/users' element={<EventsListForUserComponent />} />
            <Route path='/event/:eventName' element={<EventDetailForUserComponent />} />
          </Routes>
        </ProducerProvider>
      </ActivityProvider>
    </BrowserRouter>
  </StrictMode>,
);
