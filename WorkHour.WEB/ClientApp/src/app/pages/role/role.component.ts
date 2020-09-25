import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PageMode } from '../../shared/Model/PageMode';
import { GridComponent } from '../grid/grid.component';
import { URLSearchParams } from '@angular/http';
import { WorkHourHttpService } from '../../shared/service/http/workHourHttp';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, AfterViewInit{
  PageModes = PageMode;
  @ViewChild(GridComponent) grid: GridComponent;
  mode = PageMode.List;
  columns: any[];
  nodes = [];
  filteredNodes: any;
  constructor(private rakamHttpService: WorkHourHttpService) { }
  ngAfterViewInit(): void {
    this.grid.modeChange.subscribe((m) => {
      this.modeChange(m);

    });
    }

  ngOnInit(): void {
    this.columns = [
      { headerName: 'Id', field: 'id' },
      { headerName: 'Adı', field: 'name' },
      { headerName: 'Oluşturan Kullanıcı', field: 'createUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Oluşturulma Tarihi', field: 'createDate', cellRenderer: 'longDateFormatterComponent' },
      { headerName: 'Güncelleyen Kullanıcı', field: 'updateUserId', cellRenderer: 'userNameFormatterComponent' },
      { headerName: 'Güncellenme Tarihi', field: 'updateDate', cellRenderer: 'longDateFormatterComponent' }
    ];
    this.getClaim();
  }
  backToList() {
    this.mode = PageMode.List;
  }

  run(name: string) {
    if (this[name]) {
      this[name]();
    }
  }
  modeChange(m) {
    debugger;
    this.clearNodes(this.nodes);
    if (m == PageMode.Update) { 
      this.setNodes(this.nodes, this.grid.newItem.roleClaim);
      for (var i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        node.checked = this.allComplete(node);
      }
    }
    if (m == PageMode.Create) { 
    }
   
    this.reloadFilteredData();
  }
    clearNodes(items) {
    for (var i = 0; i < items.length; i++) {
      items[i].checked = false;
      items[i].expanded = false;
      items[i].hasChildren = (items[i].children != null && items[i].children.length > 0);

      if (items[i].children != null && items[i].children.length > 0) {
        this.clearNodes(items[i].children);
      }
    }
  }
  getClaim() {
    var url = '/Role/GetClaims';
    var params = new URLSearchParams();
    params.append('pageSize', '0');
    this.rakamHttpService.httpGet(url, params, null, (data) => { 
      for (var i = 0; i < data.item.claimGroupList.length; i++) {
        debugger;
        var items = data.item.claimList.filter(t => t.claimGroupId == data.item.claimGroupList[i].id);
        var item = {
          id: data.item.claimGroupList[i].id, checked: false, name: data.item.claimGroupList[i].name, expanded: true, children: [],
          hasChildren: (items.length > 0), type: 'group'
        };
        this.nodes.push(item);
        if (items.length > 0) {
          this.fillNodes(item.children, items);
        };
      }
      console.log(this.nodes);
    }, () => {
    });
  }

  save() {
    debugger;
    var newNodes = [];
    this.fillItems(newNodes, this.nodes);
    this.grid.newItem.roleClaim = newNodes;
    var body = this.grid.newItem;
    this.rakamHttpService.httpPost('/Role/SaveItem', body, null, (data) => { 
      if (data.item != null) {
        if (this.mode == PageMode.Create) {
          this.mode = PageMode.List;
          this.grid.addItem(data.Item);
          this.grid.reloadTable();
        }
        else {
          this.mode = PageMode.List; 
          this.grid.reloadTable();
        }
      } 
    }, null);
  }
  fillItems(newNodes: any[], listNodes: any[]) { 
    for (var i = 0; i < listNodes.length; i++) {
      if (listNodes[i].checked == true && listNodes[i].type == 'claim') {
        newNodes.push(listNodes[i].id);
      }

      if (listNodes[i].children != null && listNodes[i].children.length > 0) {
        this.fillItems(newNodes, listNodes[i].children);
      }
    }
  }

  allComplete(task): boolean {
    const children = task.children; 
    if (!children) {
      return false;
    } 
    return children.every(t => t.checked) ? true
      : children.every(t => !t.checked) ? false
        : task.checked;
  }
 
  someComplete(tasks: any[]): boolean {
    const numComplete = tasks.filter(t => t.checked).length;
    return numComplete > 0 && numComplete < tasks.length;
  }
  setNodes(nodeList, itemList: any[]) {
    for (var i = 0; i < nodeList.length; i++) {
      var filter = this.findNode(itemList, nodeList[i].id);
      if (filter == undefined || nodeList[i].type == 'group') {
        nodeList[i].checked = false;
      }
      else {
        nodeList[i].checked = true;
      }

      if (nodeList[i].children != null && nodeList[i].children.length > 0) {
        this.setNodes(nodeList[i].children, itemList);
      }
    }
  }
  findNode(itemList: any[], id: number): any[] {
    var filter = itemList.find(t => t == id);
    return filter;
  }
  fillNodes(nodeList: any[], items: any[]) {
    for (var i = 0; i < items.length; i++) {
      var item = {
        id: items[i].id, checked: false, name: items[i].name, expanded: false, children: [],
        hasChildren: false, type: 'claim'
      }; 
      nodeList.push(item);
    } 
  }
  filterNode(value) {
    if (!value) {
      this.copyNodes()
    }
    this.filteredNodes = []
    this.nodes.forEach(element => {
      var parent = element.name.trim().toLowerCase().indexOf(value.toLowerCase()) > -1;
      if (parent) {
        var result = this.filteredNodes.filter(item => item.name == element.name);
        if (result.length == 0) {
          this.filteredNodes.push(element)
        }
      }
      element.children.forEach(children => {
        var child = children.name.trim().toLowerCase().indexOf(value.toLowerCase()) > -1;
        if (child) {
          var result = this.filteredNodes.filter(item => item.name == element.name);
          if (result.length == 0) {
            this.filteredNodes.push(element)
          }
        }
      });
    });
  }
  copyNodes() {
    debugger;
    this.filteredNodes = Object.assign([], this.nodes);
  }
  reloadFilteredData() {
    this.copyNodes(); 
  }
  myClickFunction(node) {
    debugger;
    var element = document.getElementById('roleSublist-' + node.id.toString());
    var treeNodeOpenCloseButton = document.getElementById('treeNodeOpenCloseButton-' + node.id.toString());
    var hiddenAtt = element.getAttribute("hidden");
    if (hiddenAtt == null) {
      element.setAttribute("hidden", "");
      treeNodeOpenCloseButton.className = "fa fa-chevron-right";
    }
    else {
      element.removeAttribute("hidden");
      treeNodeOpenCloseButton.className = "fa fa-arrow-up";
    } 
  }
  setAllCompleted(tasks: any[], completed: boolean) {
    tasks.forEach(t => t.checked = completed);
  }
}
