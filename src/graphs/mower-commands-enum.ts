import {registerEnumType} from "type-graphql"

export enum MowerCommands {
	FORWARD = "FORWARD",
	LEFT = "LEFT",
	RIGHT = "RIGHT",
	BACKWARD = "BACKWARD"
}

registerEnumType(MowerCommands, {
	name: "MowerCommands",
	description: "The commands a mower can execute",
	valuesConfig: {
		FORWARD: {description: "Move the mower forward"},
		LEFT: {description: "Turn the mower left"},
		RIGHT: {description: "Turn the mower right"},
		BACKWARD: {description: "Move the mower backward"}
	}
})