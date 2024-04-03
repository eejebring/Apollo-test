import mongoose, {Schema} from "mongoose"
import {MowerDTO} from "../graphs/mower-dto"


export const mowerRepo = mongoose.model("Mower", new Schema<MowerDTO>({
	name: {type: String, required: true},
	owner: {type: String, required: true}
}))