export class Task {
  name: string;
  description: string;
  deadline: any;
  category: string;
  id: number = Math.floor(Math.random() * 1000);

  constructor(
    name: string,
    description: string,
    deadline: any,
    category: string
  ) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.category = category;
  }

  print() {
    const returnName = `<h3>${this.name}</h3>`;
    const returnDescription = `<p class="single-description">${this.description}</p>`;
    const returnDaysRemaining = `<p class="single-days">${this.deadline} days till deadline</p>`;
    const returnCatrgory = `<p class="single-category">${this.category}</p>`;
    console.log(this.id);
    return `${returnDaysRemaining}${returnName}${returnCatrgory}${returnDescription}`;
  }
}
