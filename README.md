# Uber Eats

Learning fullstack development by creating uber eats service

# Tech Stack

### Frontend

- TypeScript, React.js@18, Next.js@13, Apollo Client, TailwindCSS, Jest, Testing Library

### Backend

- TypeScript, Nest.js, Mongoose, MongoDB, GraphQL

# What i've learnt

## FrontEnd

### Codegen for graphql

codegen을 활용해 endpoint를 찔러 graphql schema로 부터 typescript typine을 생성할 수 있다. 유튜브에서 본 바로 이게 graphql의 단점이라고 하던데 내가 생각했을때 단점이 맞는 것 같다. codebase가 많아질수록 코드를 생성하는데 더 많은 시간이 걸릴 것이고 이 것에 의존해서 개발하는 경험이 좋지 않다.

### Testing graphql

graphql을 테스트하기 위해 msw를 설정해줬다. apollo client 공식문서에서 제공하는 테스팅 방법도 괜찮긴 한데 너무 graphql구현에 묶인다고 생각한다. 네트워크 layer를 mocking에서 사용하는게 인터페이스를 테스트하는 방향이라고 생각한다.

### Autocomplete of verification code
