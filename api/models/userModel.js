import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
              return value.toLowerCase().endsWith('@iastate.edu');
            },
            message: props => `${props.value} is not a valid Iowa state university email domain!`
          }
    },
    profile:{
        type: String,
        default: 'http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
    },
    verified: Boolean, 
   
}, {timestamps: true});

userSchema.path('email').validate({
    validator: async function(value) {
        const user = await this.constructor.findOne({ email: value });
        return !user;
    },
    message: props => `${props.value} is already taken! Please choose a different email.`,
});

const User = mongoose.model('User', userSchema);

export default User;