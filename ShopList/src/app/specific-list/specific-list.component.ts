import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from '../model/list';
import { Item } from '../model/item';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-specific-list',
  templateUrl: './specific-list.component.html',
  styleUrls: ['./specific-list.component.css']
})
export class SpecificListComponent implements OnInit {
  list: List | undefined;
  addItemValue: string = '';
  editItemValue: string = '';
  selectedItem: Item | undefined;

  constructor(private route: ActivatedRoute, private crudService: CrudService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const listId = Number(params.get('id'));
      this.crudService.getAllList().subscribe(lists => {
        this.list = lists.find(list => list.id === listId);
      });
    });
  }

  addItem() {
    if (this.list) {
      const newItem: Item = { id: 0, item_name: this.addItemValue };
      this.crudService.addItem(this.list.id, newItem).subscribe(item => {
        this.list?.items.push(item);
        this.addItemValue = '';
      });
    }
  }

  deleteItem(item: Item) {
    if (this.list) {
      this.crudService.deleteItem(this.list.id, item.id).subscribe(() => {
        this.list!.items = this.list!.items.filter(i => i.id !== item.id);
      });
    }
  }

  editItem() {
    if (this.list && this.selectedItem) {
      this.selectedItem.item_name = this.editItemValue;
      this.crudService.editItem(this.list.id, this.selectedItem).subscribe(item => {
        const index = this.list!.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
          this.list!.items[index] = item;
        }
        this.editItemValue = '';
        this.selectedItem = undefined;
      });
    }
  }

  onSelect(item: Item) {
    this.selectedItem = item;
    this.editItemValue = item.item_name;
  }
}
