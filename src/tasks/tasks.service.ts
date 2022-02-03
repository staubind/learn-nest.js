import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []; // keeping it private prevents it from being mutated later in our code
    // though if it were public we could just use dot notation to access it.
    // instead we will set up methods to provide access.

    // could use public, but by default it's public, so there is no need.
    getAllTasks() {
        return this.tasks;
    }

    getTasksWIthFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        // define a temporary array to hold the result
        let tasks = this.getAllTasks();
        // do something with status
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        // do somethnig with search
        if (search) {
            tasks = tasks.filter(task => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            })
        }
        // return final result
        return tasks
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
        const found = this.tasks.find(task => task.id === id);
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found.`); // can provide optional argument, too.
            // this exception 'bubbles up' into Nest.js's internals, and it maps it to a 404 response.
        } else {
            return found;
        }
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
