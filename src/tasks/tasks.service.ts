import { Delete, Injectable, NotFoundException, Param } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) {}
    //private tasks: Task[] = []; // keeping it private prevents it from being mutated later in our code
    // though if it were public we could just use dot notation to access it.
    // instead we will set up methods to provide access.

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    // // could use public, but by default it's public, so there is no need.
    // getAllTasks() {
    //     return this.tasks;
    // }

    // getTasksWIthFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     // define a temporary array to hold the result
    //     let tasks = this.getAllTasks();
    //     // do something with status
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     // do somethnig with search
    //     if (search) {
    //         tasks = tasks.filter(task => {
    //             if (task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         })
    //     }
    //     // return final result
    //     return tasks
    // }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task)
    //     return task;
    // }

    async getTaskById(id: string): Promise<Task> { // async because db interaction - need to return a promise because it's async
        // fetch task from db
        const found = await this.tasksRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found"`)
        }
        // otherwise return error
        return found;
    }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Task with id ${id} not found.`); // can provide optional argument, too.
    //         // this exception 'bubbles up' into Nest.js's internals, and it maps it to a 404 response.
    //     } else {
    //         return found;
    //     }
    // }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        // handle case where task doesn't exist
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task
    // }

    // async - and remember to handle errors, if no id, 404
    // specify correct return type
    // remove or delete method from typeorm
    async deleteTaskById(@Param() id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found"`);
        } 
    }


    // deleteTaskById(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id != found.id)
    // }
}
