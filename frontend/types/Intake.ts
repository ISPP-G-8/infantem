export type Sleep = {
    dateStart: string;
    dateEnd: string;
    numWakeups: number;
    dreamType: string | null;
    baby: { id: number } | null;
}