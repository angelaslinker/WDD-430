
export class Message {
    public id: string;
    public subject: string;
    public msgText: string;
    public text: string;

    constructor(id: string, subject: string, msgText: string, text: string) {
        this.id = id;
        this.subject = subject;
        this.msgText = msgText;
        this.text = text;
    }
}