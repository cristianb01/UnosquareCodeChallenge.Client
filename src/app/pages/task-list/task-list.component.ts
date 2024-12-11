import { Component, inject, OnInit } from '@angular/core';
import { UnosquareTasksService } from '../../services/unosquare-tasks.service';
import { UnosquareTask } from '../../models/task.model';
import { lastValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UnosquareTaskComponent } from "../../components/unosquare-task/unosquare-task.component";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertService } from '../../services/alert.service';

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

  constructor(private alertService: AlertService) {
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
    try {
      await lastValueFrom(this.taskService.update(completedTask));
      this.alertService.showSuccess("Task marked as completed succesfully");
      await this.loadTasks();
    }
    catch(error) {}
  }

  public async onDeleteTask(task: UnosquareTask) {
    await lastValueFrom(this.taskService.delete(task.id!));
    this.alertService.showSuccess("Task marked deleted succesfully");
    this.loadTasks();
  }


}
