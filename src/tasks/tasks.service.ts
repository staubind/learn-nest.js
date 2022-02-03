import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // keeping it private prevents it from being mutated later in our code
    // though if it were public we could just use dot notation to access it.
    // instead we will set up methods to provide access.

    // could use public, but by default it's public, so there is no need.
    getAllTasks() {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task
    }

    deleteTaskById(id: string): void {
        const index = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(index,1);
        // could also do: this.tasks = this.tasks.filter((task) => task.id !== id)
        return
    }
}
