## Toy Robot - Sean Thompson.  Developed using Vue JS

This is the Vue version of my crack at the popular Toy Robot coding challenge doing the rounds around the Melbourne tech scene.

The original spec for the challenge is in the PROBLEM.md document in the root of this repo. It says an interface isn't required but being an interface dev I've chosen to implement one anyway as well as extend it a little with a header and a command history etc..

I just used the [Vue CLI](https://cli.vuejs.org/guide/installation.html) to build this.  The version used here is 4.5.3. - current version at the time.  Decided to go Vue 3 with class components and property decorators here.

Pretty impressed with it, everything I'd want to utilise seems to come out of the box including state management with VueX, unit testing utlities, linting, TypeScript, Prettier... so I haven't really had to install anything else.  The only thing in the stack mentioned below that didn't come out of the box that I manually installed was immutability-helper.  Nice.

Stack:
- Vue
- VueX
- TypeScript
- Prettier
- Jest
- Vue test-utils
- ES Lint
- immutability-helper

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```
