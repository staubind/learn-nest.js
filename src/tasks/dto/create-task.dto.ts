export class CreateTaskDto {
    title: string;
    description: string;
}
// Data Transfer Objects (DTOs) are not models, but classes and interfaces are similar and used for them
// recommended to use classes. because interfaces dissolve in compilation.