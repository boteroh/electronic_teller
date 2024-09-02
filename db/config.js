import { connect } from 'mongoose';

const dbconnet = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('Connect to database succesfull');
    } catch (error) {
        console.log(error);
    }
};

export default dbconnet;