import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
  Power,
  Flag,
  Check,
  CheckCircle,
  Clock,
  Plus,
  Star,
  Bell,
  Anchor,
  Camera,
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Power,
  Flag,
  Check,
  CheckCircle,
  Clock,
  Star,
  Plus,
  Bell,
  Anchor,
  Camera,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
