# 목차
* [React Router DOM](#react-router-dom)
* [세팅](#세팅)
* [Routing 또는 Router](#routing-또는-router)
    * [Route](#route)
    * [Switch](#switch)
    * [404 페이지](#404-페이지)
* [SPA에서 중요한것](#spa에서-중요한것)
    * [Link](#link)
* [HashRouter](#hashrouter)
* [NavLink 또는 Navigation](#navlink-또는-navigation)
* [Nested Routing (중첩 라우팅)](#nested-routing-중첩-라우팅)
* [하나의 Route로 여러개의 컴포넌트로 이동하기](#하나의-route로-여러개의-컴포넌트로-이동하기)

---
# React Router DOM
여러개의 페이지가 있는 웹을 만드려면
1. 주소로 들어왔을 때 주소를 알아내고
2. 해당하는 컴포넌트를 render하고 
3. 그 상태를 관리하기 위해 내부적으로 state, props 값들을 복잡하게 사용해야 함


위와 같은 기능들을 구현하기에는 너무 복잡함. 
하지만 이런 기능들을 쉽게 해주는 도구가 있는데 바로 **react router dom** 이다.

---

# 세팅
## create react app 설치
`npx create-react-app react-router-study`

## react router dom 설치
`npm install react-router-dom@5.3.0`

---

# Routing 또는 Router
사용자가 어떤 주소로 들어왔을 때 주소에 해당하는 적당한 페이지를 사용자에게 보내주는 것

* BrowserRouter
* Router


## Route
1. url에 따라 달라져야 할 컴포넌트를 `Route`로 감싸줌
2. `path`를 지정해서 해당 컴포넌트의 url 생성
    * 주소와 매칭되는 컴포넌트가 화면에 routing됨

``` jsx
<Route path="/topics">
  <Topics />
</Route>
```
### exact
* `http://localhost:3000/`로 접속했을 땐 메인 페이지만 화면에 표시되지만,
`http://localhost:3000/topics`로 접속했을 땐 메인 페이지(`'/'`) 와 topics 페이지(`'/topics'`) 컴포넌트가 같이 표시됨
<br/>

* `exact` : 정확하게
* **컴포넌트에 exact라는 속성을 추가해주면 정확하게 path가 일치하는 경우에만 매칭을 시켜줌**
* react router dom v6에서는 옵션이기 때문에 생략 가능

<br />

## Switch
`Switch` 컴포넌트로 감싸서 `exact` 속성을 사용하지 않아도 사용한 것과 똑같은 효과를 낼 수 있음

``` jsx
<Switch>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/topics">
    <Topics />
  </Route>
  <Route path="/contact">
    <Contact />
  </Route>
</Switch>
```

근데 topics, contact를 클릭해도 home이 나옴
switch로 route를 감쌌을 때 **path와 일치하는 첫 번째 컴포넌트만 화면에 표시됨**
### 해결방법 
1. 메인 루트를 맨 밑에 위치시키기
``` jsx
<Switch>
  <Route path="/topics">
    <Topics />
  </Route>
  <Route path="/contact">
    <Contact />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>
```
<br />

2. exact 속성 사용
``` jsx
<Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route path="/topics">
    <Topics />
  </Route>
  <Route path="/contact">
    <Contact />
  </Route>
</Switch>
```
<br />

## 404 페이지
사용자가 존재하지 않는 페이지(url)로 접속했을 때 'Not Found'라는 페이지를 표시
* switch 태그 맨 아래에 아래 코드 입력
`<Route path="/">Not found</Route>` 

---
# SPA에서 중요한것
1. **페이지가 리로드 되지 않아야 함**
2. 실제 동적으로 가지고 오는 데이터는 코딩으로 만듦
3. 또는 ajax를 사용해서 비동기적으로 가지고온 데이터를 코딩으로 동적으로 
 만듦

## Link
spa에서 중요한 것은 페이지가 **리로드**되지 않아야 함
하지만, 현재까지 작성한 코드들은 리로드되고 있음

``` jsx
// 리로드 됨
function App() {
  return (
    <div>
      <h1>React Router DOM example</h1>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/topics">Topics</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/">Not found</Route>
      </Switch>
    </div>
  );
}
```
<br />

## 페이지가 리로드 되지 않으려면
* **`<a>` 태그를 `<Link>` 컴포넌트로 감싸줌**
``` jsx
<li>
  <Link to="/">Home</Link>    
</li>
<li>
  <Link to="/topics">Topics</Link>
</li>
<li>
  <Link to="/contact">Contact</Link>
</li>
```
---

# HashRouter

BrowserRouter대신에 HashRouter를 사용하면 path가 이렇게 바뀜
  * `http://localhost:3000/#/`
  * `#` : 북마크
  
## 웹 서버는 `#`을 무시함
js 입장에서 `#`을 가져올 수 있기 때문에 react router dom이 정보를 가져와서 해당되는 컴포넌트를 라우팅 해줌. 하지만 주소가 깔끔하지 않음
<br />

## 참고
웹 서버 설정을 바꿔서 어떤 path로 들어오건 간에 root page에 있는 html을 서비스할 수 있다면 BrowserRouter를 사용, 안된다면 HashRouter 사용

---

# NavLink 또는 Navigation
Link와 유사하지만 **기능이 더 추가됨**
``` jsx
<li>
  <NavLink to="/">Home</NavLink>    
</li>
<li>
  <NavLink to="/topics">Topics</NavLink>
</li>
<li>
  <NavLink to="/contact">Contact</NavLink>
</li>
```

* NavLink를 사용하고 링크를 누르면 class가 생김
   * `class="active"`

* **문제**
  * root 링크인 Home에는 기본적으로 class가 생겨있음

* **해결**
  * Route와 똑같이 exact 속성을 추가해줌

## class를 활용
사용자가 현재 위치하고 있는 곳이 어딘지 직관적으로 이해할 수 있게
네비게이션에 사용자가 위치하고 있는 곳을 표시할 수 있음

``` css
.active {
  background: tomato;
  text-decoration: none;
}
```
* `class ="active"`인 링크들만 css 적용

---

# Nested Routing (중첩 라우팅)
## router 중첩
* `App` 컴포넌트 `Route`안에 `Topics`컴포넌트의 `Route`가 존재
``` jsx
// Topics
function Topics() {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        // <li> HTML, JS, React NavLink 생략 </li>
      </ul>
      <Switch>
        <Route path='/topics/1'>
          HTML is...
        </Route>
        <Route path='/topics/2'>
          JS is...
        </Route>
        <Route path='/topics/3'>
          React is...
        </Route>
      </Switch>
    </div>
  );
}

// App.js
function App() {
  return (
    <div>
      <h1>React Router DOM example</h1>
      <ul>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        // Topics, Contact 생략
      </ul>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/">Not found</Route>
      </Switch>
    </div>
  );
}
```

---
# 하나의 Route로 여러개의 컴포넌트로 이동하기
## 리스트를 자동으로 생성

``` jsx
var contents = [
  // 전역 변수에 담음 / 실제로는 ajax에 담아서 가져오는 경우가 더 많음
  { id: 1, title: "HTML", description: "HTML is ..." },
  { id: 2, title: "JS", description: "JS is ..." },
  { id: 3, title: "React", description: "React is ..." },
];

function Topics() {
  var lis = [];
  for (var i = 0; i < contents.length; i++) {
    lis.push(
      <li key={contents[i].id}>
        <NavLink 
          to={"/topics/" + contents[i].id}
        >
          {contents[i].title}
        </NavLink>
      </li>
    );
  }

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
    </div>
}
```
* 링크에 들어갈 내용을 `contents` 배열 겍체에 담기
* 반복문 돌면서 `lis` 빈 배열에 `push`
* 이전 방식과 똑같지만 링크가 더 많이 생겼을 땐 효율적임
<br />

## 하나의 Route를 사용해서 동적인 페이지 만들기
### 1. 하나의 Route와 Topic 컴포넌트 생성
이전에는 컴포넌트 개수마다 `Route`를 하나씩 만들어서 하드코딩 했다면, 이번에는 하나의 `Route`를 사용

``` jsx
function Topic() {
  return (
    <div>
      <h3>Topic</h3>
      Topic...
    </div>
  );
}

function Topics() {
  return (
    <div>
      <Route path="/topics/:topic_id">
        <Topic />
      </Route>
    </div>
  )
}
```
* Topic 컴포넌트 생성
* Topics에 새로운 Route 생성
* topics에서 topic으로 url로 `topic_id` 전달
<br />

### 2. url로 전달된 데이터를 전달 받기
**useParams 사용**
``` jsx
import { useParams } from "react-router-dom";

function Topic() {
  var params = useParams(); // url로 전달된 데이터를 받을 수 있음
  var topic_id = params.topic_id; // 선택한 topic의 id값
  console.log('params', params, params.topic_id); 
  // params {topic_id: '1'} 1 (html 클릭)
  
  return (
    // 생략
  );
}
```
* `useParams()`를 사용해서 url로 전달된 `:topic_id`를 `topic_id` 변수에 받기
<br />

### 3. 선택한 topic의 id를 활용해서 contents를 render

``` jsx
function Topic() {
  var params = useParams(); 
  var topic_id = params.topic_id; // 선택한 topic의 id값
  var selected_topic = {
    title: 'Sorry', // 기본값
    description: 'Not Found', // 존재하지 않는 주소로 접속시 보여줌
  }
  for (var i = 0; i < contents.length; i++) {
    if (contents[i].id === Number(topic_id)) {
      selected_topic = contents[i];
      break;
    }
  }
  console.log("params", params, params.topic_id);
  return (
    <div>
      <h3>{selected_topic.title}</h3>
      {selected_topic.description}
    </div>
  );
}
```
* `selected_topic` 객체 생성
* `contents`의 id와 `topic_id`가 같은것만 `selected_topic` 객체 안에 넣기
* `contents`의 내용을 render

---

[목차로 돌아가기](#목차)