import { Component, inject, OnInit } from '@angular/core';
import { UnosquareTasksService } from '../../services/unosquare-tasks.service';
import { UnosquareTask } from '../../models/task.model';
import { lastValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UnosquareTaskComponent } from "../../components/unosquare-task/unosquare-task.component";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, UnosquareTaskComponent, FormsModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{

  private taskService = inject(UnosquareTasksService);

  public tasks!: UnosquareTask[];

  public filterByCompleted!: boolean | null;

  constructor() {
  }

  async ngOnInit() {
    this.loadTasks();
  }

  private async loadTasks() {
    this.tasks = await lastValueFrom(this.taskService.getAll(this.filterByCompleted != null? this.filterByCompleted.toString() : null));
  }

  public onFilterChange() {
    this.loadTasks();
  }

  public async onMarkAsCompleted(task: UnosquareTask) {
    const completedTask = {...task};
    completedTask.isCompleted = true;
    await lastValueFrom(this.taskService.update(completedTask));
    await this.loadTasks();
  }

  public async onDeleteTask(task: UnosquareTask) {
    await lastValueFrom(this.taskService.delete(task.id!));
    this.loadTasks();
  }


}
