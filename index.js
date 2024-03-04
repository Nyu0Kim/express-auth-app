// Express 프레임워크 변수에 로드
const express = require('express');

// express 애플리케이션 생성 후 app 변수 할당
const app = express();

// express 애플리케이션에 미들웨어 추가, 요청의 본문이 JSON 형식인 경우에만 자동으로 파싱됨
app.use(express.json());

// 4000번 포트 설정 -> express 애플리케이션을 지정된 포트에서 실행
const port = 4000;
app.listen(port, () => {
    console.log('listening on port ' + port);
})

