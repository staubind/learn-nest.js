import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    // in typescript, when defining param names, you can prefix them with an accessor
    // when doing this, typescript assumes you'll be using it as a property of the TaskController class
    constructor(private tasksService: TasksService) {}

    // for now we will use local memory to focus on the core, not to get bogged down in db stuff

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    // option 0
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto)
    }

    // option 1
    // @Post()
    // createTask(
    //     @Body('title') title: string, // this style picks out the particular properties. the style below does not.
    //     @Body('description') description: string,
    // ): Task { // the @Body param stuffs the request's body into a variable called body
    //     // however, callers can add whatever they like to it, so validation will need to be done.
    //     console.log('title',title)
    //     console.log('description',description)
    //     return this.tasksService.createTask(title, description)
    }
    // option 2
    // @Post()
    // createTask(@Body() body) { // the @Body param stuffs the request's body into a variable called body
    //     // however, callers can add whatever they like to it, so validation will need to be done.
    //     console.log('body', body)
    // }


    // helloWorld() {
    //     this.tasksService.dosomething();
    // }
}

// this works, too, but above has more sugar.
// @Controller('tasks')
// export class TasksController {
//     tasksService: TasksService;

//     constructor(tasksService: TasksService) {
//         this.tasksService = tasksService;
//     }

//     helloWorld() {
//         this.tasksService.dosomething();
//     }
// }
