// Express 프레임워크 변수에 로드
const express = require('express');
// JWT 라이브러리를 가져와 jwt 변수에 할당
const jwt = require('jsonwebtoken');

// express 애플리케이션 생성 후 app 변수 할당
const app = express();
const secretText = 'superSecret';

const posts = [
    {
        username: 'Nana',
        title: 'JWT Study'
    },
    {
        username: 'pie',
        title: 'fastapi study'
    }
]

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

// POST
app.post('/posts', (req,res) => {
    res.json(posts);
})

// 미들웨어 생성 -> 인증된 사람만 요청 POST를 가져갈 수 있음, next : 다음 미들웨어로 제어 전달하는 콜백
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    // authorization 헤더가 존재하는 경우에만 해당 헤더 값을 공백으로 분리하여 토큰 추출
    const token = authHeader && authHeader.split(' ')[1]
    // 토큰이 존재하지 않는 경우, 클라이언트에 401 반환(클라이언트가 인증 되지 않았음을 나타냄)
    if (token == null) return res.sendStatus(401)

    // 추출된 토큰을 사용하여 JWT 검증
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        // 검증에 성공 -> 검증된 사용자 정보를 요청 객체의 'user'속성에 할당
        req.user = user
        next()
    })
}


// 4000번 포트 설정 -> express 애플리케이션을 지정된 포트에서 실행
const port = 4000;
app.listen(port, () => {
    console.log('listening on port ' + port);
})

