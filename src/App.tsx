import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";

import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />

        <main className="min-h-[calc(100vh-64px)] bg-slate-50">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/users/:id" element={<UserDetails />} />

            <Route path="/users/:id/edit" element={<EditUser />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
