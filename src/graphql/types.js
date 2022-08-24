const { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLFloat } = require('graphql')
const {User, Quiz, Submission, Question} = require('../models')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: ()=>({
        id : {type: GraphQLID},
        username: {type: GraphQLString},
        email : {type: GraphQLString},
        quizzes:{
            type: new GraphQLList(QuizType),
            resolve(parent, args){
                return Quiz.find({userId:parent.id})
            }
        },
        submissions:{
            type: new GraphQLList(SubmissionType),
            resolve(parent, args){
                return Submission.find({userId:parent.id})
            }
        }

    })
})

module.exports={
    UserType
}