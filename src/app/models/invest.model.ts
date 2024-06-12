export class Invest {
  constructor(
    public asset_type: string,
    public quantity: number,
    public purchase_price: number,
    public date: Date,
    public user_id: string
  ) {}
}
