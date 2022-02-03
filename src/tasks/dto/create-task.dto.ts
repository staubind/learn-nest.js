import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}

// class-validator and class-transform for some neat decorators.

// Data Transfer Objects (DTOs) are not models, but classes and interfaces are similar and used for them
// recommended to use classes. because interfaces dissolve in compilation.