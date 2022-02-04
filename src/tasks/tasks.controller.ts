import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    // in typescript, when defining param names, you can prefix them with an accessor
    // when doing this, typescript assumes you'll be using it as a property of the TaskController class
    constructor(private tasksService: TasksService) {}

    // for now we will use local memory to focus on the core, not to get bogged down in db stuff

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        // if any filters defined, call gettasks with filters
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWIthFilters(filterDto);
        }
        // otherwise just get all tasks
        return this.tasksService.getAllTasks();
    }

    @Get('/:id') // it knows which get to run because we'll give this one some path params.
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        return this.tasksService.deleteTaskById(id); // don't have to return anything w/ void
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string, 
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Task {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }

    // option 0
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
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
