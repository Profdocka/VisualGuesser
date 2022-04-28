import { Component, OnInit } from '@angular/core';
import { PointsService } from '../../data/points.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public PointsService: PointsService) {
   }

  ngOnInit() {
  }

} 
