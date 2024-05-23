import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../../model/list';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listArr: List[] = [];
  addListValue: string = '';
  editListValue: string = '';
  selectedList: List | null = null;

  constructor(private crudService: CrudService, private router: Router) { }

  ngOnInit(): void {
    this.getAllList();
  }

  getAllList() {
    this.crudService.getAllList().subscribe(res => {
      this.listArr = res;
    }, err => {
      alert("Unable to get lists");
    });
  }

  addList() {
    const newList: List = {
      id: 0,
      list_name: this.addListValue,
      items: []  // Initialize the items array
    };
    this.crudService.addList(newList).subscribe(res => {
      this.listArr.push(res);
      this.addListValue = '';
    }, err => {
      alert(err);
    });
  }

  editList() {
    if (this.selectedList) {
      this.selectedList.list_name = this.editListValue;
      this.crudService.editList(this.selectedList).subscribe(res => {
        const index = this.listArr.findIndex(item => item.id === res.id);
        if (index !== -1) {
          this.listArr[index] = res;
        }
        this.editListValue = '';
        this.selectedList = null;
      }, err => {
        alert("Failed to update list");
      });
    }
  }

  deleteList(elist: List) {
    this.crudService.deleteList(elist).subscribe(() => {
      this.listArr = this.listArr.filter(item => item.id !== elist.id);
    }, err => {
      alert("Failed to delete list");
    });
  }

  onSelect(list: List) {
    this.selectedList = list;
    this.editListValue = list.list_name;
  }

  navigateToList(listId: number) {
    this.router.navigate(['/task', listId]);
  }
}
