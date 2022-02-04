import { TaskStatus } from "../task.model";
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTasksFilterDto {
    
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string; //  the question mark makes it optional - not sure if that's just a ts thing.
}