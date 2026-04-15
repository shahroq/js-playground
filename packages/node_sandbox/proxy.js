// stephan advanced node course/add more funcs to puppeteer Page object
// add page.login() to abstract away all code for login to a page
class Greeting {
  english() {
    return `Hello`;
  }

  spanish() {
    return `Hola`;
  }
}

/*
// prob with extends: we cannot tell puppeteer to use this class instead of Page
class MoreGreeting extends Greeting {
  french() {
    return `Bojjour`;
  }
}
*/

class CustomGreeting {
  french() {
    return `Bonjour`;
  }
}

const greeting = new Greeting();
const customGreeting = new CustomGreeting();

const superGreetings = new Proxy(customGreeting, {
  get(target, property) {
    // console.log(target[property]);
    return target[property] || greeting[property];
  },
});

console.log(superGreetings.english());
