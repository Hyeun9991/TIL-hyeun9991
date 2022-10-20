import React from "react";

function Create(props) {
  return (
  <article>
    <h2>Create</h2> 
    <form onSubmit={e => {
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="제목을 입력하세요."/></p>
      <p><textarea type="text" name="body" placeholder="내용을 입력하세요."/></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
  );
}

export default Create;

