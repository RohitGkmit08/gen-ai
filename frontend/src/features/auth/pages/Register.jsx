import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {
    const { loading, handleRegister } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await handleRegister({ username, email, password });
            if (res && res.success) {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <main>
                <div className="form-container">
                    <h1>Register</h1>

                    {error && <div style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="btn primary-btn" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Register;