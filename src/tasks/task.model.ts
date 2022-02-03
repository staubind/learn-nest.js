// typescript has a thing called interfaces that inform shape of an object
// only at compilation. has no effect at runtime, unlike classes

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus// use enums to enforce limited set of options
}

// this syntax seems really weird to me. why not use colons? as with interface?
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

// Data Transfer Objects (DTOs) are not models, but classes and interfaces are similar and used for them
// recommended to use classes. because interfaces dissolve in compilation.