import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RegionsService } from '../../services/regions/regions.service';
import { tap, retry } from 'rxjs/operators';
import { MedicationService } from '../../services/medication/medication.service';
import { PathologiesService } from '../../services/pathology/pathologies.service';
import { MeasuresService } from '../../services/measure/measures.service';
import { Router } from '@angular/router';
import { HospitalService } from '../../services/hospital/hospital.service';
import { StatusService } from '../../services/status/status.service';

@Component({
  selector: 'app-modify-data',
  templateUrl: './modify-data.component.html',
  styleUrls: ['./modify-data.component.scss']
})
export class ModifyDataComponent implements OnInit {
  /**
   * Selected value in the chosen key
   */
  selectedValue: string;
  selectedItem: string;
  test: 'region';
  /**
   * options for the selection
   */
  keyOptions: any[] = [
    'steak-0-1', 'Pizza', 'tacos-2', 'Tacos'
  ];
  /**
   * Form for the forms
   */
  form = new FormGroup({});
  /**
   * modal object
   */
  model: any = {};
  /**
   * option for the form
   */
  options: FormlyFormOptions = {};
  /**
   * Variable to edit data
   */
  dataEditValue: string;
  /**
   * Boolean Item
   */
  booleanItem: boolean = false;

  /**
   * Temporal data for form
   */
  recruitmentFields: FormlyFieldConfig[] = [];
  /**
   * Value for present the selection item
   */
  presentOptions: boolean = false;
  /**
   * Boolean for the hospital view
   */
  hospitalView: boolean = false;
  /**
   * Country Selected
   */
  countrySelected: string;
  /**
   * Regions list defined by a country
   */
  regionsData: any[];
  /**
   * Temporal data for region form
   */
  RegionFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'name',
          templateOptions: {
            label: 'Name',
            required: true
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'countryCode',
          templateOptions: {
            label: 'Country',
            required: true
          }
        }
      ],
    }
  ];
  /**
   * Temporal data for region form
   */
  MedicationFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'name',
          templateOptions: {
            label: 'Medication',
            required: true
          }
        },
        {
          className: 'col-6',
          type: 'select',
          key: 'pharmaceuticCo',
          templateOptions: {
            label: 'House Pharmacy',
            required: true
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              field.templateOptions.options = this.data.Pharmacies;
            },
          }
        }
      ],
    }
  ];
  /**
   * Temporal data for region form
   */
  GeneralFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'name',
          templateOptions: {
            label: 'Name',
            required: true,
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'description',
          templateOptions: {
            label: 'Description',
            required: true
          }
        }
      ],
    }
  ];
  /**
   * Temporal data for hospital form
   */
  HospitalFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'name',
          templateOptions: {
            label: 'Name',
            required: true
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'managerName',
          templateOptions: {
            label: 'Manager Name',
            required: true
          }
        }
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'phone',
          templateOptions: {
            label: 'Phone',
            required: true,
            type: 'number'
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'capacity',
          templateOptions: {
            label: 'Beds Capacity',
            required: true,
            type: 'number'
          }
        }
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'icU_Capacity',
          templateOptions: {
            label: 'Uci beds Capacity',
            required: true,
            type: 'number'
          }
        },
        {
          className: 'col-6',
          type: 'select',
          key: 'country',
          templateOptions: {
            label: 'Country',
            required: true,
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              field.templateOptions.options = this.data.Countries;
            }
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'region',
          templateOptions: {
            label: 'Region',
            required: true
          },
          // hooks: {
          //   onInit: (field: FormlyFieldConfig) => {
          //     field.form.get('country').valueChanges.pipe(
          //       tap(countrySelected => {
          //         console.log('countrySelected', countrySelected);
          //         this.selectRegion(countrySelected);
          //         console.log('regions options 1', this.regionsData);
          //         field.templateOptions.options = [{
          //           label: 'test',
          //           value: 'test'
          //         }];
          //         console.log('regions options 2', this.regionsData);
          //       }),
          //     ).subscribe();
          //     }
          //   }
        }
      ]
    }
  ];
  /**
   * Temporal data for hospital form
   */
  PathologyFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'name',
          templateOptions: {
            label: 'Name',
            required: true
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'description',
          templateOptions: {
            label: 'Description',
            required: true
          }
        }
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'symptoms',
          templateOptions: {
            label: 'Symptoms',
            required: true
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'treatment',
          templateOptions: {
            label: 'Treatment',
            required: true
          }
        }
      ],
    }
  ];
  /**
   * Temporal data for hospital form
   */
  ByCountryFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'select',
          key: 'measureId',
          templateOptions: {
            label: 'Name',
            required: true
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              field.templateOptions.options = this.data?.Measure;
            },
          }
        },
        {
          className: 'col-6',
          type: 'select',
          key: 'countryCode',
          templateOptions: {
            label: 'Country',
            required: true,
          },
          hooks: {
            onInit: (field: FormlyFieldConfig) => {
              field.templateOptions.options = this.data?.Countries;
            },
          }
        }
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'startDate',
          templateOptions: {
            label: 'Start Date',
            required: true
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'endDate',
          templateOptions: {
            label: 'End Date',
            required: true
          }
        },
        {
          className: 'col-6',
          type: 'select',
          key: 'status',
          templateOptions: {
            label: 'Status',
            required: true,
            options: [
              {label: 'Active', value: 'ACTIVE' },
              {label: 'Inactive', value: 'INACTIVE'}
            ]
          }
        }
      ],
    }
  ];
  /**
   * Formly data structure for two values
   */
  FieldStatus: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'name',
          templateOptions: {
            required: true,
            label: 'Name'
          }
        }
      ]
    }
  ];
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public regionService: RegionsService,
    public medicationService: MedicationService,
    public patholgyService: PathologiesService,
    public measureService: MeasuresService,
    public hospitalService: HospitalService,
    private statusService: StatusService) { }

  ngOnInit(): void {
    console.log('data pased', this.data);
    this.keyOptions = this.data.Keys;
    if (this.data.Parent === 'Region') {
      this.recruitmentFields = this.RegionFields;
    } else {
      if (this.data.Parent === 'Hospital') {
        this.recruitmentFields = this.HospitalFields;
        this.hospitalView = true;
      }
      if (this.data.Parent === 'Medication') {
        this.recruitmentFields = this.MedicationFields;
        console.log('farmacy', this.data.Pharmacies);
      }
      if (this.data.Parent === 'Pathology') {
        this.recruitmentFields = this.PathologyFields;
      }
      if (this.data.Parent === 'byCountry') {
        this.recruitmentFields = this.ByCountryFields;
      }
      if (this.data.Parent === 'general') {
        this.recruitmentFields = this.GeneralFields;
      }
      if (this.data.Parent === 'Status'){
        this.recruitmentFields = this.FieldStatus;
      }
    }
  }
  submit() {
    console.log(this.model);
    if (this.data.Parent === 'Region') {
      this.regionService.createRegion(this.model);
      this.onNoClick();
    }
    if (this.data.Parent === 'Hospital') {
      this.hospitalService.createHospital(this.model);
    }
    if (this.data.Parent === 'Medication') {
      this.medicationService.createMedication(this.model);
      this.onNoClick();
    }
    if (this.data.Parent === 'Pathology') {
      this.patholgyService.createPathology(this.model).subscribe(
        data => {
          console.log('data', data);
          this.onNoClick();
        }
      );
    }
    if (this.data.Parent === 'byCountry') {
      this.measureService.assignSanitaryMeause(this.model);
      this.onNoClick();
    }
    if (this.data.Parent === 'general') {
      this.measureService.createSanitaryMeasure(this.model);
      this.onNoClick();
    }
    if (this.data.Parent === 'Status'){
      this.statusService.createStatus(this.model);
      this.onNoClick();
    }

  }
  onNoClick(): void {
    location.reload();
    this.dialogRef.close();
  }
  selectRegion(countrySelected: string){
    this.regionService.getRegions(countrySelected).subscribe(
      dataR => {
        console.log('regiones', dataR);
        const SanitaryData = [];
        for (const pharmacy of dataR) {
          const newPharmacyCo = {
            value: pharmacy.countryCode,
            label: pharmacy.name
          };
          SanitaryData.push(newPharmacyCo);
        }
        console.log('regiones', SanitaryData);
        this.regionsData = SanitaryData;
        return this.regionsData;
      }
    );
  }

}

