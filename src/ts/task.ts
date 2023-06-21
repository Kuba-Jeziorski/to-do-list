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
    const returnName = `<h3>${this.name}</h3>`;
    const returnDescription = `<p>${this.description}</p>`;
    const returnDays = `<p>${this.days} days</p>`;
    return `${returnDays}${returnName}${returnDescription}`;
  }
}
