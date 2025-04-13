import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        role: String,
        status: String,
        image: String,
        googleId: String,
        githubId: String,        
    },
    {
        timestamps: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
        }
    }
);
const User = models.User || model('User', UserSchema);
export default User;