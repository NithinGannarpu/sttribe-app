import './App.css';
import ChatBox from './components/Chatbox';
import EventCarousel from './components/Events';

function App() {
  return (
    <div className="App">
      <h1>Student Tribe Chat Assistant</h1>
      <EventCarousel></EventCarousel>
      <ChatBox />
    </div>
  );
}

export default App;
