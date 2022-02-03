import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // keeping it private prevents it from being mutated later in our code
    // though if it were public we could just use dot notation to access it.
    // instead we will set up methods to provide access.

    // could use public, but by default it's public, so there is no need.
    getAllTasks() {
        return this.tasks;
    }
}
