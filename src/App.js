import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { AppProvider } from "./contexts/AppContext";
import { ChatProvider } from "./contexts/ChatContext";
import { auth, db } from "./contexts/FirebaseContext";

import Header from "./components/Header";
import Home from "./pages";
import MemoryGame from "./pages/memory_game";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.signOut();
    }, []);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    const PrivateRoute = ({ user, children }) => {
        return user ? children : <Navigate to="/Login" />;
    };

    const NotFound = () => {
        const navigate = useNavigate();

        useEffect(() => {
            setTimeout(() => {
                navigate("/");
            }, 3000);
        }, []);
        return <div>404</div>;
    };
    return (
        <AppProvider>
            <ChatProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/memory-game" element={<MemoryGame />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ChatProvider>
        </AppProvider>
    );
}

export default App;
