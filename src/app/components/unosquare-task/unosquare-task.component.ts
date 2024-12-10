import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnosquareTask } from '../../models/task.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-unosquare-task',
  imports: [ReactiveFormsModule],
  templateUrl: './unosquare-task.component.html',
  styleUrl: './unosquare-task.component.scss'
})
export class UnosquareTaskComponent implements OnInit {
  
  @Input() public task!: UnosquareTask;

  @Output() deleteTask: EventEmitter<UnosquareTask> = new EventEmitter();

  @Output() markAsCompleted: EventEmitter<UnosquareTask> = new EventEmitter();

  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required],
      dueDate: [formatDate(this.task.dueDate!, 'yyyy-MM-dd', 'en'), Validators.required],
      completed: [false]
    });
  }

  public formSubmit(): void {
    if (this.form.valid) {
      const mappedTask = this.mapFormToTask();
      //TODO call Serive and api
    }
  }

  public mapFormToTask(): UnosquareTask {
    return {
      isCompleted: this.form.controls['completed'].value!,
      description: this.form.controls['description'].value!,
      dueDate: this.form.controls['dueDate'].value!,
      title: this.form.controls['title'].value!
    }
  }

  // #region Events
  public onDeleteButtonClick(): void {
    this.deleteTask.emit(this.task);
  }

  public onMarkAsCompletedButtonClick(): void {
    this.form.controls['completed'].setValue(true);
    const mappedTask = this.mapFormToTask();
    this.markAsCompleted.emit(mappedTask);
  }

  public onSaveChangesButtonClick(): void {}
  // #endregion
}