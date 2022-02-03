import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

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
