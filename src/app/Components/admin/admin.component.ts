import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'app/components/_models/user';
import { UserService } from 'app/components/_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loading = false;
    users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
          });
  
}
}


