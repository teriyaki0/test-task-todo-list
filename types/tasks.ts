export interface ITask {
    id: number,
    title: string,
    descriptions: string,
    date: Date | null,
    isComplited: boolean
}