import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
    status?: TaskStatus;
    search?: string; //  the question mark makes it optional - not sure if that's just a ts thing.
}