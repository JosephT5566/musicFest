export interface IArtist {
	id: string;
	name: string;
	start: string;
	end: string;
}

export interface IStage {
	name: string;
	artists: IArtist[];
}

export interface IPerfDay {
	stages: IStage[];
}

export interface IFest {
	perfDays: IPerfDay[];
}
