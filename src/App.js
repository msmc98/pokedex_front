import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './shared/Navbar'
import Content from './shared/Content';
import PublicContent from './shared/PublicContent';
import { AuthGuard } from "./guard/authGuard";

// import { QueryClient, QueryClientProvider } from 'react-query';

// const queryClient = new QueryClient();

const renderComponent = () =>{
  const authGuard = AuthGuard();
  // console.log(authGuard)

  if(authGuard){
    return (
      <>
        <Navbar />
        <Content />
      </>
    )
  }
  return <PublicContent />
}

const manageBackground = () =>{
  return localStorage.getItem('jw_token') ? 'center ' : 'center';
}

function App() {
  return (
    <div className="App" style={{ backgroundPosition: manageBackground()}} >
      {/* <QueryClientProvider client={queryClient}> */}
        <Router>
          {renderComponent()}
        </Router>
      {/* </QueryClientProvider> */}
    </div>
  );
}

export default App;
