import { Component } from '@angular/core';

@Component({
  selector: 'app-promotion-materials',
  templateUrl: './promotion-materials.component.html',
  styleUrl: './promotion-materials.component.css'
})
export class PromotionMaterialsComponent {
  table_name: string;
  parameter_name: string;
  constructor(
    // private http: HttpClient,
  ) {
    this.table_name = 'cfg_promotion_material_items';
    this.parameter_name = "promotion_materials";
  }
}
