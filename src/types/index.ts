import { CommonActionTypes } from "./actions/Common.action";
import { SettingsActionTypes } from "./actions/Settings.action";
import { AuthActions } from "./actions/Auth.actions";
import { SliderSettingsActions } from "./actions/SliderSettings.actions";

export type AppActions =
    | CommonActionTypes
    | SettingsActionTypes
    | AuthActions
    | SliderSettingsActions;
