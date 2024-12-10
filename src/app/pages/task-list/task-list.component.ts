import { Component, inject, OnInit } from '@angular/core';
import { UnosquareTasksService } from '../../services/unosquare-tasks.service';
import { UnosquareTask } from '../../models/task.model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{

  private taskService = inject(UnosquareTasksService);

  public tasks!: UnosquareTask[];

  constructor() {
  }

  async ngOnInit() {
    this.tasks = await lastValueFrom(this.taskService.getAll());
  }


}
