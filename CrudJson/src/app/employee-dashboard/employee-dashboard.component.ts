import { ApiService } from './../shared/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeModel } from './employee-dash board.model';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  @ViewChild('closeModal') closeModalRef: any;
  formValue!: FormGroup;
  // employeeModelObj : EmployeModel = new EmployeModel();
  employeeData: Array<EmployeModel> = [];
  isEdition = false;
  editedEmployeeId?: number;

  constructor(
    private formbuilber: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      cpf: [''],
      nome: [''],
      sexo: [''],
      dat_nasc: [''],
      email: [''],
      phone: [''],
    });
    this.getAllEmployeee();
  }

  saveEmployeeDetails(isEdition : boolean) {
    if(isEdition){
      this.updateEmployeeDetails();
    }else{
      this.createEmployeeDetails();
    }
  }

  createEmployeeDetails() {
    let newEmployee: EmployeModel = {
      cpf: this.formValue.value.cpf,
      nome: this.formValue.value.nome,
      sexo: this.formValue.value.sexo,
      dat_nasc: this.formValue.value.dat_nasc,
      email: this.formValue.value.email,
      phone: this.formValue.value.phone,
    };

    this.apiService.postEmploye(newEmployee).subscribe(
      (res: any) => {
        console.log(res);
        alert('Criado com sucesso');
        this.closeModal();
        this.getAllEmployeee();
      },
      (err: any) => {
        alert('Algo deu errado');
      }
    );
  }

  updateEmployeeDetails() {
    let newEmployee: EmployeModel = {
      cpf: this.formValue.value.cpf,
      nome: this.formValue.value.nome,
      sexo: this.formValue.value.sexo,
      dat_nasc: this.formValue.value.dat_nasc,
      email: this.formValue.value.email,
      phone: this.formValue.value.phone,
    };

    const id = this.editedEmployeeId as number;

    //CHAMAR O METODO PUT AO INVES DO POST
    this.apiService.updateEmploye(newEmployee, id).subscribe(
      (res: any) => {
        console.log(res);
        alert('Editado com sucesso');
        this.closeModal();
        this.getAllEmployeee();
      },
      (err: any) => {
        alert('Algo deu errado');
      }
    );
  }

  closeModal(): any {
    this.isEdition = false;
    this.editedEmployeeId = undefined;
    this.formValue.reset();

    this.closeModalRef.nativeElement.click();
  }

  getAllEmployeee() {
    this.apiService.getEmployee().subscribe((res: any) => {
      this.employeeData = res;
    });
  }
  deleteEmployee(employee: EmployeModel) {
    const id = employee.id as number;
    this.apiService.deleteEmployee(id).subscribe((res: any) => {
      alert('Deletado com Sucesso!');
      this.getAllEmployeee();
    });
  }
  onEdit(row: any) {
    this.isEdition = true;
    this.editedEmployeeId = row.id;

    this.formValue.controls['cpf'].setValue(row.cpf);
    this.formValue.controls['nome'].setValue(row.nome);
    this.formValue.controls['sexo'].setValue(row.sexo);
    this.formValue.controls['dat_nasc'].setValue(row.dat_nasc);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
  }
  // function reset(reset: any) : void {
  //   throw new Error('Function not implemented.');
  // }
}
