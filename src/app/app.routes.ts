import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { AddTaskPageComponent } from './pages/add-task-page/add-task-page.component';

export const routes: Routes = [
    {
        path: 'task-list',
        component: TaskListComponent
    },
    {
        path: 'create-task',
        component: AddTaskPageComponent
    },
    { path: '**', redirectTo: 'task-list'}
];
