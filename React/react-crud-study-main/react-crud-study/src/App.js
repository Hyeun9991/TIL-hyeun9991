import "./App.css";
import { useState } from "react";

// components
import Header from "./components/Header";
import Nav from "./components/Nav";
import Article from "./components/Article";
import Create from "./components/Create";
import Update from "./components/Update";

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is..." },
    { id: 2, title: "css", body: "css is..." },
    { id: 3, title: "javascript", body: "javascript is..." },
  ]);

  let content = null;
  let contextControl = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB" />;
  } else if (mode === "READ") {
    // title, body 구하기
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />;
    contextControl = (
      <>
        <li>
          <a
            href={"/update" + id}
            onClick={(e) => {
              e.preventDefault();
              setMode("UPDATE");
            }}
          >
            Update
          </a>
        </li>
        <li>
          <input
            type="button"
            value="Delete"
            onClick={() => {
              const newTopics = [];
              for (let i = 0; i < topics.length; i++) {
                if (topics[i].id !== id) {
                  // id가 일치하지 않는 topic들만 push
                  newTopics.push(topics[i]);
                }
              }
              setTopics(newTopics);
              setMode("WELCOME");
            }}
          />
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          // topics 변수에 새로운 원소를 추가해서 목록에 추가되도록 해야함
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);

          // 글 작성 후 상세보기 페이지로 넘어가기
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1); // 다음에 추가할 글을 위해
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          console.log(title, body);
          const newTopics = [...topics];
          const updatedTopic = { id: id, title: title, body: body }; // 수정된 topic
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              // 선택한 topic
              newTopics[i] = updatedTopic; // 선택한 topic을 updatedTopic로 바꿈
              break; // 반복문 종료
            }
          }
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
    );
  }

  return (
    <div style={{ marginLeft: 10 }}>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      />
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(e) => {
              e.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
