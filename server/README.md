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
