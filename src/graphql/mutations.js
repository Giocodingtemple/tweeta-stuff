
const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLInt } = require('graphql')
const { QuestionInputType, AnswerInputType, SubmissionType } = require('./types')
const { User, Quiz, Question, Submission } = require('../models')
const {createJwtToken} = require('../util/auth')

const register = {
    type: GraphQLString, //data type of the reutrn value of register
    args: {
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    async resolve(parent,args){
        const checkUser = await User.findOne({email: args.email})
        if (checkUser){
            throw new Error('User with this email already exists')
        }
        const user = new User(args)
        await user.save()

        //create a token
        const token = createJwtToken(user)
        return token
    }
}

const login = {
    type: GraphQLString,
    args: {
        email:{type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(parent, args){
        const user = await User.findOne({email: args.email})
        if (!user || args.password !== user.password){
            throw new Error("Invalid Creds")
        }
        const token = createJwtToken(user)
        return token
    }
}

module.exports = {register, login}