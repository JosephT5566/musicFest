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

export interface IArtistV2 {
	id: string;
	name: string;
	description: string;
	imgUrl: string;
	date?: string;
	startTime?: string;
	endTime?: string;
	stageName?: string;
}

export interface IStage {
	name: string;
	artists: IArtist[];
}

export interface IStageV2 {
	name: string;
	artistIds: string[];
}

export interface IPerfDay {
	dayIndex?: number;
	date?: string;
	dayStartTime: string;
	dayEndTime: string;
	stages: IStage[];
}

export interface IPerfDayV2 {
	dayIndex?: number;
	date?: string;
	dayStartTime: string;
	dayEndTime: string;
	stages: IStageV2[];
}

export interface IProgramList {
	perfDays: IPerfDay[];
}

export type ISchedule = IPerfDayV2[];
