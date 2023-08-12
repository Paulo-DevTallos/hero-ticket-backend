import mongoose from 'mongoose';

export const connectionDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017');

        console.log('connection succefull');
    } catch (error) {
        console.log('connection error');
    }
}