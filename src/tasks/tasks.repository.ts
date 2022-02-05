import { Repository, EntityRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { stringify } from 'querystring';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title: title,
            description: description,
            status: TaskStatus.OPEN,
        }) // only creates the object, doesn't yet save it to db
        await this.save(task); // this handles the db operation
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task'); // how you can refer to a task w/in query
        if (status) {
            query.where('task.status = :status', {status});
        }
        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE LOWER(:search))', 
                {search: `%${search}%`},
            )
            // Clean your room -> clean your room
            // CLEAN -> clean
        }
        const tasks = await query.getMany();
        return tasks;
    }
    // async deleteTaskById(id: string): Promise<string> {
    //     const deleted = await this.delete({id})
    //     return deleted.toString();
    // }
}