import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const RoomPage = ({ setIsAuth, setRoom }) => {
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    signOut(auth);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const room = e.target[0].value.toLowerCase();

    setRoom(room);
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="room-page">
        <h2>Chat Odası</h2>
        <p>Hangi Odaya Gireceksiniz</p>
        <input type="text" placeholder="ör:haftasonu" required />
        <button type="submit">Odaya Gir</button>
        <button type="button" onClick={logout}>
          Çıkış Yap
        </button>
      </form>
    </div>
  );
};

export default RoomPage;
