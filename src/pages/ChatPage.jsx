import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Message from "../components/Message";
import EmojiPicker from "emoji-picker-react";

const ChatPage = ({ room, setRoom }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // son mesajın referansını
  const lastMsg = useRef();

  // mesajı veritbanına kaydet
  const handleSubmit = async (e) => {
    e.preventDefault();

    // emoji picker'ı kapat
    setIsOpen(false);

    // formu temizle
    setText("");

    // mesaj boş mu kontrol et
    if (text.trim() === "") return;

    // mesaj document'in kaydedileceği kolleksiyonun refransını al
    const messagesCol = collection(db, "messages");

    // referansı alınan kolleksiyona document'ı ekle
    await addDoc(messagesCol, {
      text,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });
  };

  // mevcut odada gönderilen mesajları anlık olarak al
  useEffect(() => {
    const messagesCol = collection(db, "messages");

    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (data) => {
      let temp = [];

      data.docs.forEach((doc) => {
        temp.push(doc.data());
      });

      // mesajları state'e aktar
      setMessages(temp);
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    lastMsg.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser.displayName}</p>

        <p>{room}</p>

        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages.length < 1 ? (
          <div className="warn">
            <p>Sohbete ilk mesajı gönderin</p>
          </div>
        ) : (
          messages.map((data, key) => <Message key={key} data={data} />)
        )}

        <div ref={lastMsg} />
      </main>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="mesajınızı yazınız"
          type="text"
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText(text + e.emoji);
            }}
            open={isOpen}
            skinTonePickerLocation="PREVIEW"
          />

          <button onClick={() => setIsOpen(!isOpen)} type="button">
            😉
          </button>
        </div>

        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
