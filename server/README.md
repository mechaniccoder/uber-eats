# Uber Eats

Build uber eats server using graphql

# What i've learnt

### Code first

nest에서는 graphql 파일로 schema를 작성하지 않고 typescript로 이를 작성하면 schema.gql 파일을 자동으로 만들어주는 접근법이 있다. typscript의 장점을 극으로 활용하는 방법이고, 굉장히 편리하다.

autoSchemaFile 옵션을 활용해서 typescript -> graphql파일을 생성할 수 있다.

### mongoose static method

@nestjs/mongoose와 mongoose를 활용할때 schema에 static method를 정의하고 싶었는데, mongoose 공식문서에 나와있는 방법은 typescript + nestjs를 사용하는 방식과는 조금 거리가 멀었다.

어떻게 하면 prototype 방식이 아닌 class의 static키워드를 사용해서 정의할 수 있을지 고민하다가 해결방법을 찾았다.

nest에서 model을 injection해줄때 model에 대한 타입을 extends해서 static method에 관한 타입을 정의해주는 방법을 사용하면 깔끔하게 사용할 수 있다.(src/restaurant/restaurant.schema.ts를 확인해보자.)

### mongoose findOneAndUpdate

document를 업데이트한 뒤에 response로 그 document를 보내는 경우에 findOneAndUpdate라는 api를 사용하면 되는데, options에 `{ new: true }` property를 사용해줘야 한다. 아니면 과거의 업데이트되기 전의 document를 response로 보내주게 된다.

### NestJs container with Promise

service, resolver에서 db와의 상호작용은 비동기로 처리되기 때문에 이 작업이 끝난 뒤에 client로 response를 보내줘야 한다.

그런데 공식문서에서는 pending상태의 promise를 await로 기다려주지 않고 바로 return하는 코드가 작성되어 있었는데, 이는 nestjs의 container가 최상단에서 비동기 작업을 기다려주는 operation이 있다는 것으로 추측했다.(이후에 실제 오픈소스 repository에서 확인해볼 예정이다.)

실험으로 primitive한 값을 promise로 감싸서 resolver, service에서 각각 return을 해줬고, 그 이전에 db document를 업데이트하는 로직을 작성했다. nestjs의 container는 db 업데이트 비동기 작업을 기다리지 않고 primitive한 promise가 이행되는대로 response값을 반환했다. 따라서 db도 업데이트 되지않았다. (이는 아마도 mogoose의 내부적인 buffering, 큐와 연관이 있는 것 같다. 관련 링크는 아래에 첨부하겠다.)

https://mongoosejs.com/docs/connections.html#buffering

### NestJS GraphQL에서의 exception filter

graphql에서도 nestjs의 exception filter와 호환이 된다. 다만, 몇가지 다르게 설정해야할 부분들이 있는데 `GqlExceptionFilter`를 상속해야하며, host에 접근하기 위해 `GqlArgumentHost`라는 팩토리 함수를 사용한다.

그리고 Restful에서는 express의 response 객체를 활용해 클라이언트로 데이터를 보냈다면, graphql에서는 response 객체를 사용할 수 없다. mutation에서 결과에 대한 타입과 정확히 호환되게 맞춰줘야 한다.

### NestJS GraphQL에서 error handling

Restful한 nestJS에서는 service레이어에서 throwing한 error를 잘 잡아내지만 graphql에서는 이를 잡아내지 못하는 이슈가 있었다. 뿐만 아니라, service 레이어에서 발생하는 error를 exception filter로 등록하더라도
이를 잡아내지 못했다.

따라서 스키마가 이미 정해져있는 graphql만의 error handling방법이 필요했고 이를 고안해냈다.

service 레이어에서는 error, data를 배열 객체로 반환하고, 이를 받은 resolver는 code first 방법으로 작성한 graphql 스키마에 맞는 response 객체를 생성해내고 이를 클라이언트로 전송해주는 방식이다.

아래 방식처럼 에러 핸들링 레이어를 구성했다.

```typescript
const [error, data] = await this.userService.create(...args)
if (error) {
  return Response.create(...args, error)
}
return Response.create(...args)
```

### dynamic module

jwt를 dynamic module로 만들어보았다. stataic module과는 다르게 dynamic 모듈의 경우는 외부에서 options를 동적으로 넣어준다.
원하는 설정을 parameter화 하면 된다.
