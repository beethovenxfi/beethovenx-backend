import {
  aaveV2MainnetAprHandler,
  aaveV2PolygonAprHandler, aaveV3ArbitrumAprHandler,
  aaveV3MainnetAprHandler,
  aaveV3PolygonAprHandler
} from "./aave/aave-apr-handler";
import { ankrEthMainnetAprHandler } from "./ankr/ankr-apr-handler";
import {
  cbEthAprHandler, MATICXAprHandler,
  rETHAprHandler,
  sfrxEthAprHandler,
  stMaticAprHandler, swETHAprHandler, USDRAprHandler, wbETHAprHandler, wjAURAAprHandler
} from "./default-fetch/default-apr-handler";
import { eulerMainnetAprHandler } from "./euler/euler-apr-handler";
import { gearboxMainnetAprHandler } from "./gearbox/gearbox-apr-handler";
import { idleMainnetAprHandler } from "./idle/idle-apr-handler";
import { overnightMainnetAprHandler } from "./overnight/overnight-apr-handler";
import { AprHandler } from "../types";
import { ovixZkEVMAprHandler } from "./ovix/ovix-apr-handler";
import { reaperArbitrumAprHandler } from "./reaper/reaper-apr-handler";
import { tesseraApePoolAprHandler } from "./tessera/tessera-apr-handler";
import { tetuAprHandler } from "./tetu/tetu-apr-handler";
import { tranchessMainnetAprHandler } from "./tranchess/tranchess-apr-handler";

export const aprHandlers: AprHandler[] = [
  aaveV2MainnetAprHandler,
  aaveV2PolygonAprHandler,
  aaveV3MainnetAprHandler,
  aaveV3PolygonAprHandler,
  aaveV3ArbitrumAprHandler,
  ankrEthMainnetAprHandler,
  stMaticAprHandler,
  cbEthAprHandler,
  sfrxEthAprHandler,
  rETHAprHandler,
  USDRAprHandler,
  MATICXAprHandler,
  wbETHAprHandler,
  swETHAprHandler,
  wjAURAAprHandler,
  eulerMainnetAprHandler,
  gearboxMainnetAprHandler,
  idleMainnetAprHandler,
  overnightMainnetAprHandler,
  ovixZkEVMAprHandler,
  reaperArbitrumAprHandler,
  tesseraApePoolAprHandler,
  tetuAprHandler,
  tranchessMainnetAprHandler,
]