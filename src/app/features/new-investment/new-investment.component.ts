import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InvestApiService } from '../../services/invest-api.service';
import { Invest } from '../../models/invest.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-new-investment',
  templateUrl: './new-investment.component.html',
  styleUrl: './new-investment.component.scss',
})
export class NewInvestmentComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  user: User;
  private authSub: Subscription;

  constructor(
    private investApi: InvestApiService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.userSub.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  onInvestSave(investForm: NgForm) {
    this.isLoading = true;

    const { asset_type, quantity, purchase_price, date } = investForm.value;
    this.investApi
      .saveInvest(
        new Invest(
          asset_type,
          quantity,
          purchase_price,
          date,
          this.user.user_id
        )
      )
      .subscribe((response: any) => {
        this.isLoading = false;
        this.toastr.success(response.response_msg);
        this.investApi.investList.next(response.data);
        investForm.reset();
      });
  }
}
