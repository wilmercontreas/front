import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../services/hero.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heros: any = [];

  constructor(private router: Router, private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe( resp => {
      this.heros = resp;
      console.log(this.heros);
    }, (err) => {
      this.heros = [];
    });
  }

  eliminar(id: string) {
    this.heroService.eliminarHeroe(id).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: 'Registro eliminado',
        showConfirmButton: false,
        timer: 1500
      });
      console.log(resp);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Registro eliminado',
        showConfirmButton: false,
        timer: 1000
      });
    });
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        console.log(currentUrl);
    });
  }

}
