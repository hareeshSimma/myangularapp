import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../shared/services/user.service';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { Infrastructure } from '../../../shared/models/infrastructure.model';
import { User } from '../../../shared/models/user.model';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.css']
})
export class InfrastructureComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  infrastructureService: Infrastructure;
  public count = 0;
  public viewMode: boolean = true;
  currentUser: User;
  data: any[];
  users: User[];
  tenantid: any;

  services = [
    'AWS',
    'Azure',
    'GCP',
  ];
  systems = [
    'Kubernetes',
    'Mesos',
    'Docker Swarm'
  ]
  systemOptions = [
    '1 Master',
    '3 Masters',
    '5 Masters'
  ]
  constructor(
    private dashboardservice: DashboardService,
    private userservice: UserService,
    private notificationsService: NotificationsService    
  ) {
    this.infrastructureService = {
      service: '',
      orchestration_system: '',
      orchestration_system_option: '',
      id: ''
    }

    this.subscription = userservice.currentUser.subscribe(
      user => {
        this.currentUser = user;
        console.log(this.currentUser);
      });
  }

  onNext() {

    this.count++;

    if (this.count == 2 && this.infrastructureService.orchestration_system_option) {
      this.viewMode = false
    }
    else if (this.count == 1 && this.infrastructureService.orchestration_system) {
      this.viewMode = false
    }
    else
      this.viewMode = true;

  }

  onBack() {
    this.count--;
    this.viewMode = false;
  }

  onSubmit(infrastructureService) {
    this.count = 0;
    let path = "/cloudinfrastructure/saveStructure";
    this.dashboardservice.infrastructure(path, infrastructureService)
      .subscribe(
      res => {
        this.notificationsService.success(
          'Infrastructure Updated',
          'Succesfully',
          {
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 12
          }
        )
        this.data = res;
        this.infrastructureService = {
          service: '',
          orchestration_system: '',
          orchestration_system_option: '',
          id: ''
        }
        this.viewMode = true;
      })
  }

  ngOnInit() {
    setTimeout(() => { this.userservice.sendPath({ path: "infrastructure", subPath: false }); }, 200)
    this.dashboardservice.tenantList().subscribe(
      res => {
        this.users = res;
      },
      (err) => {
        for (const x in err.errors) {
          if (true) {
          }
        }
      }
    );
    // this.dashboardservice.getInfrastructure(this.currentUser.id).subscribe(res =>{
    //   console.log(res);
    // })
  }
  onSelect(id) {
    console.log(id);
    this.dashboardservice.getInfrastructure(id)
      .subscribe(
      res => {
        if (res == null) {
          this.infrastructureService = {
            service: '',
            orchestration_system: '',
            orchestration_system_option: '',
            id: id
          }
        }
        else {
          this.infrastructureService.service = res["service"];
          this.infrastructureService.orchestration_system = res["orchestration_system"];
          this.infrastructureService.orchestration_system_option = res["orchestration_system_option"];
        }
      },
      (err) => {
      }
      );
  }



  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}





