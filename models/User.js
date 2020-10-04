const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required.',
            trim: true,
            default: 'NewName'
        },
        email: {
            type: String,
            required: 'Email is required.',
            unique: true,
            trim: true,
            match: [/.+\@.+\..+/]
        },
        password: {
            type: String,
            unique: true,
            required: 'Password is required.',
            minlength: 4
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Get A Count Of Users Friends
userSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

// Has User Password Before Saving
userSchema.pre('save', async function() {
    return this.password = await bcrypt.hash(this.password, 10);
});

// Hash User Password After Saving
userSchema.post('save', async function() {
    return this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);

module.exports = User;