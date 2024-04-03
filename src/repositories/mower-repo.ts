import mongoose, {Schema} from "mongoose"
import {MowerDto} from "../graphs/mower-dto"


export const mowerRepo = mongoose.model("Mower", new Schema<MowerDto>({
	name: {type: String, required: true},
	owner: {type: String, required: true}
}))