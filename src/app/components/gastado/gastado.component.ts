import { OnInit, ElementRef } from "@angular/core";
import { Component, ViewChild } from '@angular/core';

import { Chart } from "chart.js";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-gastado',
  templateUrl: './gastado.component.html',
  styleUrls: ['./gastado.component.scss'],
})
export class GastadoComponent {
  @ViewChild('BarChartSemanal', {static: false}) BarChartSemanal;
  @ViewChild('BarChartSemestral', {static: false}) BarChartSemestral;
  @ViewChild('BarChartAnual', {static: false}) BarChartAnual;
  @ViewChild('BarChartDiarioCategorias', {static: false}) BarChartDiarioCategorias;

  BarsDiario:any;
  BarsDiarioCat:any;
  BarsAnual:any;
  BarsSemestral:any;
  colorArray: any;

  
  apiDiario:any;
  apiAnual:any;
  apiSemestral:any;
  apiDiarioCategoria:any;

  constructor(private http:HttpClient) {}



  ionViewDidEnter() {
   
    this.createBarChartSemanal()
    this.createBarChartSemestral()
    this.createDiarioCategorias()
    
  }
  

  ionViewWillEnter(){

    this.gasto_anual()
    this.gasto_diarioCategorias()
    this.gasto_semanal()
    this.gasto_semestral()
  }
  
    gasto_semanal() {
      const my_url = 'http://138.68.54.214:8080/gastoSemanal.json'
      this.http.get(my_url).subscribe(data => {
        console.log(data);
        this.apiDiario = data;
        this.createBarChartSemanal();
      })
    }
  
    gasto_diarioCategorias(){
      const my_url = 'http://138.68.54.214:8080/gastoCategoria.json'
      this.http.get(my_url).subscribe(data => {
        console.log(data);
        this.apiDiarioCategoria = data;
        this.createDiarioCategorias();
      })
    }
  
    gasto_semestral(){
      const my_url = 'http://138.68.54.214:8080/gastoSemestral.json'
      this.http.get(my_url).subscribe(data => {
        console.log(data);
        this.apiSemestral = data;
        this.createBarChartSemestral();
      })
    }
  
    gasto_anual(){
      const my_url = ''
      this.http.get(my_url).subscribe(data => {
        console.log(data);
        this.apiDiarioCategoria = data;
        //this.createBarChartAnual();
      })
    }

  



  createBarChartSemanal() {
    let ctx = this.BarChartSemanal.nativeElement
    ctx.height = 400;
    this.BarsDiario = new Chart(ctx,{
    type: "bar",
    data: {
      labels: this.apiDiario && this.apiDiario.labels,
      datasets: [
        {
          label: "Miles de pesos",
          data: this.apiDiario && this.apiDiario.values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  })
}

  

  createDiarioCategorias() {
    let ctx = this.BarChartDiarioCategorias.nativeElement
    ctx.height = 400;
    this.BarsDiarioCat = new Chart(ctx,{
    type: "doughnut",
    data: {
      labels:  this.apiDiarioCategoria && this.apiDiarioCategoria.labels,
      datasets: [
        {
          label: "# Miles de pesos",
          data: this.apiDiarioCategoria && this.apiDiarioCategoria.values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)"
          ],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    }
  })}

  createBarChartSemestral() {
    let ctx = this.BarChartSemestral.nativeElement
    ctx.height = 400;
    this.BarsSemestral = new Chart(ctx,{
    type: "line",
    data: {
      labels: this.apiSemestral && this.apiSemestral.labels ,
      datasets: [
        {
          label: "Síntesis de Recaudación Histórico",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.apiSemestral && this.apiSemestral.values,
          spanGaps: false
        }
      ]
    }
  });


  
}
      




    

    
}