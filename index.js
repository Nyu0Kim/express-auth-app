// Express 프레임워크 변수에 로드
const express = require('express');
// JWT 라이브러리를 가져와 jwt 변수에 할당
const jwt = require('jsonwebtoken');

// express 애플리케이션 생성 후 app 변수 할당
const app = express();
const secretText = 'superSecret';

// express 애플리케이션에 미들웨어 추가, 요청의 본문이 JSON 형식인 경우에만 자동으로 파싱됨
app.use(express.json());

app.post('/login', (req, res) => {
    // 사용자 이름 추출
    const username = req.body.username;
    const user = { name: username};

    // jwt를 이용해서 토큰 생성하기 payload + secretText
    const accessToken = jwt.sign(user, secretText);
    res.json({accessToken: accessToken })
})

// 4000번 포트 설정 -> express 애플리케이션을 지정된 포트에서 실행
const port = 4000;
app.listen(port, () => {
    console.log('listening on port ' + port);
})

