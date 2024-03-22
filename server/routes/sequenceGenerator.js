
const Sequence = require('../models/sequence');


const sequenceGenerator = {
    sequenceId: null,
    maxDocumentId: 0,
    maxMessageId: 0,
    maxContactId: 0,

    async init() {
        try {
            const sequence = await Sequence.findOne({}).exec();
            if (!sequence) {
                throw new Error('Sequence not found');
            }
            this.sequenceId = sequence._id;
            this.maxDocumentId = sequence.maxDocumentId;
            this.maxMessageId = sequence.maxMessageId;
            this.maxContactId = sequence.maxContactId;
        } catch (err) {
            console.error('Error initializing SequenceGenerator:', err);
            throw err;
        }
    },

    async nextId(collectionType) {
        if (!this.sequenceId) {
            await this.init();
        }

        let updateObject = {};
        let nextId;

        switch (collectionType.toLowerCase()) {
            case "documents":
                this.maxDocumentId++;
                updateObject = { maxDocumentId: this.maxDocumentId };
                nextId = this.maxDocumentId;
                break;
            case "messages":
                this.maxMessageId++;
                updateObject = { maxMessageId: this.maxMessageId };
                nextId = this.maxMessageId;
                break;
            case "contacts":
                this.maxContactId++;
                updateObject = { maxContactId: this.maxContactId };
                nextId = this.maxContactId;
                break;
            default:
                throw new Error('Invalid collection type');
        }

        try {
            await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject }).exec();
            return nextId;
        } catch (err) {
            console.error('Error updating sequence for', collectionType, err);
            throw err;
        }
    },

};

module.exports = sequenceGenerator;
