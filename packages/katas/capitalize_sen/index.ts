// --- Direction
// accept a string and captalize the 1st letter of each worl in the string
// --- Example
// capitalize_sen('a short sentence') --> 'A Short Sentence'
// capitalize_sen('a lazy fox') --> 'A Lazy Fox'
// capitalize_sen('look, it is working!') --> 'Look, It Is Working!'

export function capitalize_sen(str: string): string {
  return str
    .split(" ")
    .map((word) => word.camelize2())
    .join(" ");
}

declare global {
  interface String {
    camelize(): string;
    camelize2(): string;
  }
}

String.prototype.camelize2 = function (): string {
  return this.slice(0, 1).toUpperCase() + this.slice(1);
};

String.prototype.camelize = function (): string {
  return this.split("")
    .map((char, i) => (i === 0 ? char.toUpperCase() : char))
    .join("");
};
