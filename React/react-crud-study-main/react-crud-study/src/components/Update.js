import React, { useState } from "react";

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            type="text"
            name="body"
            placeholder="내용을 입력하세요."
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </p>
        <p>
          <input type="submit" value="Update" />
        </p>
      </form>
    </article>
  );
}

export default Update;
