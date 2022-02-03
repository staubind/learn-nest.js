// typescript has a thing called interfaces that inform shape of an object
// only at compilation. has no effect at runtime, unlike classes

export interface Task {
    id: string;
    title: string;
    description: string;
    status: // use enums to enforce limited set of options
}

enum TaskStatus {
    OPEN = 'open',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}