import './App.css';
import ChatBox from './components/Chatbox';
import EventCarousel from './components/Events';
import InternshipCarousel from './components/Interships';

function App() {
  return (
    <div className="App">
      <h1>Student Tribe Chat Assistant</h1>
      <EventCarousel></EventCarousel>
      <InternshipCarousel></InternshipCarousel>
      <ChatBox />
    </div>
  );
}

export default App;
