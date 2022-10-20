import React from "react";

function Nav({ topics, onChangeMode }) {
  // const lis = [];
  // for (let i = 0; i < props.topics.length; i++) {
  //   let t = props.topics[i];
  //   lis.push(
  //     <li key={t.id}>
  //       <a
  //         id={t.id}
  //         href={"/read" + t.id}
  //         onClick={(e) => {
  //           e.preventDefault();
  //           props.onChangeMode(e.target.id);
  //         }}
  //       >
  //         {t.title}
  //       </a>
  //     </li>
  //   );
  // }
  return (
    <nav>
      <ol>
        {topics.map((item) => (
          <li key={item.id}>
            <a 
              id={item.id} // 태그에 속성으로 넘기면 문자열이 됨
              href={"/read" + item.id}
              onClick={(e) => {
                e.preventDefault();
                onChangeMode(Number(e.target.id)); // 문자열 id를 숫자로 컴버팅
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Nav;
