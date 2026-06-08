// stephan advanced node course/patching a func to mongoose query func
// .cache()
class Greeting {
  english() {
    console.log(`Hello`);
    return this;
  }

  spanish() {
    console.log(`Hola`);
    return this;
  }
}

/*
const en = Greeting.prototype.english;
Greeting.prototype.english = function () {
  // console.log(`English func`);
  return `In English: ` + en.apply(this.aruments);
};
*/

Greeting.prototype.withTitle = function () {
  console.log(`Sir!`);
  return this;
};

const greeting = new Greeting();
greeting.english().withTitle();
