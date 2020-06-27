import { Component, OnInit } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { EditDataComponent } from '../../components/edit-data/edit-data.component';
import { ModifyDataComponent } from '../../components/modify-data/modify-data.component';
@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss']
})
export class MedicationsComponent implements OnInit {
  /**
   * Type of the selection
   */
  SelectionType = SelectionType;
  /**
   * Table row selected
   */
  selected = [];
  /**
   * Item selected to change/delete
   */
  selectToOption: object;
  /**
   * Columns hospital center
   */
  columnsS = [{ prop: 'medication', name: 'Medication' },
  { prop: 'pharmacyHouse', name: 'Pharmacy House'}];
  /**
   * Rows Hospital center
   */
  rowsS = [
    {
      medication: 'Cibacen',
      pharmacyHouse: 'Novartis'
    },
  ];
  /**
   * Boolean variable for enable a change in the option
   */
  enableChange: boolean = false;
  /**
   * First method for open a card
   * @param dialog Controller for the dialog
   */
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  /**
   * selection event
   */
  onSelect({ selected }, Parent: string) {
    console.log('holi on select', selected, 'parent', Parent);
    this.selectToOption = {
      parent: Parent,
      value: selected[0]
    };
    this.enableChange = true;
  }
  /**
   * Delete the option selected
   */
  deleteSelected(){
    console.log('selected to delete',this.selectToOption);
  }
  /**
   * Open a Modify/Add Component
   */
  openDialog(actionT: string) {
    const dialogRef = this.dialog.open(ModifyDataComponent, {
      data: {
        Action: actionT,
        Parent: 'Medication',
        Keys: Object.keys(this.rowsS[0])
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  /**
   * Open a Modify/Add Component
   */
  openDialogToEdit() {
    const dialogRef = this.dialog.open(EditDataComponent, {
      data: {
        Parent: 'Medication',
        Selection: this.selectToOption,
        Keys: Object.keys(this.rowsS[0])
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
