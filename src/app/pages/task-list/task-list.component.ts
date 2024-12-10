import { Component, inject, OnInit } from '@angular/core';
import { UnosquareTasksService } from '../../services/unosquare-tasks.service';
import { UnosquareTask } from '../../models/task.model';
import { lastValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UnosquareTaskComponent } from "../../components/unosquare-task/unosquare-task.component";

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, UnosquareTaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{

  private taskService = inject(UnosquareTasksService);

  public tasks$!: Observable<UnosquareTask[]>;

  constructor() {
  }

  async ngOnInit() {
    this.tasks$ = this.taskService.getAll();
  }


}
