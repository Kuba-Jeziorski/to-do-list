export class Task {
  name: string;
  description: string;
  days: number;

  constructor(name: string, description: string, days: number) {
    this.name = name;
    this.description = description;
    this.days = days;
  }

  print() {
    return `${this.name} - ${this.description} - ${this.days}`;
  }
}
