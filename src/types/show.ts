export class IArtist {
	id: string;
	name: string;
	startTime: string;
	endTime: string;
	constructor(args: { id?: string; name: string; startTime: string; endTime: string }) {
		const { id = '', name, startTime, endTime } = args;
		this.id = id;
		this.name = name;
		this.startTime = startTime;
		this.endTime = endTime;
	}
}

export interface IStage {
	name: string;
	artists: IArtist[];
}

export interface IPerfDay {
	dayIndex?: number;
	date?: string;
	dayStartTime: string;
	dayEndTime: string;
	stages: IStage[];
}

export interface IProgramList {
	perfDays: IPerfDay[];
}
