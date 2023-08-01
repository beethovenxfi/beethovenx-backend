import { aaveHandlers } from "./aave/aave-apr-handler";
import { ankrHandlers } from "./ankr/ankr-apr-handler";
import { defaultHandlers } from "./default-fetch/default-apr-handler";
import { eulerHandlers } from "./euler/euler-apr-handler";
import { gearboxHandlers } from "./gearbox/gearbox-apr-handler";
import { idleAprHandlers } from "./idle/idle-apr-handler";
import { overnightHandlers } from "./overnight/overnight-apr-handler";
import { ovixHandlers } from "./ovix/ovix-apr-handler";
import { reaperHandlers } from "./reaper/reaper-apr-handler";
import { tesseraHandlers } from "./tessera/tessera-apr-handler";
import { tetuHandlers } from "./tetu/tetu-apr-handler";

export const aprHandlers = [
  ...aaveHandlers,
  ...ankrHandlers,
  ...defaultHandlers,
  ...eulerHandlers,
  ...gearboxHandlers,
  ...idleAprHandlers,
  ...overnightHandlers,
  ...ovixHandlers,
  ...reaperHandlers,
  ...tesseraHandlers,
  ...tetuHandlers,
]