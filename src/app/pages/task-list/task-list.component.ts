import { Component, inject, OnInit } from '@angular/core';
import { UnosquareTasksService } from '../../services/unosquare-tasks.service';
import { UnosquareTask } from '../../models/task.model';
import { lastValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UnosquareTaskComponent } from "../../components/unosquare-task/unosquare-task.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, UnosquareTaskComponent, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{

  private taskService = inject(UnosquareTasksService);

  public tasks$!: Observable<UnosquareTask[]>;

  public filterByCompleted: boolean | null = null;

  constructor() {
  }

  async ngOnInit() {
    this.loadTasks();
  }

  private loadTasks(): void {
    this.tasks$ = this.taskService.getAll(this.filterByCompleted);
  }

  public onFilterChange() {
    this.loadTasks();
  }

  public async onMarkAsCompleted(task: UnosquareTask) {

  }

  public async onDeleteTask(task: UnosquareTask) {

  }


}
