[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Muramasah/with-timer-react-hoc/blob/master/LICENSE)

Money exchange tool.

# Table of Contents
- [Install](#install)
  - [NPM](#npm)
  - [Yarn](#yarn)
- [What does this repo have](#what-does-this-repo-have)
- [How the logic layers are organized](#how-the-logic-layers-are-organized)
  - [App](#app)
  - [Layouts](#layouts)
  - [Containers](#containers)
  - [High Order Components](#high-order-components)
  - [Components](#components)
  - [State](#state)
  - [Helpers](#helpers)
  - [Mockups](#mockups)
  - [Configuration](#configuration)
  - [Tests](#tests)

# Install

First at all you must clone this repository:

```
git clone https://github.com/Muramasah/moneyexchange.io.git
```

## NPM
1. Install dependencies:
```
npm i
```

2. Run the local server in development mode:
```
npm run start
```

3. Run the local server in production mode:
```
npm run build
npm global add serve
serve -s build
```

## Yarn

1. Install dependencies:
```
yarn
```

3. Run the local server in development mode:
```
yarn start
```

4. Run the local server in production mode:
```
yarn build
yarn global add serve
serve -s build
```

# What does this repo have

1. Proyect setup using [Create React App](https://create-react-app.dev/) to avoid boilerplate code.
2. Tests, the container with the main feature is fully tested using [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/) as [suggested by the react team](https://reactjs.org/docs/testing.html#tools).
3. Asyncronous data fetching using [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) hook
4. Avoiding JavaScript issues realted to [floating points](https://modernweb.com/what-every-javascript-developer-should-know-about-floating-points/) stored in [IEEE 64 bit values](https://medium.com/@sarafecadu/64-bit-floating-point-a-javascript-story-fa6aad266665)
5. Working with basic types such as Date, string an numbers doing computations.
6. Multi-device suport, the app is responsive and fluid.
7. Client side data storage, the API is only called when there is a chance the data is updated.
8. Error display on unwanted user actions.
9. Examples of state managment using [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook.
10. Memoized heavy computation using [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) hook.


# How the logic layers are organized
## App
The application is the layer in charge of initiliaze features whichs work across the entire application, such as a centralized store like [Redux](https://redux.js.org/) or [MobX](https://mobx.js.org/) or a router such [React Router](https://reacttraining.com/react-router/).

## Layouts
Ussualy statless or with a state related to the display (not bussines logic), layouts are view units, contains common components across the different view states, like headers, lateral menues and footers. These components may recibe data from a root router an are able to implement sub routers to handle the internal changes.

## Containers
Handles its own state and works as small applications, but this state can be derivated from a centralized storage or router parameters through component properties.

## High Order Components
These are wrapper components which give super powers to other component. Basically, if the component renders a "children" property, you are in the presence of a [high order component](https://reactjs.org/docs/higher-order-components.html). The examples here contains logic related to the app responsiveness, but they can be used to abstract every type of logic from [cross cutting concerns](https://reactjs.org/docs/higher-order-components.html#use-hocs-for-cross-cutting-concerns).

## Components
They contain display logic, ussualy are statless but there are a few cases where they have a state related to when or how to display an element.

## State
The state is handled using the [three base principles](https://redux.js.org/introduction/three-principles) of redux (based in  [Flux](http://facebook.github.io/flux), [CQRS](http://martinfowler.com/bliki/CQRS.html), and [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html)). From **Flux** is incomporated another concept, the _dispatcher_, provided by React (useReducer hook)[https://reactjs.org/docs/hooks-reference.html#usereducer]. See more in the [redux docs](https://redux.js.org/introduction/prior-art#flux).

In this example the **state** is the one from our container because we do not need a centralized data store in other part of our app. Our single source of thr

The **reducers** are pipelines to change the state in a predictable way, actualy there is only one, directly related to the container.

**Actions** are objects whichs provide information about what happen in the app, they are our access to the reducers and the [only way to change the state](https://redux.js.org/introduction/three-principles#state-is-read-only).

I also added the **fetcher** concept to be able to centralize the logic related to the data obtaining, so the client component should not know where de data is comming from.

## Helpers
These are groups of functions which handle secondary computations, and are not related to how to **display**, how to handle **user interactions**, or **server changes**. These concerns managed by the previous described logic layers.

## Mockups
The mocked data allows us to test data structures and not server code.

## Configuration
Another kind onf mocked data but not necessarily server related information, here we define our basic app configuration, and we consume that data dynamically, makeing it easier to implement another source for those configurations.

## Tests
The tests are end to end, but using a DOM tree testing library, so the test environment is [not similar to a browsers](https://reactjs.org/docs/testing.html).
