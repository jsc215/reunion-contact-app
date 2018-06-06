import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-regi-form',
  templateUrl: './regi-form.component.html',
  styleUrls: ['./regi-form.component.css']
})
export class RegiFormComponent implements OnInit {
  regiForm: FormGroup;
  password: 'password';
  firstName: '';
  lastName: '';
  email: '';

  constructor(private fBuilder: FormBuilder) {
    this.regiForm = fBuilder.group({
    });
  }

  ngOnInit() {}
}

