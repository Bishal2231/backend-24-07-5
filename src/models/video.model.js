import mongoose,{Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema=new Schema ({

    videoFile:{
        type:String,
        required: true
    },
    thumbnail:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true

    },
    description:{
        type:String,
        required: true
    },
    duration:{
        type:Number,
      
    },views:{
        type:Number,
        default:0
    },
    isPublish:{
        type:Boolean,
        default:true,
    },owner:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }


},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongooose.model("Video",videoSchema)