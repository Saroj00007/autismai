import mongoose , {Document , Schema , Model} from "mongoose";


interface Iuser extends Document{
    name : String , 
    email : String , 
    password : String , 
    createdAt : Date , 
    UpdatedAt : Date
}

const UserSchema =new Schema<Iuser>(
    {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Usermodel: Model<Iuser> =
  mongoose.models.User ||
  mongoose.model<Iuser>("User", UserSchema);

export default Usermodel;



