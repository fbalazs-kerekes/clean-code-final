export abstract class Person {
    constructor(private name: string, private age: number) {}

    GetName() {
        return this.name;
    }

    GetAge() {
        return this.age;
    }
}