# 오류들

## Link 사용시 url은 변경되지만 화면은 바뀌지 않는 오류
원인: react.strict모드
해결: react.strict태그를 삭제하니 잘 작동했음

## params.topic_id를 콘솔에 찍어본 결과 undefined가 나옴
원인: 단순 오타 (`topic_id`를 `topics_id`로 적음)
해결: 오타 정정 
 