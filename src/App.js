import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { AppProvider } from "./contexts/AppContext";
import { ChatProvider } from "./contexts/ChatContext";
import { auth } from "./contexts/FirebaseContext";

import Header from "./components/Header";
import Home from "./pages";
import MemoryGame from "./pages/memory_game";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import ChatRockPaperScissors from "./pages/chat_rock_paper_scissors";

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
            auth.signOut();
            navigate("/");
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
                    <Route
                        path="/rock-paper-scissors-game"
                        element={
                            <PrivateRoute user={user}>
                                <ChatRockPaperScissors />{" "}
                            </PrivateRoute>
                        }
                    />
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
