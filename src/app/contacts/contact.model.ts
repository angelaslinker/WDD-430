export class Contacts {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public imageUrl: string,
        public group: Contacts[]
    ) { }
}