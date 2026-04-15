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

class CustomGreeting {
  static build() {
    const greeting = new Greeting();
    const customGreeting = new CustomGreeting();

    const superGreetings = new Proxy(customGreeting, {
      get(target, property) {
        // console.log(target[property]);
        return target[property] || greeting[property];
      },
    });

    return superGreetings;
  }

  french() {
    return `Bonjour`;
  }
}

const superGreetings = CustomGreeting.build();
console.log(superGreetings.french());
